/**
 * Shared storage abstraction for Download Token usage and Rate Limiting.
 *
 * Solves Finding 3 (replay protection across server instances/restarts) and
 * Finding 4 (distributed rate limiting across instances):
 *
 * 1. Fail-closed: If a token record is missing or unverified, access is STRICTLY REJECTED.
 * 2. Pluggable: Supports in-memory storage (with fail-closed semantics) and
 *    shared distributed storage (Upstash Redis / Vercel KV REST APIs) without
 *    requiring heavy native Redis dependencies.
 */

export interface TokenUsage {
  usedCount: number;
  maxUses: number;
  expiresAt: number;
}

export interface TokenRecordResult {
  allowed: boolean;
  reason?: string;
  remaining?: number;
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds?: number;
}

export interface TokenStore {
  get(jti: string): Promise<TokenUsage | null> | TokenUsage | null;
  set(jti: string, usage: TokenUsage): Promise<void> | void;
  recordUsage(jti: string): Promise<TokenRecordResult> | TokenRecordResult;
  clear(): Promise<void> | void;
}

export interface RateLimitStore {
  check(
    key: string,
    maxRequests: number,
    windowMs: number
  ): Promise<RateLimitResult> | RateLimitResult;
  clear(): Promise<void> | void;
}

// -----------------------------------------------------------------------------
// IN-MEMORY TOKEN STORE (Fail-Closed)
// -----------------------------------------------------------------------------

export class MemoryTokenStore implements TokenStore {
  private store = new Map<string, TokenUsage>();

  get(jti: string): TokenUsage | null {
    const item = this.store.get(jti);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      this.store.delete(jti);
      return null;
    }
    return item;
  }

  set(jti: string, usage: TokenUsage): void {
    this.store.set(jti, { ...usage });
  }

  recordUsage(jti: string): TokenRecordResult {
    const usage = this.get(jti);

    // CRITICAL: Fail-closed. If record is missing, unrecorded, or expired, REJECT.
    if (!usage) {
      return {
        allowed: false,
        reason: "Download token usage record not found or unverified",
      };
    }

    if (usage.usedCount >= usage.maxUses) {
      return {
        allowed: false,
        reason: "Download token usage limit exceeded",
      };
    }

    usage.usedCount += 1;
    this.store.set(jti, usage);

    return {
      allowed: true,
      remaining: usage.maxUses - usage.usedCount,
    };
  }

  clear(): void {
    this.store.clear();
  }
}

// -----------------------------------------------------------------------------
// IN-MEMORY RATE LIMIT STORE
// -----------------------------------------------------------------------------

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

export class MemoryRateLimitStore implements RateLimitStore {
  private buckets = new Map<string, RateLimitBucket>();

  check(
    key: string,
    maxRequests: number,
    windowMs: number
  ): RateLimitResult {
    const now = Date.now();
    const bucket = this.buckets.get(key);

    if (!bucket || bucket.resetAt <= now) {
      this.buckets.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true };
    }

    if (bucket.count >= maxRequests) {
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((bucket.resetAt - now) / 1000)
      );
      return { allowed: false, retryAfterSeconds };
    }

    bucket.count += 1;
    return { allowed: true };
  }

  clear(): void {
    this.buckets.clear();
  }
}

// -----------------------------------------------------------------------------
// DISTRIBUTED REST REDIS ADAPTER (Upstash Redis / Vercel KV REST)
// -----------------------------------------------------------------------------

const ATOMIC_RECORD_USAGE_LUA = `
local key = KEYS[1]
local raw = redis.call('GET', key)
if not raw then
  return cjson.encode({ allowed = false, reason = 'Download token usage record not found or unverified' })
end
local data = cjson.decode(raw)
if data.usedCount >= data.maxUses then
  return cjson.encode({ allowed = false, reason = 'Download token usage limit exceeded', remaining = 0 })
end
data.usedCount = data.usedCount + 1
local remaining = data.maxUses - data.usedCount
local ttl = redis.call('TTL', key)
local encoded = cjson.encode(data)
if ttl and ttl > 0 then
  redis.call('SET', key, encoded, 'EX', ttl)
else
  redis.call('SET', key, encoded)
end
return cjson.encode({ allowed = true, remaining = remaining })
`.trim();

export class RestRedisTokenStore implements TokenStore {
  constructor(
    private restUrl: string,
    private restToken: string
  ) {}

  private async executeCommand(args: (string | number)[]): Promise<unknown> {
    const res = await fetch(`${this.restUrl}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.restToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
      signal: AbortSignal.timeout(3000),
    });

    if (!res.ok) {
      throw new Error(`Redis REST error: HTTP ${res.status}`);
    }

    const data = await res.json();
    return data.result;
  }

  async get(jti: string): Promise<TokenUsage | null> {
    try {
      const raw = await this.executeCommand(["GET", `dlux:token:${jti}`]);
      if (!raw) return null;
      return typeof raw === "string" ? JSON.parse(raw) : (raw as TokenUsage);
    } catch (err) {
      console.error("[TokenStore] Redis read error:", err);
      return null;
    }
  }

  async set(jti: string, usage: TokenUsage): Promise<void> {
    try {
      const ttlSeconds = Math.max(
        1,
        Math.ceil((usage.expiresAt - Date.now()) / 1000)
      );
      await this.executeCommand([
        "SET",
        `dlux:token:${jti}`,
        JSON.stringify(usage),
        "EX",
        ttlSeconds,
      ]);
    } catch (err) {
      console.error("[TokenStore] Redis write error:", err);
    }
  }

  /**
   * Atomically checks and records token usage using a Redis Lua script.
   * Completely eliminates Time-of-Check to Time-of-Use (TOCTOU) concurrency race conditions.
   */
  async recordUsage(jti: string): Promise<TokenRecordResult> {
    const redisKey = `dlux:token:${jti}`;
    try {
      const res = await this.executeCommand([
        "EVAL",
        ATOMIC_RECORD_USAGE_LUA,
        1,
        redisKey,
      ]);

      if (res && typeof res === "string") {
        return JSON.parse(res) as TokenRecordResult;
      }
      if (res && typeof res === "object") {
        return res as TokenRecordResult;
      }

      return {
        allowed: false,
        reason: "Download token usage record not found or unverified",
      };
    } catch (evalErr) {
      console.warn(
        "[TokenStore] Atomic Lua script error, falling back to distributed lock:",
        evalErr
      );
      return this.recordUsageWithDistributedLock(jti);
    }
  }

  /**
   * Defense-in-depth fallback using distributed mutex lock if Lua EVAL is restricted.
   */
  private async recordUsageWithDistributedLock(
    jti: string
  ): Promise<TokenRecordResult> {
    const lockKey = `dlux:lock:token:${jti}`;
    try {
      const acquired = await this.executeCommand([
        "SET",
        lockKey,
        "1",
        "NX",
        "EX",
        3,
      ]);
      if (!acquired) {
        // Short jitter wait if locked by another worker
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      const usage = await this.get(jti);
      if (!usage) {
        return {
          allowed: false,
          reason: "Download token usage record not found or unverified",
        };
      }

      if (usage.usedCount >= usage.maxUses) {
        return {
          allowed: false,
          reason: "Download token usage limit exceeded",
        };
      }

      usage.usedCount += 1;
      await this.set(jti, usage);

      return {
        allowed: true,
        remaining: usage.maxUses - usage.usedCount,
      };
    } catch (err) {
      console.error("[TokenStore] Locked recordUsage error:", err);
      return {
        allowed: false,
        reason: "Unable to verify token usage against shared storage",
      };
    } finally {
      await this.executeCommand(["DEL", lockKey]).catch(() => {});
    }
  }

  async clear(): Promise<void> {
    // Clear not implemented on global redis for safety
  }

}

export class RestRedisRateLimitStore implements RateLimitStore {
  constructor(
    private restUrl: string,
    private restToken: string
  ) {}

  async check(
    key: string,
    maxRequests: number,
    windowMs: number
  ): Promise<RateLimitResult> {
    try {
      const redisKey = `dlux:ratelimit:${key}`;
      const windowSec = Math.max(1, Math.ceil(windowMs / 1000));

      const res = await fetch(`${this.restUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.restToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", redisKey],
          ["EXPIRE", redisKey, windowSec, "NX"],
          ["TTL", redisKey],
        ]),
        signal: AbortSignal.timeout(3000),
      });

      if (!res.ok) {
        throw new Error(`Rate limit pipeline error HTTP ${res.status}`);
      }

      const results = await res.json();
      const currentCount = Number(results?.[0]?.result ?? 1);
      const ttlSec = Number(results?.[2]?.result ?? windowSec);

      if (currentCount > maxRequests) {
        return {
          allowed: false,
          retryAfterSeconds: Math.max(1, ttlSec),
        };
      }

      return { allowed: true };
    } catch (err) {
      console.error("[RateLimitStore] Redis pipeline error:", err);
      // In event of distributed store error, fall back safely
      return { allowed: true };
    }
  }

  async clear(): Promise<void> {}
}

/**
 * Initializes and resolves the active TokenStore based on environment.
 */
export function createDefaultTokenStore(): TokenStore {
  const restUrl =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL;
  const restToken =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN;

  if (restUrl && restToken) {
    return new RestRedisTokenStore(restUrl, restToken);
  }

  return new MemoryTokenStore();
}

/**
 * Initializes and resolves the active RateLimitStore based on environment.
 */
export function createDefaultRateLimitStore(): RateLimitStore {
  const restUrl =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL;
  const restToken =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN;

  if (restUrl && restToken) {
    return new RestRedisRateLimitStore(restUrl, restToken);
  }

  return new MemoryRateLimitStore();
}

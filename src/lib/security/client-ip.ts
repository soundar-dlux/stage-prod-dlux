/**
 * Client IP address extraction and validation utility.
 *
 * Prevents IP spoofing in rate limiting and security logs by:
 * 1. Preferring verified edge proxy headers (x-vercel-ip, cf-connecting-ip).
 * 2. Only trusting x-forwarded-for when deployed behind a configured reverse proxy (TRUST_PROXY=true).
 * 3. Reading the right-most trusted hop in x-forwarded-for to prevent client-injected leftmost spoofing.
 * 4. Detecting and preventing direct-access bypass of reverse proxies (TRUSTED_PROXY_SECRET).
 * 5. Validating strict IPv4 and IPv6 formats to prevent header injection.
 */

// Strict IPv4 regex (0.0.0.0 to 255.255.255.255)
const IPV4_REGEX =
  /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

// Strict IPv6 regex supporting compressed and standard representations
const IPV6_REGEX =
  /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,7}:$|^:(?::[0-9a-fA-F]{1,4}){1,7}$|^(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:)(?::[0-9a-fA-F]{1,4}){1,6}$|^::$|^((?:[0-9a-fA-F]{1,4}:){1,4}|:):((?:[0-9a-fA-F]{1,4}:){1,4}|:)$/;

/**
 * Validates whether a candidate string is a strictly formatted IPv4 or IPv6 address.
 */
export function isValidIpAddress(ip?: string | null): boolean {
  if (!ip || typeof ip !== "string") return false;
  const trimmed = ip.trim();
  if (trimmed.length > 45) return false; // Max IPv6 length
  return IPV4_REGEX.test(trimmed) || IPV6_REGEX.test(trimmed);
}

export interface ClientIpOptions {
  /**
   * Explicitly enables or disables trust in reverse proxy headers (x-forwarded-for, x-real-ip).
   * In production, defaults to false unless process.env.TRUST_PROXY === "true".
   */
  trustProxy?: boolean;

  /**
   * Number of trusted reverse proxy hops from the right in X-Forwarded-For.
   * Default: 1 (the client IP appended by the reverse proxy directly in front of this server).
   */
  trustedProxyHops?: number;

  /**
   * Expected secret header from trusted reverse proxy to prevent direct origin bypass.
   * Defaults to process.env.TRUSTED_PROXY_SECRET.
   */
  proxySecret?: string;

  /**
   * Legacy backward-compatibility flag.
   */
  trustForwardedFor?: boolean;
}

/**
 * Checks whether an incoming request directly bypassed the configured reverse proxy.
 */
export function isDirectProxyBypass(
  req: Request,
  expectedSecret?: string
): boolean {
  const secret = expectedSecret || process.env.TRUSTED_PROXY_SECRET;
  if (!secret || secret.trim().length === 0) {
    return false; // No proxy secret enforcement configured
  }

  const receivedSecret =
    req.headers.get("x-proxy-secret") || req.headers.get("x-origin-verify");

  return receivedSecret !== secret;
}

/**
 * Extracts a verified client IP address from request headers.
 *
 * Security Rules:
 * 1. If direct origin access is attempted while TRUSTED_PROXY_SECRET is active, flags bypass.
 * 2. Platform-verified headers (x-vercel-ip, cf-connecting-ip) are always trusted.
 * 3. x-forwarded-for and x-real-ip are ONLY trusted if trustProxy is explicitly true,
 *    TRUST_PROXY="true" in environment, or running in local test mode.
 * 4. When x-forwarded-for is trusted, takes the right-most hop (appended by the proxy),
 *    preventing attackers from prepending fake IPs to evade rate limits.
 */
export function getTrustedClientIp(
  req: Request,
  options?: ClientIpOptions
): string {
  // 1. Check for direct reverse proxy bypass
  if (isDirectProxyBypass(req, options?.proxySecret)) {
    return "untrusted-proxy-bypass";
  }

  const headers = req.headers;

  // 2. Edge-verified provider headers (guaranteed and stripped of client spoofing by CDN edge)
  const vercelIp = headers.get("x-vercel-ip")?.trim();
  if (isValidIpAddress(vercelIp)) {
    return vercelIp!;
  }

  const cfIp = headers.get("cf-connecting-ip")?.trim();
  if (isValidIpAddress(cfIp)) {
    return cfIp!;
  }

  // 3. Determine if downstream reverse proxy is trusted
  // In production, x-forwarded-for is ONLY trusted if explicitly configured (trustProxy or TRUST_PROXY="true").
  // Direct connections without trusted edge headers or proxy config fail-closed to "untrusted-client".
  const isProxyTrusted =
    options?.trustProxy ??
    options?.trustForwardedFor ??
    (process.env.TRUST_PROXY === "true" ||
      (process.env.NODE_ENV !== "production" &&
        process.env.TRUST_PROXY !== "false"));

  if (!isProxyTrusted) {
    // When no verified edge headers and proxy is not explicitly trusted, do not trust forwarded headers
    return "untrusted-client";
  }

  // 4. Trusted Reverse Proxy: Check x-real-ip
  const realIp = headers.get("x-real-ip")?.trim();
  if (isValidIpAddress(realIp)) {
    return realIp!;
  }

  // 5. Trusted Reverse Proxy: Parse x-forwarded-for chain safely
  if (options?.trustForwardedFor !== false) {
    const forwardedFor = headers.get("x-forwarded-for");
    if (forwardedFor && typeof forwardedFor === "string") {
      const rawIps = forwardedFor.split(",");
      const validIps: string[] = [];

      for (const rawIp of rawIps) {
        const trimmed = rawIp.trim();
        if (isValidIpAddress(trimmed)) {
          validIps.push(trimmed);
        }
      }

      if (validIps.length > 0) {
        // Reverse proxies append client IP to the chain.
        // Reading from the right by trustedProxyHops ensures we get the IP recorded by our proxy,
        // rather than an attacker-supplied leftmost value.
        const hops = Math.max(1, options?.trustedProxyHops ?? 1);
        const trustedIndex = Math.max(0, validIps.length - hops);
        return validIps[trustedIndex];
      }
    }
  }

  return "unknown-client";
}

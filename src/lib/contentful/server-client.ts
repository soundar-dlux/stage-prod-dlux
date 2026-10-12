import "server-only";

export interface ContentfulGraphQLOptions {
  variables?: Record<string, unknown>;
  revalidate?: number;
  tags?: string[];
}

export interface ContentfulConfig {
  isConfigured: boolean;
  spaceId: string;
  accessToken: string;
  environment: string;
  endpoint: string;
}

/**
 * Returns Contentful configuration from environment variables.
 * Ensures credentials remain exclusively on the server.
 */
export function getContentfulConfig(): ContentfulConfig {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  const environment = process.env.CONTENTFUL_ENVIRONMENT || "production";

  if (!spaceId || !accessToken) {
    return {
      isConfigured: false,
      spaceId: spaceId || "",
      accessToken: accessToken || "",
      environment,
      endpoint: "",
    };
  }

  return {
    isConfigured: true,
    spaceId,
    accessToken,
    environment,
    endpoint: `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environment}`,
  };
}

/**
 * Server-only GraphQL fetcher for Contentful.
 *
 * Guarantees:
 * - Credentials never leak to client bundles.
 * - Graceful degradation on missing configuration or upstream network errors.
 * - Revalidation caching (ISR / Next.js cache) instead of uncacheable client fetches.
 */
export async function fetchContentfulGraphQL<T = any>(
  query: string,
  options?: ContentfulGraphQLOptions
): Promise<T | null> {
  const config = getContentfulConfig();

  if (!config.isConfigured) {
    console.warn(
      "[Contentful Server Client] Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN in environment variables."
    );
    return null;
  }

  try {
    const res = await fetch(config.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.accessToken}`,
      },
      body: JSON.stringify({
        query,
        variables: options?.variables,
      }),
      next: {
        revalidate: options?.revalidate ?? 60,
        tags: options?.tags,
      },
    });

    if (!res.ok) {
      console.error(
        `[Contentful Server Client] Upstream HTTP error ${res.status} ${res.statusText}`
      );
      return null;
    }

    const json = await res.json();

    if (json.errors && json.errors.length > 0) {
      console.error(
        "[Contentful Server Client] GraphQL errors:",
        JSON.stringify(json.errors)
      );
      return json.data ?? null;
    }

    return (json.data as T) ?? null;
  } catch (error) {
    console.error("[Contentful Server Client] Network or fetch error:", error);
    return null;
  }
}

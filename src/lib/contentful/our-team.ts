import { OUR_TEAM_QUERY } from "@/src/app/about/our-team/queries";
import { OurTeamQueryResponse } from "@/src/app/about/our-team/types";

const CONTENTFUL_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/production`;

export async function fetchOurTeamData(): Promise<OurTeamQueryResponse> {
  // 🔍 Debug logs (safe on server)
  console.log("🔑 CONTENTFUL_SPACE_ID:", process.env.CONTENTFUL_SPACE_ID);
  console.log(
    "🔑 CONTENTFUL_ACCESS_TOKEN:",
    process.env.CONTENTFUL_ACCESS_TOKEN ? "✅ FOUND" : "❌ MISSING"
  );

  // ❌ Graceful fallback instead of crash
  if (!process.env.CONTENTFUL_ACCESS_TOKEN) {
    console.error("❌ Contentful access token is missing");

    return {
      primaryBanner: null,
      secondaryBanner: null,
      heroBanner: null,
      lifeAtDlux: null,
    };
  }

  const res = await fetch(CONTENTFUL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query: OUR_TEAM_QUERY }),
    cache: "no-store", // important for debugging
  });

  const json = await res.json();

  if (!res.ok) {
    console.error("❌ Contentful Fetch Error:", {
      status: res.status,
      response: json,
    });

    throw new Error("Failed to fetch Contentful data");
  }

  if (json.errors) {
    console.error("❌ Contentful GraphQL Errors:", json.errors);
    throw new Error("Contentful GraphQL error");
  }

  return json.data;
}

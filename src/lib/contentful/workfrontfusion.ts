// fetchWorkfrontFusion.ts
import { WORKFRONT_FUSION_QUERY } from "@/src/app/platform/adobe/workfront-fusion/queries";
import { FusionResponse } from "@/src/app/platform/adobe/workfront-fusion/types";

export async function fetchWorkfrontFusion(): Promise<FusionResponse | null> {
  try {
    const res = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/production`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ query: WORKFRONT_FUSION_QUERY }),
        next: { revalidate: 60 },
      }
    );

    const json = await res.json();
    return json.data ?? null;
  } catch (error) {
    console.error("Contentful fetch error:", error);
    return null;
  }
}
 
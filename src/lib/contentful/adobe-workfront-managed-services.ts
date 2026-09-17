import { ADOBE_WORKFRONT_QUERY } from "@/src/app/services/adobe-managed-services/queries";
import { AdobeWorkfrontPageData } from "@/src/app/services/adobe-managed-services/types";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;

export async function fetchAdobeWorkfrontManagedServices(): Promise<AdobeWorkfrontPageData> {
  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/production`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query: ADOBE_WORKFRONT_QUERY }),
      next: { revalidate: 60 },
    }
  );

  const { data, errors } = await res.json();

  if (errors) {
    console.error(errors);
    throw new Error("Contentful fetch failed");
  }

  return {
    ourClients: [data.ourClients],
    dluxClientReview: [data.dluxClientReview],
    client2: [data.client2],
    client3: [data.client3],
    client4: [data.client4],
    girl_banner: [data.girl_banner],
  };
}

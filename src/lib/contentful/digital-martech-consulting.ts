import { DIGITAL_MARTECH_QUERY } from "@/src/app/services/digital-&-martech-consulting/queries";
import { DigitalMartechPageData } from "@/src/app/services/digital-&-martech-consulting/types";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;

export async function fetchDigitalMartechPage(): Promise<DigitalMartechPageData> {
  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/production`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query: DIGITAL_MARTECH_QUERY }),
      next: { revalidate: 60 },
    }
  );

  const { data, errors } = await res.json();

  if (errors) {
    console.error(errors);
    throw new Error("Contentful fetch failed");
  }

  return data;
}

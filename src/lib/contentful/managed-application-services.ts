import { MANAGED_APPLICATION_SERVICES_QUERY } from "@/src/app/services/managed-application-services/queries";
import { ManagedApplicationServicesPageData } from "@/src/app/services/managed-application-services/types";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;

export async function fetchManagedApplicationServices(): Promise<ManagedApplicationServicesPageData> {
  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/production`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query: MANAGED_APPLICATION_SERVICES_QUERY,
      }),
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

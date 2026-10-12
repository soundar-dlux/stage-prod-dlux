import "server-only";
import { CLIENTS_QUERY } from "@/src/components/ui/ClientLogo/query";
import { ClientsData, ClientsResponse } from "@/src/components/ui/ClientLogo/types";

/* ===========================
   ENV VARIABLES
=========================== */
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || "production";

/* ===========================
   FETCH CLIENTS
=========================== */
export async function fetchClients(): Promise<ClientsData | null> {
  try {
    if (!SPACE_ID || !ACCESS_TOKEN) {
      console.warn("[ClientsLogo] Contentful credentials missing in environment variables.");
      return null;
    }

    const res = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ query: CLIENTS_QUERY }),
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error(`Contentful API Error: ${res.status}`);
    }

    const json: ClientsResponse = await res.json();

    return json?.data?.ourClients ?? null;
  } catch (error) {
    console.error("Contentful Clients Fetch Error:", error);
    return null;
  }
}

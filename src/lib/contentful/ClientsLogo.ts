// lib/contentful/clients.api.ts

import { CLIENTS_QUERY } from "@/src/components/ui/ClientLogo/query";
import { ClientsData, ClientsResponse } from "@/src/components/ui/ClientLogo/types";

/* ===========================
   ENV VARIABLES
=========================== */
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;
const ENVIRONMENT = "production"; // change if needed

/* ===========================
   FETCH CLIENTS
=========================== */
export async function fetchClients(): Promise<ClientsData | null> {
  try {
    const res = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ query: CLIENTS_QUERY }),
        cache: "no-store", // or use "force-cache" / revalidate if needed
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

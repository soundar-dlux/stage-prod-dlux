import "server-only";
import { CLIENTS_QUERY } from "@/src/components/ui/ClientLogo/query";
import { ClientsData } from "@/src/components/ui/ClientLogo/types";
import { fetchContentfulGraphQL } from "./server-client";

interface ClientsQueryResult {
  ourClients?: ClientsData;
}

/* ===========================
   FETCH CLIENTS
=========================== */
export async function fetchClients(): Promise<ClientsData | null> {
  const data = await fetchContentfulGraphQL<ClientsQueryResult>(CLIENTS_QUERY);
  return data?.ourClients ?? null;
}

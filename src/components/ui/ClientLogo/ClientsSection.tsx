import { fetchClients } from "@/src/lib/contentful/ClientsLogo";
import ClientsMarquee from "./ClientsMarquee";

export default async function ClientsSection() {
  const clients = await fetchClients();

  if (!clients) return null;

  return <ClientsMarquee clients={clients} />;
}

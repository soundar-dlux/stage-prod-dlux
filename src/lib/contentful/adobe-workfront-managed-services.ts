import "server-only";
import { ADOBE_WORKFRONT_QUERY } from "@/src/app/services/adobe-managed-services/queries";
import { AdobeWorkfrontPageData } from "@/src/app/services/adobe-managed-services/types";
import { fetchContentfulGraphQL } from "./server-client";

export async function fetchAdobeWorkfrontManagedServices(): Promise<AdobeWorkfrontPageData | null> {
  const data = await fetchContentfulGraphQL<any>(ADOBE_WORKFRONT_QUERY, {
    revalidate: 60,
  });

  if (!data) return null;

  return {
    ourClients: [data.ourClients],
    dluxClientReview: [data.dluxClientReview],
    client2: [data.client2],
    client3: [data.client3],
    client4: [data.client4],
    girl_banner: [data.girl_banner],
  };
}

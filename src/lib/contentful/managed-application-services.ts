import "server-only";
import { MANAGED_APPLICATION_SERVICES_QUERY } from "@/src/app/services/managed-application-services/queries";
import { ManagedApplicationServicesPageData } from "@/src/app/services/managed-application-services/types";
import { fetchContentfulGraphQL } from "./server-client";

export async function fetchManagedApplicationServices(): Promise<ManagedApplicationServicesPageData | null> {
  return fetchContentfulGraphQL<ManagedApplicationServicesPageData>(
    MANAGED_APPLICATION_SERVICES_QUERY,
    { revalidate: 60 }
  );
}

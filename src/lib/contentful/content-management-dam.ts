import "server-only";
import { CONTENT_MANAGEMENT_DAM_QUERY } from "@/src/app/services/content-management-&-dam/queries";
import { fetchContentfulGraphQL } from "./server-client";

export async function getContentManagementDAM() {
  return fetchContentfulGraphQL(CONTENT_MANAGEMENT_DAM_QUERY, {
    revalidate: 60,
  });
}

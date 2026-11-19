import "server-only";
import { DIGITAL_MARTECH_QUERY } from "@/src/app/services/digital-&-martech-consulting/queries";
import { DigitalMartechPageData } from "@/src/app/services/digital-&-martech-consulting/types";
import { fetchContentfulGraphQL } from "./server-client";

export async function fetchDigitalMartechPage(): Promise<DigitalMartechPageData | null> {
  return fetchContentfulGraphQL<DigitalMartechPageData>(
    DIGITAL_MARTECH_QUERY,
    { revalidate: 60 }
  );
}

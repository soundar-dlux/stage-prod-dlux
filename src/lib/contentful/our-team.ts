import "server-only";
import { OUR_TEAM_QUERY } from "@/src/app/about/our-team/queries";
import { OurTeamQueryResponse } from "@/src/app/about/our-team/types";
import { fetchContentfulGraphQL } from "./server-client";

export async function fetchOurTeamData(): Promise<OurTeamQueryResponse> {
  const data = await fetchContentfulGraphQL<OurTeamQueryResponse>(
    OUR_TEAM_QUERY,
    { revalidate: 60 }
  );

  return (
    data ?? {
      primaryBanner: null,
      secondaryBanner: null,
      heroBanner: null,
      lifeAtDlux: null,
    }
  );
}

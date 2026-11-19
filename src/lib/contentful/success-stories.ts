import "server-only";
import { fetchContentfulGraphQL } from "@/src/lib/contentful/server-client";
import {
  SUCCESS_STORIES_QUERY,
  SUCCESS_STORY_BY_SLUG_QUERY,
} from "@/src/app/resources/success-stories/query";
import {
  SuccessStoriesData,
  CaseStudy,
} from "@/src/app/resources/success-stories/types";

export async function fetchSuccessStories(): Promise<SuccessStoriesData> {
  const data = await fetchContentfulGraphQL<{
    caseStudyCollection?: { items?: CaseStudy[] };
  }>(SUCCESS_STORIES_QUERY, { revalidate: 60 });

  return {
    caseStudies: data?.caseStudyCollection?.items ?? [],
  };
}

export async function fetchSuccessStoryBySlug(
  slug: string
): Promise<CaseStudy | null> {
  const data = await fetchContentfulGraphQL<{
    caseStudyCollection?: { items?: CaseStudy[] };
  }>(SUCCESS_STORY_BY_SLUG_QUERY, {
    variables: { slug },
    revalidate: 60,
  });

  return data?.caseStudyCollection?.items?.[0] ?? null;
}

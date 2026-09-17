import {
  SUCCESS_STORIES_QUERY,
  SUCCESS_STORY_BY_SLUG_QUERY,
} from "@/src/app/resources/success-stories/query";
import {
  SuccessStoriesData,
  CaseStudy,
} from "@/src/app/resources/success-stories/types";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;

const ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/production`;

async function fetchGraphQL(query: string, variables?: object) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  const { data, errors } = await res.json();

  if (errors) {
    console.error(errors);
    throw new Error("Contentful fetch error");
  }

  return data;
}

export async function fetchSuccessStories(): Promise<SuccessStoriesData> {
  const data = await fetchGraphQL(SUCCESS_STORIES_QUERY);

  return {
    caseStudies: data?.caseStudyCollection?.items ?? [],
  };
}

export async function fetchSuccessStoryBySlug(
  slug: string
): Promise<CaseStudy | null> {
  const data = await fetchGraphQL(SUCCESS_STORY_BY_SLUG_QUERY, { slug });

  return data?.caseStudyCollection?.items?.[0] ?? null;
}

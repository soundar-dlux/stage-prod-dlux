import { fetchSuccessStoryBySlug, fetchSuccessStories } from "@/src/lib/contentful/success-stories";
import { notFound } from "next/navigation";
import StoryDetailClient from "./StoryDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function SuccessStoryDetail({ params }: Props) {
  const { slug } = await params;

  const story = await fetchSuccessStoryBySlug(slug);
  if (!story) return notFound();

  const allStories = await fetchSuccessStories();
  const relatedStories = allStories.caseStudies
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  return (
    <StoryDetailClient
      story={story}
      relatedStories={relatedStories}
    />
  );
}

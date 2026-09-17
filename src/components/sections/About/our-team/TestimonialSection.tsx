"use client";

import { TestimonialImage } from "@/src/app/about/our-team/types";
import GalleryCarousel from "@/src/components/ui/Carousel/GalleryCarousel";

interface TestimonialSectionProps {
  testimonialImagesCollection: TestimonialImage[];
}

export default function TestimonialSection({
  testimonialImagesCollection,
}: TestimonialSectionProps) {
  if (!testimonialImagesCollection?.length) return null;

  return (
    <GalleryCarousel
      items={testimonialImagesCollection.map((item) => ({
        url: item.url,
        title: item.title,
      }))}
      showHeading
      heading="Gatherings"
      subHeading="More than just event"
      description="Our gallery captures the moments that sparked and strengthened friendship. From laughter-filled brainstorming sessions to late-night conversations, each moment has shaped our journey together."
      autoPlay
      interval={8000}
    />
  );
}
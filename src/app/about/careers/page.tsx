import type { Metadata } from "next";
import BuildCareerSection from "@/src/components/sections/About/careers/BuildCareerSection";
import GallerySection from "@/src/components/sections/About/careers/GallerySection";
import HeroSection from "@/src/components/sections/About/careers/HeroSection";
import InternshipSection from "@/src/components/sections/About/careers/InternshipSection";
import OurCultureSection from "@/src/components/sections/About/careers/OurCultureSection";
import EmployeeSpeaksSection from "@/src/components/sections/About/careers/EmployeeSpeaksInfinite";
import { fetchCareersGallery } from "@/src/lib/contentful/careers-gallery";
import { fetchContentfulGraphQL } from "@/src/lib/contentful/server-client";

export const metadata: Metadata = {
  title: "Careers | Digital Consulting Services | DLUX",
  description:
    "Build your future with DLUX. Join a team delivering innovative digital consulting solutions, driving transformation, and creating impact across industries.",
};

interface Testimonial {
  name: string;
  position: string;
  testimonials: string;
  avatar?: {
    url: string;
  };
}

async function getTestimonials(): Promise<Testimonial[]> {
  const data = await fetchContentfulGraphQL<{
    resourceTestimonialsCollection?: { items?: Testimonial[] };
  }>(
    `
      query {
        resourceTestimonialsCollection {
          items {
            name
            position
            testimonials
            avatar { url }
          }
        }
      }
    `,
    { revalidate: 60 }
  );

  return data?.resourceTestimonialsCollection?.items ?? [];
}

export default async function Careers() {
  const [galleryImages, testimonials] = await Promise.all([
    fetchCareersGallery(),
    getTestimonials(),
  ]);

  return (
    <main className="w-full bg-black">
      <HeroSection />
      <BuildCareerSection />
      <InternshipSection />
      <OurCultureSection />
      <GallerySection initialImages={galleryImages} />
      <EmployeeSpeaksSection />
    </main>
  );
}
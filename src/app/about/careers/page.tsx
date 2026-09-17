import type { Metadata } from "next";
import BuildCareerSection from "@/src/components/sections/About/careers/BuildCareerSection";
import GallerySection from "@/src/components/sections/About/careers/GallerySection";
import HeroSection from "@/src/components/sections/About/careers/HeroSection";
import InternshipSection from "@/src/components/sections/About/careers/InternshipSection";
import OurCultureSection from "@/src/components/sections/About/careers/OurCultureSection";
import EmployeeSpeaksSection from "@/src/components/sections/About/careers/EmployeeSpeaksInfinite";

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
  try {
    const res = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/production`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          query: `
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
        }),
        cache: "no-store",
      }
    );

    const json = await res.json();

    return json?.data?.resourceTestimonialsCollection?.items ?? [];
  } catch (error) {
    console.error("Testimonial fetch error:", error);
    return [];
  }
}

export default async function Careers() {
  const testimonials = await getTestimonials();

  return (
    <main className="w-full bg-black">
      <HeroSection />
      <BuildCareerSection />
      <InternshipSection />
      <OurCultureSection />
      <GallerySection />
      <EmployeeSpeaksSection />
    </main>
  );
}
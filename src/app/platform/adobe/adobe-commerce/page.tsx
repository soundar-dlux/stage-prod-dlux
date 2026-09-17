"use client";

import Banner from "@/src/components/sections/platform/adobe/adobe-commerce/Banner";
import CoeVideos from "@/src/components/sections/platform/adobe/adobe-commerce/CoeVideos";
import ImageLeftSection from "@/src/components/sections/platform/adobe/adobe-commerce/ImageLeftSection";
import FeatureSection from "@/src/components/sections/platform/adobe/adobe-commerce/FeatureSection";
import AdobeServiceCards from "@/src/components/sections/platform/adobe/adobe-commerce/AdobeServiceCards";
import CaseStudySection from "@/src/components/sections/platform/adobe/adobe-commerce/CaseStudySection";
import Testimonials from "@/src/components/sections/platform/adobe/adobe-commerce/Testimonials";

export default function AdobeWorkfrontPage() {

  return (
    <main className="overflow-hidden">
      <Banner />
      <CoeVideos />
      <ImageLeftSection />
      <FeatureSection />
      <AdobeServiceCards />
      <CaseStudySection />
      <Testimonials />


    </main>
  );
}
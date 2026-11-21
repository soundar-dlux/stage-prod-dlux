import BynderServicesSection from "@/src/components/sections/platform/bynder/BynderServicesSection";
import HeroBanner from "@/src/components/sections/platform/bynder/HeroSection";
import ImpactSection from "@/src/components/sections/platform/bynder/ImpactSection";
import IntegrationOptionsSection from "@/src/components/sections/platform/bynder/IntegrationOptionsSection";
import VideoLibrarySection from "@/src/components/sections/platform/bynder/VideoLibrarySection";
import WhatYouGainSection from "@/src/components/sections/platform/bynder/WhatYouGainSection";
import ImageLRComponenets from "@/src/components/WB-Component/ImageLR";
import ConsultationCTA from "@/src/components/WB-Component/Section/ConsultationCTA";
import FAQSection from "@/src/components/WB-Component/Section/FAQ";

export default function Bynder() {
  return (
    <>
      <HeroBanner />
      <ImageLRComponenets
        imagePosition="left"
        title="Bynder Overview "
        highlightText="Bynder"
        highlightColor="text-brand-primary"
        description={[
          "DAM programs rarely struggle because of the platform itself. They struggle when metadata is designed in isolation, when local markets aren't consulted, or when adoption is treated as an afterthought once the system goes live. Our approach is built around avoiding those three problems from the start.",
          "Bynder is a cloud-based digital asset management platform that brings images, video, documents and campaign material into one place, so approved assets are easier to find and can be delivered consistently across markets and channels.",
          "DLUX tailors Bynder to the way organizations across APAC and beyond actually operate, from the structure of their brand to the realities of their local markets."
        ]}
        imageSrc="https://images.ctfassets.net/pj0maraabon4/2Dwq6QG200xVyBGHr4CAok/47e8958fc42a68f539b3c81bf45b0eef/Group_2264.svg"
        imageAlt="Bynder Overview Dashboard Showcase"
        showSectionBottomLine
  showTopLine={false}
        bgVariant="white"
      />
      <WhatYouGainSection />
      <BynderServicesSection />
      <IntegrationOptionsSection />
      <VideoLibrarySection />
      <ImageLRComponenets
        imagePosition="left"
        title="Why DLUX"
        highlightText="DLUX"
        highlightColor="text-brand-primary"
        description={[
          "Choosing the right implementation partner matters as much as choosing the platform. Our work across APAC means we understand how global brand standards need to flex for local markets, languages and regulations, and we design the DAM to handle both. Combined with a structured method and integration planning from day one, that gives your Bynder program a foundation built around how your teams actually work. "
        ]}
        imageSrc="https://images.ctfassets.net/pj0maraabon4/55IyGhJ5cpkpDCpAXGyBvX/b214819a66393790aadc2f417b46d039/Dlux_why_1.svg"
        imageAlt="Bynder Overview Dashboard Showcase"
        showSectionBottomLine

        bgVariant="white"
      />
      <ConsultationCTA />
      <FAQSection />
    </>
  );
}
import BynderOverview from "@/src/components/sections/platform/bynder/BynderOverview";
import BynderServicesSection from "@/src/components/sections/platform/bynder/BynderServicesSection";
import HeroBanner from "@/src/components/sections/platform/bynder/HeroSection";
import IntegrationOptionsSection from "@/src/components/sections/platform/bynder/IntegrationOptionsSection";
import VideoLibrarySection from "@/src/components/sections/platform/bynder/VideoLibrarySection";
import WhatYouGainSection from "@/src/components/sections/platform/bynder/WhatYouGainSection";
import WhyDlux from "@/src/components/sections/platform/bynder/WhyDlux";
import ConsultationCTA from "@/src/components/WB-Component/Section/ConsultationCTA";
import FAQSection from "@/src/components/WB-Component/Section/FAQ";

export default function Bynder() {
  return (
    <main className="min-h-screen bg-white">

      <HeroBanner />
      <BynderOverview />
      <WhatYouGainSection />
      <BynderServicesSection />
      <IntegrationOptionsSection />
      <WhyDlux />
      <VideoLibrarySection />
      <ConsultationCTA />
      <FAQSection />
    </main>
  );
}
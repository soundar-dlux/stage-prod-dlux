import type { Metadata } from "next";

import AiSplitSection from "@/src/components/sections/services/innovation-agentic-ai/AiSplitSection";
import Banner from "@/src/components/sections/services/innovation-agentic-ai/Banner";
import ContactSplitSection from "@/src/components/sections/services/innovation-agentic-ai/ContactSplitSection";
import CtaSection from "@/src/components/sections/services/innovation-agentic-ai/CtaSection";
import DeliverablesSection from "@/src/components/sections/services/innovation-agentic-ai/DeliverablesSection";
import FeatureCardsSection from "@/src/components/sections/services/innovation-agentic-ai/FeatureCardsSection";
import PromoSection from "@/src/components/sections/services/innovation-agentic-ai/PromoSection";
import WhatIsSection from "@/src/components/sections/services/innovation-agentic-ai/WhatIsSection";
import CinematicSlider from "@/src/components/sections/services/innovation-agentic-ai/CinematicSlider";
import ClientsSection from "@/src/components/ui/ClientLogo/ClientsSection";
import Partner from "@/src/components/sections/About/partner/Partners";

export const metadata: Metadata = {
  title: "Innovation + Agentic AI Development | Your Company Name",
  description:
    "Transform your business with Innovation and Agentic AI Development. We design intelligent AI agents, automation systems, and next-generation digital solutions tailored to your needs.",
};

export default function InnovationAgenticAi() {
  return (
    <main className="overflow-hidden">
      <Banner />
      <CinematicSlider />
      {/* <PromoSection /> */}
      <WhatIsSection />
      <ClientsSection /> 
      <Partner />
      {/* <ContactSplitSection /> */}
      <FeatureCardsSection />
      {/* <AiSplitSection /> */}
      {/* <DeliverablesSection /> */}
      {/* <CtaSection /> */}
    </main>
  );
}

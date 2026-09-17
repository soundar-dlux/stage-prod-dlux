import ConsultingApproachSection from "@/src/components/sections/platform/aprimo/ConsultingApproachSection";
import ExpertiseSection from "@/src/components/sections/platform/aprimo/ExpertiseSection";
import FeaturesSection from "@/src/components/sections/platform/aprimo/FeaturesSection";
import HeroSection from "@/src/components/sections/platform/aprimo/HeroSection";
import IntroSection from "@/src/components/sections/platform/aprimo/IntroSection";
import PartnershipSection from "@/src/components/sections/platform/aprimo/PartnershipSection";
import ValueOfDAMSection from "@/src/components/sections/platform/aprimo/ValueOfDAMSection";

export const metadata = {
  title: "Aprimo Consulting Services | DAM Software | DLUX",
  description:
    "DLUX offers expert Aprimo consulting services to optimize DAM and marketing operations.",
};

export default function AprimoPage() {
  return (
    <main className="overflow-hidden">

      <HeroSection />
      <IntroSection />
      <FeaturesSection />
      <ValueOfDAMSection />
      <PartnershipSection />
      <ExpertiseSection />
      <ConsultingApproachSection />
    </main>
  );
}
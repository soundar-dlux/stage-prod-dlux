import type { Metadata } from "next";
import DefiningAttributesSection from "@/src/components/sections/About/partner/DefiningAttributesSection";
import PartnerHero from "@/src/components/sections/About/partner/PartnerHero";
import Partner from "@/src/components/sections/About/partner/Partners";
import PartnerSection from "@/src/components/sections/About/partner/PartnerSection";

export const metadata: Metadata = {
  title: "Our Partners | Strategic Technology Alliances | DLUX",
  description:
    "Explore DLUX’s strategic partnerships with leading technology providers. Together, we deliver innovative, scalable, and future-ready digital solutions.",
};

export default function PartnersPage() {
  return (
    <main className="w-full bg-black">
      <PartnerHero />
      <PartnerSection />
      <Partner />
      <DefiningAttributesSection />
    </main>
  );
}
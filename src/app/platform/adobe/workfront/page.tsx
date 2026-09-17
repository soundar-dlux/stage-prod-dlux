import type { Metadata } from "next";
import AboutWorkfront from "@/src/components/sections/platform/adobe/workfront/AboutWorkfront";
import AdobeBadgesSection from "@/src/components/sections/platform/adobe/workfront/AdobeBadgesSection";
import HeroSection from "@/src/components/sections/platform/adobe/workfront/HeroSection";
import PartnershipSection from "@/src/components/sections/platform/adobe/workfront/PartnershipSection";
import StatsSection from "@/src/components/sections/platform/adobe/workfront/StatsSection";
import SuccessStory from "@/src/components/sections/platform/adobe/workfront/SuccessStory";
import WhyWorkfront from "@/src/components/sections/platform/adobe/workfront/WhyWorkfront";
import ContactForm from "@/src/components/ui/modal/contact-cta";

export const metadata: Metadata = {
  title: "Adobe Workfront Solutions | Marketing Workflow Management | DLUX",
  description:
    "Optimize marketing operations with Adobe Workfront solutions by DLUX. Enhance collaboration, streamline workflows, and gain real-time visibility across your enterprise.",
};

export default function AdobeWorkfrontPage() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <AboutWorkfront />
      <PartnershipSection />
      <StatsSection />
      <AdobeBadgesSection />
      <WhyWorkfront />
      <SuccessStory />
      <ContactForm />
    </main>
  );
}
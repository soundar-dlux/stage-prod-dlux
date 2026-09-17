import type { Metadata } from "next";
import GrowthHero from "@/src/components/sections/About/growth/GrowthHero";
import GrowthTimeline from "@/src/components/sections/About/growth/GrowthTimeline";
import ContactForm from "@/src/components/ui/modal/contact-cta";

export const metadata: Metadata = {
  title: "Our Growth Story | Adobe Partner | DLUX",
  description:
    "Discover DLUX’s growth journey as a trusted Adobe partner, driving innovation and excellence in Marketing Technology solutions.",
};

export default function OurGrowthStory() {
  return (
        <main className="w-full bg-black">

      <GrowthHero />
      <GrowthTimeline />
      <ContactForm />
    </main>
  );
}
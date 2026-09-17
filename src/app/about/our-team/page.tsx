import type { Metadata } from "next";
import BannerSection from "@/src/components/sections/About/our-team/BannerSection";
import BottomImageSection from "@/src/components/sections/About/our-team/BottomImageSection";
import LifeAtDluxSection from "@/src/components/sections/About/our-team/LifeAtDluxSection";
import SecondarySection from "@/src/components/sections/About/our-team/SecondarySection";
import ContactForm from "@/src/components/ui/modal/contact-cta";
import { fetchOurTeamData } from "@/src/lib/contentful/our-team";
import CEOMessage from "@/src/components/sections/About/our-team/HeroSection";

export const metadata: Metadata = {
  title: "Our Team | Digital Consulting Experts | DLUX",
  description:
    "Meet the talented team behind DLUX. Our experts drive innovation, collaboration, and digital transformation across industries.",
};

export default async function OurTeamPage() {
  const data = await fetchOurTeamData();

  const primaryBanner = data?.primaryBanner?.banner;
  const secondaryImage = data?.secondaryBanner?.secondaryImage;
  const heroImage = data?.heroBanner?.heroImage;
  const lifeAtDlux = data?.lifeAtDlux;

  if (!primaryBanner) {
    return (
      <main className="p-10 text-center">
        <h1 className="text-2xl font-bold">Our Team</h1>
        <p>Team data not available.</p>
      </main>
    );
  }

  return (
    <main className="overflow-hidden">
      <BannerSection banner={primaryBanner} />

      {secondaryImage && (
        <SecondarySection secondaryImage={secondaryImage} />
      )}

      {/* ✅ CEO SECTION FIXED */}
      <CEOMessage />

      {lifeAtDlux && (
        <LifeAtDluxSection lifeAtDlux={lifeAtDlux} />
      )}

      <ContactForm />
    </main>
  );
}
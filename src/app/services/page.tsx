"use client";

import HeroBanner from "@/src/components/sections/services/HeroBanner";
import ServiceGridSection from "@/src/components/sections/services/ServiceGridSection";
import WhyDluxSection from "@/src/components/sections/services/WhyDluxSection";
import WorkWithExperts from "@/src/components/sections/services/WorkWithExperts";
import ContactSection3D from "@/src/components/ui/modal/contact-cta";

export default function Services() {
  return (
    <>
    <HeroBanner />
    <ServiceGridSection/>
    <WhyDluxSection/>
    <WorkWithExperts/>
    <ContactSection3D/>
    </>
  );
}

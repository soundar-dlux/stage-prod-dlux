"use client";

import ContactSection from "@/src/components/sections/About/why-dlux/ContactSection";
import TeamSection from "@/src/components/sections/About/why-dlux/TeamSection";
import TrustSection from "@/src/components/sections/About/why-dlux/TrustSection";
import WhyDluxBanner from "@/src/components/sections/About/why-dlux/WhyDluxBanner";
import TrustSecuritySection from "@/src/components/sections/About/why-dlux/TrustSecuritySection";


export default function TrustPage() {
  return (
    <main className="overflow-hidden">
      <WhyDluxBanner />
      <TrustSection />
      <TrustSecuritySection />
      <TeamSection  />
      <ContactSection />
    </main>
  );
}
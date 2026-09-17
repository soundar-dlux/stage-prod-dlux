import type { Metadata } from "next";
import { Hero } from "@/src/components/sections/platform/adobe/adobe-analytics/Hero";
import { Overview } from "@/src/components/sections/platform/adobe/adobe-analytics/Overview";
import { WhyFail } from "@/src/components/sections/platform/adobe/adobe-analytics/WhyFail";
import { CoreOfferings } from "@/src/components/sections/platform/adobe/adobe-analytics/CoreOfferings";
import { CTASection } from "@/src/components/sections/platform/adobe/adobe-analytics/CTASection";
import { WhyChooseDlux } from "@/src/components/sections/platform/adobe/adobe-analytics/WhyChooseDlux";
import { FAQ } from "@/src/components/sections/platform/adobe/adobe-analytics/FAQ";
import { FinalCTA } from "@/src/components/sections/platform/adobe/adobe-analytics/FinalCTA";

export const metadata: Metadata = {
  title: "Adobe Analytics | Enterprise Digital Experience Analytics",
  description:
    "Unify customer data, measure digital marketing performance, and optimize journeys with AI-powered insights that drive smarter decisions on Adobe Analytics.",
  keywords: [
    "Marketing analytics",
    "Product analytics",
    "Enterprise analytics platform",
    "Customer segmentation",
    "Web analytics",
    "Advanced analytics",
    "Analytics platform",
    "Customer engagement analytics",
    "Customer Journey Analytics",
    "Adobe Analytics overview",
  ],
  alternates: {
    canonical: "https://www.dluxtech.com/platform/adobe/adobe-analytics",
  },
  openGraph: {
    title: "Adobe Analytics | Enterprise Digital Experience Analytics",
    description:
      "Master your customer journey with an enterprise-grade Adobe Analytics implementation — real-time insights, AI, and clean data that turn analytics into revenue.",
    url: "https://www.dluxtech.com/platform/adobe/adobe-analytics",
    siteName: "DLUX",
    type: "website",
  },
};

export default function AdobeAnalytics() {
  return (
    <main className="bg-black">
      <Hero />
      <Overview />
      <WhyFail />
      <CoreOfferings />
      <CTASection />
      <WhyChooseDlux />
      <FAQ />
      <FinalCTA />
    </main>
  );
}

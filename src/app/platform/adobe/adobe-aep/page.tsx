import type { Metadata } from "next";
import ImageLRComponenets from "@/src/components/ui/WB-Components/imageLRComponenets";
import HeroBanner from "@/src/components/sections/platform/adobe/adobe-aep/Hero";
import CapabilitiesSection from "@/src/components/sections/platform/adobe/adobe-aep/Capabilities";
import SolutionsSection from "@/src/components/sections/platform/adobe/adobe-aep/Solutions";
import { BringItToLifeSection } from "@/src/components/sections/platform/adobe/adobe-aep/BringItToLife";
import { WhyChooseDluxSection } from "@/src/components/sections/platform/adobe/adobe-aep/WhyChooseDlux";
import { AepCtaSection } from "@/src/components/sections/platform/adobe/adobe-aep/AepCtaSection";
import { AepFaqSection } from "@/src/components/sections/platform/adobe/adobe-aep/AepFaqSection";

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
        <main className="min-h-screen">
            <HeroBanner />

            {/* Section 1: Image Left Condition with Dual-Color Title & Custom Button */}
            <ImageLRComponenets
                imagePosition="left"
                title="Why AEP"
                highlightText="AEP"
                highlightColor="text-brand-primary"
                description={[
                    "Customer data lives everywhere: websites, mobile apps, CRM systems, commerce platforms, and marketing tools. Left disconnected, that data creates blind spots and inconsistent experiences. Adobe Experience Platform (AEP) solves this by unifying customer data into one real-time system, giving teams the clarity to make faster decisions and deliver personalized experiences at every touchpoint.",
                    "At DLUX Tech, we help businesses put that platform to work. Our experienced adobe experts have exposures in different areas and can help you build a system that scales."
                ]}
                imageSrc="https://images.ctfassets.net/pj0maraabon4/105QVVrIOcFvcEdkO8zEvM/c54fed70b11573a23519a847c1e2d61a/Mask_group.png"
                imageAlt="Adobe Analytics Dashboard Showcase"
                primaryCta={{
                    text: "Talk to our Adobe Experts",
                    href: "#contact",
                }}
                bgVariant="white"
            />

            {/* AEP Capabilities Section */}
            <CapabilitiesSection />


            {/* Section: The Solution Behind Real-Time Experiences (using WbCard) */}
            <SolutionsSection />

            {/* Section: How We Bring It To Life (Image Space Empty) */}
            <BringItToLifeSection />

            {/* Section: Why Clients Choose DLUX as their Adobe Partner */}
            <WhyChooseDluxSection />

            {/* Section: Ready to build the right Adobe Experience Platform foundation? */}
            <AepCtaSection />

            {/* Section: FAQ's */}
            <AepFaqSection />
        </main>
    );
}

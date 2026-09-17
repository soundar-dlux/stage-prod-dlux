import AboutSection from "@/src/components/sections/platform/salesforce/AboutSection";
import BestPracticesSection from "@/src/components/sections/platform/salesforce/BestPracticesSection";
import HeroSection from "@/src/components/sections/platform/salesforce/HeroSection";
import ServicesSection from "@/src/components/sections/platform/salesforce/ServicesSection";
import WhyDLUXSection from "@/src/components/sections/platform/salesforce/WhyDLUXSection";
import ContactForm from "@/src/components/ui/modal/contact-cta";

export const metadata = {
  title: "Salesforce Implementation Partner | DLUX",
  description:
    "Your trusted Salesforce partner integrating sales, service, marketing, and commerce on a single platform.",
};

export default function SalesforcePage() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <BestPracticesSection />
      <WhyDLUXSection />
      <ContactForm />
    </main>
  );
}

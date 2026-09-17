import ClientCentricSection from "@/src/components/sections/platform/dataiku/ClientCentricSection";
import DifferentiatorsSection from "@/src/components/sections/platform/dataiku/DifferentiatorsSection";
import HeroSection from "@/src/components/sections/platform/dataiku/HeroSection";
import PartnerSection from "@/src/components/sections/platform/dataiku/PartnerSection";
import ServicesSection from "@/src/components/sections/platform/dataiku/ServicesSection";


export const metadata = {
  title: "Dataiku Consulting & Implementation Services | DLUX",
  description:
    "Dataiku empowers businesses with advanced analytics and insights, simplifying data workflows for smarter decision-making.",
};

export default function DataikuPage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <PartnerSection />
      <ServicesSection />
      <ClientCentricSection />
      <DifferentiatorsSection />
      
    </main>
  );
}
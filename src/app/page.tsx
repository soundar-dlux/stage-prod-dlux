

import type { Metadata } from "next";

import AboutSection from "../components/sections/home/AboutSection";
import DluxEqiqSection from "../components/sections/home/DluxEqiqSection";
import HeroSection from "../components/sections/home/HeroSection";
import InnovationSection from "../components/sections/home/InnovationSection";
import SecuritySection from "../components/sections/home/SecuritySection";
import ServicesCard from "../components/sections/home/ServicesCard";
import ServicesSection from "../components/sections/home/ServicesSection";
import TestimonialsSection from "../components/sections/home/TestimonialsSection";
import ClientsSection from "../components/ui/ClientLogo/ClientsSection";
import PartnersLogo from "../components/ui/PartnersLogo/PartnersLogo";


export default function Home() {
  return (
    <main id="main-content" className="flex flex-col">
      {/* Hero Section */}
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ServicesCard />
      <InnovationSection />
      <DluxEqiqSection />
      <ClientsSection/>
      <PartnersLogo/>
      <TestimonialsSection />      
      <SecuritySection />
    </main>
  );
}

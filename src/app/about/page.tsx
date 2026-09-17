import AboutSection from "@/src/components/sections/About/AboutSection";
import BottomBanner from "@/src/components/sections/About/BottomBanner";
import CoreValues from "@/src/components/sections/About/CoreValues";
import HeroSection from "@/src/components/sections/About/HeroSection";
import MeetTeam from "@/src/components/sections/About/MeetTeam";
import MissionVision from "@/src/components/sections/About/MissionVision";
import { JSX } from "react";

export const metadata = {
  title: "About Us | Digital Consulting Services | DLUX",
  description:
    "DLUX helps businesses transform & evolve quickly to seize opportunities.",
};

export default function AboutPage(): JSX.Element {
  return (
    <main className="w-full bg-black">
      <HeroSection />
      <AboutSection />
      <MissionVision />
      <CoreValues />
      <MeetTeam />
    </main>
  );
}

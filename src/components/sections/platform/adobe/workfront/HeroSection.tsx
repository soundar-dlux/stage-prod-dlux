"use client";

import { memo, useMemo } from "react";
import AnimatedDivider from "@/src/components/ui/Banners/AnimatedDivider";
import CinematicHero from "@/src/components/ui/Banners/CinematicHero";

const HeroSection = () => {



  return (

    <section className="py-8 lg:py-0">
      <CinematicHero
        image="https://images.ctfassets.net/pj0maraabon4/37ZQvQ4uz34yVtpJgXjEXL/ddab6b2cfdb70abab2b8585bee6c0fc9/modern-home-office-with-computer-plants-desk-lamp.jpg"
        subtitle="Our Journey"
        title={
          <h1 className="font-semibold leading-tight text-3xl md:text-4xl lg:text-5xl">

            {/* Line 1 */}
            <span className="text-brand-white">
              Break Free from Silos,
            </span>
            <br />
            {/* Line 2 Gradient */}
            <span className="bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo bg-clip-text text-transparent">
              Fast-Track your Workflows
            </span>

          </h1>
        }
      >
        {/* Divider */}
        <AnimatedDivider />
      </CinematicHero>
    </section>
  );
};

export default memo(HeroSection);
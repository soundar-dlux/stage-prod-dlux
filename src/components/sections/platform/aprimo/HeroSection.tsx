"use client";

import AnimatedDivider from "@/src/components/ui/Banners/AnimatedDivider";
import CinematicHero from "@/src/components/ui/Banners/CinematicHero";

export default function HeroSection() {
  return (
  
     <section className="py-8 lg:py-0">
          <CinematicHero
            image="https://images.ctfassets.net/pj0maraabon4/2iySlsqzu85t6ynva7r54L/cc86140d5e99137ad55d8ea20667b872/aprimo_banner.webp"
            subtitle="Aprimo Digital Asset Management"
            title={
              <h1 className="font-semibold leading-tight text-3xl md:text-4xl lg:text-5xl">
    
                {/* Line 1 */}
                <span className="text-brand-white">
                  DAM Mastery: Your Digital Assets,
                </span>
                <br />
                {/* Line 2 Gradient */}
                <span className="bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo bg-clip-text text-transparent">
                  Secured and Accessible
                </span>
    
              </h1>
            }
          >
            {/* Divider */}
            <AnimatedDivider />
          </CinematicHero>
        </section>
  );
}
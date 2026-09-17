"use client";

import { useMemo } from "react";
import AnimatedDivider from "@/src/components/ui/Banners/AnimatedDivider";
import CinematicHero from "@/src/components/ui/Banners/CinematicHero";

const HeroSection = () => {
  // ✅ memoize title (clean + no inline styles)
  const title = useMemo(
    () => (
      <>
        <span
          className="
            block text-brand-white font-bold tracking-tight
            text-3xl sm:text-4xl md:text-5xl 
            lg:text-6xl xl:text-7xl 2xl:text-8xl
          "
        >
          Unbarring Creativity at
        </span>

        <span
          className="
            block mt-4 font-semibold
            text-2xl sm:text-3xl md:text-4xl 
            lg:text-5xl xl:text-6xl 2xl:text-7xl
            bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo
            bg-clip-text text-transparent
          "
        >
          Every Step
        </span>
      </>
    ),
    []
  );

  return (
    <CinematicHero
      image="https://images.ctfassets.net/pj0maraabon4/2BrmAum4EfmzElhNThabke/9e5e67ea083baa42106da44d722650c6/group-people-walking-city-sunset.jpg"
      subtitle="Careers at DLUX"
      title={
         <h1 className="font-semibold leading-tight text-3xl md:text-4xl lg:text-5xl">

            {/* Line 1 */}
            <span className="text-brand-white">
          Unbarring Creativity at
            </span>
            <br />
            {/* Line 2 Gradient */}
            <span className="bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo bg-clip-text text-transparent">
          Every Step
            </span>

          </h1>
      }
    >
      <AnimatedDivider />
    </CinematicHero>
  );
};

export default HeroSection;
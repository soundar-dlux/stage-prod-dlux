"use client";

import AnimatedDivider from "@/src/components/ui/Banners/AnimatedDivider";
import CinematicHero from "@/src/components/ui/Banners/CinematicHero";

export default function GrowthHero() {
  return (
    <section className="py-8 lg:py-0">
      <CinematicHero
        image="https://images.ctfassets.net/pj0maraabon4/6LBMTKCiNn2sh7m1GxKRTV/4cde41e74c03cf1d1fb0f37bbb7b345a/scene-with-business-person-working-futuristic-office-job.jpg"
        subtitle="Our Journey"
        title={
          <h1 className="font-semibold leading-tight text-3xl md:text-4xl lg:text-5xl">

            {/* Line 1 */}
            <span className="text-brand-white">
              Rooted in Innovation
            </span>
            <br />
            {/* Line 2 Gradient */}
            <span className="bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo bg-clip-text text-transparent">
              Branching out to Success
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
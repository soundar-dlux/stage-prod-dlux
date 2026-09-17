"use client";

import AnimatedDivider from "@/src/components/ui/Banners/AnimatedDivider";
import CinematicHero from "@/src/components/ui/Banners/CinematicHero";

export default function HeroSection() {
  return (
    <section className="py-8 lg:py-0">
      <CinematicHero
        image="https://images.ctfassets.net/pj0maraabon4/oDuFLUC9mSqSdKffo0ueI/4ec450d9744918fda6cd644cd1c1ae9f/abstract-backlit-businessmen-shaking-hands-abstract-metaverse-background-teamwork-meeting-concept-double-exposure.jpg"
        subtitle="DLUX x Dataiku Partnership"
        title={

          <h1 className="font-semibold leading-tight text-3xl md:text-4xl lg:text-5xl">
            <span className="text-brand-white">
              DLUX + Dataiku:
            </span>
            <br />

            <span className="bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo bg-clip-text text-transparent">
              AI Your Way, Tomorrow Today!
            </span>
          </h1>
        }
      >


        <AnimatedDivider />
      </CinematicHero>
    </section>
  );
}
"use client";

import AnimatedDivider from "../../ui/Banners/AnimatedDivider";
import CinematicHero from "../../ui/Banners/CinematicHero";

export default function AboutHeroSection() {
  return (
    <section className="py-8 lg:py-0">
      <CinematicHero
        image="https://images.ctfassets.net/pj0maraabon4/1jxcXx85F6e8olyptGGIGH/7f6c125b9a25f47db22263021e40a311/couple-students-working-with-laptops-desk-unreal-engine.jpg"
        subtitle="About Us"
        title={
          <h1 className="font-semibold leading-tight text-3xl md:text-4xl lg:text-5xl">

            <span className="text-brand-white">
              Optimizing Every Move,
            </span>

            <br />

            <span className="bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo bg-clip-text text-transparent">
              Maximizing Every Outcome
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
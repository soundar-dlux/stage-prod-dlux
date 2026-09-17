"use client";

import AnimatedDivider from "@/src/components/ui/Banners/AnimatedDivider";
import CinematicHero from "@/src/components/ui/Banners/CinematicHero";

export default function PartnerHero() {
  return (
    <section className="py-8 lg:py-0">
      <CinematicHero
        image="https://images.ctfassets.net/pj0maraabon4/6IZojjg1bv62pX40YnQ6TQ/78456d5fc42425e256274d3eac92abb0/embracing-technology-future-connections-digital-handshake-symbolizes-modern-networking.jpg"
        subtitle="Our Partnerships"
        title={
          <h1 className="font-semibold leading-tight text-3xl md:text-4xl lg:text-5xl">

            {/* Line 1 */}
            <span className="text-brand-white">
              Elevating Excellence
            </span>
            <br />

            {/* Line 2 Gradient */}
            <span className="bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo bg-clip-text text-transparent">
              Where Creativity Unites
            </span>

          </h1>
        }
      >
        {/* Divider */}
          <AnimatedDivider
            width={140}
            height={3}
            gradient="linear-gradient(90deg, #FF3901, #F07800)"
            glow
          />
      </CinematicHero>
    </section>
  );
}
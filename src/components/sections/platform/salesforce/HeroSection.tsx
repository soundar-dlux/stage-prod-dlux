"use client";

import AnimatedDivider from "@/src/components/ui/Banners/AnimatedDivider";
import CinematicHero from "@/src/components/ui/Banners/CinematicHero";

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

export default function HeroSection() {
  return (
    // <CinematicHero
    //   image="https://images.ctfassets.net/pj0maraabon4/2UaqkEFg48siLluv9MdMhl/40e815331438cd149993b218224339d5/Digital.jpg"
    //   subtitle="Salesforce Consulting & Implementation"
    //   overlayOpacity={0.65}
    //   showGlow
    //   height="min-h-[75vh] md:min-h-[80vh]"
    //   title={
    //     <>
    //       <span className="block text-3xl md:text-4xl lg:text-5xl">
    //         Rooted in{" "}
    //         <span
    //           style={{
    //             background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`,
    //             WebkitBackgroundClip: "text",
    //             WebkitTextFillColor: "transparent",
    //           }}
    //         >
    //           Innovation
    //         </span>
    //       </span>

    //       <span className="block text-3xl md:text-4xl lg:text-5xl mt-6 text-white/70">
    //         Branching out to Success
    //       </span>

    //       {/* Divider */}
    //       <AnimatedDivider
    //         width={140}
    //         height={3}
    //         gradient={`linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`}
    //         glow
    //         className="mt-10"
    //       />
    //     </>
    //   }
    // />

      <section className="py-8 lg:py-0">
          <CinematicHero
            image="https://images.ctfassets.net/pj0maraabon4/2UaqkEFg48siLluv9MdMhl/40e815331438cd149993b218224339d5/Digital.jpg"
            subtitle="Salesforce Consulting & Implementation"
            title={
              <h1 className="font-semibold leading-tight text-3xl md:text-4xl lg:text-5xl">
    
                {/* Line 1 */}
                <span className="text-brand-white">
Let's Salesforce Your Success Story
                </span>
                <br />
                {/* Line 2 Gradient */}
                <span className="bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo bg-clip-text text-transparent">
Integrate. Automate. Optimize
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
"use client";

import { memo } from "react";
import CinematicHero from "@/src/components/ui/Banners/CinematicHero";
import ExpertFormCard from "@/src/components/ui/modal/ExpertFormCard";

function CommerceHeroWrapper({ banner }: any) {
  return (
    <CinematicHero
      image={banner?.url}
      overlayOpacity={0.35}
      showGlow={false}
      className="
        flex items-center 
        min-h-[85vh] lg:min-h-screen 
        pt-24 sm:pt-28 lg:pt-32   /* 🔥 FIX: navbar overlap */
        pb-8 lg:pb-10
      "
      title={
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">

            <div className="grid lg:grid-cols-2 gap-10 items-center">

              {/* LEFT */}
              <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">

                <h1
                  className="
                    text-white font-bold leading-tight
                    text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl
                    mt-4 lg:mt-0
                  "
                >
                  Salesforce {" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo">
                    Commerce Cloud
                  </span>{" "}
                </h1>

                <p
                  className="
                    text-white/70 
                    mt-4 sm:mt-6
                    text-sm sm:text-base md:text-lg 
                    leading-relaxed 
                    max-w-lg mx-auto lg:mx-0
                  "
                >
                  Connecting Every Channel, Perfecting Every Journey!

                </p>



              </div>

              {/* RIGHT (FORM) */}
              <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-sm sm:max-w-md">
                  <ExpertFormCard />
                </div>
              </div>

            </div>

          </div>
        </div>
      }
    />
  );
}

export default memo(CommerceHeroWrapper);
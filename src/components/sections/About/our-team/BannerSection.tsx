"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { memo } from "react";
import CinematicHero from "@/src/components/ui/Banners/CinematicHero";
import AnimatedDivider from "@/src/components/ui/Banners/AnimatedDivider";

interface Banner {
  title: string;
  subText?: string;
  url: string;
}

interface BannerSectionProps {
  banner: Banner;
}

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

function BannerSection({ banner }: BannerSectionProps) {
  if (!banner?.url || !banner?.title) return null;

  return (


    <section className="py-8 lg:py-0">
      <CinematicHero
        image="https://images.ctfassets.net/pj0maraabon4/xpU3EZ48HKXzAJDsrx5q7/841c5d12a0f4b3ec346f3b07b4e5cb22/shared_image__1_.webp"
        subtitle="OUR TEAM"
        title={
          <h1 className="font-semibold leading-tight text-3xl md:text-4xl lg:text-5xl">

            {/* Line 1 */}
            <span className="text-brand-white">
              DLUX:Powered by Passion,
            </span>
            <br />
            {/* Line 2 Gradient */}
            <span className="bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo bg-clip-text text-transparent">
              Built by Us                </span>

          </h1>
        }
      >
        {/* Divider */}
        <AnimatedDivider />
      </CinematicHero>
    </section>
  );
}

export default memo(BannerSection);
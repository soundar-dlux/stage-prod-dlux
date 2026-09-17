"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import PremiumVideoModal from "@/src/components/ui/modal/PremiumVideoModal";
import Link from "next/link";

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

export default function PremiumBanner({ banner, eqiqImagesCollection }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buildImageUrl = (url?: string) => {
    if (!url) return null;
    const fullUrl = url.startsWith("//") ? `https:${url}` : url;
    return `${fullUrl}?w=1200&h=800&fit=fill&fm=webp&q=90`;
  };

  const thumbnailUrl = buildImageUrl(eqiqImagesCollection?.[3]?.url);

  return (
    <section className="relative overflow-hidden bg-black text-white pt-28 md:pt-32 pb-16">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-orange-500/20 blur-[160px] top-[-200px] left-[-200px]" />
        <div className="absolute w-[500px] h-[500px] bg-orange-400/10 blur-[140px] bottom-[-150px] right-[-150px]" />
      </div>

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* 🔥 LEFT */}
          <div className="text-center lg:text-left">

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="
                text-3xl 
                sm:text-4xl 
                md:text-5xl 
                lg:text-[56px]
                font-bold 
                leading-[1.1]
                tracking-tight
              "
            >
              Smart Workflows <br />
              <span className="text-white/80">Scalable Solutions</span>
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`,
                }}
              >
                Powered by Fusion
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-base text-white/60 max-w-[500px] mx-auto lg:mx-0"
            >
              Build faster. Automate smarter. Deliver powerful digital experiences with next-gen workflows.
            </motion.p>

            {/* 🔥 BUTTONS */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">

              <Link href="/contact-us">
                <button
                  className="
      px-7 py-3 rounded-full text-sm font-semibold
      transition-all duration-300
      hover:scale-105
    "
                  style={{
                    background: "linear-gradient(90deg, #FF3901, #F07800)",
                    boxShadow: "0 10px 30px rgba(255, 80, 0, 0.35)",
                  }}
                >
                  Get Started →
                </button>
              </Link>

              {banner?.url && (
                <button
                  onClick={() => {
                    const section = document.getElementById("video-showcase");
                    section?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-7 py-3 rounded-full border border-white/20 text-sm 
  hover:bg-white/10 transition-all duration-300"
                >
                  Watch Tech Fusion ↓
                </button>
              )}
            </div>
          </div>

          {/* 🔥 RIGHT VIDEO */}
          {thumbnailUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center lg:justify-end"
            >
              <div
                className="
                  relative
                  w-full
                  max-w-[420px]
                  md:max-w-[500px]
                  lg:max-w-[540px]
                  aspect-video
                  rounded-3xl
                  overflow-hidden
                  backdrop-blur-xl
                  bg-white/5
                  border border-white/10
                  shadow-[0_30px_80px_rgba(255,80,0,0.25)]
                  group
                "
              >
                <Image
                  src={thumbnailUrl}
                  alt="Fusion"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/30" />

                {/* PLAY BUTTON */}
                {banner?.url && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="
                      w-14 h-14 
                      bg-white/20 
                      backdrop-blur-md 
                      rounded-full 
                      flex items-center justify-center 
                      text-xl 
                      group-hover:scale-110
                      transition
                    ">
                      ▶
                    </div>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* 🔥 MODAL */}
      {isModalOpen && banner?.url && (
        <PremiumVideoModal
          videoUrl={banner.url}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}
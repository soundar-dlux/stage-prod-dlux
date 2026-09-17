"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionBadge from "../../ui/SectionBadge";

interface AMSFeature {
  title: string;
  description: string;
  image: string;
}

interface AMSReinventedSectionProps {
  heading: string;
  features: AMSFeature[];
}

export default function AMSReinventedSection({
  heading,
  features,
}: AMSReinventedSectionProps) {
  return (
    <section className="relative overflow-hidden bg-black py-14 md:py-20 lg:py-[40px] text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[320px] h-[320px] bg-[#FF3901]/10 blur-[130px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-[#F07800]/10 blur-[140px] rounded-full" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-[1350px] mx-auto px-4 sm:px-6 md:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14 lg:mb-20"
        >
          <SectionBadge
            label="AMS Reinvented"
            iconSrc="https://images.ctfassets.net/pj0maraabon4/4WH6837PWmPPMC4GKpyDbY/1a3fbb4bb45e6b9490e97039d47de480/dlux-dark-logo-subtitle.svg"
            iconAlt="Star Icon"
            className="mb-5"
          />

          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl mx-auto">
            <span className="text-white">
              {heading.split(" ").slice(0, -2).join(" ")}
            </span>{" "}
            <span className="bg-gradient-to-r from-[#F07800] to-[#FF3901] bg-clip-text text-transparent">
              {heading.split(" ").slice(-2).join(" ")}
            </span>
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-[#FF3901]/40 hover:bg-white/10"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF3901]/10 via-transparent to-[#F07800]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#F07800] to-[#FF3901] transition-all duration-500 group-hover:w-full" />

              <div className="relative z-10 p-6 md:p-8">
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/30 mb-7">
                  <div className="absolute top-4 left-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#F07800] to-[#FF3901] text-white text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>

                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={800}
                    height={500}
                    className="w-full h-[220px] md:h-[260px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Text */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      {feature.title}
                    </h3>

                    <div className="hidden sm:block h-[1px] flex-1 bg-gradient-to-r from-[#FF3901]/40 to-transparent" />
                  </div>

                  <p className="text-sm sm:text-base md:text-[16px] leading-7 text-white/65">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
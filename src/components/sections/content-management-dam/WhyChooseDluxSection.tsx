"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionBadge from "../../ui/SectionBadge";

interface WhyChooseItem {
  icon: string;
  title: string;
  description: string;
}
interface WhyChooseDluxSectionProps {
  heading: string;
  videoUrl?: string;
  items: WhyChooseItem[];
}

export default function WhyChooseDluxSection({
  heading,
  videoUrl,
  items,
}: WhyChooseDluxSectionProps) {
  return (
    <section className="relative overflow-hidden bg-black text-white py-8 lg:py-10">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[320px] h-[320px] bg-[#FF3901]/10 blur-[130px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#F07800]/10 blur-[140px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-14 lg:mb-10"
        >
          <SectionBadge
            label="Why DLUX"
            iconSrc="https://images.ctfassets.net/pj0maraabon4/4WH6837PWmPPMC4GKpyDbY/1a3fbb4bb45e6b9490e97039d47de480/dlux-dark-logo-subtitle.svg"
            iconAlt="Why DLUX"
            className="mb-5"
          />

          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-5xl">
            <span className="text-white">
              {heading.split(" ").slice(0, -2).join(" ")}
            </span>{" "}
            <span className="bg-gradient-to-r from-[#F07800] to-[#FF3901] bg-clip-text text-transparent">
              {heading.split(" ").slice(-2).join(" ")}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-16 items-start">
          {/* LEFT CONTENT */}
          <div className="relative">
            {/* Decorative Line */}
            <div className="hidden lg:block absolute left-[34px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#FF3901] via-[#F07800] to-transparent" />

            <div className="flex flex-col gap-6">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-7 transition-all duration-500 hover:border-[#FF3901]/40 hover:bg-white/10"
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF3901]/10 via-transparent to-[#F07800]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 flex flex-col md:flex-row gap-5 items-start">
                    {/* Icon */}
                    <div className="relative flex-shrink-0">
                      <div className="flex items-center justify-center w-[70px] h-[70px] rounded-2xl border border-[#FF3901]/20 bg-gradient-to-br from-[#FF3901]/15 to-[#F07800]/10 backdrop-blur-md">
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={34}
                          height={34}
                          className="w-[34px] h-[34px] object-contain"
                        />
                      </div>

                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-r from-[#F07800] to-[#FF3901] text-white text-xs font-bold flex items-center justify-center shadow-lg">
                        {index + 1}
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl md:text-2xl font-bold text-white">
                          {item.title}
                        </h3>

                        <div className="hidden sm:block h-[1px] flex-1 bg-gradient-to-r from-[#FF3901]/40 to-transparent" />
                      </div>

                      <p className="text-sm sm:text-base md:text-lg text-white/65 leading-7">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT VIDEO */}
          {videoUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Outer Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3901]/20 to-[#F07800]/20 blur-3xl rounded-[40px]" />

              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                {/* Browser Style Top Bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-[#FF3901]" />
                  <div className="w-3 h-3 rounded-full bg-[#F07800]" />
                  <div className="w-3 h-3 rounded-full bg-white/40" />
                </div>

                {/* Video */}
                <div className="relative mt-4 overflow-hidden rounded-[24px]">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full rounded-[24px] object-cover transition-transform duration-700 hover:scale-105"
                  >
                    <source src={videoUrl} type="video/mp4" />
                  </video>

                  {/* Floating Card */}
                  <div className="absolute bottom-5 left-5 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl px-5 py-4 max-w-[260px]">
                    <p className="text-xs uppercase tracking-[2px] text-[#F07800] mb-1">
                      Trusted Expertise
                    </p>
                    <h4 className="text-lg font-semibold text-white leading-snug">
                      Helping Brands Scale With Confidence
                    </h4>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

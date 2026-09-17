"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionBadge from "../../ui/SectionBadge";

interface ApproachStep {
  title: string;
  description: string;
  image: string;
}

interface OneOfAKindApproachSectionProps {
  heading: string;
  steps: ApproachStep[];
  videoUrl: string;
}

export default function OneOfAKindApproachSection({
  heading,
  steps,
  videoUrl,
}: OneOfAKindApproachSectionProps) {
  return (
    <section className="relative overflow-hidden bg-black text-white py-8 lg:py-10">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-[#FF3901]/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[320px] h-[320px] bg-[#F07800]/10 blur-[130px] rounded-full" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-14 lg:mb-20"
        >
          <SectionBadge
                  label="Our Approach"
                  iconSrc="https://images.ctfassets.net/pj0maraabon4/4WH6837PWmPPMC4GKpyDbY/1a3fbb4bb45e6b9490e97039d47de480/dlux-dark-logo-subtitle.svg"
                  iconAlt="Our Approach"
                  className="mb-5"
                />

          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-5xl">
            <span className="text-white">
              {heading.split(" ").slice(0, -2).join(" ")}
            </span>{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              {heading.split(" ").slice(-2).join(" ")}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-16 items-start">
          {/* LEFT — Steps */}
          <div className="relative">
            {/* Decorative Vertical Line */}
            <div className="hidden lg:block absolute left-[34px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#FF3901] via-[#F07800] to-transparent" />

            <div className="flex flex-col gap-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 8 }}
                  className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-7 transition-all duration-500 hover:border-[#FF3901]/40 hover:bg-white/10"
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF3901]/10 via-transparent to-[#F07800]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 flex flex-col md:flex-row gap-5 items-start">
                    {/* Icon + Step Number */}
                    <div className="relative flex-shrink-0">
                      <div className="flex items-center justify-center w-[70px] h-[70px] rounded-2xl border border-[#FF3901]/20 bg-gradient-to-br from-[#FF3901]/15 to-[#F07800]/10 backdrop-blur-md">
                        <Image
                          src={step.image}
                          alt={step.title}
                          width={36}
                          height={36}
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
                        <h4 className="text-xl md:text-2xl font-bold text-white">
                          {step.title}
                        </h4>

                        <div className="hidden sm:block h-[1px] flex-1 bg-gradient-to-r from-[#FF3901]/40 to-transparent" />
                      </div>

                      <p className="text-sm sm:text-base leading-7 text-white/65">
                        {step.description}
                      </p>

                      <div className="mt-5 flex items-center gap-2 text-[#F07800] text-sm font-medium tracking-wide">
                        <span>Step {index + 1}</span>
                        <div className="w-8 h-[2px] bg-gradient-to-r from-[#F07800] to-[#FF3901]" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT — Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3901]/20 to-[#F07800]/20 blur-3xl rounded-[40px]" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              {/* Top Browser Style Bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-[#FF3901]" />
                <div className="w-3 h-3 rounded-full bg-[#F07800]" />
                <div className="w-3 h-3 rounded-full bg-white/40" />
              </div>

              <div className="relative mt-4 overflow-hidden rounded-[24px]">
                <video
                  className="w-full rounded-[24px] object-cover transition-transform duration-700 hover:scale-105"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Floating Overlay Card */}
                <div className="absolute bottom-5 left-5 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl px-5 py-4 max-w-[260px]">
                  <p className="text-xs uppercase tracking-[2px] text-[#F07800] mb-1">
                    One Of A Kind
                  </p>
                  <h4 className="text-lg font-semibold text-white leading-snug">
                    Tailored Strategies That Deliver Real Results
                  </h4>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
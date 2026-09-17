"use client";

import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import CountUp from "react-countup";
import { motion } from "framer-motion";

interface NumberStatsSectionProps {
  cer1: StaticImageData;
  cer2: StaticImageData;
  cer3: StaticImageData;
}

export default function NumberStatsSection({
  cer1,
  cer2,
  cer3,
}: NumberStatsSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative lg:mt-[100px] overflow-hidden py-10 md:py-14 lg:py-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#111111] to-[#1a1a1a]" />

      {/* Orange Glow Effects */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#ff6a00]/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#ff8c00]/20 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-500 hover:border-orange-500/40 hover:bg-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/15 to-orange-600/5 backdrop-blur-md">
                <Image
                  src={cer1}
                  alt="certifications"
                  className="w-14 sm:w-16 object-contain"
                />
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-none text-white">
                <span className="bg-gradient-to-b from-white to-orange-200 bg-clip-text text-transparent">
                  {startCount && (
                    <CountUp start={0} end={36} duration={1.5} />
                  )}
                  +
                </span>
              </h1>

              <div className="mt-4 h-[2px] w-14 rounded-full bg-gradient-to-r from-orange-500 to-orange-300" />

              <h3 className="mt-4 text-lg sm:text-xl font-semibold text-white/90">
                Certifications
              </h3>
            </div>
          </motion.div>

          {/* Experts */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-500 hover:border-orange-500/40 hover:bg-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/15 to-orange-600/5 backdrop-blur-md">
                <Image
                  src={cer2}
                  alt="experts"
                  className="w-14 sm:w-16 object-contain"
                />
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-none text-white">
                <span className="bg-gradient-to-b from-white to-orange-200 bg-clip-text text-transparent">
                  {startCount && (
                    <CountUp start={0} end={20} duration={1.5} />
                  )}
                  +
                </span>
              </h1>

              <div className="mt-4 h-[2px] w-14 rounded-full bg-gradient-to-r from-orange-500 to-orange-300" />

              <h3 className="mt-4 text-lg sm:text-xl font-semibold text-white/90 max-w-[240px] leading-relaxed">
                Certified Workfront Experts
              </h3>
            </div>
          </motion.div>

          {/* Deployments */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-500 hover:border-orange-500/40 hover:bg-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/15 to-orange-600/5 backdrop-blur-md">
                <Image
                  src={cer3}
                  alt="deployments"
                  className="w-14 sm:w-16 object-contain"
                />
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-none text-white">
                <span className="bg-gradient-to-b from-white to-orange-200 bg-clip-text text-transparent">
                  {startCount && (
                    <CountUp start={0} end={45} duration={1.5} />
                  )}
                  +
                </span>
              </h1>

              <div className="mt-4 h-[2px] w-14 rounded-full bg-gradient-to-r from-orange-500 to-orange-300" />

              <h3 className="mt-4 text-lg sm:text-xl font-semibold text-white/90">
                Deployments
              </h3>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
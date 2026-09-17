"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function CEOMessage() {
  const message = `From a young age, my passion for technology has been rooted in its power to transform lives. That passion led me to study Computer Science and eventually start DLUX—a company built to drive innovation with purpose.

From bootstrapped beginnings to meaningful impact, DLUX stands for resilience, thoughtful tech, and unlocking human potential.

I’m Luxman Pai, Founder & President of DLUX. Leading this journey is a privilege—and together, we’re using marketing technology to uplift, empower, and inspire.`;

  const paragraphs = message.split("\n").filter(Boolean);

  return (
    <section className="relative bg-black text-white py-8 lg:py-10 px-6 lg:px-20">

      {/* 🌌 Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[250px] bg-[#FF3901]/10 blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-14 md:space-y-16">

        {/* HERO TEXT */}
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-60px" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold"
          >
            Voices of{" "}
            <span className="bg-gradient-to-r from-[#FF3901] to-[#F07800] bg-clip-text text-transparent">
              Visionaries
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true, margin: "-60px" }}
            className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed"
          >
            Discover the moments that shaped DLUX—where ideas sparked,
            visions formed, and innovation began.
          </motion.p>

          {/* Divider */}
          <div className="mx-auto h-[2px] w-16 bg-orange-500 rounded-full" />
        </div>

        {/* CEO SECTION */}
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-60px" }}
            className="flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative w-full max-w-[380px] rounded-[28px] p-[1px]"
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-[#FF3901]/40 to-[#F07800]/40 blur-2xl opacity-70" />

              {/* Card */}
              <div className="relative rounded-[28px] bg-black/80 backdrop-blur-xl border border-white/10 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <div className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20">
                    CEO Spotlight
                  </div>
                </div>

                {/* Image */}
                <Image
                  src="https://images.ctfassets.net/pj0maraabon4/feKYMyvkGFQfMtDMT4iJ0/81bc94189e436011f86ea5500a583de2/Untitled_design__3_.png"
                  alt="Luxman Pai"
                  width={360}
                  height={480}
                  className="object-contain w-full h-auto"
                  priority
                />

                {/* Bottom */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2">
                    <p className="text-sm font-semibold">Luxman Pai</p>
                    <p className="text-xs text-gray-400">Founder & President</p>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-6"
          >
            <p className="text-xs tracking-[4px] text-[#F07800] uppercase">
              CEO Message
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
              Leading with Vision <br />
              <span className="bg-gradient-to-r from-[#FF3901] to-[#F07800] bg-clip-text text-transparent">
                & Innovation
              </span>
            </h2>

            <div className="h-[2px] w-20 bg-gradient-to-r from-[#FF3901] to-[#F07800]" />

            <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
              {paragraphs.map((para, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10">
              <h3 className="text-lg font-semibold">Luxman Pai</h3>
              <p className="text-sm text-gray-400">
                Founder & President, DLUX
              </p>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
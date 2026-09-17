"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const INTRO_IMAGE =
  "https://images.ctfassets.net/pj0maraabon4/6mUTpbmb3ptBuXKh5eenud/c2d208e6445b203091f3224b5bf07161/retailImg.9fef528788de45e79529.png";

export default function IntroSection() {
  return (
    <section className="w-full bg-black text-white py-8 md:py-10 lg:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center md:justify-start relative"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FE780C]/20 to-transparent blur-3xl rounded-2xl scale-110 pointer-events-none" />

            <Image
              src={INTRO_IMAGE}
              alt="Retail shop"
              width={600}
              height={400}
              priority
              className="relative w-full max-w-lg h-auto object-contain shadow-2xl rounded-6xl lg:rounded-2xl"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8 text-white/90">
              Elevate your retail and consumer product strategies to foster
              enhanced connections with customers while simultaneously improving
              sustainability and increasing profitability.
              <br />
              <br />
              Our consulting services focus on delivering exceptional experiences,
              prioritizing value creation beyond conventional methods, and
              ensuring lasting connections between brands and consumers. From
              hyper-personalization to AI, automation, AR, social commerce,
              advanced analytics, and integrated technologies, these
              transformative shifts are reshaping the retail landscape.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

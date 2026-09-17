"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedDivider from "../../ui/Banners/AnimatedDivider";

const HERO_IMAGE =
  "https://images.ctfassets.net/pj0maraabon4/37Y7MfDG7qmDwsFdDNnMvO/85b692e9d2005b5f741516a64d4a8da7/contactus-page-main-img.47dc43d9a5e2d6620652.png";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-black h-[80vh] md:h-[90vh]">

      {/* Background with cinematic zoom */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 7, ease: "easeOut" }}
        className="absolute inset-0 -mt-[100px]"
      >
        <Image
          src={HERO_IMAGE}
          alt="Contact us banner"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85 z-[1]" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
        <div className="text-center max-w-4xl">
           {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-5 text-xs sm:text-sm  uppercase tracking-[0.35em] text-white/65"
          >
            Our Services
          </motion.p>
          
          {/* Animated Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-white font-semibold leading-tight
              text-[28px]
              sm:text-[36px]
              md:text-[48px]
              lg:text-[60px]"
          >
            Your Martech Solution
            <br />
            <span className="text-white/85">
              Starts with a Conversation
            </span>
          </motion.h1>

         <AnimatedDivider/>
        </div>
      </div>
    </section>
  );
}

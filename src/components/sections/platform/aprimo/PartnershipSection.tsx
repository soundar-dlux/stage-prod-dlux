"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { memo } from "react";

/* ---------------- Motion ---------------- */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1], // premium easing
    },
  },
};

/* ---------------- Component ---------------- */
function PartnershipSection() {
  return (
    <section className="relative py-8 lg:py-10 overflow-hidden bg-brand-black">
      {/* Subtle Accent */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.1 }}
            viewport={{ once: true, margin: "-80px" }}
            className="will-change-transform"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-brand-primary mb-4 md:mb-6 leading-tight">
              Aprimo Alliance Partnership
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-brand-white leading-relaxed max-w-lg">
              As an Aprimo Consulting Partner, DLUX delivers highly customizable
              DAM solutions that enhance customer experiences, strengthen brand
              loyalty, and drive sustainable revenue growth.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.2 }}
            viewport={{ once: true, margin: "-80px" }}
            className="relative flex justify-center md:justify-end will-change-transform"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6">
              <Image
                src="https://images.ctfassets.net/pj0maraabon4/4QrMAySbpvDX8EFEDKcJNq/6ca531ddec1b607e0d6823543a3a0fb3/Mask_Group_192.8c6dc5029a1dbab3ce09.png"
                alt="Aprimo Partner"
                width={520}
                height={360}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                priority={false}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default memo(PartnershipSection);
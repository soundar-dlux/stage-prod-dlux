"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { memo } from "react";

/* ---------------- Motion ---------------- */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // premium smooth easing
    },
  },
};

/* ---------------- Component ---------------- */
function IntroSection() {
  return (
    <section className="container mx-auto px-4 sm:px-6 py-8 lg:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        
        {/* Image */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }} // better trigger
          className="relative w-full will-change-transform"
        >
          <Image
            src="https://images.ctfassets.net/pj0maraabon4/7cVZYFt3N09iZLdZD8RV3R/5067b2d86859afab6319e1cb16b2ff34/download.png"
            alt="DLUX + Aprimo"
            width={600}
            height={400}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded-xl object-contain"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
          />
        </motion.div>

        {/* Content */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.15 }}
          viewport={{ once: true, margin: "-80px" }}
          className="will-change-transform"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-brand-primary mb-3">
            DLUX + Aprimo Consulting
          </h2>

          <p className="text-brand-white text-sm sm:text-lg leading-relaxed max-w-lg">
            We help teams simplify digital asset management with clean workflows,
            smart implementation, and scalable Aprimo solutions.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

export default memo(IntroSection);
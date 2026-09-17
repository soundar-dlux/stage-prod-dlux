"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { memo } from "react";

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function AboutSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8 lg:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* Content */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <span className="text-xs md:text-sm tracking-widest uppercase text-white/50">
            About Us
          </span>

          <h2 className="mt-3 md:mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-snug">
            Customer-first Salesforce
            <br />solutions that scale
          </h2>

          <p className="mt-5 md:mt-6 text-white/70 text-base md:text-lg leading-relaxed max-w-xl">
            We help businesses simplify complexity using Salesforce cloud
            technologies. Our approach focuses on clarity, performance, and
            long-term scalability—delivering seamless customer experiences
            without unnecessary overhead.
          </p>

          <div
            className="mt-6 md:mt-8 h-px w-16"
            style={{ background: BRAND.primary }}
          />
        </motion.div>

        {/* Image */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          <Image
            src="https://images.ctfassets.net/pj0maraabon4/6TA7ICNBcGDUFZ7hmBS4hF/9f33cf60261632dd6330e46cca9a54ce/download.png"
            alt="Salesforce Consulting"
            width={560}
            height={420}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
            className="rounded-lg object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
          />
        </motion.div>

      </div>
    </section>
  );
}

export default memo(AboutSection);
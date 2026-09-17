"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeContainer, fadeUpItem } from "@/src/lib/animations";

export default function SecuritySection() {
  return (
    <section
      className="bg-black  sm:py-10 text-white"
      aria-labelledby="security-heading"
      aria-describedby="security-description"
    >
      <motion.div
        className="mx-auto max-w-6xl px-6 text-center"
        variants={fadeContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Heading */}
        <motion.h2
          id="security-heading"
          variants={fadeUpItem}
          className="text-3xl sm:text-4xl font-semibold"
        >
          Your Data, Secured by <span className="text-brand-primary">Design</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          id="security-description"
          variants={fadeUpItem}
          className="mt-6 mx-auto max-w-3xl text-gray-400 text-base leading-relaxed"
        >
          At DLUX, data security isn’t an afterthought—it’s a commitment. As we pursue the ISO 27001 certification, ensuring your data is protected with globally recognised standards for information security and compliance.
        </motion.p>

        {/* Hidden SEO content */}
        <p className="sr-only">
          DLUX follows ISO 27001 and SOC certification standards to ensure data
          security, compliance, and enterprise-grade information protection.
        </p>

        {/* Certification Card */}
        <motion.div
          variants={fadeUpItem}
          className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.06] to-white/[0.02] p-8 sm:p-12 backdrop-blur-md hover:-translate-y-1 hover:border-[#FF3901]/40"
          role="region"
          aria-label="Security certifications and compliance badges"
        >
          <div
            className="flex flex-col items-center justify-center gap-10 md:flex-row md:gap-20"
            role="list"
          >
            {/* SOC Badge */}
            {/* SOC Badge */}
            <div
              className="flex items-center justify-center"
              role="listitem"
              aria-label="AICPA SOC security certification"
            >
              <Image
                src="https://images.ctfassets.net/pj0maraabon4/5D347ncw2jaJtpCQKEUE1r/7f0a45d963fadfaa7c9c64bb11c06991/03_5.png"
                alt="AICPA SOC certification badge representing DLUX enterprise data security, compliance, and trusted information protection standards"
                title="AICPA SOC Security Certification – DLUX Data Protection Standards"
                width={140}
                height={140}
                className="object-contain"
              />
            </div>

            {/* ISO Badge */}
            <div
              className="flex items-center justify-center"
              role="listitem"
              aria-label="ISO 27001 information security certification"
            >
              <Image
                src="https://images.ctfassets.net/pj0maraabon4/2loMzLeudH3Zj8O7CR9xob/ab9df61553ae70e01e5afe07a79e7e98/01_4.png"
                alt="ISO 27001 certification badge demonstrating DLUX compliance with global information security management and enterprise data protection standards"
                title="ISO 27001 Certification – DLUX Information Security Compliance"
                width={180}
                height={120}
                className="object-contain"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
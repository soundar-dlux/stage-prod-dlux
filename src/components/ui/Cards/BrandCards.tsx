"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

interface BrandCardProps {
  title?: string;
  description?: string;
  icon?: string;
  logo?: string;
  index?: number;
  type?: "attribute" | "partner";
}

export default function BrandCard({
  title,
  description,
  icon,
  logo,
  index = 0,
  type = "attribute",
}: BrandCardProps) {
  /* ================= ATTRIBUTE CARD ================= */
  if (type === "attribute") {
    return (
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
        whileHover={{ y: -12 }}
        className="group relative w-full max-w-sm
          rounded-3xl p-12 text-center
          bg-gradient-to-br from-neutral-900 to-neutral-950
          border border-white/10
          shadow-[0_30px_80px_rgba(0,0,0,0.75)]
          overflow-hidden"
      >
        {/* Smoky Hover Aura */}
        <div
          className="pointer-events-none absolute inset-0
            opacity-0 group-hover:opacity-100
            transition duration-700"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, ${BRAND.primary}22, transparent 55%),
              radial-gradient(circle at 70% 80%, ${BRAND.secondary}18, transparent 60%)
            `,
            filter: "blur(60px)",
          }}
        />

        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.12 }}
          transition={{ type: "spring", stiffness: 180 }}
          className="relative z-10 mx-auto mb-10
            w-16 h-16 rounded-2xl
            flex items-center justify-center
            bg-white/5 border border-white/10"
        >
          {icon && (
            <Image src={icon} alt={title || ""} width={38} height={38} />
          )}
        </motion.div>

        <h3 className="relative z-10 text-white text-lg font-semibold mb-4">
          {title}
        </h3>

        <p className="relative z-10 text-white/60 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </motion.div>
    );
  }

  /* ================= PARTNER CARD ================= */
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative w-full max-w-[300px] h-[170px]
        rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10
        flex items-center justify-center
        shadow-[0_20px_60px_rgba(0,0,0,0.4)]
        transition-all duration-500"
    >
      {/* Glow Border */}
      <div
        className="absolute inset-0 rounded-3xl
          opacity-0 group-hover:opacity-100
          transition duration-500"
        style={{
          background: `linear-gradient(120deg, ${BRAND.primary}40, ${BRAND.secondary}40)`,
          filter: "blur(25px)",
        }}
      />

      <div className="relative z-10 flex items-center justify-center">
        {logo && (
          <Image
            src={logo}
            alt={title || ""}
            width={180}
            height={90}
            className="object-contain transition-all duration-500 group-hover:scale-110"
            unoptimized
          />
        )}
      </div>
    </motion.div>
  );
}

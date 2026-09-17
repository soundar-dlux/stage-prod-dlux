"use client";

import { memo } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

interface Badge {
  title: string;
  image: string;
}

const BADGES: Badge[] = [
  {
    title: "Adobe Solution Partner",
    image: "https://images.ctfassets.net/pj0maraabon4/6g75rsKdGFqWKwmpINoY7K/03cc522a4a9cf9ae58fcc7d1554d683b/adobe_1.png",
  },
  {
    title: "Adobe Expert",
    image: "https://images.ctfassets.net/pj0maraabon4/2czwdx1Bq1zcJJEnJpDyTY/4a07013aa54c9aa8fff99c58f95ab449/adobe_2.png",
  },
  {
    title: "Adobe Master",
    image: "https://images.ctfassets.net/pj0maraabon4/6UB885Mz4Mf1tC2ILWtJVz/d85763cdebb32bcb939e378a0050b82d/adobe_3.png",
  },
  {
    title: "Adobe Professional",
    image: "https://images.ctfassets.net/pj0maraabon4/4ptehPLZWVbfqYO9URmYkd/859c28b51df32f7f2ee0ea885ca6eab6/adobe_4.png",
  },
];

/* Animations */
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const BadgeCard = ({ badge }: { badge: Badge }) => (
  <motion.div
    variants={badgeVariants}
    whileHover={{ y: -6, scale: 1.04 }}
    className="group flex justify-center"
  >
    <div
      className="relative rounded-xl border p-5 backdrop-blur-md transition-all duration-300"
      style={{
        borderColor: "rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.05)",
      }}
    >
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 blur-lg transition group-hover:opacity-100"
        style={{
          background: `${BRAND.primary}20`,
        }}
      />

      <Image
        src={badge.image}
        alt={badge.title}
        width={160}
        height={120}
        sizes="(max-width: 768px) 40vw, 160px"
        className="relative mx-auto object-contain"
      />
    </div>
  </motion.div>
);

const AdobeBadgesSection = () => {
  return (
    <section className="relative overflow-hidden bg-black py-8 lg:py-10">
      
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, ${BRAND.primary}10, transparent, ${BRAND.secondary}10)`,
          }}
        />
        <div
          className="absolute left-1/2 top-[-100px] h-[240px] w-[240px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background: `${BRAND.primary}20`,
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="relative mx-auto max-w-6xl px-6"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 items-center">
          {BADGES.map((badge) => (
            <BadgeCard key={badge.title} badge={badge} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default memo(AdobeBadgesSection);
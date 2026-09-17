"use client";

import { memo } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

const FEATURES = [
  {
    title: "Centralized Workspace",
    desc: "Access all project-related information, documents, and communication on one centralized platform, promoting better organization and collaboration.",
    image: "https://images.ctfassets.net/pj0maraabon4/2pSAiNoRXuBhdM4VsJHFz0/dc52cb95a38bad18eb92f50af39bc046/1.png",
  },
  {
    title: "Better Resource Management",
    desc: "Enhanced visibility into resource allocation, helping teams optimize their workforce and prevent bottlenecks. With real-time collaboration features, teams can communicate more effectively and stay aligned on project goals.",
    image: "https://images.ctfassets.net/pj0maraabon4/52NxzaypeXKsKuVL7QwGBY/31a424339a440b10f4809689c29c5d40/2.png",
  },
  {
    title: "Seamlessly Collaborate Anytime, Anywhere",
    desc: "Effortlessly facilitate collaboration across departments, automate workflows, establish standardized processes, and quickly strategize new projects from any location.",
    image: "https://images.ctfassets.net/pj0maraabon4/6Zpec6c5G0qVMHL26ov2DW/ad6ed06838b4ac784790ebd1a4500a65/3.png",
  },
  {
    title: "Customization and Scalability",
    desc: "Tailored platform to meet the unique requirements of different teams and projects and achieve the success of growing organizations.",
    image: "https://images.ctfassets.net/pj0maraabon4/1eN1xX9aqY7EQeAWKi8Wr7/f0ef9947dc2ca5dc8325005163acb86e/4.png",
  },
  {
    title: "Analytics and Insights",
    desc: "Provides analytics and reporting tools to track project performance and identify areas for improvement.",
    image: "https://images.ctfassets.net/pj0maraabon4/1MiPsrTfqLBISKLU4SxM8E/462e0e7b0bb23a5ef5d4165d25285bec/5.png",
  },
];

/* Animations */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const FeatureCard = ({ f }: any) => (
  <motion.article
    variants={item}
    className="group relative flex gap-4 rounded-xl border p-6 transition-all hover:-translate-y-1"
    style={{
      borderColor: "rgba(255,255,255,0.1)",
      background: "rgba(255,255,255,0.04)",
    }}
  >
    {/* Accent */}
    <span
      className="absolute left-0 top-6 h-[calc(100%-3rem)] w-[2px] rounded-full"
      style={{
        background: `${BRAND.primary}99`,
      }}
    />

    {/* Icon */}
    <div
      className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
      style={{
        background: `${BRAND.primary}15`,
      }}
    >
      <Image
        src={f.image}
        alt={f.title}
        width={28}
        height={28}
        sizes="28px"
        className="object-contain"
      />
      <span
        className="absolute inset-0 rounded-lg opacity-0 blur-lg transition group-hover:opacity-100"
        style={{
          background: `${BRAND.primary}30`,
        }}
      />
    </div>

    {/* Content */}
    <div>
      <h3 className="text-lg md:text-xl font-semibold text-white mb-1">
        {f.title}
      </h3>
      <p className="text-white/70 text-sm md:text-base leading-6 md:leading-7">
        {f.desc}
      </p>
    </div>
  </motion.article>
);

const WhyWorkfront = () => {
  return (
    <section className="relative bg-black py-8 lg:py-10 overflow-hidden">
      
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 30% 0%, ${BRAND.primary}20, transparent 60%)`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
        >
          Why Choose
          <span style={{ color: BRAND.primary }}> Workfront</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 mb-12 max-w-2xl text-white/70 text-base md:text-lg leading-relaxed"
        >
          Work Simpler. Smarter. Connected
        </motion.p>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-8 md:grid-cols-2"
        >
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} f={f} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default memo(WhyWorkfront);
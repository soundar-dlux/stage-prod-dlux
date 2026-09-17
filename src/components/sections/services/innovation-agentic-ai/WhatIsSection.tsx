"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionBadge from "../../../ui/SectionBadge";

type Card = {
  title: string;
  description: string;
  icon: string;
};

const cards: Card[] = [
  {
    title: "AI-Native Expertise",
    description:
      "AInative engineering + marketing + advertising domain expertise",
    icon: "https://images.ctfassets.net/pj0maraabon4/7x8ypNSYHpgvfefcLe6MkH/90d3bf6f209bf707517ae5a9ce7d3769/circular-arrow_12220467.png",
  },
  {
    title: "Multi-Agent Systems",
    description:
      "Multiagent systems with guardrails and auditability",
    icon: "https://images.ctfassets.net/pj0maraabon4/1lG98HWKpdMoL9QfY3DaWM/e0319ed21e29c27613d8df0795b7a0be/cloud-settings_14321550.png",
  },
  {
    title: "Enterprise Integrations",
    description:
      "Adobe, Salesforce, Dataiku, Workfront, RT CDPs, CMS/DAM integrations",
    icon: "https://images.ctfassets.net/pj0maraabon4/wCY1ymXwc4Lfr1hSbdsDY/7ac51e6781319968448ee50771010468/security_7172624.png",
  },
  {
    title: "ROI-Driven Outcomes",
    description:
      "Measurable outcomes backed by strong ROI frameworks",
    icon: "https://images.ctfassets.net/pj0maraabon4/1STw6rpZcNdOR9PQsg2BGv/3454f9e661771c4f5366a444e96ed986/financial-goals_18096553.png",
  },
];

const WhatIsSection: FC = () => {
  const premiumEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section className="bg-[#121215] text-white py-28 px-6">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: premiumEase }}
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto text-center"
      >
        {/* Badge */}
        <div className="mb-12">
          <SectionBadge
            label="Why Choose DLUX"
            iconSrc="https://images.ctfassets.net/pj0maraabon4/28ATinJOjDLVX2WIv8ewsz/5701a5a23309328dd0436678f1f92603/46b95943c3053783fc289bf504656384e8a8c95d.png"
            iconAlt="AI Icon"
          />
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold mb-8">
          Why{" "}
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            DLUX?
          </span>
        </h2>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-neutral-400 leading-relaxed mb-20">
          We combine AI-native engineering with deep marketing and advertising
          expertise to build scalable, intelligent systems that deliver real
          business impact.
        </p>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          {cards.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: premiumEase,
              }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-2xl 
                         bg-white/5 backdrop-blur-md 
                         border border-white/10 
                         hover:border-orange-500/40
                         transition-all duration-500 
                         hover:-translate-y-3
                         hover:shadow-[0_0_40px_rgba(255,115,0,0.15)]"
            >
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-orange-500/10 group-hover:bg-orange-500/20 transition-all duration-500">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={28}
                    height={28}
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: premiumEase }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-6">
            Ready to transform your marketing and advertising performance?
          </h3>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 font-medium">
              Book an Agentic AI Strategy Session
            </button>

            <button
              disabled={true} // or your condition
              className={`px-8 py-3 rounded-full border font-medium ${true
                  ? "border-white/20 text-gray-400 cursor-not-allowed opacity-50"
                  : "border-white/20 hover:border-orange-500 hover:text-orange-400 transition-all duration-300"
                }`}
            >
              See Live Agent Demos
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WhatIsSection;
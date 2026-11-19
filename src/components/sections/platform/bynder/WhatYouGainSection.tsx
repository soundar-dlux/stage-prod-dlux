"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import BLFeatureCard from "@/src/components/WB-Component/Cards/BL-Cards";

interface BynderFeatureItem {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
}

const featureCards: BynderFeatureItem[] = [
  {
    title: "Every approved asset sits in one library.",
    description:
      "Your logos, imagery, templates and campaign content live together with clear metadata, so teams can easily find the current version and reuse what already exists.",
    imageSrc: "https://images.ctfassets.net/pj0maraabon4/19DfB7RHiGcVTz4WZsPPt6/f54af42f97f12715835304867855496b/Layer_1.svg",
    imageAlt: "Every approved asset sits in one library",
  },
  {
    title: "Search works in plain language.",
    description:
      "Teams can describe an image in everyday language, find words inside visuals, and search audio and video by what is said.",
    imageSrc: "https://images.ctfassets.net/pj0maraabon4/7gpoO4oyFJgOkiFPzVBU02/94904c9e8a5f65423efde6be877c8788/Layer_1__1_.svg",
    imageAlt: "Search works in plain language",
  },
  {
    title: "Tagging takes less manual effort.",
    description:
      "Enrichment Agents suggest titles, descriptions, alt text and taxonomy values for your team to approve, keeping metadata consistent across teams.",
    imageSrc: "https://images.ctfassets.net/pj0maraabon4/2OfX72KLKqQmooXHO8PVix/e1f338a12888cbf38f6cbffe08e18078/Layer_1__2_.svg",
    imageAlt: "Tagging takes less manual effort",
  },
  {
    title: "Brand rules are checked before content goes out.",
    description:
      "The Brand Compliance Agent reviews assets against your brand and market guidelines and flags potential issues for review.",
    imageSrc: "https://images.ctfassets.net/pj0maraabon4/6gBQnXtyjflkWa5JDwGLbl/58bf0a4f71c26e724568f9d76cd6eb9d/Layer_1__3_.svg",
    imageAlt: "Brand rules are checked before content goes out",
  },
  {
    title: "Access and usage stay under clear control.",
    description:
      "Permissions, sharing controls and lifecycle metadata govern who can use what, and governance features can surface expired or unauthorized use.",
    imageSrc: "https://images.ctfassets.net/pj0maraabon4/5o1lpB0jigm0KmV3dzJlMF/119b2fa1aadf9da3ba9dfa5e8dd2a26f/Layer_1__4_.svg",
    imageAlt: "Access and usage stay under clear control",
  },
  {
    title: "Approved assets reach every channel.",
    description:
      "CX Omnichannel delivers approved assets to web, social, retail and e-commerce, while Analytics shows how assets are being used.",
    imageSrc: "https://images.ctfassets.net/pj0maraabon4/7u878NBtA36Z9FE6rytGJb/1a676a36e434f911244691d73a554dd4/Layer_1__5_.svg",
    imageAlt: "Approved assets reach every channel",
  },
];

export default function WhatYouGainSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section ref={sectionRef} className="relative bg-white  py-8 sm:py-10 lg:py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Note / Tagline */}
          <p className="mb-3 text-xs sm:text-sm font-medium text-[#FF500D]">
            Feature availability depends on the Bynder modules and package enabled for your account.
          </p>

          {/* Heading */}
          <h2 className="text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl md:text-5xl">
            What You Gain with{" "}
            <span className="text-[#FF500D]">Bynder DAM</span>
          </h2>

          {/* Subheading */}
          <p className="mt-4 text-base leading-relaxed text-[#555555] sm:text-lg">
            Getting the most out of Bynder DAM starts with the right features, effective configuration,
            and team adoption. That's where the right strategy makes a difference.
          </p>
        </motion.div>

        {/* Feature Cards Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featureCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <BLFeatureCard
                title={card.title}
                description={card.description}
                imageSrc={card.imageSrc}
                imageAlt={card.imageAlt}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { memo } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

/* Types */
interface StoryItem {
  title: string;
  image: string;
  description: string;
}

/* Data */
const STORIES: StoryItem[] = [
  {
    title: "Center of Excellence",
    image:
      "https://images.ctfassets.net/pj0maraabon4/5lGWejZD7bo0VTqdqvciQz/cb6a30a321d4433e1ad7fe16d0bcd67f/wf_text_1.png",
    description:
      "Work shouldn’t feel complex — it should feel seamless. We bring clarity, structure, and precision to your workflows. As your trusted Adobe Workfront partner, we help you unlock efficiency at scale.",
  },
  {
    title: "Certified Expertise",
    image:
      "https://images.ctfassets.net/pj0maraabon4/5xIobxxgHzpZYXGXu2edPm/ed1d5b47825b55579ad529cf615e8ffa/wf_text_2.png",
    description:
      "Backed by certified Adobe specialists, we deliver deep expertise across industries. From strategy to execution, every step is driven by precision and experience.",
  },
  {
    title: "Comprehensive Approach",
    image:
      "https://images.ctfassets.net/pj0maraabon4/4CPXlP6Hub8WTNwp5OsaxV/aac77de54c23fdda78d088f704961eec/wf_text_3.png",
    description:
      "We go beyond consulting — we build long-term value. From discovery to deployment and beyond, our approach is tailored, strategic, and outcome-focused.",
  },
  {
    title: "Affordable Solutions",
    image:
      "https://images.ctfassets.net/pj0maraabon4/4qMjHkf90NAc9qeO7dbrtF/c35d110f85a3eadf8e08872c83890732/wf_text_4.png",
    description:
      "High-impact solutions don’t need high complexity. We deliver scalable Workfront solutions that balance performance, efficiency, and cost.",
  },
  {
    title: "Proven Results",
    image:
      "https://images.ctfassets.net/pj0maraabon4/2N9erlPiTYnQtcQvMQaHzc/2d84e85d2c4733f13116be2269474f4c/wf_text_5.png",
    description:
      "Results define everything we do. We create optimized workflows that drive measurable impact and elevate your work management experience.",
  },
];

/* Animation */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

/* Card */
interface StoryCardProps {
  story: StoryItem;
  reverse?: boolean;
}

const StoryCard = ({ story, reverse = false }: StoryCardProps) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-50px" }}
    className={`flex flex-col items-center gap-8 lg:flex-row ${
      reverse ? "lg:flex-row-reverse" : ""
    }`}
  >
    {/* Image */}
    <div className="relative w-full lg:w-1/2">
      <div
        className="absolute inset-0 rounded-xl blur-2xl"
        style={{ background: `${BRAND.primary}20` }}
      />
      <Image
        src={story.image}
        alt={story.title}
        width={480}
        height={380}
        sizes="(max-width: 768px) 100vw, 480px"
        className="relative rounded-lg border shadow-lg"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      />
    </div>

    {/* Text */}
    <div className="w-full lg:w-1/2">
      <h3 className="mb-3 text-xl md:text-2xl font-semibold text-white">
        {story.title}
      </h3>

      <p className="text-white/70 text-base md:text-lg leading-6 md:leading-7">
        {story.description}
      </p>
    </div>
  </motion.div>
);

/* Main */
const SuccessStory = () => {
  return (
    <section className="relative bg-black py-8 lg:py-10 overflow-hidden text-white">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${BRAND.primary}10, transparent)`,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-12 text-center text-3xl md:text-4xl lg:text-5xl font-bold"
        >
          Explore the DLUX Way
          <span className="mt-2 block text-base md:text-lg text-white/60 font-medium">
            We craft your success story, one process at a time
          </span>
        </motion.h2>

        {/* Stories */}
        <div className="space-y-16">
          {STORIES.map((story, i) => (
            <StoryCard
              key={story.title}
              story={story}
              reverse={i % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(SuccessStory);
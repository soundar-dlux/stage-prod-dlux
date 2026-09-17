"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeContainer, fadeUpItem } from "@/src/lib/animations";

type TabItem = {
  id: string;
  label: string;
  title: string;
  description: string;
  description01: string;
  description2: string;
  points: string[];
  bgImage: string;
};

const TABS: TabItem[] = [
  {
    id: "performance",
    label: "Adobe Edge Delivery Services",
    title: "Adobe Edge Delivery Services",
    description:
      "We deploy cutting-edge Adobe Edge Delivery Services to enable lightning-fast global content distribution and significantly reduce latency across regions.",
    description01:
      "By facilitating real-time personalization at the edge, we ensure every customer interaction is context-aware, responsive, and seamless. Our performance-optimized architecture removes backend bottlenecks while supporting scalability and high availability. ",
    description2:
      "This delivers consistent, high-speed digital experiences across devices and markets. With DLUX, speed transcends mere performance to become a strategic advantage for growth.",
    points: [],
    bgImage:
      "https://images.ctfassets.net/pj0maraabon4/64UF3yW2BhFPDDJjPeBKPg/c2c8b81cc111c2a8064f3d2ebf6eed1e/web-performance-image.webp",
  },
  {
    id: "authoring",
    label: "Innovation-Led Digital & Martech Transformation",
    title: "Innovation-Led Digital & Martech Transformation",
    description:
      "We deliver end-to-end digital consulting and enterprise Martech transformation, powered by the latest advancements in AI, edge computing, composable architecture, and data intelligence.  ",
    description01: "",
    description2:
      "From strategy to execution, from architecture to optimization — we align marketing, technology, and business outcomes into one high-performance growth engine.",
    points: [],
    bgImage:
      "https://images.ctfassets.net/pj0maraabon4/4oMBaDwRPlzrGOMNi2sv9f/21ec98e7c4404a1195843503aa5201d0/innovation-and-martech.webp",
  },
  {
    id: "testing",
    label: "Talented Experts at Scale",
    title: "Talented Experts at Scale",
    description:
      "We combine deep platform expertise with enterprise-scale delivery. Our certified specialists, AI architects, and digital consultants work as one unified team — aligning strategy, technology, and business outcomes.",
    description01: "",
    description2:
      "Whether it’s a regional deployment or global transformation, we scale the right expertise quickly without compromising precision or performance. With DLUX, you gain a high-impact team built to deliver measurable growth.",
    points: [],
    bgImage:
      "https://images.ctfassets.net/pj0maraabon4/EN2r1wgmZ5TuE19eOV0Qv/fc8c475646764e3e72d04522de2a66a0/Talented-Experts-at-Scale.webp",
  },
  {
    id: "devtools",
    label: "Adobe Ecosystem Excellence",
    title: "Most organizations use Adobe—few unlock its full potential.",
    description:
      "We transform it into a unified, intelligent platform with automation, scalable content, and seamless experience orchestration. ",
    description01:
      "Beyond implementation, we engineer AI-driven systems that deliver speed, governance, and measurable business outcomes.",
    description2: "",
    points: [],
    bgImage:
      "https://images.ctfassets.net/pj0maraabon4/3Gnlw51LUVclKfTtFpFQiK/51791f1b043d41ad2e4976742fea7008/eco-system-image.webp",
  },
  {
    id: "crossplatform",
    label: "Agile. Experiential. Reliable.",
    title:
      "Agile Work Management. Exceptional Customer Experience. Trusted Service Delivery. ",
    description:
      "At DLUX AI & Martech Innovation Center, we enable agile execution that accelerates marketing operations without compromising control. We craft seamless, personalized customer experiences that drive engagement and loyalty. Backed by a structured and accountable delivery model, we ensure every project is executed with precision, transparency, and measurable impact. Speed, experience, and reliability — delivered together.  ",
    description01: "",
    description2: "",
    points: [],
    bgImage:
      "https://images.ctfassets.net/pj0maraabon4/2ReYQ22CfrSdehm38CuaEQ/8d36cc96e2c24a9225a59a59cfec3be0/ai-and-innovation.webp",
  },
];

export default function ServicesCard() {
  const [activeTab, setActiveTab] = useState<TabItem>(TABS[0]);

  return (
    <section
      aria-labelledby="services-card-heading"
      aria-describedby="services-card-description"
      className="bg-black py-8 lg:py-10 text-white"
    >
      <motion.div
        className="mx-auto max-w-8xl px-6"
        variants={fadeContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-gray-300">
            <Image
              src="https://images.ctfassets.net/pj0maraabon4/4WH6837PWmPPMC4GKpyDbY/1a3fbb4bb45e6b9490e97039d47de480/dlux-dark-logo-subtitle.svg"
              alt="DLUX AI & Martech Innovation Center logo representing advanced artificial intelligence, marketing technology solutions, and digital transformation expertise"
              title="DLUX AI & Martech Innovation Center"
              width={24}
              height={24}
              priority
            />
            DLUX – The Unique Differentiator
          </span>

          <motion.h2
            id="services-card-heading"
            variants={fadeUpItem}
            className="mt-6 text-3xl font-semibold md:text-4xl md:leading-[1.4]"
          >
            We Build Intelligent Revenue Ecosystems
            <br /> — Not Just Martech Stacks
          </motion.h2>

          <motion.p
            id="services-card-description"
            variants={fadeUpItem}
            className="mx-auto mt-4 max-w-4xl text-gray-400 md:text-lg"
          >
            In today’s enterprise landscape, disconnected platforms create
            fragmented customer journeys, underutilized data, and operational
            inefficiencies. We design AI-native, enterprise-grade ecosystems
            that unify data, automate workflows, and turn technology investments
            into measurable business advantage.
          </motion.p>

          {/* SEO hidden content */}
          <p className="sr-only">
            DLUX provides AI-driven martech ecosystems, Adobe solutions, digital
            transformation, and enterprise marketing platforms.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-14">
          <div
            role="tablist"
            aria-label="Service categories"
            className="flex gap-4 overflow-x-auto pb-6 justify-start lg:justify-center"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={activeTab.id === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm transition ${
                  activeTab.id === tab.id
                    ? "bg-white text-black"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-white`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                role="tabpanel"
                id={`tabpanel-${activeTab.id}`}
                aria-labelledby={`tab-${activeTab.id}`}
                aria-live="polite"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative min-h-[500px]"
              >
                {/* Background Image */}
                <Image
                  src={activeTab.bgImage}
                  alt={`${activeTab.title} illustration showing ${activeTab.label} solutions`}
                  title={activeTab.title}
                  aria-hidden="true"
                  fill
                  priority={activeTab.id === TABS[0].id}
                  sizes="100vw"
                  className="object-cover"
                />

                {/* Overlay */}
                <div
                  className="absolute inset-0 bg-black/70"
                  aria-hidden="true"
                />

                {/* Content */}
                <div className="relative z-10 grid gap-10 p-8 md:grid-cols-2 md:p-12">
                  <div className="max-w-lg rounded-xl bg-white p-6 text-black md:p-8">
                    <h3 className="text-xl font-semibold md:text-2xl">
                      {activeTab.title}
                    </h3>

                    <p className="mt-4 text-sm">{activeTab.description}</p>
                    <p className="mt-4 text-sm">{activeTab.description01}</p>
                    <p className="mt-4 text-sm">{activeTab.description2}</p>

                    <ul className="mt-6 space-y-2 text-sm" role="list">
                      {activeTab.points.map((point, index) => (
                        <li key={index} className="flex gap-2" role="listitem">
                          <span
                            className="mt-2 h-1.5 w-1.5 rounded-full bg-black"
                            aria-hidden="true"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

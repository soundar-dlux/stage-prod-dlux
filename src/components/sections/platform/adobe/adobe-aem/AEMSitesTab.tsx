"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TabType {
  id: string;
  label: string;
  title: string;
  description: string;
  description2: string;
  points: string[];
  bgImage: string;
}

const TABS: TabType[] = [
  {
    id: "performance",
    label: "Web Performance",
    title: "Web Performance",
    description:
      "Supercharge your site's speed, visibility, and conversions.",
    description2:
      "Faster pages = happier visitors and better rankings. AEM Sites delivers unmatched out-of-the-box performance so your website loads instantly and keeps users engaged.",
    points: [
      "Skyrocket Core Web Vitals & Google Lighthouse scores",
      "Climb higher in search results",
      "Slash bounce rates with lightning-fast loading",
      "Create responsive experiences that perform beautifully on every device",
    ],
    bgImage:
      "https://images.ctfassets.net/pj0maraabon4/3lYAflv2PBfcHATbSjtbGP/99b416e28a2d96be857fd7685a1aeb37/web-perfomance.jpg",
  },
  {
    id: "authoring",
    label: "Content Authoring",
    title: "Content Authoring",
    description:
      "Let your team create great content — fast and without frustration.",
    description2:
      "No coding required. AEM makes it easy for marketers and everyday contributors to produce rich, SEO-friendly content at speed.",
    points: [
      "Drag-and-drop visual editing that feels natural",
      "Import directly from Word or Google Docs",
      "Reuse smart content blocks + generative AI help",
      "Pull in perfect assets instantly from AEM Assets",
    ],
    bgImage:
      "https://images.ctfassets.net/pj0maraabon4/4W4ZlUggyh2ATs1L46HVlq/30048bf31e679a09478ad6f73fa00915/content-img.jpg",
  },
  {
    id: "testing",
    label: "Testing & Optimization",
    title: "Testing & Optimization",
    description:
      "Test ideas, personalize fast, and watch conversions climb.",
    description2:
      "Built-in experimentation tools let you try variations and see real results — no developers needed.",
    points: [
      "Run A/B tests and full-page experiments in minutes",
      "Personalize experiences for different audiences",
      "Get instant insights to make smarter decisions",
      "Keep improving engagement and conversion rates",
    ],
    bgImage:
      "https://images.ctfassets.net/pj0maraabon4/2pp5QJYTxsqsv9EqpYyXrB/2fd40d8109a063c9e8fbd358fb306662/testing-img.jpg",
  },
  {
    id: "devtools",
    label: "Developer Tools",
    title: "Developer Tools",
    description: "Build faster, scale smarter, stay flexible.",
    description2:
      "Modern, developer-friendly foundation that respects your time and lets content & code move in parallel.",
    points: [
      "Start with clean, optimized starter code",
      "Use your favorite JavaScript & CSS frameworks",
      "Work side-by-side with content authors",
      "Extend easily with open APIs and integrations",
    ],
    bgImage:
      "https://images.ctfassets.net/pj0maraabon4/6uuitgY0HYw1BqJOQNgd1C/fa122db6fdff4389db2bfed4b2bfc308/modern-technology-workspace-with-laptop-computer-desk.jpg",
  },
  {
    id: "crossplatform",
    label: "Cross-Platform Experiences",
    title: "Cross-Platform Experiences",
    description:
      "One consistent brand story — everywhere your customers are.",
    description2:
      "Deliver the same high-quality experience on web, mobile, apps, and beyond without starting from scratch every time.",
    points: [
      "Responsive design that looks great on any screen",
      "Global teams collaborate and localize easily",
      "Reuse content blocks and approved assets",
      "Keep your brand voice perfect across every channel",
    ],
    bgImage:
      "https://images.ctfassets.net/pj0maraabon4/4kD70fh4qkCAyHWtPX5wYt/6ba1fdc2d5a8233a61b351c119ff79d3/cross-platform-img.webp",
  },
  {
    id: "api",
    label: "API-driven / Headless CMS",
    title: "API-driven / Headless CMS",
    description:
      "Freedom for developers. Control for marketers. Future-proof for your business.",
    description2:
      "Decouple front-end from content — build exactly what you want while content teams stay fast and independent.",
    points: [
      "True hybrid: headless or traditional — your choice",
      "Powerful APIs + content fragments for any channel",
      "Marketers preview & edit even in headless mode",
      "Scale securely with centralized governance",
    ],
    bgImage:
      "https://images.ctfassets.net/pj0maraabon4/5kQ8Qkxb2HEF0MBYuFPchC/ad984219b166a72aa021eb55249e2419/api-img.jpg",
  },
];

export default function AemSitesTabs() {
  const [activeId, setActiveId] = useState<string>(TABS[0].id);

  const activeTab = useMemo(
    () => TABS.find((tab) => tab.id === activeId)!,
    [activeId]
  );

  return (
    <section className="bg-black text-white py-20 md:py-24 font-sans">
      
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto px-4 md:px-6">
        <span className="inline-flex rounded-full border border-[#656565]/35 px-4 py-2 items-center text-sm text-gray-300 gap-3 bg-[#101010]">
          <img
            src="https://images.ctfassets.net/pj0maraabon4/4WH6837PWmPPMC4GKpyDbY/1a3fbb4bb45e6b9490e97039d47de480/dlux-dark-logo-subtitle.svg"
            alt="AEM Logo"
            className="h-5 w-5"
            loading="lazy"
          />
          AEM Sites
        </span>

        <h2 className="mt-6 text-2xl md:text-4xl font-semibold leading-snug">
          Enterprise CMS for Scalable Digital Experiences
        </h2>

        <p className="mt-4 text-gray-400 text-sm md:text-lg leading-relaxed">
          Adobe Experience Manager Sites enables brands to create,
          manage, and deliver high-performance digital experiences across
          web, mobile, and omnichannel touchpoints.
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto bg-[#656565]/20 rounded-2xl mt-14">
        
        {/* Tabs List - Single Row Scroll */}
        <div className="relative">
          <div className="flex flex-nowrap gap-3 px-4 md:px-6 py-6 overflow-x-auto tabs-scroll scroll-smooth">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveId(tab.id)}
                className={`flex-shrink-0 rounded-full px-5 py-2 text-sm md:text-base transition-all duration-300 whitespace-nowrap ${
                  activeId === tab.id
                    ? "bg-white text-black scale-105"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-b-2xl overflow-hidden min-h-[420px] flex items-center"
          >
            {/* Background */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${activeTab.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Content */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-12 w-full">
              
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white text-black rounded-xl p-6 md:p-8 max-w-lg shadow-xl"
              >
                <h3 className="text-xl md:text-2xl font-semibold">
                  {activeTab.title}
                </h3>

                <p className="mt-3 text-sm md:text-[15px]">
                  {activeTab.description}
                </p>

                <p className="mt-3 text-sm md:text-[15px]">
                  {activeTab.description2}
                </p>

                <ul className="mt-5 space-y-2 text-sm md:text-[15px]">
                  {activeTab.points.map((point, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-2 h-2 w-2 rounded-full bg-black" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scoped CSS */}
      <style jsx>{`
        .tabs-scroll::-webkit-scrollbar {
          display: none;
        }
        .tabs-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
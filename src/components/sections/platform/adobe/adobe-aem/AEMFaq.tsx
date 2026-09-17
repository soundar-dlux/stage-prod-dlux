"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const FAQS = [
  {
    question: "What makes AEM Sites a leading scalable CMS?",
    answer:
      "AEM Sites offers AI-powered authoring, built-in performance optimization for Core Web Vitals, headless capabilities, and seamless integration with AEM Assets for unified content and asset management.",
  },
  {
    question: "How does AEM Assets improve digital asset workflows?",
    answer:
      "With AI-powered DAM features like Brand-Aware Tagging, generative creation via Firefly, advanced governance, and dynamic delivery, AEM Assets streamlines discovery, compliance, and activation across channels.",
  },
  {
    question: "Can AEM support both traditional and headless delivery?",
    answer:
      "Yes — flexible headful and headless models allow omnichannel experiences with reusable content fragments, APIs, and integrations for web, mobile, apps, and beyond.",
  },
  {
    question: "How does combining Sites and Assets benefit my team?",
    answer:
      "Automatic asset updates, governed reuse, and AI optimization reduce manual work and accelerate personalization.",
  },
  {
    question: "What results can I expect in SEO and performance?",
    answer:
      "Improved load times, higher Lighthouse scores, reduced bounce rates, and better SEO rankings.",
  },
];

export default function AemFaqSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const leftCardRef = useRef<HTMLDivElement | null>(null);

  /* Sync left height */
  useEffect(() => {
    if (!rightColRef.current || !leftCardRef.current) return;

    const updateHeight = () => {
      leftCardRef.current!.style.minHeight =
        `${rightColRef.current!.offsetHeight}px`;
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [activeIndex]);

  return (
    <section
      className="bg-black text-white py-24 font-sans"
      aria-labelledby="aem-faq-heading"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-flex rounded-full border border-[#656565]/35 px-4 py-2 items-center text-sm text-gray-300 gap-3 bg-[#101010]">
            <img
              src="https://images.ctfassets.net/pj0maraabon4/4WH6837PWmPPMC4GKpyDbY/1a3fbb4bb45e6b9490e97039d47de480/dlux-dark-logo-subtitle.svg"
              alt="Adobe Experience Manager FAQ"
              className="h-6 w-6"
            />
            FAQ
          </span>

          <h2
            id="aem-faq-heading"
            className="mt-6 text-3xl md:text-4xl font-semibold"
          >
            Frequently Asked Questions about AEM
          </h2>

          <p className="mt-4 text-gray-400 text-sm md:text-base">
            Adobe Experience Manager (AEM) Sites enables scalable authoring,
            management, and omnichannel digital experiences.
          </p>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

          {/* LEFT CARD */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <div
              ref={leftCardRef}
              className="sticky top-24 rounded-2xl bg-[#656565]/30 border border-white/10 p-8"
            >
              <h3 className="text-xl font-semibold">
                Frequently <br /> Asked Questions
              </h3>

              <div className="w-full h-[1px] bg-[#656565]/50 mt-8 mb-6" />

              <p className="text-gray-400 text-lg leading-relaxed">
                Need more details about AEM Sites or Assets? Our experts are
                ready to help.
              </p>

              <Link href="/contact">
                <button className="mt-8 inline-flex items-center rounded-full border border-white/30 px-6 py-2 text-sm transition hover:bg-white hover:text-black">
                  Contact Us
                </button>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT ACCORDION */}
          <div ref={rightColRef} className="md:col-span-2 space-y-4">
            {FAQS.map((faq, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className={`rounded-2xl border border-white/10 transition-all duration-300 ${
                    isActive
                      ? "bg-[#656565]/30 p-8"
                      : "bg-[#656565]/30 px-6 py-4 cursor-pointer"
                  }`}
                  onClick={() =>
                    setActiveIndex(isActive ? -1 : index)
                  }
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm md:text-lg font-medium">
                      {faq.question}
                    </h4>
                    <span className="ml-4 text-xl text-[#938f8c]">
                      {isActive ? "–" : "+"}
                    </span>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-4 text-gray-400 text-md leading-relaxed overflow-hidden"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

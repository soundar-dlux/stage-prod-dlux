"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

export const defaultBynderFaqs: FaqItem[] = [
  {
    question: "How long does a Bynder implementation take?",
    answer:
      "Timelines depend on the volume of assets you are migrating, the complexity of your metadata and the integrations involved. We set out a realistic plan during the Discover stage, once we have a clear view of your scope.",
  },
  {
    question: "Can Bynder connect to the tools we already use?",
    answer:
      "In most cases, yes. The Bynder Marketplace covers many common marketing and work-management tools, and where a connector doesn't exist, we can scope a custom integration through Bynder's API. ",
  },
  {
    question: "Do we need to migrate all our assets at once?",
    answer:
      "Not necessarily. Many organizations begin with their most-used or highest-value content and move the rest in phases, which also creates a natural opportunity to retire outdated material.",
  },
  {
    question: "We already have a DAM. Can you help us move to Bynder?",
    answer:
      "Yes. We assess your current setup and plan the transition, including how your existing metadata and folder structures should be mapped across or redesigned. ",
  },
  {
    question: "Do you only work with organizations in APAC?",
    answer:
      "Much of our work is in APAC, but we support organizations in other regions as well. ",
  },
];

export interface FAQSectionProps {
  title?: string;
  faqs?: FaqItem[];
  defaultOpenIndex?: number | null;
  className?: string;
}

export default function FAQSection({
  title = "FAQ's",
  faqs = defaultBynderFaqs,
  defaultOpenIndex = 0,
  className = "",
}: FAQSectionProps) {
  // First item open by default as shown in the design
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className={`relative w-full py-16 sm:py-20 lg:py-10 overflow-hidden ${className}`}
      style={{
        background:
          "radial-gradient(circle at 0% 100%, rgba(255, 235, 225, 0.45) 0%, transparent 45%), radial-gradient(circle at 100% 100%, rgba(255, 235, 225, 0.45) 0%, transparent 45%), #FFFFFF",
      }}
    >
      <div className="mx-auto max-w-[1100px] px-6 sm:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-[#FF500D] sm:text-4xl lg:text-[42px]">
            {title}
          </h2>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="w-full flex flex-col">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="w-full border-b border-[#E5E5E5] py-5 sm:py-6"
              >
                {/* FAQ Header Row */}
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between gap-4 text-left cursor-pointer select-none group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-base sm:text-[18px] font-semibold text-[#111111] group-hover:text-[#FF500D] transition-colors leading-snug">
                    <span className="mr-2">{index + 1}.</span>
                    <span>{faq.question}</span>
                  </h3>

                  {/* Circular Chevron Arrow Button */}
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border border-[#FF500D] text-[#FF500D] transition-all duration-300 group-hover:bg-[#FF500D] group-hover:text-white">
                    <ChevronDown
                      className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                </button>

                {/* FAQ Answer Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 pl-5 sm:pl-6 text-sm sm:text-[15px] leading-relaxed text-[#555555] font-normal max-w-4xl">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

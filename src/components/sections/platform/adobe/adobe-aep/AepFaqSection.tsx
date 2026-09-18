"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

const defaultFaqs: FaqItem[] = [
  {
    question: "What is Adobe Experience Platform?",
    answer:
      "Adobe Experience Platform is an enterprise platform that unifies customer data, builds real-time customer profiles, and enables personalized experiences across multiple channels. ",
  },
  {
    question: "Can AEP integrate with existing systems?",
    answer:
      "Yes. Adobe Experience Platform integrates with CRM platforms, analytics tools, Adobe Experience Cloud applications, APIs, cloud storage, and enterprise business systems.",
  },
  {
    question: "Does DLUX Tech provide implementation services?",
    answer:
      "Yes. We offer end-to-end Adobe Experience Platform consulting, implementation, integration, optimization, and managed services for enterprise organizations. ",
  },
  {
    question: "How long does an AEP implementation typically take?",
    answer:
      "Most AEP implementations take 3–6 months. Smaller projects may finish in 6–12 weeks, while complex enterprise deployments can take 6–12+ months. ",
  },
  {
    question: "Does AEP require other Adobe Experience Cloud products to work?",
    answer:
      "No. AEP works independently but integrating it with products like Real-Time CDP or Journey Optimizer adds advanced personalization and activation capabilities.",
  },
  {
    question: "How is AEP different from a traditional CDP?",
    answer:
      "A traditional CDP unifies customer data. AEP goes further with real-time profiles, AI, data governance, and enterprise-scale integrations for end-to-end customer experiences. ",
  },
];

export interface AepFaqSectionProps {
  title?: string;
  faqs?: FaqItem[];
  className?: string;
}

export function AepFaqSection({
  title = "FAQ's",
  faqs = defaultFaqs,
  className = "",
}: AepFaqSectionProps) {
  // Item 0 open by default as shown in design screenshot
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      style={{
        background: "linear-gradient(180.82deg, #FFFFFF 0.71%, #FE3908 1031.19%)",
      }}
      className={`w-full py-[40px] px-4 sm:px-6 lg:px-8 font-sans transition-all duration-300 ${className}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* =========================================================
            HEADER TITLE
           ========================================================= */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#FF4F00] text-center tracking-tight leading-tight mb-10 sm:mb-14"
        >
          {title}
        </motion.h2>

        {/* =========================================================
            ACCORDION LIST
           ========================================================= */}
        <div className="w-full flex flex-col space-y-0 border-t border-gray-200/80">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="w-full border-b border-gray-200/80 py-5 sm:py-6"
              >
                {/* FAQ Header Row */}
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex items-center justify-between w-full text-left gap-4 cursor-pointer select-none group focus:outline-none"
                >
                  <h3 className="text-base sm:text-lg font-bold text-black group-hover:text-[#FF4F00] transition-colors leading-snug flex items-start gap-2">
                    <span className="shrink-0">{index + 1}.</span>
                    <span>{faq.question}</span>
                  </h3>

                  {/* Circle Down Arrow Icon */}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#FF4F00]/70 flex items-center justify-center text-[#FF4F00] shrink-0 group-hover:bg-[#FF4F00] group-hover:text-white transition-all duration-300">
                    <ChevronDown
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                </button>

                {/* FAQ Answer Panel */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed pl-6 sm:pl-7 pt-3 font-normal max-w-3xl">
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

export default AepFaqSection;

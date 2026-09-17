"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const fadeUp:Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const faqs = [
  {
    question: "Are DLUX webinars free to attend?",
    answer:
      "Yes — all our webinars are free. Simply register to save your spot, and you’ll receive a confirmation email with details.",
  },
  {
    question: "How experienced are the speakers in real-world martech challenges?",
    answer:
      "Our speakers aren’t just theorists—they’re enterprise practitioners who have rolled out martech ecosystems at scale for global businesses.",
  },
  {
    question: "What if I miss the live session?",
    answer:
      "No problem! Every webinar is recorded. Registered attendees receive the replay link, and you can also watch on-demand in our DLUX Webinar Library.",
  },
  {
    question: "How do I register for upcoming webinars?",
    answer:
      "Visit our registration link on the Webinar page, select the session you’d like to join, and submit your details. You’ll get an email with all the access info.",
  },
  {
    question: "Who are the webinars designed for?",
    answer:
      "Our sessions are tailored for Martech leaders, Adobe platform users, operations teams, and IT professionals who want practical strategies, integrations, and innovation insights.",
  },
  {
    question: "Can I ask questions during the webinar?",
    answer:
      "Absolutely. Each session includes a live Q&A where our experts and Adobe-certified consultants answer your specific challenges.",
  },
  {
    question: "What makes this session different from reading a whitepaper or blog?",
    answer:
      "Unlike static content, this webinar delivers live, practical insights with tool-specific hacks and frameworks—plus the opportunity to ask your own questions.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative flex items-center justify-center px-4 py-20 overflow-hidden bg-black">
      {/* 🎥 Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://videos.ctfassets.net/pj0maraabon4/QIOk2y2pUnORGqU9s4vgn/1da130801d2a7e9ffdb641fa46ff8a2f/space-bg-webinar.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative max-w-3xl w-full z-10">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-3xl md:text-5xl font-bold text-center mb-16
                     bg-gradient-to-r from-[#ff3901] to-[#F07800]
                     bg-clip-text text-transparent"
        >
          Get Answers to Your Questions with Our FAQs
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-6"
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="pb-4 border-b border-gray-500/40 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg md:text-2xl font-semibold text-white">
                  {faq.question}
                </h3>

                <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400/60 shrink-0">
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-white" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white" />
                    )}
                  </motion.div>
                </div>
              </div>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-3 text-sm md:text-lg text-gray-200"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

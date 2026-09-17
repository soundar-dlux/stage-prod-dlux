"use client";

import { useRef } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { motion, useInView } from "framer-motion";

const Subscription = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 px-5 flex justify-center items-center overflow-hidden bg-black"
    >
      {/* Subtle Premium Glow */}
      <div
        className="absolute w-[600px] h-[600px] blur-[140px] opacity-40"
        style={{
          background:
            "radial-gradient(circle, #FF3901 0%, #F07800 30%, transparent 70%)",
        }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-3xl"
      >
        {/* Glass Card */}
        <div className="rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 px-10 py-16 text-center text-white shadow-[0_10px_60px_rgba(0,0,0,0.6)]">

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-3"
          >
            Martech Insights, Simplified
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed"
          >
            No spam. Just sharp insights on AI, marketing tech, and growth strategies.
          </motion.p>

          {/* Form */}
          <motion.form
            action="https://forms.zohopublic.in/dluxtech/form/BlogSubscription/formperma/KOju3aE3jSa4yX16hLrEZtGhxVCRFmy6Ap7b-8eskCE/htmlRecords/submit"
            method="POST"
            target="_blank"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row items-center gap-4 max-w-lg mx-auto"
          >
            <input type="hidden" name="zf_referrer_name" />
            <input type="hidden" name="zf_redirect_url" />
            <input type="hidden" name="zc_gad" />

            {/* Input */}
            <input
              type="email"
              name="Email"
              required
              placeholder="Enter your email"
              className="w-full flex-1 px-5 py-4 rounded-full bg-white/[0.06] text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20 transition"
            />

            {/* Premium Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="relative flex items-center gap-2 px-6 py-4 rounded-full font-medium text-white overflow-hidden"
            >
              {/* Gradient Background */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#FF3901] to-[#F07800]" />

              {/* Glow */}
              <span className="absolute inset-0 blur-xl opacity-40 bg-gradient-to-r from-[#FF3901] to-[#F07800]" />

              {/* Content */}
              <span className="relative flex items-center gap-2">
                Subscribe
                <FaArrowRight />
              </span>
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};

export default Subscription;
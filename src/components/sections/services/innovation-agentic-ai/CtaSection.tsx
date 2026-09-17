"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CtaSection() {
  const premiumEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 py-28 px-6 text-white text-center">
      
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: premiumEase }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: premiumEase }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-semibold leading-tight"
        >
          Stop Drowning in News.
          <br />
          Start Reading What Matters.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: premiumEase }}
          viewport={{ once: true }}
          className="mt-6 text-white/90 text-lg"
        >
          14-day free trial. Set up in 2 minutes. Cancel anytime.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: premiumEase }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-6"
        >
          {/* Button 1 */}
          <motion.div
            whileHover={{ y: -4, scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
          >
            <Link
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-white text-white hover:bg-white hover:text-orange-600 transition-all duration-300"
            >
              Start Your Free Trial ↗
            </Link>
          </motion.div>

          {/* Button 2 */}
          <motion.div
            whileHover={{ y: -4, scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
          >
            <Link
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-white text-white hover:bg-white hover:text-orange-600 transition-all duration-300"
            >
              Book this week ↗
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
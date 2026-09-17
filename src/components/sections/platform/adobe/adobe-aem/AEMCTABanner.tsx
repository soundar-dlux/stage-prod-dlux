"use client";

import { motion } from "framer-motion";

export default function AemCtaSection() {
  return (
    <section className="relative bg-black text-white overflow-hidden py-24">
      
      {/* Animated gradient blobs */}
      <div className="absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-white/20 to-gray-400/10 blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-gray-300/20 to-white/10 blur-3xl animate-pulse" />

      <div className="relative z-10 flex justify-center px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center max-w-3xl"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
            See DLUX AEM in Action
          </h2>

          <p className="mt-4 text-gray-400 text-sm md:text-lg leading-relaxed">
            Real-world success with AEM Sites & Assets delivering measurable impact.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 rounded-xl bg-neutral-800 px-8 py-4 text-sm font-medium transition hover:bg-neutral-700"
          >
            Learn More Through our Stories & Videos
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

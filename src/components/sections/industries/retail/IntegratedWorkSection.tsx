"use client";

import { motion } from "framer-motion";

const bullets = [
  "Create a centralized framework for marketing operations to eliminate silos and organized disorder.",
  "Integrate multi-tech applications to offer a comprehensive 360-degree perspective of the customer.",
  "Enhance transparency into performance metrics.",
  "Provide personalized experiences on a large scale.",
];

export default function IntegratedWorkSection() {
  return (
    <section className="w-full bg-black text-white py-6 md:py-10 lg:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative">

        {/* Glow Accent */}
        <div className="absolute inset-0 flex justify-center">
          <div className="w-[350px] h-[350px] bg-[#FE780C]/10 blur-[120px] rounded-full pointer-events-none" />
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Integrated Work <span className="text-brand-primary">
              Management</span>
          </h2>
          <span className="block text-lg sm:text-xl md:text-2xl font-semibold text-white mt-2">
            Strategies
          </span>
        </motion.div>

        {/* Bullet Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {bullets.map((text, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-[#161616] p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-start gap-4"
            >
              {/* Bullet Dot */}
              <span className="mt-2 h-3 w-3 rounded-full bg-brand-primary flex-shrink-0" />

              {/* Text */}
              <p className="text-sm sm:text-base md:text-lg leading-6 md:leading-7 text-white/90">
                {text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

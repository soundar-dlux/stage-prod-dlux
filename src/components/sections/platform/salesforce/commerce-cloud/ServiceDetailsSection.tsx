"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { memo } from "react";

interface ServiceItem {
  image: string;
  title: string;
  description: string;
}

interface Props {
  title: string;
  services: ServiceItem[];
}

function ServiceDetailsSection({ title, services }: Props) {
  return (
    <section className="relative w-full bg-brand-black text-brand-white px-4 sm:px-6 lg:px-20 py-8 lg:py-12 overflow-hidden">

      {/* ✅ Optimized Glow (lighter + GPU friendly) */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full blur-2xl opacity-10 bg-brand-primary" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full blur-2xl opacity-10 bg-brand-secondary" />

      <div className="relative max-w-7xl mx-auto">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-8 lg:mb-10"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug tracking-tight bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            {title}
          </h1>

          <div className="w-12 h-[2px] mx-auto mt-3 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary" />
        </motion.div>

        {/* GRID */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -3 }}
              className="group relative rounded-xl p-4 sm:p-5 lg:p-6 border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300"
            >
              {/* ✅ Hover Glow (cheap render) */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 blur-xl -z-10" />

              <div className="flex items-start gap-3 sm:gap-4">

                {/* ICON */}
                <motion.div whileHover={{ scale: 1.05 }} className="shrink-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={44}
                    height={44}
                    loading="lazy" // ✅ perf boost
                    className="object-contain w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12"
                  />
                </motion.div>

                {/* CONTENT */}
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white leading-snug">
                    {service.title}

                    <span className="block w-8 sm:w-10 h-[2px] mt-2 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary" />
                  </h3>

                  <p className="text-white/70 leading-relaxed text-xs sm:text-sm md:text-base mt-2">
                    {service.description}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ✅ prevent re-render if props same
export default memo(ServiceDetailsSection);
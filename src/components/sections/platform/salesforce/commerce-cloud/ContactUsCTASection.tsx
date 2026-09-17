"use client";

import { memo, useCallback } from "react";
import { motion } from "framer-motion";

interface Props {
  description?: {
    footerHeading?: string;
    footerText?: string;
  };
}

function ContactUsCTASection({ description = {} }: Props) {
  // ✅ stable function (no re-creation)
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="relative w-full bg-brand-black py-12 sm:py-14 lg:py-16 px-4 sm:px-6 overflow-hidden">

      {/* ✅ Light Glow (performance safe) */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] rounded-full blur-2xl opacity-10 bg-brand-primary" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] rounded-full blur-2xl opacity-10 bg-brand-secondary" />

      <div className="relative max-w-3xl mx-auto text-center space-y-5 sm:space-y-6">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold 
                     bg-gradient-to-r from-brand-primary to-brand-secondary 
                     bg-clip-text text-transparent leading-snug"
        >
          {description.footerHeading ||
            "Reimagine Your eCommerce Future with DLUX"}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed"
        >
          {description.footerText ||
            "Discover what's possible with a partner who understands your unique business goals. At DLUX, we don't just implement solutions—we craft experiences that connect, inspire, and drive growth."}
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <button
            onClick={scrollToTop}
            className="mt-4 sm:mt-6 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-white
                       bg-gradient-to-r from-brand-primary to-brand-secondary
                       hover:shadow-[0_0_20px_rgba(255,120,12,0.5)]
                       active:scale-95
                       transition-all duration-300"
          >
            Let’s Talk – No Cost →
          </button>
        </motion.div>

      </div>
    </section>
  );
}

// ✅ prevent unnecessary re-renders
export default memo(ContactUsCTASection);
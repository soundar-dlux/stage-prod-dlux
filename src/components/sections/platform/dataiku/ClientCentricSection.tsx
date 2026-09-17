"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { memo } from "react";

/* ---------------- Motion ---------------- */
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.15,
    },
  },
};

/* ---------------- Component ---------------- */
function ClientCentricSection() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-brand-black text-brand-white overflow-hidden">

      {/* Glow (responsive optimized) */}
      <div className="absolute top-0 left-0 w-[300px] sm:w-[500px] lg:w-[700px] h-[300px] sm:h-[500px] lg:h-[700px] rounded-full blur-3xl opacity-10 bg-[radial-gradient(circle,_#FF3901,_transparent_70%)]" />
      <div className="absolute bottom-0 right-0 w-[250px] sm:w-[400px] lg:w-[600px] h-[250px] sm:h-[400px] lg:h-[600px] rounded-full blur-3xl opacity-10 bg-[radial-gradient(circle,_#F07800,_transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center gap-10 sm:gap-14 lg:gap-20">

        {/* Content */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex-1 text-center md:text-left"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 lg:mb-8 leading-tight bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            Our Client-Centric Approach
          </h2>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto md:mx-0">
            We guide enterprises in architecting, deploying, and scaling
            Dataiku solutions with measurable outcomes — ensuring
            performance, agility, and long-term strategic impact.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex-1 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="backdrop-blur-xl p-5 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl transition-all duration-500 bg-white/5 border border-brand-primary/40 shadow-[0_20px_60px_rgba(255,57,1,0.2)]"
          >
            <Image
              src="https://images.ctfassets.net/pj0maraabon4/33XoQqCcpScsNY40RaI5nR/523cf6b5a15ba7820dd557f20277a9b4/pdiku_logo2.cfc7bcc9331b9da35545.png"
              alt="Client Centric"
              width={380}
              height={220}
              className="object-contain w-[200px] sm:w-[260px] md:w-[300px] lg:w-[340px] h-auto"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

export default memo(ClientCentricSection);
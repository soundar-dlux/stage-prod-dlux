"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { memo } from "react";

const services = [
  {
    icon: "https://images.ctfassets.net/pj0maraabon4/6LPxx39FAc2tj9bDWfysDE/99a6ad662883389ae31be4e78f3f23b0/1.png",
    title: "ML/AI Enterprise Strategy Development",
    desc: "Tailor approaches seamlessly integrating cutting-edge ML/AI, ensuring strategic alignment with business objectives for optimal data-driven success.",
  },
  {
    icon: "https://images.ctfassets.net/pj0maraabon4/1NlR2UzvEl5Sn2j8MauksV/07ba28232ee1c33a26854e6de78da499/2.png",
    title: "DSS Training & Current State Evaluation",
    desc: "Empower teams with DSS training for advanced analytics capabilities. Conduct comprehensive evaluations to identify optimization opportunities and enhance data science maturity.",
  },
  {
    icon: "https://images.ctfassets.net/pj0maraabon4/7oXAibImz0uF9tkqmYBs8S/deb3b5abe67fd24d6bdcd69e17d25f26/3.png",
    title: "COE Development",
    desc: "Lead the creation of a strategic framework empowering teams to effectively scale and optimize AI initiatives across the organization.",
  },
  {
    icon: "https://images.ctfassets.net/pj0maraabon4/3geSDbOXeFNN29Iuxyrboe/1722e4cc8caf3f772a004844ad0dc098/4.png",
    title: "Model Construction / Use Case Development",
    desc: "Develop robust ML models and real-world AI use cases tailored to solve critical business challenges with measurable outcomes.",
  },
  {
    icon: "https://images.ctfassets.net/pj0maraabon4/55w0HCjQpsirb4RLzqhkvd/a145cebb62be503a694946c9690cf1f9/5.png",
    title: "DSS Implementation & Environment Setup",
    desc: "Ensure seamless Data Science Studio implementation, establishing a scalable environment supporting advanced analytics workflows.",
  },
];

/* ---------------- Motion ---------------- */
const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ---------------- Component ---------------- */
function ServicesSection() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-brand-black text-brand-white overflow-hidden">

      {/* Glow (responsive optimized) */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] rounded-full blur-3xl opacity-10 bg-[radial-gradient(circle,_#FF3901,_transparent_70%)]" />
      <div className="absolute bottom-0 right-0 w-[300px] sm:w-[450px] lg:w-[600px] h-[300px] sm:h-[450px] lg:h-[600px] rounded-full blur-3xl opacity-10 bg-[radial-gradient(circle,_#F07800,_transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">

        {/* Title */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-10 sm:mb-14 lg:mb-16 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent"
        >
          Our Services Include
        </motion.h2>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        >
          {services.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:-translate-y-2 sm:hover:-translate-y-3"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none bg-gradient-to-b from-brand-primary/10 to-transparent" />

              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center rounded-lg sm:rounded-xl mb-4 sm:mb-6 group-hover:scale-110 transition duration-500 bg-gradient-to-br from-brand-primary/30 to-brand-secondary/30">
                <Image
                  src={item.icon}
                  alt=""
                  width={40}
                  height={40}
                  className="object-contain w-6 sm:w-8 lg:w-10 h-auto"
                />
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 text-brand-primary">
                {item.title}
              </h3>

              {/* Desc */}
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                {item.desc}
              </p>

              {/* Bottom line */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-brand-primary to-brand-secondary" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(ServicesSection);
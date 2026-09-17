"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { memo } from "react";

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

/* Data */
const services = [
  {
    title: "Marketing Cloud",
    img: "https://images.ctfassets.net/pj0maraabon4/4TzCskxtwezjOKv6ULYlyT/45a886b6dabc927db4eecf37a0e320e1/1.png",
    desc:
      "Our certified Marketing Cloud specialists design scalable, data-driven journeys that deliver the right message at the right moment—powered by a unified 360° customer view.",
  },
  {
    title: "Experience Cloud",
    img: "https://images.ctfassets.net/pj0maraabon4/21sNuQnCAztpQ07fn6r5wK/1909b0b6a988f4c1d29a7909f30cc7f4/2.png",
    desc:
      "We craft enterprise-grade digital experiences using Salesforce Experience Cloud, enabling global brands to deliver content-rich, personalized journeys.",
  },
  {
    title: "Commerce B2B & B2C",
    img: "https://images.ctfassets.net/pj0maraabon4/2kG8vHTI4XIoqroiNHcOpL/9519747de0850c6c644b4259d198fe8d/3.png",
    desc:
      "By unifying sales, service, and marketing data, we build commerce platforms that prioritize convenience, personalization, and long-term customer loyalty.",
  },
  {
    title: "Analytics & AI Mastery",
    img: "https://images.ctfassets.net/pj0maraabon4/53XQC4Z6QYNXMu2t0kDQHH/98266b187c32a71f4f7bc865ef39d8dc/4.png",
    desc:
      "Our Tableau CRM and Einstein experts help organizations unlock real-time insights and predictive intelligence to stay ahead of customer needs.",
  },
  {
    title: "Cross-Cloud Integration",
    img: "https://images.ctfassets.net/pj0maraabon4/34CYEVTSDKGTcDWzouOUU0/bb7b52d0d03d3c3bdd927b9a0785730b/5.png",
    desc:
      "We specialize in integrating Salesforce clouds and external systems, creating connected, scalable architectures that power seamless experiences.",
  },
];

/* Motion */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

/* Component */
function ServicesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8 lg:py-10">
      
      {/* Header */}
      <div className="mb-10 md:mb-12 max-w-xl">
        <span className="text-xs md:text-sm uppercase tracking-widest text-white/50">
          Services
        </span>

        <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
          Salesforce solutions built for
          <br /> scale and performance
        </h2>
      </div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((service) => (
          <motion.div
            key={service.title}
            variants={cardVariants}
            className="rounded-xl border border-white/10 p-6 transition-all duration-300 hover:translate-y-[-2px]"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <div className="mb-4 flex items-center gap-3">
              <Image
                src={service.img}
                alt={service.title}
                width={40}
                height={40}
                loading="lazy"
                sizes="40px"
                className="opacity-90"
              />

              <h3 className="text-base font-medium text-white">
                {service.title}
              </h3>
            </div>

            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              {service.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default memo(ServicesSection);
"use client";

import { motion } from "framer-motion";
import AnimatedDivider from "../../ui/Banners/AnimatedDivider";

const items = [
  {
    title: "Simplifying Operations",
    desc: "Optimize your marketing workflows by implementing tailored solutions to meet specific operational needs.",
  },
  {
    title: "Client-Centered Services",
    desc: "Prompt solutions and friendly communication, prioritizing our clients with a sense of tranquility, reassurance and empathy.",
  },
  {
    title: "Empowering Growth",
    desc: "Leading change and shaping success, empowering your company through every step of the marketing technology evolution.",
  },
  {
    title: "Partnering in MarTech",
    desc: "Your trusted partner, guiding you through the complexities of new technologies and helping you capitalize on emerging trends.",
  },
  {
    title: "Providing Continuous Support",
    desc: "Receive ongoing support and guidance from our dedicated team to ensure successful implementation and optimization.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function WhyDluxSection() {
  return (
    <section className="relative bg-[#1e1e1e] text-white py-8 lg:py-10 px-4">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-transparent blur-3xl" />

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          Why <span className="text-brand-primary">DLUX</span>
        </motion.h2>
        <AnimatedDivider/>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          transition={{ delay: 0.1 }}
          className="text-gray-400 max-w-3xl mx-auto my-10 text-md md:text-lg md:text-base"
        >
          We're not your run-of-the-mill MarTech solution partner - We drive
          tangible results, propelling your businesses toward success and
          building a strong foundation of trust, achievement, and excellence.
        </motion.p>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              transition={{ delay: index * 0.1 }}
              className={`group relative rounded-2xl border border-white/10 
              bg-white/5 backdrop-blur-sm p-8 text-center 
              hover:border-brand-primary hover:bg-white/10 
              transition-all duration-300 ease-in-out`}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-orange-500/10 to-transparent blur-xl" />

              <h3 className="text-lg md:text-xl font-semibold text-brand-primary mb-4">
                {item.title}
              </h3>

              <p className="text-gray-300 text-md leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
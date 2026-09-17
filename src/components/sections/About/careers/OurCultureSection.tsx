"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Users,
  Briefcase,
  HeartHandshake,
  Brain,
} from "lucide-react";

const cultureItems = [
  { title: "Transparency", icon: Eye },
  { title: "Diversity and Inclusion", icon: Users },
  { title: "Work-life Balance", icon: Briefcase },
  { title: "Social Responsibility", icon: HeartHandshake },
  { title: "Learning and Development", icon: Brain },
];

// animation
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true, margin: "-60px" },
};

const OurCultureSection = () => {
  return (
    <section className="relative bg-brand-black py-8 lg:py-10 px-6 lg:px-20 overflow-hidden">
      
      {/* 🌌 Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[360px] w-[360px] rounded-full bg-brand-primary/10 blur-2xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Heading */}
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-white">
            Our{" "}
            <span className="bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo bg-clip-text text-transparent">
              Culture
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-gray-300">
            We truly value our culture and live it every day. It's not just something we talk about; it's a way of life we invite you to experience. We understand how important it is to have a supportive environment, and we spare no effort to create one where you will feel right at home.
          </p>

          {/* Divider */}
          <div className="mx-auto mt-5 h-[2px] w-16 bg-brand-primary rounded-full" />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {cultureItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -4 }}
                className="group relative rounded-xl border border-white/10 bg-white/5 p-5 md:p-6
                           hover:border-brand-primary/50 hover:bg-white/10
                           transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  
                  {/* Icon */}
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-lg
                               border border-brand-primary/40 text-brand-primary
                               group-hover:bg-brand-primary group-hover:text-brand-black
                               transition-all duration-300"
                  >
                    <Icon size={22} />
                  </div>

                  {/* Title */}
                  <h3 className="text-base md:text-lg font-semibold text-brand-white">
                    {item.title}
                  </h3>
                </div>

                {/* Subtle hover line */}
                <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-brand-primary transition-all duration-300 group-hover:w-2/3 group-hover:-translate-x-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default memo(OurCultureSection);
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface StackItem {
  title: string;
  items: string[];
}

interface StackSectionProps {
  heading: string;
  description: string;
  stacks: StackItem[];
  vector1: string;
  vector2: string;
  vector3: string;
}

export default function StackSection({
  heading,
  description,
  stacks,
}: StackSectionProps) {
  return (
    <section className="my-8 lg:my-10 relative w-full px-6 overflow-hidden ">

      {/* Heading Section */}
      <div className="text-center max-w-4xl m-auto">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
        >
          {heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-[10px] text-sm sm:text-base leading-[26px] sm:leading-[28px] md:leading-[30px] text-white max-w-[900px] mx-auto"
        >
          {description}
        </motion.p>
      </div>

      {/* Stack Columns */}
<div className="mt-[40px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch lg:w-[70%] m-auto">

  {stacks.map((stack, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="
        h-full
        flex flex-col
        justify-start
        p-6 md:p-8
        rounded-2xl
        bg-white/5 backdrop-blur-sm border border-white/10
        shadow-lg
        hover:border-orange-500/50 hover:bg-white/10
        transition-all duration-300
      "
    >
      <h3 className="text-brand-primary text-[20px] sm:text-[22px] md:text-[25px] font-semibold">
        {stack.title}
      </h3>

      <ul className="mt-[12px] space-y-[8px] flex-grow">
        {stack.items.map((item, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="text-white text-sm sm:text-base"
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  ))}

</div>

    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  paragraph: string;
  author: string;
  bgImage: string;
}

interface TestimonialsSectionProps {
  headingText: string;
  testimonials: Testimonial[];
  bottomImage: string;
}

export default function TestimonialsSection({
  headingText,
  testimonials,
  bottomImage,
}: TestimonialsSectionProps) {
  const [active, setActive] = useState(0);

  return (
    <section className="mt-[40px] lg:mt-[70px] px-6 text-white">

      {/* Heading */}
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-[28px] sm:text-[36px] md:text-[45px] font-bold bg-gradient-to-t from-[#fe780c] to-[#fe3908] bg-clip-text text-transparent"
        >
          Testimonials
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        className="mt-[10px] max-w-[900px] mx-auto leading-[24px] sm:leading-[28px] md:leading-[30px] text-sm sm:text-base"

        >
          {headingText}
        </motion.p>
      </div>

      {/* Slider */}
      <div className="mt-[50px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.98 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
           className="relative mx-auto w-full sm:w-[90%] md:w-[80%]
           rounded-[20px] md:rounded-[30px]
           border border-[#bbb] bg-cover bg-center
           p-6 sm:p-10 md:p-[70px]
           hover:shadow-[7px_37px_50px_-40px_#fe3908]"

            style={{
              backgroundImage: `url(${testimonials[active].bgImage})`,
            }}
          >
            <div className="max-w-[750px]">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="leading-[24px] sm:leading-[28px] md:leading-[30px] text-sm sm:text-base"

              >
                {testimonials[active].paragraph}
              </motion.p>

              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-[30px] md:mt-[50px] text-sm md:text-[16px]"

              >
                {testimonials[active].author}
              </motion.h3>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-[25px]">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActive(index)}
              whileTap={{ scale: 0.8 }}
              animate={{
                scale: index === active ? 1.3 : 1,
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`w-[12px] h-[12px] rounded-full ${
                index === active ? "bg-[#fe3908]" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Image */}
      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
       className="flex justify-center mt-[40px] md:mt-[60px]"

      >
        <Image
          src={bottomImage}
          alt="testimonial decoration"
          width={1000}
          height={200}
          className="object-contain w-full"
        />
      </motion.div> */}
    </section>
  );
}

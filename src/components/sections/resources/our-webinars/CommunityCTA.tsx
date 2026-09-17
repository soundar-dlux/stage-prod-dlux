"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";


const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // ✅ correct easing
    },
  },
};


export default function CommunityCTA() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden py-[130px] bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.ctfassets.net/pj0maraabon4/296XnXzXCaUOJFkVDQY0eS/7fcc11cba6a8ae90885cdecd70c9ba46/community-image-01..png"
          alt="Community background"
          fill
          priority
          className="object-cover opacity-80"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-10">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-6xl"
        >
          Join our AI & Martech Innovation Center community
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg md:text-xl text-white max-w-2xl mx-auto"
        >
          The Place where Experts and Enthusiasts connect to shape the future of
          Technology and Marketing!
        </motion.p>

        <Link
          href="https://www.linkedin.com/groups/15366010/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.button
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4 }}
            className="mt-6 px-6 py-3 bg-white text-[#ff3901] font-semibold rounded-full shadow-md hover:bg-gray-200 hover:text-black transition"
          >
            JOIN NOW
          </motion.button>
        </Link>
      </div>
    </section>
  );
}

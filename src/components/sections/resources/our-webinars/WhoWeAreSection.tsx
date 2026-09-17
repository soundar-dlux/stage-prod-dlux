"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Benefit {
  id: number;
  icon: string;
  title: string;
}

const benefits: Benefit[] = [
  {
    id: 1,
    icon: "https://images.ctfassets.net/pj0maraabon4/3ZALbYrFUyfd79jmP338zw/0705372f0ef3973b91c3205de0e6c458/Certified___Industry_Expertise.png",
    title: "Certified & Industry Expertise",
  },
  {
    id: 2,
    icon: "https://images.ctfassets.net/pj0maraabon4/l2AbpSmHDR0A38AmpG1jW/eea06b1b63c4b5ca3c26d90fa63f9d91/Center_of_Excellence_Approachâ____New.png",
    title: "Center of Excellence Approach",
  },
  {
    id: 3,
    icon: "https://images.ctfassets.net/pj0maraabon4/6EXom6NVRFIbjMLVYtwUvY/33db6391f6f82b6e9bdf22ca8dde5427/End-to-End_Solution.png",
    title: "End-to-End Solution",
  },
  {
    id: 4,
    icon: "https://images.ctfassets.net/pj0maraabon4/1bPWgVpQL3nbFGXR8Az5nj/3b427b9301a087f241c3608e7376b72a/Trusted_by_Global_Enterprisesâ__.png",
    title: "Trusted by Global Enterprises",
  },
];

export default function WhoWeAreSection() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-black text-white px-6 md:px-10 lg:py-[60px] lg:flex gap-10 justify-evenly">
      {/* Glow */}
      <div className="absolute top-[20%] left-[40%] w-80 h-80 rounded-full bg-gradient-to-r from-[#F12D06] to-[#F17C06] blur-[120px] opacity-70 z-0" />

      {/* Left */}
      <motion.div
        className="relative lg:w-1/2 space-y-6 z-10"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl lg:text-5xl font-bold">
          WHY ATTEND DLUX WEBINAR
        </h2>

        <p className="max-w-2xl text-justify leading-relaxed">
         As a Top leading Martech business consulting firm in Sydney, Australia, DLUX brings together strategy and technology to help you master complex projects, scale your marketing and technology operations, and stay ahead in the fast-changing AI & Martech. 
        </p>

        <ul className="space-y-3">
          {[
            "Deep Dives – Learn the why and the how, not just the features",
            "Case Studies – Real client success brought vividly to life today",
            "Expert Insights – Tech-certified pros and DLUX CoE leaders share expertise",
            "Live Q&A – Ask, interact, and get instant answers from experts",
            "On-Demand – Replay anytime, anywhere with ease on your schedule",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 items-start">
              <span className="mt-2 h-2 w-2 rounded-full bg-white" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link href="/contact-us">
          <motion.button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            whileHover={{ scale: 1.05 }}
            className="relative mt-6 flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#ff3901] to-[#F07800] text-white font-medium overflow-hidden"
          >
            {hovered && (
              <motion.span
                className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full border border-white/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}

            <span className="relative z-10">Contact Us</span>

            <div className="relative w-5 h-5 overflow-hidden z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={hovered ? "hover" : "normal"}
                  initial={{ x: hovered ? -20 : 0, opacity: hovered ? 0 : 1 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute"
                >
                  <ArrowRight size={18} />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.button>
        </Link>
      </motion.div>

      {/* Right */}
      <motion.div
        className="lg:w-2/5 z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h3 className="text-2xl font-semibold mb-6">
          BENEFITS OF CHOOSING US
        </h3>

        <div className="md:flex gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="flex flex-col items-center justify-center md:w-[240px] md:h-[222px] p-6 text-center bg-white border border-[#F07800] hover:bg-[#ffe0c8] transition rounded-lg"
            >
              <Image
                src={benefit.icon}
                alt={benefit.title}
                width={80}
                height={80}
                className="mb-3"
              />
              <h4 className="text-lg font-medium text-black">
                {benefit.title}
              </h4>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FiChevronsDown } from "react-icons/fi";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const fadeUpVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};


const fadeLeftVariant:Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const socialContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const socialItem:Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
    },
  },
};

export default function HeroSection() {
  return (
    <section
      className="
        relative
        w-full
        min-h-screen
        bg-cover
        bg-center
        pt-[150px]
        lg:pt-4
        content-center
      "
      style={{
        backgroundImage:
          "url('https://images.ctfassets.net/pj0maraabon4/2hm6Mm2p7tipTtFvqVqkqW/84d2f24a63db2c656f5ce11316c222cf/hero-section-image-02.png')",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col lg:flex-row items-center justify-between px-6 md:px-24">
        <div className="flex-1 hidden md:block" />

        {/* Text Content */}
        <div className="flex-1 text-center md:text-left text-white max-w-2xl pr-6 content-center">
          <motion.h1
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            MarTech Secrets, Straight from the Frontlines
          </motion.h1>

          <motion.p
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="text-base md:text-[16px] mb-6"
          >
            Join DLUX experts, certified consultants, and industry leaders as they
            unpack real-world use cases, seamless integrations, and future-ready
            strategies across Martech, AI, and enterprise innovation.
          </motion.p>

          <motion.a
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            onClick={() =>
              document
                .getElementById("webinar-vid-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center text-[16px] font-medium cursor-pointer hover:underline"
          >
            Missed it live? Catch the insights anytime
            <FiChevronsDown className="ml-2 w-4 h-4" />
          </motion.a>
        </div>
      </div>

      {/* Bottom Card */}
      <motion.div
        variants={fadeLeftVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative lg:absolute mt-6 lg:bottom-8 lg:left-[10%] lg:w-[30%]"
      >
        <Image
          src="https://images.ctfassets.net/pj0maraabon4/7dbPjWvs07gN4wNsaCMprY/9db604b3fbf6e6eb5770c8d8b9b7402e/webinar-hero-section-02.png"
          alt="Webinar"
          width={600}
          height={400}
          className="relative w-[95%]"
        />

        <div className="bg-[#0a1631]/60 backdrop-blur-md border border-white/20 p-6 rounded-lg text-white w-[70%] mx-auto text-center">
          <p className="text-sm uppercase tracking-widest mb-1 font-semibold">
            Limited Seat
          </p>
          <h3 className="text-lg md:text-2xl font-semibold mb-3">
            LIVE. ON-DEMAND
          </h3>
          <button className="px-4 py-2 border border-white rounded-full text-sm hover:bg-white hover:text-[#0a1631] transition">
            START DIGGING DEEPER
          </button>
        </div>
      </motion.div>

      {/* Social Icons */}
      <motion.div
        variants={socialContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative lg:absolute lg:bottom-8 lg:right-16 flex gap-4 text-white text-lg justify-center mt-8"
      >
        {[
          { Icon: FaFacebookF, href: "https://www.facebook.com/DLUXTech/" },
          { Icon: FaTwitter, href: "https://x.com/Dlux_Tech" },
          { Icon: FaLinkedinIn, href: "https://www.linkedin.com/company/dlux-tech-corp" },
          { Icon: FaInstagram, href: "https://www.instagram.com/dlux_tech/" },
        ].map(({ Icon, href }, i) => (
          <motion.a
            key={i}
            variants={socialItem}
            href={href}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="hover:text-[#ff3901] transition" />
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

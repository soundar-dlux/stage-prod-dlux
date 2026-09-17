"use client";

import { motion, Variants, Easing } from "framer-motion";
import Link from "next/link";
import AnimatedDivider from "../../ui/Banners/AnimatedDivider";
import Image from "next/image";

const items = [
  {
    title: "Digital and MarTech Consulting",
    icon: "https://images.ctfassets.net/pj0maraabon4/78Nc9UYqvJSD9HtgIrsy19/bdb232199f1c01feeb3c4efe5290f342/clarification.png",
    link: "/services/digital-martech-consulting",
  },
  {
    title: "Content Management and DAM",
    icon: "https://images.ctfassets.net/pj0maraabon4/4VGMaV8oc2Mpv5dJLFrrVi/dd2d322ef48098366177cfa65b2ed4da/digital-asset.png",
    link: "/services/content-management",
  },
  {
    title: "Training and Change Management",
    icon: "https://images.ctfassets.net/pj0maraabon4/2y1bJvuysPZLAJLVRph9Ve/91a66a515ed73fbd03aeb33d13be7cee/training.png",
    link: "/services/training-change",
  },
  {
    title: "Managed Application Services",
    icon: "https://images.ctfassets.net/pj0maraabon4/3qhGNGpgpPMoL9XBDGwW0S/dbe18e00776ad91dc5d0a0928dc7d727/software.png",
    link: "/services/managed-services",
  },
];

/* ✅ Proper easing type */
const easeOutExpo: Easing = [0.22, 1, 0.36, 1];

/* ✅ Container animation */
const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

/* ✅ Fade Up animation */
const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easeOutExpo,
    },
  },
};

export default function ServiceGridSection() {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-black via-[#1a0f0a] to-black text-white">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="max-w-7xl mx-auto text-center"
      >
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-5xl font-semibold mb-4"
        >
          What <span className="text-brand-primary">We Do</span>
        </motion.h2>

        {/* Divider */}
        <motion.div variants={fadeUp}>
          <AnimatedDivider />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="text-gray-400 max-w-2xl mx-auto my-10 text-md md:text-lg"
        >
          At the heart of our commitment lies more than services; we embark on a
          journey to understand our customers' intricate needs. We don't just
          open a portal; we create a custom tunnel that seamlessly aligns with
          your unique requirements. DLUX specializes in creating competitive
          advantages and driving profit through MarTech stack integration.
        </motion.p>

        {/* Cards */}
        <motion.div
          variants={container}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{
                y: -8,
                scale: 1.03,
                transition: { duration: 0.3, ease: easeOutExpo },
              }}
              whileTap={{ scale: 0.97 }}
              className="group rounded-2xl border border-white/10 bg-gradient-to-b from-[#1a0f0a] to-black p-6 backdrop-blur-lg shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: easeOutExpo,
                }}
                viewport={{ once: true }}
                className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full bg-orange-500/10 text-2xl group-hover:bg-orange-500/20 transition"
              >
               <Image
    src={item.icon}
    alt={item.title}
    width={32}
    height={32}
    className="object-contain"
  />
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-3">
                <Link
                  href={item.link}
                  className="hover:text-brand-primary transition-colors duration-300"
                >
                  {item.title}
                </Link>
              </h3>

              {/* Underline hover animation */}
              <motion.div
                className="h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto"
                initial={{ width: 0 }}
                whileHover={{ width: "60%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
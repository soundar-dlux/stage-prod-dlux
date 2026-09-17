"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { memo } from "react";

const items = [
  {
    no: "01",
    title: "Dataiku Focus and Integration",
    desc: "As a Dataiku-first partner, our tight integration with their sales and engineering teams allows us to efficiently provide answers and solutions.",
    image:
      "https://images.ctfassets.net/pj0maraabon4/59em7Iq7nyzU2lFuJj3ilc/cb6ffbbe62af26d38d23b5a7ae2fc707/1.png",
  },
  {
    no: "02",
    title: "One-Stop Partner",
    desc: "As a comprehensive partner, we take charge of building, managing, coaching, and teaching teams on Dataiku, utilizing the best mindsets, skillsets, and toolsets in the industry.",
    image:
      "https://images.ctfassets.net/pj0maraabon4/7EvgRmto8DB4pSy4WLkFkZ/3cbadc3e0d5c50d801fba4184f3853b7/2.png",
  },
  {
    no: "03",
    title: "Risk Reduction",
    desc: "By tapping into our Dataiku experts, critical path project risks are significantly reduced, ensuring successful outcomes.",
    image:
      "https://images.ctfassets.net/pj0maraabon4/3pUEvXlfF15iUprbNt5ia/bbd139609e8daa252c52a2457517dd01/3.png",
  },
  {
    no: "04",
    title: "Reduced Rework",
    desc: "Our experts ensure correct architecture and solution decisions from the start, minimizing technical debt and avoiding prolonged maintenance modes.",
    image:
      "https://images.ctfassets.net/pj0maraabon4/YhKfdrOiW6hRXdDJs1Whf/d721612db1dc5c6d09b7c788df77d1a0/4.png",
  },
  {
    no: "05",
    title: "Outcome Focus",
    desc: "We prioritize positive business outcomes over mere outputs, aligning our efforts to drive value and effective decision-making.",
    image:
      "https://images.ctfassets.net/pj0maraabon4/1dDjBwlcOJcS9pQieyzXgB/4646e9657635459f7e197b2944380ddd/5.png",
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
  hidden: { opacity: 0, y: 40 },
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
function DifferentiatorsSection() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-brand-black text-brand-white overflow-hidden">

      {/* Glow optimized */}
      <div className="absolute top-0 left-0 w-[400px] sm:w-[700px] lg:w-[900px] h-[400px] sm:h-[700px] lg:h-[900px] rounded-full blur-3xl opacity-10 bg-[radial-gradient(circle,_#FF3901,_transparent_70%)]" />
      <div className="absolute bottom-0 right-0 w-[300px] sm:w-[600px] lg:w-[800px] h-[300px] sm:h-[600px] lg:h-[800px] rounded-full blur-3xl opacity-10 bg-[radial-gradient(circle,_#F07800,_transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">

        {/* Title */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 sm:mb-16 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent"
        >
          DLUX Dataiku Differentiators
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12 sm:space-y-16 lg:space-y-20"
        >
          {items.map((item, index) => {
            const isReverse = index % 2 !== 0;

            return (
              <motion.div
                key={item.no}
                variants={fadeUp}
                className={`flex flex-col ${
                  isReverse ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-8 sm:gap-12 lg:gap-16`}
              >
                {/* Image */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="w-full md:w-1/2 flex justify-center"
                >
                  <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px] lg:w-[340px] lg:h-[340px] backdrop-blur-xl rounded-2xl lg:rounded-3xl bg-white/5 border border-brand-primary/30 shadow-[0_20px_60px_rgba(255,57,1,0.2)]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-6 sm:p-8 lg:p-10"
                    />
                  </div>
                </motion.div>

                {/* Text */}
                <div className="w-full md:w-1/2 text-center md:text-left">

                  {/* Number */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 bg-gradient-to-b from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                    {item.no}
                  </h1>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-brand-white">
                    {item.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto md:mx-0">
                    {item.desc}
                  </p>

                  {/* Divider */}
                  <div className="mt-4 sm:mt-6 h-[3px] w-16 sm:w-20 rounded-full mx-auto md:mx-0 bg-gradient-to-r from-brand-primary to-brand-secondary" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(DifferentiatorsSection);
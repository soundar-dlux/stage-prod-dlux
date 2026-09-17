"use client";

import Image from "next/image";
import { memo } from "react";
import { motion, Variants } from "framer-motion";

type CoreValue = {
  img: string;
  title: string;
  desc: string;
};

const values: CoreValue[] = [
  {
    img: "https://images.ctfassets.net/pj0maraabon4/7cxn2LphuTW4dNdwKYmCRl/55ed6924dc961d7548cb160e91c34972/Fostering_Transparency.webp",
    title: "Fostering Transparency",
    desc: "Building a workplace where clarity thrives",
  },
  {
    img: "https://images.ctfassets.net/pj0maraabon4/1IZ9q2bSQ1kkNhtc0fPAY6/0a913d0812a98a12048253639c7f4b96/empowering-growth.webp",
    title: "Empowering Growth",
    desc: "Transforming aspirations into meaningful actions",
  },
  {
    img: "https://images.ctfassets.net/pj0maraabon4/l8KyG9elCVVBR3qQOMZhS/c26d6d1cb7eb408c3893a304750d72a3/Engineering_Together.webp",
    title: "Innovation Together",
    desc: "Joining forces and achieving greatness hand in hand",
  },
  {
    img: "https://images.ctfassets.net/pj0maraabon4/4MifZez2g0hAysgCaXeHsK/db3757866f4c69560583f48621e5822e/Customer-Centric_Excellence.webp",
    title: "Customer-Centric Excellence",
    desc: "Where your satisfaction is our sole focus and passion",
  },
  {
    img: "https://images.ctfassets.net/pj0maraabon4/39kND1OoojxYiRCiyL25v/af59574d10cf8584956b00647d4a2354/Seamless_Adaptation.webp",
    title: "Seamless Adaptation",
    desc: "Embracing new technologies with swift precision",
  },
  {
    img: "https://images.ctfassets.net/pj0maraabon4/402HbQM3BBvjpZXWBJi60c/609f53174cbf5cd6dfb5b7b005c44014/Crafting_Trust.webp",
    title: "Crafting Trust",
    desc: "Unwavering integrity at every stage of our journey",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const ValueCard = memo(({ value }: { value: CoreValue }) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      className="group relative will-change-transform"
    >
      {/* Glow Border */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: `linear-gradient(135deg, #FF3901, transparent 70%)`,
        }}
      />

      {/* Card */}
      <div className="relative h-full flex flex-col bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.06]">

        {/* Image */}
        <div className="relative w-full h-[180px] md:h-[200px] overflow-hidden">
          <Image
            src={value.img}
            alt={value.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-5 md:p-6 text-center text-brand-white">
          <h3 className="text-lg md:text-xl font-semibold mb-2">
            {value.title}
          </h3>

          <div className="w-10 h-[2px] bg-brand-primary mx-auto mb-3 group-hover:w-16 transition-all duration-300" />

          <p className="text-white/60 text-sm leading-relaxed">
            {value.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

ValueCard.displayName = "ValueCard";

export default function CoreValuesSection() {
  return (
    <section className="relative bg-brand-black text-brand-white py-8 lg:py-10 px-6 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <p className="text-xs uppercase tracking-[5px] text-brand-primary mb-3">
            Principles That Matter
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            Core <span className="text-brand-primary">Values</span>
          </h2>

          <div className="mx-auto mt-5 h-[2px] w-16 bg-brand-primary rounded-full" />
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {values.map((value) => (
            <ValueCard key={value.title} value={value} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
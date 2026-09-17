"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const items = [
  {
    title: "Our Mission",
    desc: "To Craft Martech excellence, tailored to your needs, driven by precision and diligence. We are leading AI, MarTech, and AdTech professional service Providers in the US, India, APAC region empowering businesses with innovative solutions.",
    img: "https://images.ctfassets.net/pj0maraabon4/5DnsnHjrkgtoxjaitx9r1S/a4da4e2bd0fc6d3ed3f783b01e6be7b3/Mask_Group_120.png",
  },
  {
    title: "Our Vision",
    desc: "To redefine the future of marketing through AI, MarTech, and AdTech. We envision a landscape where seamless experiences and excellence converge within the organization.",
    img: "https://images.ctfassets.net/pj0maraabon4/4sSwBOJCsSiBfXokOjfAME/176416087eb598466afebcee42f25ecf/Mask_Group_119.png",
  },
  {
    title: "Our Motto",
    desc: "Embracing tomorrow, empowering today - where AI, martech, and adtech unlock limitless possibilities and customer satisfaction drives success.",
    img: "https://images.ctfassets.net/pj0maraabon4/22mveXVtS2mU578nGuBarS/fd26155886a697cfc01150e12da4bb0c/Mask_Group_121.png",
  },
];

export default function CoreValuesSection() {
  return (
    <section className="relative overflow-hidden bg-brand-black text-brand-white py-8 lg:py-10">

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-primary/20 blur-[160px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-brand-secondary/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-12 md:mb-14 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            Mission · Vision ·{" "}
            <span className="bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo bg-clip-text text-transparent">
              Motto
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-gray-400">
            The core principles that define who we are and guide our innovation forward.
          </p>

          <div className="mx-auto mt-5 h-[2px] w-20 bg-brand-primary rounded-full" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl p-8 md:p-10 text-center border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-brand-primary/40 hover:bg-white/10 hover:shadow-[0_0_60px_rgba(255,57,1,0.25)]"
            >

              {/* Icon */}
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/10 transition-all duration-500 group-hover:scale-110">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={48}
                  height={48}
                  quality={80}
                />
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 transition-colors duration-300 group-hover:text-brand-primary">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base leading-relaxed text-gray-300">
                {item.desc}
              </p>

              {/* Hover Line */}
              <div className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gradient-to-r from-transparent via-brand-primary to-transparent transition-all duration-500 group-hover:w-2/3 group-hover:-translate-x-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
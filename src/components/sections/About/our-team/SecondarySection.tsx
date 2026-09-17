"use client";

import { SecondaryImage } from "@/src/app/about/our-team/types";
import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  secondaryImage: SecondaryImage;
};

export default function SecondarySection({ secondaryImage }: Props) {
  if (!secondaryImage?.url) return null;

  return (
    <section className="relative w-full overflow-hidden bg-brand-black py-8 lg:py-10 px-6">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-neutral-950 to-brand-black" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[160px]" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-brand-secondary/20 rounded-full blur-[160px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* CONTENT */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 lg:gap-20">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-60px" }}
            className="group relative w-full md:w-5/12"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-brand-primary/20 shadow-[0_30px_80px_rgba(0,0,0,0.6)] bg-white/5 backdrop-blur-xl">

              <Image
                src="https://images.ctfassets.net/pj0maraabon4/6vjTOIfVnWD6oh3uVyJ8kb/61cf2d87da770cdd38c049bf70ba04bd/multiracial-diverse-business-people-formal-wear-celebrating-success-work-gesturing.webp"
                alt={secondaryImage.title}
                fill
                className="object-cover transition-transform duration-[2500ms] ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 40vw"
                quality={80}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            viewport={{ once: true, margin: "-60px" }}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <h3 className="text-brand-white font-semibold tracking-tight leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              {secondaryImage.title}
            </h3>

            {/* Divider */}
            <div className="mt-5 h-[3px] w-20 md:w-24 mx-auto md:mx-0 rounded-full bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo" />

            <p className="mt-6 md:mt-8 text-neutral-300 leading-relaxed text-sm sm:text-base md:text-lg max-w-xl mx-auto md:mx-0">
              {secondaryImage.description}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
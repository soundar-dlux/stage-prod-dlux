"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PromoSection() {
  return (
    <section className="relative bg-black py-20 px-6 overflow-hidden">
      <div className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden">
        {/* Animated Gradient Background */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 bg-gradient-to-r from-[#FF3901] via-[#ff6a00] to-[#F07800] bg-[length:200%_200%]"
        />

        {/* Soft Overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Decorative Left Shape (Floating) */}
        {/* Decorative Left Shape */}
        <div className="absolute left-0 bottom-0 opacity-50">
          <Image
            src="https://images.ctfassets.net/pj0maraabon4/6xK5wGz58H7PAxcEbdzXkG/06e4fcb98b0c9503fd5f46be10a259db/Group.png"
            alt="left shape"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>

        {/* Decorative Right Shape */}
        <div className="absolute right-0 top-1/3 opacity-40">
          <Image
            src="https://images.ctfassets.net/pj0maraabon4/49kEr8ZDQdcyEw6p9eyKrX/ef47f2472eed9742542d33153dc1e068/Group__2_.png"
            alt="right shape"
            width={180}
            height={180}
            className="object-contain invert"
          />
        </div>

        {/* Top Center Logo Glow */}
        <div className="absolute left-1/2 -translate-x-1/2 top-10 z-10">
          <Image
            src="https://images.ctfassets.net/pj0maraabon4/20Cm4vQKdWO3oGTR7EfsgX/56db8cb20ac01762a386d4b1ca2aa208/Group__1_.png"
            alt="Top Shape"
            width={110}
            height={60}
            className="object-contain invert opacity-20 drop-shadow-[0_4px_20px_rgba(255,255,255,0.3)]"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 grid lg:grid-cols-2 items-center gap-12 px-8 md:px-16 pt-24 pb-0">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-white max-w-xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              Top 10 Agentic AI Use Cases 
            </h2>

            <p className="text-white/90 text-lg leading-relaxed mb-8">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry{"'"}s standard dummy
              text ever since the 1500s.
            </p>

            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                href="#"
                className="inline-flex items-center justify-center bg-black text-white px-8 py-4 rounded-full font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:bg-neutral-900 transition-all duration-300"
              >
                DOWNLOAD PDF
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE (Parallax Feel) */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-end"
          >
            <Image
              src="https://images.ctfassets.net/pj0maraabon4/1gb4RQddWU1voa1uvhoY11/b7d2fa73578290d326840027d187632c/f4a698bdc8b39cb088612e01baedb8a4562542fb.png"
              alt="VR user"
              width={520}
              height={650}
              priority
              className="object-contain max-h-[600px] w-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

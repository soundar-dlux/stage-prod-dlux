"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AiSplitSection() {
  const premiumEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section className="bg-black text-white py-28 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-stretch">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-between h-full space-y-10">

          {/* Main Card (Increased Size) */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: premiumEase }}
            viewport={{ once: true }}
            className="border border-white/10 rounded-3xl p-14 
                       bg-gradient-to-b from-white/5 to-white/10 
                       backdrop-blur-xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
              Contrary to popular belief,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                Lorem Ipsum
              </span>
            </h2>

            <p className="text-neutral-400 leading-relaxed text-lg max-w-xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry’s standard dummy text
              ever since the 1500s.
            </p>
          </motion.div>

          {/* Feature Cards (Bigger + Equal Width) */}
          <div className="grid sm:grid-cols-2 gap-8">
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="border border-white/10 rounded-2xl p-8 
                         bg-gradient-to-b from-white/5 to-white/10 
                         backdrop-blur-xl"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 
                                flex items-center justify-center 
                                text-orange-500 text-xl">
                  ✦
                </div>
                <h4 className="font-semibold text-xl">Lorem Ipsum</h4>
              </div>

              <p className="text-neutral-400 leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and
                typesetting industry.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="border border-white/10 rounded-2xl p-8 
                         bg-gradient-to-b from-white/5 to-white/10 
                         backdrop-blur-xl"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 
                                flex items-center justify-center 
                                text-orange-500 text-xl">
                  ✦
                </div>
                <h4 className="font-semibold text-xl">Lorem Ipsum</h4>
              </div>

              <p className="text-neutral-400 leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and
                typesetting industry.
              </p>
            </motion.div>

          </div>
        </div>

        {/* RIGHT SIDE IMAGE (Full Height Match) */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: premiumEase }}
          viewport={{ once: true }}
          className="relative h-full min-h-[650px] 
                     rounded-3xl overflow-hidden 
                     border border-white/10"
        >
          <Image
            src="https://images.ctfassets.net/pj0maraabon4/7qrQLGC3CYh3SHYYvbR6qo/c652cada633a523313403d3e98f989b1/1239967efcbf104ee65ee5f271cd19b29f3bf586.jpg"
            alt="AI Robot"
            fill
            className="object-cover"
            priority
          />

          {/* Subtle Premium Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t 
                          from-black/40 via-transparent to-transparent" />
        </motion.div>

      </div>
    </section>
  );
}
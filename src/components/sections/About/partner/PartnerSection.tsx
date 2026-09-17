"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const partners = [
  { name: "Adobe", logo: "https://images.ctfassets.net/pj0maraabon4/zh2GE5gTOKAnAcvc98Oav/4057ce472c9ef708ebab5a86ae52aaf5/2.png" },
  { name: "MediaValet", logo: "https://images.ctfassets.net/pj0maraabon4/3BUTd0cQylZlnmje8wqYo0/e4df3be706ae90fb5edc24f0293a10e0/1.png" },
  { name: "Aprimo", logo: "https://images.ctfassets.net/pj0maraabon4/4Qu6BZi0xDmXsDUSi0etHq/63f2f6cd13353c718abf4a17927602fe/Aprimo_Logo_Pulse_Gradient_RGB.png" },
  { name: "Salesforce", logo: "https://images.ctfassets.net/pj0maraabon4/3kJZWmK18wPsqzTO2eaS9d/7724612e433fba2680efb70a9eb680e5/4.png" },
  { name: "Dataiku", logo: "https://images.ctfassets.net/pj0maraabon4/6ahVtlwUqsXRkgag1jbpbl/300ba612b38a1c4e0c4cefab29ad702a/5.png" },
];

export default function PartnerSection() {
  return (
    <section className="relative w-full bg-brand-black text-brand-white py-8 lg:py-10 overflow-hidden">

      {/* Heading */}
      <div className="relative z-10 text-center mb-12 md:mb-16 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-60px" }}
          className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight"
        >
          A Solid{" "}
          <span className="bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo bg-clip-text text-transparent">
            Partnership
          </span>
        </motion.h2>

        {/* Divider */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="h-[2px] bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo mx-auto mt-5"
        />

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mt-6 max-w-2xl mx-auto text-white/70 text-sm sm:text-base md:text-lg leading-relaxed"
        >
          At the heart of our success lies a solid network of collaborative partnership that fosters a constant trade of ideas and propels the engine of innovation. We partner up to navigate the ever-changing tech world, creating solutions that set new industry standards.
        </motion.p>
      </div>

      {/* Premium Card Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 md:p-12 lg:p-14">

          {/* Inner glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

          {/* Logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-10 items-center">
            {partners.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 0.9, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true, margin: "-40px" }}
                className="flex items-center justify-center group relative"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 blur-xl rounded-full" />

                <Image
                  src={item.logo}
                  alt={item.name}
                  width={120}
                  height={50}
                  className="object-contain rounded-xl  opacity-100 group-hover:grayscale-100 group-hover:opacity-70 group-hover:scale-105 transition duration-500 "
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-black to-transparent pointer-events-none" />
    </section>
  );
}
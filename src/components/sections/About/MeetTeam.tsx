"use client";

import { motion } from "framer-motion";

export default function TeamShowcaseSection() {
  return (
    <section className="relative bg-brand-black text-brand-white py-8 lg:py-10 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/3 top-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-brand-primary/10 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Label */}
          <p className="text-xs tracking-[5px] text-brand-primary uppercase mb-4">
            Our People
          </p>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold leading-tight mb-6">
            Meet the{" "}
            <span className="bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo bg-clip-text text-transparent">
              Minds
            </span>
            <br className="hidden md:block" />
            Behind the Work
          </h2>

          {/* Divider */}
          <div className="h-[2px] w-20 bg-brand-primary mb-6 rounded-full" />

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-white/65 leading-7 max-w-lg">
            Meet our team — a group of driven individuals bringing diverse
            skills and perspectives. With dedication and passion, we turn
            "AI , Martech and Adtech Excellence" into a powerful reality every single day.
          </p>
        </motion.div>

        {/* Video Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Glow Pulse */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute h-[300px] w-[300px] md:h-[340px] md:w-[340px] rounded-full bg-brand-primary/10 blur-[110px]"
          />

          {/* Circle Frame */}
          <div className="relative p-[2px] rounded-full bg-gradient-to-br from-brand-gradientFrom to-brand-gradientTo shadow-[0_0_40px_rgba(255,57,1,0.25)]">
            <div className="relative h-[240px] w-[240px] md:h-[300px] md:w-[300px] lg:h-[340px] lg:w-[340px] rounded-full bg-black/70 backdrop-blur-xl overflow-hidden">
              
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className="h-full w-full object-cover rounded-full"
              >
                <source
                  src="https://videos.ctfassets.net/pj0maraabon4/5fvNQYRVZRfAS9UVjnDSv6/ca86923abfaadff81afda26a91b35810/about-circle.mp4"
                  type="video/mp4"
                />
              </video>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
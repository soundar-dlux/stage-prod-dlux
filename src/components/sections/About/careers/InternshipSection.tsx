"use client";

import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import { motion } from "framer-motion";
import PrimaryButton from "@/src/components/ui/Buttons/PrimaryButton";

const IMAGE_SRC =
  "https://images.ctfassets.net/pj0maraabon4/6Eem3GfE7hTKq84PW2gQj0/59d1281820faf09b1b3c55829c2c95e0/facilitate-student-internship-programs-ar-generative-ai.jpg";

const InternshipSection = () => {
  return (
    <section className="relative bg-brand-black py-8 lg:py-10 px-6 lg:px-20 overflow-hidden">
      
      {/* 🌌 Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 -left-28 h-[260px] w-[260px] rounded-full bg-brand-primary/10 blur-2xl" />
        <div className="absolute bottom-0 right-0 h-[200px] w-[200px] rounded-full bg-brand-primary/5 blur-2xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-lg text-center lg:text-left"
        >
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-white mb-4 tracking-tight">
            Internship{" "}
            <span className="bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo bg-clip-text text-transparent">
              Opportunities
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
            Are you drowning in the endless pursuit of the ideal internship, causing doubt and frustration? You're not the only one grappling with these obstacles. DLUX understands the struggles of navigating the job market and securing meaningful experiences. Our mission is to offer guidance, assistance, and tools to empower you to overcome barriers. With our customized approach and expert insights, you can fearlessly plan a course toward your desired career.
          </p>

          {/* CTA */}
          <div className="mt-7 flex justify-center lg:justify-start">
            <Link
              href="https://careers.dluxtech.com/jobs/Careers"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PrimaryButton>Apply Now</PrimaryButton>
            </Link>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-60px" }}
          className="relative w-full max-w-lg"
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
            
            <Image
              src={IMAGE_SRC}
              alt="Internship growth illustration"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
              quality={80}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(InternshipSection);
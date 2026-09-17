"use client";

import Link from "next/link";
import { memo } from "react";
import SecondaryButton from "@/src/components/ui/Buttons/SecondaryButton";

const VIDEO_SRC =
  "https://videos.ctfassets.net/pj0maraabon4/5Fa9gwwCfPLAc314Gl6cjx/c66a91041d9d9e857ce62064ab61d02e/cgiftop.c4e5b5ba4340bf1f0a2d.mp4";

const BuildCareerSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-brand-black py-8 lg:py-10 px-6 lg:px-24">
      
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-brand-primary/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
        
        {/* 🎥 Video */}
        <div className="hidden lg:block">
          <video
            className="w-[280px] xl:w-[320px] rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)]"
            src={VIDEO_SRC}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
          />
        </div>

        {/* 📄 Content */}
        <div className="max-w-xl text-center lg:text-left">
          
          {/* Badge */}
          <span className="inline-block mb-4 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs sm:text-sm text-gray-300">
            Careers at DLUX
          </span>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-brand-white">
            Build a{" "}
            <span className="bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo bg-clip-text text-transparent">
              Career
            </span>
          </h2>

          {/* Description */}
          <p className="mt-5 text-sm sm:text-base md:text-lg leading-relaxed text-gray-300">
            Are you tired of feeling like your hard work goes unnoticed? Well, look no further because DLUX is here to change that! Our platform is all about valuing your work and ensuring you get the recognition you deserve. DLUX is the perfect foundation for your career to help you hit new heights and attain your aspirations. We cultivate a culture that honors values and customs. Excited to join the DLUX family? You're just a click away!
          </p>

          {/* CTA */}
          <div className="mt-8 flex justify-center lg:justify-start">
            <Link
              href="https://careers.dluxtech.com/jobs/Careers"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SecondaryButton>
                Explore Jobs →
              </SecondaryButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(BuildCareerSection);
"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface SolutionCardProps {
  acronym: string;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({
  acronym,
  title,
  description,
  href = "#",
  className = "",
}) => {
  return (
    <div
      className={`relative flex flex-col justify-between w-full max-w-[400px] min-h-[350px] bg-white rounded-[20px] border-[3px] border-transparent [background-image:linear-gradient(#ffffff,#ffffff),linear-gradient(131.12deg,#FFFFFF_-0.61%,#E13207_126.86%)] [background-origin:border-box] [background-clip:padding-box,border-box] p-6 sm:pt-[30px] sm:pr-[40px] sm:pb-[30px] sm:pl-[40px] shadow-lg shadow-[#FF4F00]/5 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF4F00]/10 flex-shrink-0 box-border ${className}`}
    >
      <div>
        {/* Top Header Row: Acronym & 4-Dot Constellation Graphic */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-2xl sm:text-[32px] font-extrabold text-[#FF4F00] tracking-tight uppercase">
            {acronym}
          </h3>

          {/* Decorative 4-Dot Constellation Pattern */}
          <div className="relative w-8 h-8 shrink-0">
            <span className="absolute top-0 left-1 w-3 h-3 rounded-full bg-[#FF4F00]" />
            <span className="absolute top-1.5 right-0 w-2 h-2 rounded-full bg-[#FF4F00]" />
            <span className="absolute bottom-2.5 left-0 w-2 h-2 rounded-full bg-[#FF4F00]" />
            <span className="absolute bottom-0 right-1 w-2.5 h-2.5 rounded-full bg-[#FF4F00]" />
          </div>
        </div>

        {/* Full Title */}
        <h4 className="text-xl sm:text-[24px] font-bold text-black leading-snug mb-3">
          {title}
        </h4>

        {/* Description Paragraph */}
        <p className="text-[#666666] text-xs sm:text-[14px] leading-relaxed mb-6 font-normal">
          {description}
        </p>
      </div>

      {/* Button CTA */}
      <div>
        <Link
          href={href}
          className="inline-flex items-center gap-2 bg-[#FF4F00] hover:bg-[#E04400] text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-md shadow-[#FF4F00]/20 group"
        >
          Read More
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default SolutionCard;

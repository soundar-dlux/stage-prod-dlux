"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface SolutionCardProps {
  acronym: string;
  title: string;
  description: string;
  href?: string;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({
  acronym,
  title,
  description,
  href = "#",
}) => {
  return (
    <div className="relative flex flex-col justify-between w-full bg-white rounded-[24px] border border-[#FF4F00]/30 p-7 sm:p-8 shadow-lg shadow-[#FF4F00]/5 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF4F00]/10 hover:-translate-y-1.5">
      <div>
        {/* Top Header Row: Acronym & 4-Dot Constellation Graphic */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[#FF4F00] tracking-tight">
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
        <h4 className="text-xl sm:text-2xl font-bold text-black leading-snug mb-4">
          {title}
        </h4>

        {/* Description Paragraph */}
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
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

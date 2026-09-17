"use client";

import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  position?: string;
  testimonial: string;
  avatarUrl?: string;
  className?: string; // allow layout override
}

export default function TestimonialCard({
  name,
  position,
  testimonial,
  avatarUrl,
  className = "",
}: TestimonialCardProps) {
  return (
    <div
      className={`
        group
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        rounded-2xl
        p-6
        transition-all duration-300
        hover:border-[#FF3901]/60
        hover:bg-white/10
        ${className}
      `}
    >
      {/* Quote */}
      <div className="text-4xl text-[#FF3901]/30 mb-4">“</div>

      {/* Testimonial Text */}
      <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-4">
        {testimonial}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-3">
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt={name}
            width={48}
            height={48}
            className="
              rounded-full object-cover
              ring-2 ring-white/10
              group-hover:ring-[#FF3901]/50
              transition
            "
          />
        )}

        <div>
          <h4 className="font-semibold text-white text-sm">
            {name}
          </h4>

          {position && (
            <p className="text-xs text-gray-400">
              {position}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
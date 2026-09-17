"use client";

import Image from "next/image";

interface SectionBadgeProps {
  label: string;
  iconSrc?: string;
  iconAlt?: string;
  className?: string;
}

export default function SectionBadge({
  label,
  iconSrc,
  iconAlt = "icon",
  className = "",
}: SectionBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-5 py-2 rounded-full
      border border-neutral-700 bg-neutral-900
      text-sm text-neutral-300 ${className}`}
    >
      {iconSrc && (
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={18}
          height={18}
          className="object-contain"
        />
      )}

      <span>{label}</span>
    </div>
  );
}
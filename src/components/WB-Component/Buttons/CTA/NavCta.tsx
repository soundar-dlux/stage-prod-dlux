
"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface CTAButtonProps {
  label?: string;
  children?: React.ReactNode;
  href?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
  className?: string;
  showArrow?: boolean;
  disabled?: boolean;
  target?: "_blank" | "_self";
  type?: "button" | "submit" | "reset";
}

const NavCTAButton: React.FC<CTAButtonProps> = ({
  label = "Read More",
  children,
  href,
  onClick,
  className = "",
  showArrow = true,
  disabled = false,
  target,
  type = "button",
}) => {
  const baseClasses = `
    nav-cta-button
    group relative isolate overflow-hidden
    inline-flex items-center justify-center
    gap-[20px]
    h-[100px]
    px-[50px]
    rounded-full
    border border-white/20
    bg-gradient-to-r from-[#FF7900] via-[#FF5100] to-[#FF350D]
    text-white
    text-[40px] font-normal leading-none
    whitespace-nowrap
    shadow-[0_5px_15px_rgba(225,50,7,0.15)]
    transition-all duration-300 ease-in-out
    hover:-translate-y-1
    hover:shadow-[0_12px_30px_rgba(225,50,7,0.35)]
    active:translate-y-0 active:scale-[0.98]
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:translate-y-0
    ${className}
  `;

  const content = (
    <>
      {/* Glossy top highlight */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 top-0
          h-1/2 rounded-t-full
          bg-gradient-to-b
          from-white/25 via-white/10 to-transparent
          z-0
        "
      />

      {/* Continuous shimmer */}
      <span
        aria-hidden="true"
        className="
          nav-cta-shimmer
          pointer-events-none absolute inset-0
          z-0
          -translate-x-[150%]
          skew-x-[-20deg]
          bg-gradient-to-r
          from-transparent
          via-white/40
          to-transparent
        "
      />

      {/* Glossy bottom reflection */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-[12%] bottom-[2px]
          h-[2px] rounded-full
          bg-gradient-to-r
          from-transparent via-white/40 to-transparent
          z-0
        "
      />

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-[20px]">
        <span>{children || label}</span>

        {showArrow && (
          <ArrowRight
            size={52}
            strokeWidth={1.8}
            className="
              shrink-0
              transition-transform duration-300
              group-hover:translate-x-2
            "
          />
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        onClick={onClick}
        className={baseClasses}
        aria-label={label}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {content}
    </button>
  );
};

export default NavCTAButton;

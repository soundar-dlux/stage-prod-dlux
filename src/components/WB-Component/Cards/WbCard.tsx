"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export interface WbCardProps {
  /** Main category / badge title (default: "RT CDP") */
  title?: React.ReactNode;
  /** Subtitle / headline (default: "Real-Time\nCDP") */
  subtitle?: React.ReactNode;
  /** Body description content */
  description?: React.ReactNode;
  /** Text for the CTA button (default: "Read More") */
  buttonText?: string;
  /** Target URL for button link */
  buttonHref?: string;
  /** Click event handler for the button */
  onButtonClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /** Click event handler for the entire card */
  onCardClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Toggle visibility of the CTA button (default: true) */
  showButton?: boolean;
  /** Toggle visibility of top-right decorative dots (default: true) */
  showDots?: boolean;
  /** Custom element to render in top-right corner (overrides default dots) */
  topRightContent?: React.ReactNode;
  /** Custom icon for the button (default: ArrowRight) */
  buttonIcon?: React.ReactNode;

  // --- Exact Card Dimension & Style Specs ---
  /** Card width in px or CSS string (default: 400) */
  width?: string | number;
  /** Card height in px or CSS string (default: 350) */
  height?: string | number;
  /** Border radius in px or CSS string (default: "20px") */
  borderRadius?: string;
  /** Angle rotation in degrees (default: 0) */
  angle?: number;
  /** Opacity level (default: 1) */
  opacity?: number;
  /** Internal layout gap between sections (default: "20px") */
  gap?: string;
  /** Top padding (default: "30px") */
  paddingTop?: string;
  /** Right padding (default: "40px") */
  paddingRight?: string;
  /** Bottom padding (default: "30px") */
  paddingBottom?: string;
  /** Left padding (default: "40px") */
  paddingLeft?: string;
  /** Border stroke width (default: "3px") */
  borderWidth?: string;
  /** Border color hex or CSS color (default: "#FF7B54") */
  borderColor?: string;

  /** Extra class names for outer container */
  className?: string;
  /** Inline style overrides */
  style?: React.CSSProperties;
}

/**
 * Top-Right Decorative 5-Dots Cluster matching the screenshot 1:1
 */
function DecorativeDots() {
  return (
    <svg
      width="70"
      height="70"
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none pointer-events-none flex-shrink-0"
    >
      <defs>
        <linearGradient id="orangeDotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6800" />
          <stop offset="100%" stopColor="#FF3000" />
        </linearGradient>
      </defs>

      {/* 1. Top-Left Large Sphere */}
      <circle cx="16" cy="14" r="10" fill="url(#orangeDotGrad)" />

      {/* 2. Top-Right Small Circle */}
      <circle cx="56" cy="16" r="5.5" fill="url(#orangeDotGrad)" />

      {/* 3. Center Circle */}
      <circle cx="38" cy="34" r="6" fill="url(#orangeDotGrad)" />

      {/* 4. Bottom-Left Circle */}
      <circle cx="16" cy="46" r="5.5" fill="url(#orangeDotGrad)" />

      {/* 5. Bottom-Right Circle */}
      <circle cx="60" cy="38" r="6" fill="url(#orangeDotGrad)" />
    </svg>
  );
}

export function WbCard({
  title = "RT CDP",
  subtitle = (
    <>
      Real-Time
      <br />
      CDP
    </>
  ),
  description = "Unify known andanonymous data into real-time customer profiles for activation across channels.",
  buttonText = "Read More",
  buttonHref,
  onButtonClick,
  onCardClick,
  showButton = true,
  showDots = true,
  topRightContent,
  buttonIcon,

  width = 400,
  height = 350,
  borderRadius = "20px",
  angle = 0,
  opacity = 1,
  gap = "20px",
  paddingTop = "30px",
  paddingRight = "40px",
  paddingBottom = "30px",
  paddingLeft = "40px",
  borderWidth = "3px",
  borderColor = "#FF7B54",

  className = "",
  style = {},
}: WbCardProps) {
  const widthVal = typeof width === "number" ? `${width}px` : width;
  const heightVal = typeof height === "number" ? `${height}px` : height;

  const ButtonContent = (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="
        group inline-flex items-center gap-2
        px-6 py-2.5 rounded-full
        bg-gradient-to-r from-[#FF6800] via-[#FF5000] to-[#FF3000]
        text-white font-medium text-sm sm:text-base tracking-wide
        shadow-md shadow-[#FF3000]/20 hover:shadow-lg hover:shadow-[#FF3000]/35
        transition-all duration-300 cursor-pointer select-none
      "
    >
      <span>{buttonText}</span>
      {buttonIcon || (
        <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </motion.div>
  );

  // Check if gradient border should be used (default or when borderColor is 'gradient' or default '#FF7B54')
  const isGradientBorder = !borderColor || borderColor === "gradient" || borderColor === "#FF7B54";

  const borderStyles: React.CSSProperties = isGradientBorder
    ? {
        border: `${borderWidth} solid transparent`,
        backgroundImage: `linear-gradient(#ffffff, #ffffff), linear-gradient(131.12deg, #FFFFFF -0.61%, #E13207 126.86%)`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
      }
    : {
        borderWidth,
        borderColor,
        borderStyle: "solid",
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: opacity, y: 0 }}
      viewport={{ once: true }}
      // whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(255, 79, 0, 0.18)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={onCardClick}
      style={{
        width: widthVal,
        maxWidth: "100%",
        height: heightVal,
        borderRadius,
        transform: angle !== 0 ? `rotate(${angle}deg)` : undefined,
        opacity,
        gap,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        boxShadow: "0 10px 30px -5px rgba(255, 80, 0, 0.07), 0 4px 15px rgba(0, 0, 0, 0.02)",
        ...borderStyles,
        ...style,
      }}
      className={`
        relative bg-white flex flex-col justify-between overflow-hidden flex-shrink-0
        box-border transition-all duration-300
        ${onCardClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {/* 🔹 TOP SECTION: Title, Subtitle & Decorative Dots */}
      <div className="flex items-start justify-between w-full gap-2">
        <div className="flex flex-col">
          {title && (
            <h3 className="text-[#FF4F00] font-extrabold text-2xl sm:text-[32px] leading-none tracking-tight uppercase">
              {title}
            </h3>
          )}
          {subtitle && (
            <h4 className="text-black font-bold text-xl sm:text-[24px] leading-tight tracking-tight mt-3">
              {subtitle}
            </h4>
          )}
        </div>

        {/* Right graphic/dots */}
        {topRightContent ? (
          <div className="flex-shrink-0">{topRightContent}</div>
        ) : (
          showDots && <DecorativeDots />
        )}
      </div>

      {/* 🔹 MIDDLE SECTION: Description */}
      {description && (
        <p className="text-[#666666] text-xs sm:text-[14px] leading-relaxed font-normal max-w-[310px]">
          {description}
        </p>
      )}

      {/* 🔹 BOTTOM SECTION: Action Button */}
      {showButton && (
        <div className="flex items-center justify-start pt-1">
          {buttonHref ? (
            <a
              href={buttonHref}
              onClick={onButtonClick}
              className="inline-block no-underline"
            >
              {ButtonContent}
            </a>
          ) : (
            <button
              type="button"
              onClick={onButtonClick}
              className="inline-block bg-transparent border-none p-0 cursor-pointer focus:outline-none"
            >
              {ButtonContent}
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default WbCard;

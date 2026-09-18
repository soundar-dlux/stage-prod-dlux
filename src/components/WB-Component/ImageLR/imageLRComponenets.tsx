"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/src/components/WB-Component/Buttons";

/**
 * Feature item type for bullet points list
 */
export interface FeatureItem {
  id?: string | number;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

/**
 * CTA Button Configuration interface
 */
export interface CtaButton {
  text: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary";
}

/**
 * Props for ImageLRComponents
 */
export interface ImageLRComponentsProps {
  /** Title / Main Heading for the component (string or JSX for custom dual-color styling) */
  title: string | React.ReactNode;
  /** Substring in title to highlight with a different color */
  highlightText?: string;
  /** Custom CSS class for highlight color (e.g. "text-brand-primary", "text-[#FF3901]") */
  highlightColor?: string;
  /** Subtitle highlight / tag badge text */
  badge?: string;
  /** Main description paragraph, array of paragraphs, or custom JSX */
  description?: string | string[] | React.ReactNode;
  /** List of features/bullet points */
  features?: (string | FeatureItem)[];
  /** Custom button component(s) slot */
  buttons?: React.ReactNode;
  /** Main image URL path */
  imageSrc?: string;
  /** Image Alt text for accessibility */
  imageAlt?: string;
  /** 
   * Condition for image position on desktop: "left" or "right"
   * @default "left"
   */
  imagePosition?: "left" | "right";
  /** 
   * Image position ordering on mobile screen size: "top" or "bottom"
   * @default "bottom"
   */
  mobileImagePosition?: "top" | "bottom";
  /** Primary call to action button */
  primaryCta?: CtaButton;
  /** Secondary call to action button */
  secondaryCta?: CtaButton;
  /** Custom background image or element override */
  customImage?: React.ReactNode;
  /** Aspect ratio style for image wrapper */
  imageAspectRatio?: "auto" | "square" | "video" | "portrait" | "wide";
  /** Image fitting mode: "natural" (actual uncropped size) | "contain" | "cover" @default "natural" */
  imageFit?: "natural" | "contain" | "cover";
  /** Optional custom intrinsic image width */
  imageWidth?: number;
  /** Optional custom intrinsic image height */
  imageHeight?: number;
  /** Background theme option ("dark" | "light" | "white" | "transparent") */
  bgVariant?: "dark" | "light" | "white" | "transparent";
  /** Additional container CSS class names */
  className?: string;
  /** Grid ratio split between Content and Image (e.g. "6-6", "5-7", "7-5") */
  gridRatio?: "6-6" | "5-7" | "7-5";
  /** Optional interactive extra content below features */
  children?: React.ReactNode;
  /** Disable image zoom/scale hover effect (default: false) */
  disableImageHover?: boolean;
}

export function ImageLRComponents({
  title,
  highlightText,
  highlightColor = "text-brand-primary",
  badge,
  description,
  features = [],
  buttons,
  imageSrc = "/placeholder.jpg",
  imageAlt = "Image representation",
  imagePosition = "left",
  mobileImagePosition = "bottom",
  primaryCta,
  secondaryCta,
  customImage,
  imageAspectRatio = "auto",
  imageFit = "natural",
  imageWidth,
  imageHeight,
  bgVariant = "dark",
  className = "",
  gridRatio = "6-6",
  children,
  disableImageHover = false,
}: ImageLRComponentsProps) {
  // Animation variants
  const fastEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: fastEase },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.65, ease: fastEase },
    },
  };

  // Determine Grid order classes based on condition (imagePosition)
  const isImageLeft = imagePosition === "left";

  // Grid column spans based on ratio
  let contentSpan = "lg:col-span-6";
  let imageSpan = "lg:col-span-6";
  if (gridRatio === "5-7") {
    contentSpan = isImageLeft ? "lg:col-span-7" : "lg:col-span-5";
    imageSpan = isImageLeft ? "lg:col-span-5" : "lg:col-span-7";
  } else if (gridRatio === "7-5") {
    contentSpan = isImageLeft ? "lg:col-span-5" : "lg:col-span-7";
    imageSpan = isImageLeft ? "lg:col-span-7" : "lg:col-span-5";
  }

  // Desktop Order styling
  const imageDesktopOrder = isImageLeft ? "lg:order-1" : "lg:order-2";
  const contentDesktopOrder = isImageLeft ? "lg:order-2" : "lg:order-1";

  // Mobile Order styling
  const mobileOrderClass = mobileImagePosition === "top" ? "order-1" : "order-2";
  const mobileContentOrderClass = mobileImagePosition === "top" ? "order-2" : "order-1";

  // Aspect ratio classes for image container
  const aspectRatioClasses = {
    auto: "h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px]",
    square: "aspect-square h-auto min-h-[300px]",
    video: "aspect-video h-auto min-h-[280px]",
    portrait: "aspect-[3/4] h-auto min-h-[350px]",
    wide: "aspect-[16/9] h-auto min-h-[280px]",
  };

  // Background styling variants - using Tailwind surface colors from config (surface-dark, surface-light, surface-white, surface-transparent)
  const bgStyles = {
    dark: "bg-surface-dark text-surface-white",
    light: "bg-surface-light text-surface-white",
    white: "bg-surface-white text-surface-dark",
    transparent: "bg-surface-transparent text-surface-white",
  };

  const isWhiteBg = bgVariant === "white";

  // Dual-color title rendering logic
  const renderTitle = () => {
    if (React.isValidElement(title)) {
      return title;
    }
    if (typeof title === "string" && highlightText && title.includes(highlightText)) {
      const parts = title.split(highlightText);
      return (
        <>
          {parts[0]}
          <span className={highlightColor}>{highlightText}</span>
          {parts[1]}
        </>
      );
    }
    return title;
  };

  // Description rendering logic (supports array of paragraphs, multiline string, or JSX)
  const renderDescription = () => {
    if (!description) return null;

    if (Array.isArray(description)) {
      return (
        <div className="space-y-4">
          {description.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      );
    }

    if (typeof description === "string") {
      if (description.includes("\n")) {
        const paragraphs = description.split(/\n+/).filter((p) => p.trim() !== "");
        return (
          <div className="space-y-4">
            {paragraphs.map((para, idx) => (
              <p key={idx}>{para.trim()}</p>
            ))}
          </div>
        );
      }
      return <p>{description}</p>;
    }

    return description;
  };

  return (
    <section
      className={`w-full py-12 sm:py-16 md:py-20 lg:py-[40px] px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${bgStyles[bgVariant]} ${className}`}
      data-testid="image-lr-component"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Layout using CSS Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center"
        >
          {/* =================================================== */}
          {/* 🔹 IMAGE GRID COLUMN (Condition: Left or Right)     */}
          {/* =================================================== */}
          <motion.div
            variants={imageVariants}
            className={`col-span-1 ${imageSpan} ${mobileOrderClass} ${imageDesktopOrder} w-full`}
          >
            <div className="relative group rounded-2xl sm:rounded-3xl overflow-hidden p-[1px] bg-gradient-to-b from-surface-white/30 via-surface-white/10 to-surface-transparent">
              {/* Glassmorphism Outer Container */}
              <div
                className={`relative w-full overflow-hidden rounded-2xl sm:rounded-3xl ${imageFit === "cover" ? aspectRatioClasses[imageAspectRatio] : ""
                  } ${isWhiteBg ? "bg-surface-white" : "bg-surface-dark/90"}`}
              >
                {customImage ? (
                  customImage
                ) : imageFit === "cover" ? (
                  <>
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                      className={`object-cover object-center transform transition-transform duration-700 ease-out ${
                        disableImageHover ? "" : "group-hover:scale-105"
                      }`}
                      priority={false}
                    />

                    {/* Gradient Overlay for visual depth */}
                    <div
                      className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isWhiteBg
                        ? "bg-gradient-to-t from-surface-dark/20 via-surface-transparent to-surface-transparent"
                        : "bg-gradient-to-t from-surface-dark/80 via-surface-dark/20 to-surface-transparent"
                        }`}
                    />

                    {/* Pristine surface-white top highlight glow line */}
                    <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-surface-transparent via-surface-white/50 to-surface-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                  </>
                ) : (
                  /* Natural / Actual Size Image (Uncropped) */
                  <div className="relative w-full h-auto flex items-center justify-center">
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      width={imageWidth || 1200}
                      height={imageHeight || 800}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                      className={`w-full h-auto object-contain object-center transform transition-transform duration-700 ease-out rounded-2xl sm:rounded-3xl ${
                        disableImageHover ? "" : "group-hover:scale-[1.02]"
                      }`}
                      priority={false}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* =================================================== */}
          {/* 🔹 CONTENT GRID COLUMN                              */}
          {/* =================================================== */}
          <motion.div
            variants={itemVariants}
            className={`col-span-1 ${contentSpan} ${mobileContentOrderClass} ${contentDesktopOrder} flex flex-col justify-center space-y-6 sm:space-y-8`}
          >
            {/* Badge / Tag Component with surface-white accent styling */}
            {badge && (
              <motion.div variants={itemVariants} className="inline-flex items-center">
                <span
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase border backdrop-blur-md transition-all duration-300 ${isWhiteBg
                    ? "bg-surface-dark text-surface-white border-surface-dark"
                    : "bg-surface-white/10 text-surface-white border-surface-white/30 shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                    }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-surface-white animate-pulse" />
                  {badge}
                </span>
              </motion.div>
            )}

            {/* Main Title Heading (supports dual-color highlight) */}
            <motion.h2
              variants={itemVariants}
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] ${isWhiteBg ? "text-surface-dark" : "text-surface-white"
                }`}
            >
              {renderTitle()}
            </motion.h2>

            {/* Description text */}
            {description && (
              <motion.div
                variants={itemVariants}
                className={`text-base sm:text-lg leading-relaxed font-normal ${isWhiteBg ? "text-neutral-700" : "text-neutral-300"
                  }`}
              >
                {renderDescription()}
              </motion.div>
            )}

            {/* Feature Bullets / List */}
            {features.length > 0 && (
              <motion.ul variants={itemVariants} className="space-y-3.5 sm:space-y-4 pt-2">
                {features.map((feature, idx) => {
                  const isString = typeof feature === "string";
                  const itemTitle = isString ? feature : feature.title;
                  const itemDesc = !isString ? feature.description : undefined;
                  const customIcon = !isString ? feature.icon : undefined;

                  return (
                    <li key={!isString && feature.id ? feature.id : idx} className="flex items-start gap-3.5">
                      <div
                        className={`flex-shrink-0 mt-1 p-1 rounded-full border transition-colors ${isWhiteBg
                          ? "bg-surface-dark text-surface-white border-surface-dark"
                          : "bg-surface-white/15 text-surface-white border-surface-white/40"
                          }`}
                      >
                        {customIcon || <Check className="w-4 h-4 stroke-[2.5]" />}
                      </div>
                      <div className="flex-1">
                        <span
                          className={`text-sm sm:text-base font-semibold block ${isWhiteBg ? "text-surface-dark" : "text-surface-white"
                            }`}
                        >
                          {itemTitle}
                        </span>
                        {itemDesc && (
                          <span
                            className={`text-xs sm:text-sm block mt-0.5 ${isWhiteBg ? "text-neutral-600" : "text-neutral-400"
                              }`}
                          >
                            {itemDesc}
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </motion.ul>
            )}

            {/* Additional Custom Children */}
            {children && <motion.div variants={itemVariants}>{children}</motion.div>}

            {/* CTA Buttons Row utilizing project's Button component */}
            {(buttons || primaryCta || secondaryCta) && (
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                {buttons ? (
                  buttons
                ) : (
                  <>
                    {primaryCta && (
                      <PrimaryButton
                        href={primaryCta.href}
                        onClick={primaryCta.onClick}
                        customIcon={primaryCta.icon}
                      >
                        {primaryCta.text}
                      </PrimaryButton>
                    )}
                    {secondaryCta && (
                      <SecondaryButton
                        href={secondaryCta.href}
                        onClick={secondaryCta.onClick}
                        icon={!!secondaryCta.icon}
                        customIcon={secondaryCta.icon}
                      >
                        {secondaryCta.text}
                      </SecondaryButton>
                    )}
                  </>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default ImageLRComponents;

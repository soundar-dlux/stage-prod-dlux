
"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/src/components/WB-Component/Buttons";
import HorizontalLine from "../Line/HorizontalLine";

/* =========================================================
   TYPES
========================================================= */

export interface FeatureItem {
  id?: string | number;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface CtaButton {
  text: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary";
}

export interface ImageLRComponentsProps {
  title: string | React.ReactNode;
  highlightText?: string;
  highlightColor?: string;
  badge?: string;
  description?: string | string[] | React.ReactNode;
  features?: (string | FeatureItem)[];
  buttons?: React.ReactNode;

  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  mobileImagePosition?: "top" | "bottom";

  primaryCta?: CtaButton;
  secondaryCta?: CtaButton;

  customImage?: React.ReactNode;

  imageAspectRatio?: "auto" | "square" | "video" | "portrait" | "wide";
  imageFit?: "natural" | "contain" | "cover";

  imageWidth?: number;
  imageHeight?: number;

  bgVariant?: "dark" | "light" | "white" | "transparent";

  className?: string;
  gridRatio?: "6-6" | "5-7" | "7-5";

  children?: React.ReactNode;
  disableImageHover?: boolean;
  showSectionBottomLine?: boolean;
  showContentTopLine?: boolean;
  showTopLine?: boolean;
  showBottomLine?: boolean;
  showLines?: boolean;
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

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
  showSectionBottomLine = true,
  showContentTopLine = true,
  showTopLine,
  showBottomLine,
  showLines,
}: ImageLRComponentsProps) {

  const shouldShowTopLine =
    showLines !== false &&
    showTopLine !== false &&
    showContentTopLine !== false;

  const shouldShowBottomLine =
    showLines !== false &&
    showBottomLine !== false &&
    showSectionBottomLine !== false;

  /* =====================================================
     ANIMATION VARIANTS
  ===================================================== */

  const fastEase: [number, number, number, number] = [
    0.22, 1, 0.36, 1,
  ];

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
    hidden: {
      opacity: 0,
      y: 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: fastEase,
      },
    },
  };

  const imageVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: fastEase,
      },
    },
  };

  /* =====================================================
     LAYOUT CONFIGURATION
  ===================================================== */

  const isImageLeft = imagePosition === "left";

  let contentSpan = "lg:col-span-6";
  let imageSpan = "lg:col-span-6";

  if (gridRatio === "5-7") {
    contentSpan = isImageLeft
      ? "lg:col-span-7"
      : "lg:col-span-5";

    imageSpan = isImageLeft
      ? "lg:col-span-5"
      : "lg:col-span-7";
  } else if (gridRatio === "7-5") {
    contentSpan = isImageLeft
      ? "lg:col-span-5"
      : "lg:col-span-7";

    imageSpan = isImageLeft
      ? "lg:col-span-7"
      : "lg:col-span-5";
  }

  const imageDesktopOrder = isImageLeft
    ? "lg:order-1"
    : "lg:order-2";

  const contentDesktopOrder = isImageLeft
    ? "lg:order-2"
    : "lg:order-1";

  const mobileOrderClass =
    mobileImagePosition === "top"
      ? "order-1"
      : "order-2";

  const mobileContentOrderClass =
    mobileImagePosition === "top"
      ? "order-2"
      : "order-1";

  /* =====================================================
     IMAGE ASPECT RATIOS
  ===================================================== */

  const aspectRatioClasses = {
    auto: "h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px]",
    square: "aspect-square h-auto min-h-[300px]",
    video: "aspect-video h-auto min-h-[280px]",
    portrait: "aspect-[3/4] h-auto min-h-[350px]",
    wide: "aspect-[16/9] h-auto min-h-[280px]",
  };

  /* =====================================================
     BACKGROUND THEMES
  ===================================================== */

  const bgStyles = {
    dark: "bg-surface-dark text-surface-white",
    light: "bg-surface-light text-surface-white",
    white: "bg-surface-white text-surface-dark",
    transparent: "bg-surface-transparent text-surface-white",
  };

  const isWhiteBg = bgVariant === "white";

  /* =====================================================
     TITLE RENDERING
  ===================================================== */

  const renderTitle = () => {
    if (React.isValidElement(title)) {
      return title;
    }

    if (
      typeof title === "string" &&
      highlightText &&
      title.includes(highlightText)
    ) {
      const parts = title.split(highlightText);

      return (
        <>
          {parts[0]}
          <span className={highlightColor}>
            {highlightText}
          </span>
          {parts.slice(1).join(highlightText)}
        </>
      );
    }

    return title;
  };

  /* =====================================================
     DESCRIPTION RENDERING
  ===================================================== */

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
        const paragraphs = description
          .split(/\n+/)
          .filter((p) => p.trim() !== "");

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

  /* =====================================================
     COMPONENT JSX
  ===================================================== */

  return (
    <section
      className={`w-full py-12 sm:py-16 md:py-20 lg:py-[40px] px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${bgStyles[bgVariant]} ${className}`}
      data-testid="image-lr-component"
    >
      <div className="max-w-7xl mx-auto">

        {/* MAIN GRID */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-80px",
          }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center"
        >

          {/* =============================================
              IMAGE COLUMN
          ============================================= */}


          <motion.div
            variants={imageVariants}
            className={`col-span-1 ${imageSpan} ${mobileOrderClass} ${imageDesktopOrder} w-full`}
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-[1px] bg-gradient-to-b from-surface-white/30 via-surface-white/10 to-surface-transparent">

              <div
                className={`relative w-full overflow-hidden rounded-2xl sm:rounded-3xl ${imageFit === "cover"
                  ? aspectRatioClasses[imageAspectRatio]
                  : ""
                  } ${isWhiteBg
                    ? "bg-surface-white"
                    : "bg-surface-dark/90"
                  }`}
              >
                {/* CUSTOM IMAGE */}
                {customImage ? (
                  customImage
                ) : imageFit === "cover" ? (
                  <>
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center"
                      priority={false}
                    />

                    <div
                      className={`absolute inset-0 pointer-events-none ${isWhiteBg
                        ? "bg-gradient-to-t from-surface-dark/20 via-surface-transparent to-surface-transparent"
                        : "bg-gradient-to-t from-surface-dark/80 via-surface-dark/20 to-surface-transparent"
                        }`}
                    />
                  </>
                ) : (
                  /* NATURAL / CONTAIN IMAGE */
                  <div className="relative w-full h-auto flex items-center justify-center">
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      width={imageWidth || 1200}
                      height={imageHeight || 800}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                      className="w-full h-auto object-contain object-center rounded-2xl sm:rounded-3xl"
                      priority={false}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* =============================================
              CONTENT COLUMN
          ============================================= */}

          <motion.div
            variants={itemVariants}
            className={`col-span-1 ${contentSpan} ${mobileContentOrderClass} ${contentDesktopOrder} flex flex-col justify-center space-y-6 sm:space-y-8`}
          >
            {shouldShowTopLine && <HorizontalLine className="relative bottom-[100px]" />}

            {/* BADGE */}
            {badge && (
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center"
              >
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

            {/* TITLE */}
            <motion.h2
              variants={itemVariants}
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] ${isWhiteBg
                ? "text-surface-dark"
                : "text-surface-white"
                }`}
            >
              {renderTitle()}
            </motion.h2>

            {/* DESCRIPTION */}
            {description && (
              <motion.div
                variants={itemVariants}
                className={`text-base sm:text-lg leading-relaxed font-normal ${isWhiteBg
                  ? "text-neutral-700"
                  : "text-neutral-300"
                  }`}
              >
                {renderDescription()}
              </motion.div>
            )}

            {/* FEATURES */}
            {features.length > 0 && (
              <motion.ul
                variants={itemVariants}
                className="space-y-3.5 sm:space-y-4 pt-2"
              >
                {features.map((feature, idx) => {
                  const isString = typeof feature === "string";

                  const itemTitle = isString
                    ? feature
                    : feature.title;

                  const itemDesc = !isString
                    ? feature.description
                    : undefined;

                  const customIcon = !isString
                    ? feature.icon
                    : undefined;

                  return (
                    <li
                      key={
                        !isString && feature.id
                          ? feature.id
                          : idx
                      }
                      className="flex items-start gap-3.5"
                    >
                      <div
                        className={`flex-shrink-0 mt-1 p-1 rounded-full border transition-colors ${isWhiteBg
                          ? "bg-surface-dark text-surface-white border-surface-dark"
                          : "bg-surface-white/15 text-surface-white border-surface-white/40"
                          }`}
                      >
                        {customIcon || (
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        )}
                      </div>

                      <div className="flex-1">
                        <span
                          className={`text-sm sm:text-base font-semibold block ${isWhiteBg
                            ? "text-surface-dark"
                            : "text-surface-white"
                            }`}
                        >
                          {itemTitle}
                        </span>

                        {itemDesc && (
                          <span
                            className={`text-xs sm:text-sm block mt-0.5 ${isWhiteBg
                              ? "text-neutral-600"
                              : "text-neutral-400"
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

            {/* CUSTOM CHILDREN */}
            {children && (
              <motion.div variants={itemVariants}>
                {children}
              </motion.div>
            )}

            {/* CTA BUTTONS */}
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
        {shouldShowBottomLine && <HorizontalLine className="mt-[40px]" />}

      </div>
    </section>
  );
}

export default ImageLRComponents;

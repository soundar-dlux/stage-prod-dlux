"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { ReactNode, useRef } from "react";

type CinematicHeroProps = {
  image?: string;
  video?: string;
  title: ReactNode;
  subtitle?: string;
  alt?: string;
  height?: string;
  overlayOpacity?: number;
  showGlow?: boolean;
  className?: string;
  children?: ReactNode;
};

export default function CinematicHero({
  image,
  video,
  title,
  subtitle,
  alt = "hero background",
  height = "min-h-[75vh] md:min-h-[85vh]",
  overlayOpacity = 0.5,
  showGlow = false,
  className = "",
  children,
}: CinematicHeroProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  /* Parallax */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yRaw = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y = useSpring(yRaw, {
    stiffness: 60,
    damping: 20,
    mass: 0.5,
  });

  return (
    <div
      ref={ref}
      className={`relative ${height} flex items-center justify-center text-center overflow-hidden pb-6 md:pb-10 ${className}`}
    >
      {/* Background Layer */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 will-change-transform"
      >
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105"
          />
        ) : (
          image && (
            <Image
              src={image}
              alt={alt}
              fill
              priority
              sizes="100vw"
              className="object-cover scale-105"
            />
          )
        )}
      </motion.div>

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />

      {/* Glow Effect */}
      {showGlow && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,0,0.15),transparent_70%)]" />
      )}

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto text-white">
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="uppercase tracking-[4px] text-xs sm:text-sm mb-3 text-gray-300"
          >
            {subtitle}
          </motion.p>
        )}

        {/* ✅ FIX: No nested h1 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="leading-tight"
        >
          {title}
        </motion.div>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
}
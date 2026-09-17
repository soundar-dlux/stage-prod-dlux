"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PlayButton from "../Buttons/PlayButton";
import PrevNextButtons from "../Buttons/PrevNextButtons";

interface VideoCarouselProps {
  videos: string[];
  onVideoClick?: (videoUrl: string) => void;
}

export default function VideoCarousel({
  videos,
  onVideoClick,
}: VideoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!videos?.length) return null;

  const activeVideo = videos[activeIndex];

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) =>
      prev === videos.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) =>
      prev === 0 ? videos.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">

      {/* Premium Background Glow */}
      <div className="pointer-events-none absolute -inset-16 bg-gradient-to-r from-brand-gradientFrom/20 to-brand-gradientTo/20 blur-[140px] rounded-full" />

      {/* ===== Video Card ===== */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.7)]">

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeVideo}
            initial={{
              opacity: 0,
              x: direction > 0 ? 80 : -80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: direction > 0 ? -80 : 80,
            }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            className="relative group"
          >
            {/* Video */}
            <video
              src={activeVideo}
              className="w-full aspect-video object-cover rounded-3xl transition-transform duration-700 group-hover:scale-105"
              muted
              playsInline
              preload="metadata"
              onLoadedMetadata={(e) => {
                e.currentTarget.currentTime = 2;
              }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayButton
                size={120}
                onClick={() => onVideoClick?.(activeVideo)}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ===== Premium Prev / Next Buttons ===== */}
      {videos.length > 1 && (
        <div className="mt-12 flex justify-center">
          <PrevNextButtons
            onPrev={handlePrev}
            onNext={handleNext}
            size={64}
          />
        </div>
      )}
    </div>
  );
}
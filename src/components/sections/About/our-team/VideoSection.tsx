"use client";

import { LifeAtDluxData } from "@/src/app/about/our-team/types";
import { useState, useRef, useEffect } from "react";

interface VideoSectionProps {
  lifeAtDlux: LifeAtDluxData;
}

export default function VideoSection({ lifeAtDlux }: VideoSectionProps) {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videos = lifeAtDlux.lifeAtDluxVideoCollection?.items ?? [];
  const thumbnails = lifeAtDlux.lifeAtDluxVideoThumbnailCollection?.items ?? [];

  const total = videos.length;

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  // ▶️ Reset + autoplay when video changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // autoplay blocked – ignore safely
      });
    }
  }, [index]);

  if (!total) return null;

  return (
    <section className="relative mt-16 w-full px-4 flex flex-col items-center">
      {/* Video Frame */}
      <div className="relative w-full max-w-5xl">
        {/* Glow */}
        <div className="absolute -inset-6 rounded-3xl bg-[#FF3901]/15 blur-3xl" />

        {/* Glass Card */}
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl shadow-2xl">
          {/* Aspect Ratio Wrapper */}
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <video
              ref={videoRef}
              src={videos[index]?.url}
              poster={thumbnails[index]?.url}
              className="absolute inset-0 h-full w-full object-contain bg-black"
              controls
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      {total > 1 && (
        <div className="mt-8 flex items-center gap-6">
          <button
            onClick={handlePrev}
            aria-label="Previous video"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition hover:scale-110 hover:bg-black"
          >
            ❮
          </button>

          <span className="text-sm text-gray-400">
            {index + 1} / {total}
          </span>

          <button
            onClick={handleNext}
            aria-label="Next video"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition hover:scale-110 hover:bg-black"
          >
            ❯
          </button>
        </div>
      )}
    </section>
  );
}

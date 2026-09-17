"use client";

import { useRef, useEffect, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HorizontalCarouselProps {
  children: ReactNode;
  autoScroll?: boolean;
  autoScrollInterval?: number;
  showButtons?: boolean;
}

export default function HorizontalCarousel({
  children,
  autoScroll = true,
  autoScrollInterval = 4000,
  showButtons = true,
}: HorizontalCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const firstChild = scrollRef.current.firstElementChild as HTMLElement;
    const cardWidth = firstChild?.offsetWidth ?? 300;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth - 24 : cardWidth + 24,
      behavior: "smooth",
    });
  };

  // Auto scroll logic
  useEffect(() => {
    if (!autoScroll) return;

    intervalRef.current = setInterval(() => {
      scroll("right");
    }, autoScrollInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoScroll, autoScrollInterval]);

  const pauseAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resumeAutoScroll = () => {
    if (!autoScroll) return;

    intervalRef.current = setInterval(() => {
      scroll("right");
    }, autoScrollInterval);
  };

  return (
    <div
      className="relative"
      onMouseEnter={pauseAutoScroll}
      onMouseLeave={resumeAutoScroll}
    >
      {showButtons && (
        <>
          <button
            onClick={() => scroll("left")}
            className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-[#FF3901]/80 transition p-3 rounded-full z-10"
          >
            <ChevronLeft className="text-white w-5 h-5" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-[#FF3901]/80 transition p-3 rounded-full z-10"
          >
            <ChevronRight className="text-white w-5 h-5" />
          </button>
        </>
      )}

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
      >
        {children}
      </div>
    </div>
  );
}

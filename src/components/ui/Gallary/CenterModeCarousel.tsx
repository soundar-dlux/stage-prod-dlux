"use client";

import { useEffect, useRef, useState } from "react";

type Card = {
  bg: string;
};

interface Props {
  data: Card[];
}

export default function GallerySlider({ data }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = data.length;

  const getIndex = (i: number) => {
    if (i < 0) return total - 1;
    if (i >= total) return 0;
    return i;
  };

  const go = (step: number) => {
    setCurrent((prev) => getIndex(prev + step));
  };

  // ✅ AUTO SLIDE
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => getIndex(prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [paused]);

  // ✅ SCROLL
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const card = wrap.children[current] as HTMLElement;

    if (!card) return;

    wrap.scrollTo({
      left: card.offsetLeft,
      behavior: "smooth",
    });
  }, [current]);

  return (
    <div className="w-full bg-black py-10">
      {/* SLIDER */}
      <div
        ref={wrapRef}
        className="flex overflow-x-auto no-scrollbar gap-4 px-4 sm:px-6 lg:px-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {data.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 rounded-xl overflow-hidden cursor-pointer
              w-[90vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw]"
          >
            <img
              src={item.bg}
              alt={`gallery-${i}`}
              className="w-full h-[220px] sm:h-[250px] md:h-[280px] lg:h-[300px] object-cover rounded-xl"
            />
          </div>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="max-w-[1400px] mx-auto px-5 pt-6 flex justify-end gap-3">
        <button
          onClick={() => go(-1)}
          className="w-10 h-10 rounded-full bg-white/10 text-white text-xl flex items-center justify-center hover:bg-[#ff6b35]"
        >
          ‹
        </button>
        <button
          onClick={() => go(1)}
          className="w-10 h-10 rounded-full bg-white/10 text-white text-xl flex items-center justify-center hover:bg-[#ff6b35]"
        >
          ›
        </button>
      </div>
    </div>
  );
}
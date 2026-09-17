"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect } from "react";

type Testimonial = {
  id: number;
  content: string;
  author: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    content:
      "DLUX has been one of our most invaluable assets in the continued usage and uptake of Workfront across our business. Lux and his team have provided us with unique and customized solutions, and proactive engagement. Couldn't have done it without them!",
    author: "Head of Campaign Operations and Delivery",
  },
  {
    id: 2,
    content:
      "DLUX’s strategic expertise helped us scale our digital transformation journey. Their deep understanding of Adobe ecosystems is unmatched.",
    author: "Marketing Director",
  },
  {
    id: 3,
    content:
      "The DLUX team consistently delivers excellence. Their project management precision and proactive approach drive measurable results.",
    author: "Enterprise Technology Lead",
  },
  {
    id: 4,
    content:
      "Professional, proactive, and highly skilled team that truly understands enterprise needs.",
    author: "Digital Strategy Manager",
  },
];

export default function TestimonialsCarousel() {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: {
      perView: 1,
      spacing: 24,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 24 },
      },
    },
  });

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 5000);

    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <div
      className="relative mt-16"
      role="region"
      aria-label="Customer testimonials slider"
    >
      {/* Slider */}
      <div
        ref={sliderRef}
        className="keen-slider items-stretch"
        role="list"
      >
        {TESTIMONIALS.map((testimonial) => (
          <div
            key={testimonial.id}
            className="keen-slider__slide flex rounded-br-[140px] rounded-3xl"
            role="listitem"
            aria-label={`Testimonial from ${testimonial.author}`}
          >
            {/* Card */}
            <div
              className="group relative flex h-full w-full flex-col overflow-hidden
              rounded-3xl rounded-br-[140px]
              border border-white/10
              bg-white/[0.04]
              backdrop-blur-2xl
              p-8
              transition-all duration-500
              hover:border-white/20
              hover:shadow-[0_20px_80px_-20px_rgba(255,255,255,0.15)]"
            >
              {/* Decorative layers */}
              <div className="pointer-events-none absolute -inset-[1px] rounded-3xl rounded-br-[140px] 
                bg-gradient-to-r from-purple-500/30 via-pink-500/20 to-cyan-500/30 
                opacity-0 blur-xl transition duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />

              <div className="pointer-events-none absolute inset-0 rounded-3xl rounded-br-[140px]
                bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent"
                aria-hidden="true"
              />

              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700" aria-hidden="true">
                <div className="absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md animate-[shine_2.5s_linear]" />
              </div>

              {/* Quote Icon */}
              <div className="relative mb-6" aria-hidden="true">
                <div className="absolute -inset-2 rounded-full bg-white/5 blur-md"></div>
                <svg
                  width="42"
                  height="42"
                  fill="currentColor"
                  className="relative text-white/20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 17h3l2-4V7H6v6h3l-2 4zm9 0h3l2-4V7h-6v6h3l-2 4z"/>
                </svg>
              </div>

              {/* Content */}
              <p
                className="relative z-10 flex-grow text-gray-300 text-sm leading-relaxed"
                aria-live="polite"
              >
                {testimonial.content}
              </p>

              {/* Author */}
              <p className="relative z-10 mt-6 text-xs text-gray-400">
                – {testimonial.author}
              </p>

              {/* Decorative glow */}
              <div className="pointer-events-none absolute -inset-[1px] rounded-3xl rounded-br-[140px] 
                bg-gradient-to-r from-[#FF3901]/40 via-[#F07800]/30 to-[#FF3901]/40
                opacity-0 blur-xl transition duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />

              <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-br-[140px] 
                bg-gradient-to-tr from-[#FF3901]/25 to-[#F07800]/15 blur-2xl opacity-40"
                aria-hidden="true"
              />

              <div className="absolute bottom-0 left-0 h-[2px] w-full 
                bg-gradient-to-r from-transparent via-[#FF3901]/60 to-transparent opacity-40"
                aria-hidden="true"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-10 flex justify-end gap-4">
        <button
          onClick={() => instanceRef.current?.prev()}
          className="rounded-full border border-white/20 p-3 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Previous testimonial"
        >
          ←
        </button>

        <button
          onClick={() => instanceRef.current?.next()}
          className="rounded-full border border-white/20 p-3 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Next testimonial"
        >
          →
        </button>
      </div>
    </div>
  );
} 
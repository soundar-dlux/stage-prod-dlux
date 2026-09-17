"use client";

import CommonVideoModal from "@/src/components/ui/modal/CommonVideoModal";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Play, ShoppingBag } from "lucide-react";
import Link from "next/link";

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

interface Slide {
  id: string;
  title?: string;
  description?: string;
  video?: string;
  image?: string;
}

export default function PremiumBanner() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string>();

  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarTween = useRef<gsap.core.Tween | null>(null);

  /* Fetch Slides from Contentful */
  useEffect(() => {
    const controller = new AbortController();

    const fetchSlides = async () => {
      try {
        const res = await fetch(
          "https://graphql.contentful.com/content/v1/spaces/pj0maraabon4/environments/production",
          {
            method: "POST",
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer 6t-wgSsZnD80bBuG3_VNcGKE0lF-LAE7EPa5NE286HU",
            },
            body: JSON.stringify({
              query: `
              query {
                commerceVideosCollection {
                  items {
                    sys { id }
                    title
                    description
                    video
                    image { url }
                  }
                }
              }
            `,
            }),
          }
        );

        const json = await res.json();
        const items = json?.data?.commerceVideosCollection?.items ?? [];

        setSlides(
          items.slice(-3).map((item: any) => ({
            id: item.sys.id,
            title: item.title,
            description: item.description,
            video: item.video,
            image: item.image?.url,
          }))
        );
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Fetch error:", err);
        }
      }
    };

    fetchSlides();
    return () => controller.abort();
  }, []);

  /* Navigation Callbacks */
  const nextSlide = useCallback(() => {
    if (!slides.length) return;
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (!slides.length) return;
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  /* Reset and run visual progress bar (4.5s slide interval) */
  const resetProgress = useCallback(() => {
    if (!progressRef.current) return;

    if (progressBarTween.current) {
      progressBarTween.current.kill();
    }

    gsap.set(progressRef.current, { width: "0%" });

    if (!isHovering && !modalOpen && slides.length > 0) {
      progressBarTween.current = gsap.to(progressRef.current, {
        width: "100%",
        duration: 4.5,
        ease: "none",
        onComplete: nextSlide,
      });
    }
  }, [isHovering, modalOpen, slides.length, nextSlide]);

  /* Auto Slider Controller */
  useEffect(() => {
    if (!slides.length) return;
    resetProgress();
    return () => {
      if (progressBarTween.current) progressBarTween.current.kill();
    };
  }, [current, isHovering, modalOpen, slides.length, resetProgress]);

  /* GSAP Entrance Animations */
  useEffect(() => {
    if (!slides.length) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
      tl.fromTo(
        ".hero-title",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
      tl.fromTo(
        ".hero-desc",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
      tl.fromTo(
        ".hero-btn",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" },
        "-=0.3"
      );
      tl.fromTo(
        ".hero-slider",
        { opacity: 0, scale: 0.96, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [slides.length]);

  const positions = useMemo(() => {
    const total = slides.length;
    return slides.map((_, index) => {
      const diff = (index - current + total) % total;

      if (diff === 0) return "center";
      if (diff === 1) return "right";
      if (diff === total - 1) return "left";
      return "hidden";
    });
  }, [current, slides.length]);

  const handleOpenModal = useCallback((video?: string) => {
    if (!video) return;
    setSelectedVideo(video);
    setModalOpen(true);
  }, []);

  if (!slides.length) {
    return (
      <div className="flex items-center justify-center h-[500px] text-white bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-t-brand-primary border-white/20 rounded-full animate-spin" />
          <span className="text-sm font-semibold tracking-wider text-white/50">Loading Adobe Commerce Showcase...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="relative overflow-hidden py-24 text-white bg-[#0a0a0a]"
      >
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Brand Glows */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 10% 20%, ${BRAND.primary}25, transparent 40%),
              radial-gradient(circle at 90% 80%, ${BRAND.secondary}20, transparent 40%)
            `,
          }}
        />

        <div className="relative container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16">
          {/* LEFT */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
            {/* Specialization Badge */}
            <div className="hero-badge mx-auto lg:mx-0 w-fit flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary/5 px-4 py-1.5 backdrop-blur-xl mb-6 shadow-[0_0_15px_rgba(255,57,1,0.05)]">
              <ShoppingBag className="h-3.5 w-3.5 text-brand-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary">
                Adobe Commerce Specialist
              </span>
            </div>

            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-sans tracking-tight">
              Turn Browsers into Buyers —
              <span
                style={{
                  background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                className="block sm:inline font-extrabold"
              >
                {" "}Intelligently
              </span>
            </h1>

            <p className="hero-desc text-base md:text-lg text-white/70 max-w-lg mx-auto lg:mx-0 font-sans leading-relaxed">
              DLUX transforms Adobe Commerce into your personalization and
              performance engine, leveraging smart customer integrations and top tier speed.
            </p>

            <div className="hero-btn pt-2">
              <Link href="/contact-us">
                <button
                  className="rounded-lg px-8 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(255,57,1,0.2)] hover:shadow-[0_0_40px_rgba(255,57,1,0.4)]"
                  style={{
                    background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`,
                  }}
                >
                  Get In Touch
                </button>
              </Link>
            </div>
          </div>

          {/* SLIDER */}
          <div className="hero-slider relative w-full lg:w-1/2 flex flex-col items-center justify-center">
            {/* Main Slider Row */}
            <div
              className="relative w-full flex items-center justify-center h-[380px] sm:h-[400px]"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Prev Button */}
              <button
                onClick={prevSlide}
                className="absolute left-0 z-40 p-2.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-white hover:bg-brand-primary hover:border-brand-primary/50 transition-all duration-300 shadow-md hover:scale-105 cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Slider Items */}
              {slides.map((slide, index) => {
                const position = positions[index];

                return (
                  <div
                    key={slide.id}
                    className={`
                      absolute transition-all duration-700 ease-out
                      w-[65%] sm:w-[50%] lg:w-[280px]
  
                      ${position === "center" && "z-30 scale-100 opacity-100"}
                      ${position === "left" && "hidden lg:block -translate-x-[55%] scale-90 opacity-40"}
                      ${position === "right" && "hidden lg:block translate-x-[55%] scale-90 opacity-40"}
                      ${position === "hidden" && "opacity-0 pointer-events-none"}
                    `}
                  >
                    <div
                      className="rounded-3xl p-3 shadow-lg transition-transform duration-500 hover:scale-105"
                      style={{
                        backdropFilter: "blur(20px)",
                        border: `1px solid ${BRAND.primary}30`,
                        background:
                          "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
                      }}
                    >
                      <div
                        className="relative w-full h-[280px] sm:h-[300px] rounded-2xl overflow-hidden cursor-pointer group"
                        onClick={() => handleOpenModal(slide.video)}
                      >
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
                          loading="lazy"
                        />

                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-all duration-500" />

                        {/* Pulsing Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div
                            className="relative flex items-center justify-center text-white text-sm shadow-xl transition-all duration-500 group-hover:scale-110"
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "50%",
                              background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.secondary})`,
                            }}
                          >
                            <div className="absolute inset-0 rounded-full bg-brand-primary/30 animate-ping group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
                            <Play className="h-5 w-5 fill-current ml-0.5 text-white" />
                          </div>
                        </div>
                      </div>

                      <h3 className="mt-3 text-center text-sm font-semibold tracking-wide font-sans text-white/90">
                        {slide.title}
                      </h3>

                      <p className="mt-1 text-center text-xs text-white/60 font-sans px-2 truncate">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="absolute right-0 z-40 p-2.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-white hover:bg-brand-primary hover:border-brand-primary/50 transition-all duration-300 shadow-md hover:scale-105 cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Progress and dot indicators wrapper */}
            <div className="w-full max-w-[280px] mt-6 space-y-4">
              {/* Autoplay Progress Bar */}
              <div className="h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  ref={progressRef}
                  className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-all"
                  style={{ width: "0%" }}
                />
              </div>

              {/* Dots navigation */}
              <div className="flex items-center justify-center gap-2.5">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${index === current
                        ? "w-6 bg-brand-primary shadow-[0_0_10px_rgba(255,57,1,0.5)]"
                        : "w-2 bg-white/30 hover:bg-white/50"
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CommonVideoModal
        isOpen={modalOpen}
        videoUrl={selectedVideo}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
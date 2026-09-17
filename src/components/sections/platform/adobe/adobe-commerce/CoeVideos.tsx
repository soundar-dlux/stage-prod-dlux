"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import CommonVideoModal from "@/src/components/ui/modal/CommonVideoModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

interface VideoItem {
  id: string;
  poster?: string;
  title?: string;
  url?: string;
}

export default function CoeVideos() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarTween = useRef<gsap.core.Tween | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  /* Window resize hook for mobile-responsive card offsets */
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const offsetX = isMobile ? 85 : isTablet ? 140 : 220;
  const offsetFarX = isMobile ? 140 : isTablet ? 250 : 380;

  /* Fetch videos from Contentful */
  useEffect(() => {
    const controller = new AbortController();

    const fetchVideos = async () => {
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

        setVideos(
          items.map((item: any) => ({
            id: item.sys.id,
            poster: item.image?.url,
            title: item.title,
            url: item.video,
          }))
        );
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Fetch error:", err);
        }
      }
    };

    fetchVideos();
    return () => controller.abort();
  }, []);

  /* Navigation callbacks */
  const nextSlide = useCallback(() => {
    if (!videos.length) return;
    setCurrent((prev) => (prev + 1) % videos.length);
  }, [videos.length]);

  const prevSlide = useCallback(() => {
    if (!videos.length) return;
    setCurrent((prev) => (prev - 1 + videos.length) % videos.length);
  }, [videos.length]);

  /* Reset visual progress bar (4s auto-slide timer) */
  const resetProgress = useCallback(() => {
    if (!progressRef.current) return;

    if (progressBarTween.current) {
      progressBarTween.current.kill();
    }

    gsap.set(progressRef.current, { width: "0%" });

    if (!isHovering && !selectedVideo && videos.length > 0) {
      progressBarTween.current = gsap.to(progressRef.current, {
        width: "100%",
        duration: 4.0,
        ease: "none",
        onComplete: nextSlide,
      });
    }
  }, [isHovering, selectedVideo, videos.length, nextSlide]);

  /* Auto slider controller */
  useEffect(() => {
    if (!videos.length) return;
    resetProgress();
    return () => {
      if (progressBarTween.current) progressBarTween.current.kill();
    };
  }, [current, isHovering, selectedVideo, videos.length, resetProgress]);

  /* GSAP Card position smooth transition effect */
  useEffect(() => {
    if (!videos.length) return;

    const total = videos.length;

    videos.forEach((_, index) => {
      const el = document.getElementById(`coe-card-${index}`);
      if (!el) return;

      const diff = (index - current + total) % total;

      let x = 0;
      let scale = 0;
      let opacity = 0;
      let zIndex = 0;

      if (diff === 0) {
        x = 0;
        scale = 1;
        opacity = 1;
        zIndex = 100;
      } else if (diff === 1) {
        x = offsetX;
        scale = 0.9;
        opacity = 0.8;
        zIndex = 40;
      } else if (diff === 2) {
        x = offsetFarX;
        scale = 0.75;
        opacity = 0.45;
        zIndex = 30;
      } else if (diff === total - 1) {
        x = -offsetX;
        scale = 0.9;
        opacity = 0.8;
        zIndex = 40;
      } else if (diff === total - 2) {
        x = -offsetFarX;
        scale = 0.75;
        opacity = 0.45;
        zIndex = 30;
      } else {
        x = 0;
        scale = 0.01;
        opacity = 0;
        zIndex = 0;
      }

      gsap.to(el, {
        x: x,
        scale: scale,
        opacity: opacity,
        zIndex: zIndex,
        duration: 0.8,
        ease: "power2.out",
      });
    });
  }, [current, videos, offsetX, offsetFarX]);

  /* GSAP Scroll Entrance Animations */
  useEffect(() => {
    if (!videos.length) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".coe-title",
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".coe-title",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".coe-slider-container",
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".coe-slider-container",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [videos.length]);

  const openVideo = useCallback((url?: string) => {
    if (!url) return;
    setSelectedVideo(url);
  }, []);

  if (!videos.length) {
    return (
      <div className="flex items-center justify-center h-[400px] text-white bg-black">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-t-brand-primary border-white/20 rounded-full animate-spin" />
          <span className="text-xs font-semibold tracking-widest text-white/40">Loading COE Videos...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="relative z-10 py-20 text-white bg-black overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Glow */}
        <div
          className="absolute inset-0 opacity-20 -z-10 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, ${BRAND.primary}50, transparent 40%),
              radial-gradient(circle at 80% 70%, ${BRAND.secondary}40, transparent 50%)
            `,
          }}
        />

        {/* Title */}
        <h2
          className="coe-title text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 font-sans tracking-tight"
          style={{
            background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          CoE Videos
        </h2>

        {/* Slider Container */}
        <div className="coe-slider-container w-full max-w-7xl mx-auto px-6 relative flex flex-col items-center justify-center">
          
          {/* Slider Row */}
          <div className="relative w-full flex items-center justify-center h-[340px] sm:h-[385px] overflow-visible">
            
            {/* Prev Button */}
            <button
              onClick={prevSlide}
              className="absolute left-0 sm:left-4 lg:left-12 z-40 p-2.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-white hover:bg-brand-primary hover:border-brand-primary/50 transition-all duration-300 shadow-md hover:scale-105 cursor-pointer"
              aria-label="Previous Video"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Absolute Cards */}
            <div className="relative flex items-center justify-center w-full h-full overflow-visible">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  id={`coe-card-${index}`}
                  onClick={() => openVideo(video.url)}
                  className="absolute w-[220px] sm:w-[250px] h-[300px] sm:h-[340px] cursor-pointer"
                  style={{ transform: "scale(0)", opacity: 0, zIndex: 0 }}
                >
                  <div
                    className="relative w-full h-full rounded-[24px] overflow-hidden backdrop-blur-xl border shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-all duration-500 hover:scale-[1.02] hover:border-brand-primary/40 hover:shadow-[0_0_30px_rgba(255,57,1,0.12)] group"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderColor: `${BRAND.primary}20`,
                    }}
                  >
                    <img
                      src={video.poster}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-black/45 group-hover:bg-black/25 transition-all duration-500" />

                    {/* Play icon with pulsing background ring */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm shadow-xl transition-all duration-500 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.secondary})`,
                        }}
                      >
                        <div className="absolute inset-0 rounded-full bg-brand-primary/30 animate-ping group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
                        <Play className="h-4.5 w-4.5 fill-current ml-0.5 text-white" />
                      </div>
                    </div>

                    {/* Banner Card Text */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/85 to-transparent">
                      <p className="text-xs sm:text-sm font-semibold text-white/90 font-sans line-clamp-2 leading-relaxed">
                        {video.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-0 sm:right-4 lg:right-12 z-40 p-2.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-white hover:bg-brand-primary hover:border-brand-primary/50 transition-all duration-300 shadow-md hover:scale-105 cursor-pointer"
              aria-label="Next Video"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Indicators row */}
          <div className="w-full max-w-[280px] mt-6 space-y-4">
            {/* Visual timer bar */}
            <div className="h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
              <div
                ref={progressRef}
                className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-all"
                style={{ width: "0%" }}
              />
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2.5">
              {videos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                    i === current
                      ? "w-6 bg-brand-primary shadow-[0_0_10px_rgba(255,57,1,0.5)]"
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to video ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MODAL */}
      <CommonVideoModal
        isOpen={!!selectedVideo}
        videoUrl={selectedVideo ?? ""}
        onClose={() => setSelectedVideo(null)}
      />
    </>
  );
}
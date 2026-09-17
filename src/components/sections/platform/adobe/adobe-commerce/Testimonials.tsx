"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, MessageSquare, Quote } from "lucide-react";

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

interface Testimonial {
  title?: string;
  description?: string;
  url?: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);
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
  const offsetX = isMobile ? 120 : isTablet ? 250 : 380;

  /* Fetch Testimonials from Contentful */
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://graphql.contentful.com/content/v1/spaces/pj0maraabon4/environments/production",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer 6t-wgSsZnD80bBuG3_VNcGKE0lF-LAE7EPa5NE286HU",
            },
            body: JSON.stringify({
              query: `
                {
                  platformAdobeCommerces(id:"231JBLMJLXr5L3FUHFNGEI") {
                    dluxClientsSayCollection {
                      items {
                        title
                        description
                        url
                      }
                    }
                  }
                }
              `,
            }),
          }
        );

        const json = await res.json();
        const items =
          json?.data?.platformAdobeCommerces?.dluxClientsSayCollection?.items ||
          [];

        setTestimonials(items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  /* Navigation Callbacks */
  const nextSlide = useCallback(() => {
    if (!testimonials.length) return;
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    if (!testimonials.length) return;
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  /* Reset visual progress bar (5s slide interval) */
  const resetProgress = useCallback(() => {
    if (!progressRef.current) return;

    if (progressBarTween.current) {
      progressBarTween.current.kill();
    }

    gsap.set(progressRef.current, { width: "0%" });

    if (!isHovering && testimonials.length > 0) {
      progressBarTween.current = gsap.to(progressRef.current, {
        width: "100%",
        duration: 5.0,
        ease: "none",
        onComplete: nextSlide,
      });
    }
  }, [isHovering, testimonials.length, nextSlide]);

  /* Auto Slider Controller */
  useEffect(() => {
    if (!testimonials.length) return;
    resetProgress();
    return () => {
      if (progressBarTween.current) progressBarTween.current.kill();
    };
  }, [active, isHovering, testimonials.length, resetProgress]);

  /* GSAP Content Change Animation */
  useEffect(() => {
    if (!testimonials.length) return;

    // Fast, hardware-accelerated fade-and-scale text reveal inside the console card
    gsap.fromTo(
      ".coe-testi-details",
      { opacity: 0, scale: 0.99, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [active, testimonials.length]);

  /* GSAP Scroll Entrance Animations */
  useEffect(() => {
    if (!testimonials.length) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testi-title-container",
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".testi-title-container",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".testi-split-container",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".testi-split-container",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [testimonials.length]);

  /* Parse reviewer title into Name and Company details */
  const parseClientInfo = useCallback((titleString?: string) => {
    if (!titleString) return { name: "Client Partner", role: "" };
    const commaIndex = titleString.indexOf(",");
    if (commaIndex !== -1) {
      return {
        name: titleString.substring(0, commaIndex).trim(),
        role: titleString.substring(commaIndex + 1).trim(),
      };
    }
    return { name: titleString, role: "" };
  }, []);

  const activeTestimonial = testimonials[active];
  const activeInfo = parseClientInfo(activeTestimonial?.title);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white py-24 overflow-hidden"
    >
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Brand Glows */}
      <div
        className="absolute inset-0 opacity-20 -z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 10% 25%, ${BRAND.primary}45, transparent 40%),
            radial-gradient(circle at 90% 75%, ${BRAND.secondary}35, transparent 50%)
          `,
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Title and Eyebrow */}
        <div className="testi-title-container text-center space-y-4 mb-20">
          <div className="mx-auto w-fit flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary/5 px-4 py-1.5 backdrop-blur-xl">
            <MessageSquare className="h-3.5 w-3.5 text-brand-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary">
              Client Feedback
            </span>
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-sans tracking-tight"
            style={{
              background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Trusted by Industry Leaders
          </h2>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-[350px] gap-3">
            <div className="w-8 h-8 border-4 border-t-brand-primary border-white/20 rounded-full animate-spin" />
            <span className="text-xs font-semibold tracking-wider text-white/40">Loading Reviews...</span>
          </div>
        ) : (
          <div
            className="testi-split-container grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* LEFT COLUMN: Client Selectors */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide">
              {testimonials.map((item, index) => {
                const info = parseClientInfo(item.title);
                const isActive = index === active;

                return (
                  <button
                    key={index}
                    onClick={() => setActive(index)}
                    className={`w-full text-left p-4 rounded-2xl border flex items-center gap-4 transition-all duration-500 cursor-pointer shrink-0 sm:shrink lg:shrink-0 ${
                      isActive
                        ? "bg-brand-primary/10 border-brand-primary shadow-[0_0_20px_rgba(255,57,1,0.12)] scale-[1.02]"
                        : "bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-white/20"
                    }`}
                    style={{
                      width: isMobile ? "240px" : "auto",
                    }}
                  >
                    {/* Tiny Avatar */}
                    {item.url && (
                      <div
                        className={`w-11 h-11 rounded-full overflow-hidden border transition-all duration-500 ${
                          isActive ? "border-brand-primary scale-105" : "border-white/10"
                        }`}
                      >
                        <Image
                          src={item.url}
                          alt={info.name}
                          width={44}
                          height={44}
                          className="object-cover h-full w-full"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="truncate">
                      <h4
                        className={`text-sm font-semibold transition-all duration-300 ${
                          isActive ? "text-brand-primary" : "text-white/90"
                        }`}
                      >
                        {info.name}
                      </h4>
                      <p className="text-[11px] text-white/50 truncate max-w-[150px] font-sans">
                        {info.role}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* RIGHT COLUMN: Showcase Console Card */}
            <div
              className="lg:col-span-8 relative flex flex-col justify-between rounded-3xl p-8 sm:p-12 border backdrop-blur-xl shadow-[0_30px_70px_rgba(0,0,0,0.85)] min-h-[350px] overflow-hidden"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
                borderColor: `${BRAND.primary}20`,
              }}
            >
              {/* Card Subtle grid overlay inside for a high-tech console feel */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none opacity-50" />

              {/* Huge Background Quote Decal */}
              <div className="absolute top-8 right-10 opacity-5 text-brand-primary pointer-events-none select-none">
                <Quote className="h-28 w-28 fill-current" />
              </div>

              {/* Details Content Box */}
              <div className="coe-testi-details relative z-10 flex-1 flex flex-col justify-between space-y-8">
                {/* Testimonial Quote Description */}
                <p className="text-white/90 text-lg sm:text-2xl font-normal leading-relaxed italic font-sans">
                  “{activeTestimonial?.description}”
                </p>

                {/* Testimonial Author Row */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  {activeTestimonial?.url && (
                    <div className="p-0.5 rounded-full border border-brand-primary/30 shadow-[0_0_15px_rgba(255,57,1,0.15)]">
                      <Image
                        src={activeTestimonial.url}
                        alt={activeInfo.name}
                        width={60}
                        height={60}
                        className="rounded-full object-cover h-[60px] w-[60px]"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg tracking-wide font-sans">
                      {activeInfo.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-secondary font-medium font-sans">
                      {activeInfo.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Next/Prev Navigation overlay arrows */}
              <div className="absolute right-6 bottom-6 z-20 flex gap-2">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full border border-white/10 bg-black/60 hover:bg-brand-primary hover:border-brand-primary/50 text-white transition-all cursor-pointer shadow-md hover:scale-105"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full border border-white/10 bg-black/60 hover:bg-brand-primary hover:border-brand-primary/50 text-white transition-all cursor-pointer shadow-md hover:scale-105"
                  aria-label="Next Review"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Visual Autoplay Timer line */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/10">
                <div
                  ref={progressRef}
                  className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-all"
                  style={{ width: "0%" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
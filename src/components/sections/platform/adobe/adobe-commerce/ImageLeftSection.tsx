"use client";

import { useEffect, useState, useMemo, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShoppingBag } from "lucide-react";

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

interface ContentData {
  title?: string;
  description?: string;
  url?: string;
}

export default function ImageLeftSection() {
  const [contentData, setContentData] = useState<ContentData | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  /* Fetch content from Contentful */
  useEffect(() => {
    const controller = new AbortController();

    const fetchContent = async () => {
      try {
        const res = await fetch(
          "https://graphql.contentful.com/content/v1/spaces/pj0maraabon4/environments/production",
          {
            method: "POST",
            signal: controller.signal,
            cache: "force-cache",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer 6t-wgSsZnD80bBuG3_VNcGKE0lF-LAE7EPa5NE286HU",
            },
            body: JSON.stringify({
              query: `
                {
                  platformAdobeCommerces(id: "231JBLMJLXr5L3FUHFNGEI") {
                    imageLeftContent {
                      title
                      description
                      url
                    }
                  }
                }
              `,
            }),
          }
        );

        const json = await res.json();
        setContentData(
          json?.data?.platformAdobeCommerces?.imageLeftContent ?? null
        );
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Fetch Error:", err);
        }
      }
    };

    fetchContent();
    return () => controller.abort();
  }, []);

  /* GSAP Scroll Entrance Animations */
  useEffect(() => {
    if (!contentData) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Image entrance slide & fade in from left
      gsap.fromTo(
        ".coe-img-left",
        { opacity: 0, x: -50, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".coe-img-left",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Text entrance staggered fade up from right
      gsap.fromTo(
        ".coe-txt-right > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".coe-txt-right",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [contentData]);

  /* Text Formatter */
  const formatText = useMemo(() => {
    return (text?: string): ReactNode => {
      if (!text) return null;

      const parts = text.split("_");

      return parts.map((part, i) => (
        <span key={i} className="block mb-4 leading-relaxed font-sans">
          {part}
        </span>
      ));
    };
  }, []);

  const imageUrl = useMemo(
    () => contentData?.url || "https://via.placeholder.com/400x500",
    [contentData]
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-6 md:px-12 bg-black text-white overflow-hidden"
    >
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Brand Glows */}
      <div
        className="absolute inset-0 opacity-20 -z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 10% 30%, ${BRAND.primary}40, transparent 40%),
            radial-gradient(circle at 90% 75%, ${BRAND.secondary}30, transparent 50%)
          `,
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Main Glowing Border Card Container */}
        <div
          className="rounded-[40px] p-[1.5px] transition-all duration-700 hover:shadow-[0_0_50px_rgba(255,57,1,0.08)]"
          style={{
            background: `linear-gradient(135deg, ${BRAND.primary}25, ${BRAND.secondary}25)`,
          }}
        >
          <div
            className="rounded-[40px] p-8 md:p-14 lg:p-16 flex flex-col lg:flex-row items-center gap-14 md:gap-16"
            style={{
              background: "linear-gradient(180deg, #090909, #101010)",
              boxShadow: "0 25px 70px rgba(0,0,0,0.85)",
            }}
          >
            {/* Left Image Section */}
            <div className="coe-img-left w-full lg:w-[42%] flex justify-center">
              <div
                className="relative rounded-3xl p-1.5 transition-all duration-500 hover:scale-[1.02] shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:shadow-[0_0_40px_rgba(255,57,1,0.15)] group"
                style={{
                  background: `linear-gradient(135deg, ${BRAND.primary}30, transparent)`,
                }}
              >
                <img
                  src={imageUrl}
                  alt="Adobe Commerce Infrastructure Showcase"
                  loading="lazy"
                  className="w-full h-[360px] md:h-[450px] object-cover rounded-2xl transition duration-700 group-hover:scale-[1.01]"
                />
                {/* Glow Overlay on Image hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl pointer-events-none" />
              </div>
            </div>

            {/* Right Text Content Section */}
            <div className="coe-txt-right w-full lg:w-[58%] text-center lg:text-left space-y-6">
              {/* Category eyebrow badge */}
              <div className="mx-auto lg:mx-0 w-fit flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary/5 px-4 py-1.5 backdrop-blur-xl mb-2">
                <ShoppingBag className="h-3.5 w-3.5 text-brand-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary">
                  Enterprise Integration
                </span>
              </div>

              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight font-sans"
                style={{
                  background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {contentData?.title ? formatText(contentData.title) : "E-Commerce Reimagined"}
              </h2>

              <div className="text-white/70 text-sm md:text-base leading-relaxed font-sans font-normal max-w-2xl mx-auto lg:mx-0">
                {contentData?.description ? formatText(contentData.description) : "Loading details..."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
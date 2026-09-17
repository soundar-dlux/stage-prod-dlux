"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { GraphQLClient, gql } from "graphql-request";
import { FaArrowRight } from "react-icons/fa6";

const endpoint =
  "https://graphql.contentful.com/content/v1/spaces/pj0maraabon4/environments/production";

const client = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer 6t-wgSsZnD80bBuG3_VNcGKE0lF-LAE7EPa5NE286HU`,
  },
});

const query = gql`
  query {
    blogPageCollection {
      items {
        heroBannerCollection {
          items {
            url
          }
        }
      }
    }
  }
`;

const Hero: React.FC = () => {
  const [heroBanners, setHeroBanners] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch once
  useEffect(() => {
    const fetchHeroBanners = async () => {
      try {
        const data: any = await client.request(query);

        const urls =
          data.blogPageCollection.items[0]?.heroBannerCollection?.items.map(
            (item: any) => item.url
          ) || [];

        setHeroBanners(urls);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHeroBanners();
  }, []);

  // Auto slide
  useEffect(() => {
    if (!heroBanners.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === heroBanners.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroBanners]);

  // Preload next image
  useEffect(() => {
    if (!heroBanners.length) return;

    const nextIndex =
      currentIndex === heroBanners.length - 1 ? 0 : currentIndex + 1;

    const img = new window.Image();
    img.src = heroBanners[nextIndex];
  }, [currentIndex, heroBanners]);

  const heroUrl = useMemo(
    () => heroBanners[currentIndex],
    [currentIndex, heroBanners]
  );

  if (!heroUrl) return null;

  return (
    <section className="relative w-[calc(100%-40px)] h-[85vh] xl:h-[calc(100vh-40px)] m-5 rounded-3xl overflow-hidden">
      
      {/* Image */}
      <div className="absolute inset-0">
        <Image
          key={heroUrl}
          src={heroUrl}
          alt="hero"
          fill
          priority
          className="object-cover scale-105 transition-transform duration-[2000ms]"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 flex flex-col justify-center items-center text-center px-6">
        
        {/* Content */}
        <div className="max-w-3xl text-white space-y-6 animate-[fadeUp_1s_ease_forwards]">
          
          <h1 className="text-3xl md:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
            Insights. Innovation. <br />
            <span className="text-white/80">Enterprise Excellence</span>
          </h1>

          <p className="text-white/70 text-sm md:text-lg max-w-xl mx-auto">
            Discover ideas, trends, and strategies that drive modern businesses forward.
          </p>

          <div className="flex justify-center ">
            <a href="https://www.dluxtech.com/success-stories">
            <button className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-semibold shadow-xl hover:bg-black hover:text-white transition-all duration-300">
              Start Exploring
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white group-hover:bg-white group-hover:text-black transition">
                <FaArrowRight />
              </span>
            </button>
          </a>
          </div>
        </div>

        {/* Progress */}
        <div className="absolute bottom-6 flex items-center gap-4 text-white">
          <span>{String(currentIndex + 1).padStart(2, "0")}</span>

          <div className="w-24 h-[2px] bg-white/30 rounded overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-500"
              style={{
                width: `${
                  ((currentIndex + 1) / heroBanners.length) * 100
                }%`,
              }}
            />
          </div>

          <span>{String(heroBanners.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play, ArrowRight, X } from "lucide-react";
import Link from "next/link";

interface VideoItem {
  id: string;
  title: string;
  linkText?: string;
  videoUrl?: string; // Optional embedded video link or demo
}

const videoItems: VideoItem[] = [
  {
    id: "boomi",
    title: "Integrating Bynder with Boomi",
    linkText: "Watch the video",
  },
  {
    id: "compliance-agent",
    title: "Implementing Bynder with the Brand Compliance Agent",
    linkText: "Watch the video",
  },
];

export default function VideoLibrarySection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <section ref={sectionRef} className="relative bg-white py-16 sm:py-20 lg:py-10">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-[#111111] sm:text-4xl md:text-5xl">
            Bynder Implementation{" "}
            <span className="text-[#FF500D]">Video Library</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#555555] sm:text-lg">
            Our Video Vault holds walkthroughs of how we approach common Bynder
            implementation scenarios, from integrating with an enterprise
            integration platform to configuring brand compliance checks.
          </p>
        </motion.div>

        {/* Video Cards Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
          {videoItems.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => setActiveVideo(video)}
              className="group relative flex flex-col sm:flex-row overflow-hidden rounded-3xl sm:rounded-[28px] border border-[#FCE6D8] bg-white shadow-[0_4px_25px_rgba(255,80,13,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(255,80,13,0.12)] cursor-pointer"
            >
              {/* Left Video Thumbnail / Play Button Area */}
              <div className="relative flex w-full sm:w-[46%] min-h-[170px] sm:min-h-[190px] items-center justify-center bg-[#FFF0E8] transition-colors duration-300 group-hover:bg-[#FFEAE0]">
                {/* Play Button */}
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#FF3B00] to-[#FF771C] text-white shadow-lg shadow-orange-500/30 transition-transform duration-300 group-hover:scale-110">
                  <Play className="ml-1 h-6 w-6 fill-white text-white" />
                </div>
              </div>

              {/* Right Content Area */}
              <div className="flex w-full sm:w-[54%] flex-col justify-center p-6 sm:p-8">
                <h3 className="mb-4 text-base sm:text-lg font-bold leading-snug text-[#111111] group-hover:text-[#FF500D] transition-colors duration-200">
                  {video.title}
                </h3>

                <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF500D] transition-all group-hover:gap-2">
                  <span>{video.linkText || "Watch the video"}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Information Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 sm:mt-12 flex items-center justify-center"
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="flex-shrink-0">
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-[1.8px] border-[#FF500D] text-[#FF500D]">
                <span className="text-xs font-bold leading-none">i</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-[#555555]">
              <span className="font-semibold text-[#FF500D]">
                Can't find what you need?
              </span>{" "}
              If your situation is different, our team can talk you through how
              we would approach it.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Simple Video Modal Popup */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl bg-white p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="mb-4 text-xl font-bold text-[#111111]">
              {activeVideo.title}
            </h3>

            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#FFF0E8] flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#FF3B00] to-[#FF771C] text-white shadow-lg">
                <Play className="ml-1 h-7 w-7 fill-white" />
              </div>
              <p className="max-w-md text-sm text-[#555555]">
                Walkthrough video demonstration for{" "}
                <span className="font-semibold text-[#111111]">
                  {activeVideo.title}
                </span>
                .
              </p>
              <Link
                href="#contact"
                onClick={() => setActiveVideo(null)}
                className="mt-4 inline-flex items-center rounded-full bg-[#FF500D] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#E0440B]"
              >
                Request Full Walkthrough
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


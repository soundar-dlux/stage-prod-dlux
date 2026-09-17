"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

interface VideoItem {
  id: number;
  title: string;
  date: string;
  time: string;
  url: string;
  thumbnail: string;
}

const videos: VideoItem[] = [
  {
    id: 1,
    title: "Chillin’ with Lux: How Martech is Changing the Game",
    date: "4 April 2025",
    time: "12:45",
    url: "https://dluxtech.com/webinar-page-video-01.mp4",
    thumbnail:
      "https://images.ctfassets.net/pj0maraabon4/27kMtuEMdO2yP1iYFwQLXy/79a613e4db9615171b387530ca282190/webinar-thumbnail_Artboard_1-01.jpg",
  },
  {
    id: 2,
    title: "Building a Scalable Content Supply Chain for Growing Businesses",
    date: "4 April 2025",
    time: "12:45",
    url: "https://dluxtech.com/webinar-page-video-02.mp4",
    thumbnail:
      "https://images.ctfassets.net/pj0maraabon4/1vIieWQ3wq3kJK7wJByTkF/7f7bf3fba6fbc8b2830e236fedc21dbb/webinar-thumbnail-02.jpg",
  },
  {
    id: 3,
    title: "Hack the Stack: Smarter Martech for Content Ops That Work",
    date: "4 April 2025",
    time: "12:45",
    url: "https://dluxtech.com/webinar-page-video-03.mp4",
    thumbnail:
      "https://images.ctfassets.net/pj0maraabon4/zQdF2uBLlJfhTIDzR5T1d/7c971e4cfe949ca96eaa2021e92a04ee/webinar-thumbnail-03_2.jpg",
  },
];

export default function VideoShowcase() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const stackRef = useRef<HTMLDivElement | null>(null);

  /* Screen detection */
  useEffect(() => {
    const check = () => setIsMobileOrTablet(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* Mobile stacked autoplay */
  useEffect(() => {
    if (!isMobileOrTablet || activeVideo || !stackRef.current) return;

    const stack = stackRef.current;
    const interval = setInterval(() => {
      const cards = stack.querySelectorAll(".card");
      const last = cards[cards.length - 1];
      if (!last) return;

      last.classList.add("swap");
      setTimeout(() => {
        last.classList.remove("swap");
        stack.insertBefore(last, stack.firstChild);
      }, 1200);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobileOrTablet, activeVideo]);

  /* Lock scroll on modal */
  useEffect(() => {
    document.body.style.overflow = activeVideo ? "hidden" : "auto";
  }, [activeVideo]);

  return (
    <motion.section
      id="webinar-vid-section"
      className="w-full px-4 md:px-16 py-16 text-white bg-black"
      style={{
        backgroundImage:
          "url('https://images.ctfassets.net/pj0maraabon4/191BOERTELcczZ9QlKGvAi/a473b5e73cc2b491b035ffbb227f1065/video-section-bg-img.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12">
          Watch Our Past
          <span className="ml-2 bg-gradient-to-r from-[#ff3901] to-[#F07800] bg-clip-text text-transparent">
            Webinars
          </span>
          <br /> On-Demand
        </h2>

        {/* Mobile stack */}
        {isMobileOrTablet ? (
          <div
            ref={stackRef}
            className="relative flex items-center justify-center h-[320px] sm:h-[380px] overflow-hidden"
          >
            {videos.map((video) => (
              <div
                key={video.id}
                className="card absolute top-1/2 left-[45%] h-[260px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-lg sm:h-[380px] sm:w-[250px]"
                onClick={() => setActiveVideo(video)}
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-contain rounded-2xl"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="w-14 h-14 rounded-full border-4 border-white flex items-center justify-center bg-white/20">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}

            {/* Stack animations */}
            <style jsx>{`
              .card:nth-last-child(1) {
                transform: translate(-50%, -50%) scale(1.05);
                box-shadow: 0 1px 5px 5px rgba(255, 193, 111, 0.5);
              }
              .swap {
                animation: swap 1.3s ease-out forwards;
              }
              @keyframes swap {
                100% {
                  transform: translate(-80%, -50%) scale(0.5);
                }
              }
            `}</style>
          </div>
        ) : (
          /* Desktop hover */
          <div className="flex items-end justify-center gap-6">
            {videos.map((video, index) => {
              const isActive =
                hovered === video.id || (hovered === null && index === 1);

              return (
                <motion.div
                  key={video.id}
                  onHoverStart={() => setHovered(video.id)}
                  onHoverEnd={() => setHovered(null)}
                  onClick={() => setActiveVideo(video)}
                  animate={{
                    scale: isActive ? 1.05 : 1,
                    width: isActive ? 540 : 400,
                    height: isActive ? 459 : 300,
                    zIndex: isActive ? 20 : 10,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative cursor-pointer rounded-lg overflow-hidden bg-gray-300"
                >
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center bg-white/20">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Popup */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-5 right-5 bg-white/20 p-2 rounded-full"
            >
              <X className="text-white w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-[90%] md:w-[70%] lg:w-[60%] aspect-video bg-black rounded-xl overflow-hidden"
            >
              <video
                src={activeVideo.url}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

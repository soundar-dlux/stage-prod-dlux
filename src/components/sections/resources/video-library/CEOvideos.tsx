"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";

const cards = [
  {
    id: 1,
     title: "Improved Online Shopping Experience: Integrating Adobe Commerce with Adobe Analytics", 
    image:
      "https://images.ctfassets.net/pj0maraabon4/ZjN1O5ofZ2pQZpEFvouFG/bea0016679a641f543da8ff80077b8f7/adobe-commerce-aep.jpg",
    video: "https://videos.ctfassets.net/pj0maraabon4/6QfiQGZgTOFWE31eoXKRqr/a569dfea202f1500285af3ca764027a8/ceo-videos-01.mp4",
  },
  {
    id: 2,
    title: "AEM+DLUX Content Creation Made Easy", 
    image:
      "https://images.ctfassets.net/pj0maraabon4/g6VhGB0ALUorN4PwOv3Uv/1ad7132516c95d5d86237d0a4692a6e7/Next_Gen_Martech.jpg",
    video: "https://www.youtube.com/watch?v=A_W3cORSBDc",
  },
  {
    id: 3,
    title: "AEP(Shop Smarter: Adobe Commerce+AEP Delivers Personalized Shopping)", 
    image:
      "https://images.ctfassets.net/pj0maraabon4/2UFmJrUnXw4LIPamQSrbzh/b29acffcd3a78ec04f6e9283961e20ff/AEP-Integration.jpg",
    video: "https://videos.ctfassets.net/pj0maraabon4/GSLfChdktR6W6JnIWQnj2/9e5fd1db0c46842798223e629d1efe69/ceo-videos-03.mp4",
  },
  {
    id: 4,
    title: "Adobe Sensei in Action: Real-Time Product Recommendations That Convert", 
    image:
      "https://images.ctfassets.net/pj0maraabon4/19EOD4H2jJzaITuJ1VCYjP/6f194ef1906f179fdff257785255c5a6/Product_Recommentation.jpg",
    video: "https://videos.ctfassets.net/pj0maraabon4/5QnaqhEn58fUI8EzHHFGpO/618b0ebbac3f815457bd92137bbba6e7/ceo-videos-04.mp4",
  },
  {
    id: 5,
    title: "Adobe Commerce Livesearch|Smarter shopping way|Better Customer Experience", 
    image:
      "https://images.ctfassets.net/pj0maraabon4/3N9yqUkjutnAizDLHKX5GW/327f7618bcc6bef20443bfa20bff4604/Live_Search.jpg",
    video: "https://videos.ctfassets.net/pj0maraabon4/1e3hQ6aGDV5CCh6a43UJm4/98404f19aa0f77f4e67d4cb6d15cffa3/ceo-videos-05.mp4",
  },
  {
    id: 6,
    title: "Online shopping made smarter|Digital Commerce", 
    image:
      "https://images.ctfassets.net/pj0maraabon4/6xE3Qtgu00MlBoohi279ax/e45f0a93a8f458aadee38da94a50ec4a/Analytics.jpg",
    video: "https://videos.ctfassets.net/pj0maraabon4/7CG3xXvh4HMW2qADioFT4l/89f27424925df9f32eb297619f55adbb/ceo-videos-06.mp4",
  },
  {
    id: 7,
    title: "Integrating Creative Assets+ChatGPT+Adobe Workfront Fusion to create a smarter, consistent workflow.", 
    image:
      "https://images.ctfassets.net/pj0maraabon4/48S6CgQXOU0XPQKFFjB4Hb/fe1bbce7a895d641b5fbc08458b6c9a9/workflow_automation.jpg",
    video: "https://videos.ctfassets.net/pj0maraabon4/5eD3iSAq4i0Wlk8AtF2LYg/43297cc8d4930564d6e952fe737e525f/ceo-videos-07.mp4",
  },
    {
    id: 8,
    title: "Integrating Adobe Workfront&Tableau's visualisation Tool|Snowflake ", 
    image:
      "https://images.ctfassets.net/pj0maraabon4/6LEf7JKCfZkPCQIZL0C57v/8363311095c5d99df6cc1e7adefcc2c1/Real_Time.jpg",
    video: "https://videos.ctfassets.net/pj0maraabon4/6beKvkSg8y2YKh3v7QxNiZ/08de91f870f351a1e3e3b887fd7b3bfc/ceo-videos-08.mp4",
  },
   {
    id: 9,
    title: "Integrating Microsoft 365 with Aprimo|Project Management Software Tool", 
    image:
      "https://images.ctfassets.net/pj0maraabon4/6Tlk4dVpuajwuQetwYCBuN/b7bba4afe4def6ed99753db2768f05df/aprimo-video-vault.jpg",
    video: "https://videos.ctfassets.net/pj0maraabon4/58mIe4HBKxekJNWIm1axbT/1d7c4b68e451d0fc6811e77a1f0ef2ed/ceo-videos-09.mp4",
  },
   {
    id: 10,
    title: "Muti-Site Manager to streamline workflows using Adobe Experience Manager", 
    image:
      "https://images.ctfassets.net/pj0maraabon4/1NwLkskgywCtvQoomF551t/089e2b46a8e1e08a9c9122ce78b366ed/organisation-face-video-vault.jpg",
    video: "https://videos.ctfassets.net/pj0maraabon4/7CpjQ4H9VtSXkBrbsCyiM3/36410ab59792d0dd11f8a1850be14348/ceo-videos-10.mp4",
  },
];

export default function CEOvideo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const handleNext = () => {
    setDirection("next");
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setDirection("prev");
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const getVisibleCards = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(cards[(activeIndex + i) % cards.length]);
    }
    return visible;
  };

  // Disable scroll when modal open
  useEffect(() => {
    document.body.style.overflow = activeVideo ? "hidden" : "auto";
  }, [activeVideo]);

  return (
    <section
      className="w-full m-auto text-white flex flex-col items-center md:px-16 px-4 lg:pl-[80px] lg:pr-[120px] lg:pb-20"
      aria-labelledby="coe-videos-heading"
    >
      {/* Slow Ping Animation */}
      <style>
        {`
          @keyframes slow-ping {
            0% { transform: scale(1); opacity: 0.8; }
            80% { transform: scale(2.2); opacity: 0; }
            100% { transform: scale(2.2); opacity: 0; }
          }
          .animate-slow-ping {
            animation: slow-ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
        `}
      </style>

      <div className="flex flex-col-reverse lg:flex-row items-start justify-between w-full">

        {/* LEFT BIG CARD */}
        <div className="flex items-end overflow-hidden w-full relative">
          <AnimatePresence mode="wait">
            {getVisibleCards().map(
              (card, i) =>
                i === 0 && (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-2xl w-full h-[400px] lg:w-[629px] lg:h-[558px] cursor-pointer overflow-hidden"
                    onClick={() => setActiveVideo(card.video)}
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="(max-width:1024px) 100vw, 629px"
                      priority
                    />

                    {/* Title */}
                    <p className="absolute bottom-0 left-0 w-full md:w-[70%] h-[35%] content-end text-sm lg:text-lg font-semibold px-4 py-2 bg-gradient-to-t from-black via-black/80 to-transparent">
                      {card.title}
                    </p>

                    {/* Play Button */}
                    <div className="absolute bottom-6 right-6">
                      <div className="relative flex items-center justify-center">
                        <span className="absolute w-14 h-14 rounded-full bg-white/30 animate-slow-ping"></span>
                        <div className="relative w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                          <Play className="text-black w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex flex-col gap-1 lg:ml-6 w-full mb-10 lg:mb-0">

          <h2
            id="coe-videos-heading"
            className="text-3xl lg:text-5xl font-semibold"
          >
            CoE Videos
          </h2>

          <p className="mt-3 text-gray-300 text-sm lg:text-[16px]">
            Experience the next-level of our CoE videos: bold ideas,
            breakthrough innovation, and the vision that sets us apart.
          </p>

          {/* Navigation Arrows */}
          <div className="flex justify-end items-center mt-6">
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                aria-label="Previous Video"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ff3901] to-[#F07800] flex items-center justify-center"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Video"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-[#F07800] to-[#ff3901] flex items-center justify-center"
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          {/* SMALL CARDS */}
          <div className="hidden lg:flex gap-4 mt-6 overflow-hidden">
            {getVisibleCards()
              .slice(1)
              .map((card) => (
                <div
                  key={card.id}
                  className="relative rounded-2xl w-[315px] h-[298px] cursor-pointer overflow-hidden"
                  onClick={() => setActiveVideo(card.video)}
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="315px"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full mt-8">
        <div className="w-full h-1 bg-gray-700 rounded">
          <div
            className="h-1 bg-gradient-to-r from-[#ff3901] to-[#F07800] rounded"
            style={{
              width: `${((activeIndex + 1) / cards.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-4xl p-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 bg-white/20 rounded-full p-2"
              >
                <X size={24} />
              </button>

              {activeVideo.includes("youtube") ? (
                <iframe
                  src={activeVideo.replace("watch?v=", "embed/")}
                  className="w-full h-[450px] rounded-lg"
                  allowFullScreen
                  title="CEO Video"
                />
              ) : (
                <video
                  src={activeVideo}
                  controls
                  autoPlay
                  className="w-full h-[450px] rounded-lg bg-black"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const cards = [
   {
    id: 1,
    title: "Unleash the Power of ChatGPT x Adobe Workfront: A DLUX TECH Innovation",
    height: "lg:h-[437px]",
    width: "lg:lg:w-[525px]",
    imageUrl: "https://images.ctfassets.net/pj0maraabon4/1urwIFx73M5FJX1NwYJqsq/f5e8c256adfc8b66a1255e4d3f3a0eec/workfront_chatgpt.jpg",
    videoUrl: "https://videos.ctfassets.net/pj0maraabon4/5m4oFnM5liDyvqh2osFtYt/3f88bcd267cad3e23802e24979702bf4/1.mp4",
  },
  {
    id: 2,
    title: "Effortless Custom Form Migration with Workfront ",
    height: "lg:h-[280px]",
    width: "lg:w-[405px]",
    imageUrl: "https://images.ctfassets.net/pj0maraabon4/29GHZ92yOsRCfoBBB1zQIz/0bc0beae56c66265901a2771cc2af51f/workfront___Fusion.jpg",
    videoUrl: "https://videos.ctfassets.net/pj0maraabon4/4nzwh8CJomPfZjdBUAbpSE/bf2142c36ccdd8956d23502a683b892b/3.mp4",
  },
  {
    id: 3,
    title: "Environmental promotion in Adobe Workfront",
    height: "lg:h-[380px]",
    width: "lg:w-[305px]",
    imageUrl: "https://images.ctfassets.net/pj0maraabon4/4gmC2eSWGOEwSP8wqAzboC/24b7a7b7317607984a2b4a7615be77f9/Workflow-automation.jpg",
    videoUrl: "https://videos.ctfassets.net/pj0maraabon4/2cTlVZwVCOQabJYyauXzy4/5a2a1826fc621cc8825d1891cef1773d/work-front-03.mp4",
  },
  {
    id: 4,
    title: "Sandbox Environment with object Synchronization Tool | Workfront Fusion",
    height: "lg:h-[340px]",
    width: "lg:w-[400px]",
    imageUrl: "https://images.ctfassets.net/pj0maraabon4/2MkLhtRZU7WhXawbmMCtNZ/82a2aacea17f4dbc63369b6752c01c5e/worklist-image.jpg",
    videoUrl: "https://videos.ctfassets.net/pj0maraabon4/1hQeIoRhPu1CiSWorPsB6e/e77e5662d31fa38304527df13a44555e/Work_front_04.mp4",
  },
  {
    id: 5,
    title: "Improved Data Migration using Workfront",
    height: "lg:h-[437px]",
    width: "lg:w-[525px]",
    imageUrl: "https://images.ctfassets.net/pj0maraabon4/5442ciQ6vmSy223ejIfp8t/70cc30c9c6d6f898b4dd9c7a3a570347/workfront-office-working-laptop.jpg",
    videoUrl: "https://videos.ctfassets.net/pj0maraabon4/3B6wsEeK1de7x5xOwar8rn/f00591e359484dbc512226df41e46361/Workfront_Video_05.mp4",
  },
  {
    id: 6,
    title: "Workfront in now  tracking the Financial management (billable , non-billable ) | Workfront fusion",
    height: "lg:h-[320px]",
    width: "lg:w-[370px]",
    imageUrl: "https://images.ctfassets.net/pj0maraabon4/6RCHk3KBIIVETOGx8urKTn/341a127cb5c5b0e5e225d7c93e4a354a/workflow-bug-image.jpg",
    videoUrl: "https://videos.ctfassets.net/pj0maraabon4/6zgrnljz5IWjKLvGKdJDRm/14bcb8ab6d309420c7f2ac1ac29fdd72/Workfront_Video_06.mp4",
  },
];

export default function WorkflowAutomation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1)
      setCurrentIndex(currentIndex + 1);
  };

  const openModal = (url: string) => setSelectedVideo(url);

  const closeModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setSelectedVideo(null);
  };

  // Disable scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selectedVideo ? "hidden" : "auto";
  }, [selectedVideo]);

  // Escape key close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedVideo) closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedVideo]);

  return (
    <section
      className="relative w-full m-auto text-white px-6 py-12 md:px-16"
      aria-labelledby="workflow-heading"
    >
      {/* TOP ROW */}
      <div className="lg:flex justify-between items-center mb-10">

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            id="workflow-heading"
            className="text-4xl lg:text-5xl font-bold capitalize"
          >
            <span className="bg-gradient-to-r from-[#ff3901] to-[#F07800] bg-clip-text text-transparent">
              Workflow Automation
            </span>
          </h2>

          <p className="mt-3 text-gray-300 max-w-3xl text-sm lg:text-[16px] mb-6">
            Step into our Workfront video library and explore actionable
            insights, agile project management tips, resource planning
            strategies, and workflow automation guidance.
          </p>

          <Link
            href="/adobe-workfront-managed-services"
            aria-label="Explore Adobe Workfront Managed Services"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-4 bg-gradient-to-r from-[#ff3901] to-[#F07800] relative rounded-full font-medium flex items-center gap-2 overflow-hidden text-white"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {hovered && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 rounded-full backdrop-blur-md bg-white/10 border border-white/40"
                />
              )}

              <span className="relative z-10">Explore More</span>

              <div className="relative w-5 h-5 overflow-hidden">
                <ArrowRight size={18} />
              </div>
            </motion.button>
          </Link>
        </motion.div>

        {/* ARROWS */}
        <motion.div
          className="flex gap-4 mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <button
            onClick={handlePrev}
            aria-label="Previous Workflow Video"
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              currentIndex > 0
                ? "bg-gradient-to-r from-[#ff3901] to-[#F07800] text-white"
                : "border border-[#ff3901] text-[#F07800]"
            }`}
          >
            <ChevronLeft />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Workflow Video"
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              currentIndex < cards.length - 1
                ? "bg-gradient-to-r from-[#ff3901] to-[#F07800] text-white"
                : "border border-[#ff3901] text-[#F07800]"
            }`}
          >
            <ChevronRight />
          </button>
        </motion.div>
      </div>

      {/* CARD ROW */}
      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 280}px)` }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              className={`relative ${card.width} ${card.height} rounded-2xl flex-shrink-0 cursor-pointer overflow-hidden`}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              onClick={() => openModal(card.videoUrl)}
              aria-label={`Play video: ${card.title}`}
            >
              <Image
                src={card.imageUrl}
                alt={card.title}
                fill
                className="object-cover rounded-xl"
                sizes="(max-width:768px) 100vw, 525px"
              />

              <p className="absolute bottom-0 left-0 w-full h-[35%] content-end text-sm lg:text-lg font-semibold px-4 py-2 bg-gradient-to-t from-black via-black/80 to-transparent rounded-b-lg">
                {card.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[999999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative rounded-xl p-4 bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center w-full h-full justify-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.6 }}
            >
              <button
                className="absolute top-4 right-4 bg-white/10 border border-black/20 rounded-full p-2"
                onClick={closeModal}
                aria-label="Close video"
              >
                <X size={24} />
              </button>

              <video
                ref={videoRef}
                src={selectedVideo}
                controls
                autoPlay
                className="w-[800px] h-[450px] object-contain rounded-lg bg-black"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

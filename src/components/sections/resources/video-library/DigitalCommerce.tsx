"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, X } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    title:
      "Improved Online Shopping Experience(Integrating Adobe Commerce with Adobe Analytics) ",
    cta: "View Portfolio",
    image:
      "https://images.ctfassets.net/pj0maraabon4/6xE3Qtgu00MlBoohi279ax/e45f0a93a8f458aadee38da94a50ec4a/Analytics.jpg",
    videoUrl:
      "https://videos.ctfassets.net/pj0maraabon4/7CG3xXvh4HMW2qADioFT4l/89f27424925df9f32eb297619f55adbb/ceo-videos-06.mp4",
  },
  {
    id: 2,
    title:
      "Product Recommendation(Adobe Sensei in Action: Real-Time Product Recommendations That Convert)",
    cta: "Explore Work",
    image:
      "https://images.ctfassets.net/pj0maraabon4/19EOD4H2jJzaITuJ1VCYjP/6f194ef1906f179fdff257785255c5a6/Product_Recommentation.jpg",
    videoUrl:
      "https://videos.ctfassets.net/pj0maraabon4/AWliC8HUMiEcAMXPjHff1/e1b5edaf8455fe292f375ea876c9de81/Product_recommendation.mp4",
  },
  {
    id: 3,
    title:
      "Livesearch(Smarter Ecommerce with Adobe Commerce+AEP|The Future of Shopping)",
    cta: "See Details",
    image:
      "https://images.ctfassets.net/pj0maraabon4/3N9yqUkjutnAizDLHKX5GW/327f7618bcc6bef20443bfa20bff4604/Live_Search.jpg",
    videoUrl:
      "https://videos.ctfassets.net/pj0maraabon4/2lXuiAoYJNBOSEu7R1dn5U/3e5b6014da74ed479eff0fdc3e39cf92/Final_Out.mp4",
  },
  {
    id: 4,
    title:
      "AEP(Shop Smarter: Adobe Commerce+AEP Delivers Personalized Shopping)",
    cta: "See Details",
    image:
      "https://images.ctfassets.net/pj0maraabon4/ZjN1O5ofZ2pQZpEFvouFG/bea0016679a641f543da8ff80077b8f7/adobe-commerce-aep.jpg",
    videoUrl:
      "https://videos.ctfassets.net/pj0maraabon4/6rnaOM4Jsr6ZjCwLQPi8JG/2f04a0d33eb61faa376296a3cbbd22e8/Adobe_Recommentation_-_27-06-25_1__1___1_.mp4",
  },
  {
    id: 5,
    title:
      "AEP coupon video(Personalized Discounts,Happier Customers —Powered by AEP+Adobe Commerce)",
    cta: "See Details",
    image:
      "https://images.ctfassets.net/pj0maraabon4/1Mpc1nDMEI5GxEEazVYIZX/216549b0b5fc83e994a1fb09b2c72715/AEP_Video_Thumbnail_01.png",
    videoUrl: "https://youtu.be/M1FncAIVAB0",
  },
  {
    id: 6,
    title: "See How Adobe Commerce transforms retail!",
    cta: "See Details",
    image:
      "https://images.ctfassets.net/pj0maraabon4/6ZuZtHzgQ7dzpsc0kNEsUi/98bdeec08f9f58725cbbbf0295254b98/Digital-commerce-image.jpg",
    videoUrl:
      "https://videos.ctfassets.net/pj0maraabon4/4GhoFakw76K1pKZHiB7GRO/560bceb257f44decb9f37d2b4ec75632/Adobe-commerce-new-01.mp4",
  },
];

export default function DigitalCommerce() {
  const [index, setIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const len = SLIDES.length;
  const nextIndex = (index + 1) % len;

  const goNext = () => setIndex((i) => (i + 1) % len);

 const activeCard = {
  initial: { opacity: 0, scale: 0.9, x: 60 },
  animate: { opacity: 1, scale: 1, x: 0 },
  exit: { opacity: 0, scale: 1.05, x: -60 },
  transition: {
    duration: 1.2,
    ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number],
  },
};

const nextCard = {
  initial: { opacity: 0, scale: 0.8, x: -220 },
  animate: { opacity: 0.7, scale: 0.9, x: -120 },
  exit: { opacity: 0, scale: 0.85, x: -220 },
  transition: {
    duration: 1.2,
    ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number],
  },
};


  useEffect(() => {
    document.body.style.overflow = videoOpen ? "hidden" : "auto";
  }, [videoOpen]);

  return (
    <section className="relative w-full text-white lg:mt-[70px] m-auto overflow-hidden md:px-16">
      <div className="mx-auto w-full px-6 py-16 flex flex-col lg:flex-row gap-12">
        {/* LEFT COLUMN */}
        <div className="w-full lg:w-1/2 lg:px-[50px] content-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 lg:mb-8">
              <span className="bg-gradient-to-r from-[#ff3901] to-[#F07800] bg-clip-text text-transparent">
                Digital Commerce
              </span>
            </h2>

            <p className="mt-3 text-gray-300 text-sm lg:text-[16px]">
              Watch & Learn with Adobe Commerce – From the early days of Magento
              to the full power of Adobe Commerce today, explore a wide library
              of expert-led tutorials, data-backed insights, and real-world
              success stories.
            </p>

            <Link
              href="/adobe-commerce"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                className="mt-6 bg-gradient-to-r from-[#ff3901] to-[#F07800] px-4 py-3 relative rounded-full font-medium flex items-center gap-2 overflow-hidden text-white"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                {hovered && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 rounded-full backdrop-blur-md bg-white/10 border border-white/40"
                  />
                )}

                <span className="relative z-10 text-white">Discover More</span>

                <div className="relative w-5 h-5 overflow-hidden">
                  <AnimatePresence initial={false} mode="wait">
                    {hovered ? (
                      <motion.div
                        key="arrow-hover"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 20, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute"
                      >
                        <ArrowRight size={18} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="arrow-normal"
                        initial={{ x: 0, opacity: 1 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 20, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute"
                      >
                        <ArrowRight size={18} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <motion.div className="relative w-full lg:w-1/2 flex items-center justify-start">
          <div className="relative h-full flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {/* Active Card */}
              <motion.div
                key={`active-${SLIDES[index].id}`}
                variants={activeCard}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={activeCard.transition}
                className="relative z-20 w-[300px] h-[350px] lg:h-[550px] lg:w-[520px] rounded-3xl shadow-2xl overflow-hidden cursor-pointer"
                onClick={() => setVideoOpen(true)}
              >
                <motion.img
                  src={SLIDES[index].image}
                  alt={SLIDES[index].title}
                  className="w-full h-full object-cover"
                />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-16 h-16">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="absolute inset-0 rounded-full border-4 border-white opacity-70 animate-ping"
                        style={{ animationDuration: `${3 + i}s` }}
                      ></span>
                    ))}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black">
                        ▶
                      </div>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 w-full h-[35%] content-end pr-[60px] text-sm lg:text-lg text-white font-semibold px-4 py-2 bg-gradient-to-t from-black/100 via-black/80 to-transparent rounded-b-lg">
                  <p className="text-white text-lg font-semibold">
                    {SLIDES[index].title}
                  </p>
                </div>
              </motion.div>

              {/* Next Preview Card */}
              <motion.div
                key={`next-${SLIDES[nextIndex].id}`}
                variants={nextCard}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={nextCard.transition}
                className="absolute z-10 w-[270px] h-[300px] lg:h-[415px] lg:w-[372px] rounded-3xl shadow-xl overflow-hidden -right-[95%]"
              >
                <motion.img
                  src={SLIDES[nextIndex].image}
                  alt={SLIDES[nextIndex].title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-0 left-0 w-full h-[35%] content-end pr-[60px] text-sm lg:text-lg text-white font-semibold px-4 py-2 bg-gradient-to-t from-black/100 via-black/80 to-transparent rounded-b-lg">
                  <p className="text-white text-sm font-medium">
                    {SLIDES[nextIndex].title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Next Button */}
            <button
              onClick={goNext}
              className="absolute z-[9999] left-[90%] lg:left-[97%] top-1/2 -translate-y-1/2 rounded-full bg-white p-4 lg:p-6 text-black shadow-lg hover:scale-105 transition"
            >
              <ChevronRight />
            </button>
          </div>
        </motion.div>
      </div>

      {/* VIDEO POPUP */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden flex items-center justify-center"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                className="absolute top-4 right-4 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2 hover:bg-white/20 transition"
                onClick={() => setVideoOpen(false)}
              >
                <X size={24} />
              </button>

              {SLIDES[index].videoUrl.includes("youtube") ||
              SLIDES[index].videoUrl.includes("youtu.be") ? (
                <iframe
                  src={
                    SLIDES[index].videoUrl.includes("watch?v=")
                      ? SLIDES[index].videoUrl.replace("watch?v=", "embed/")
                      : SLIDES[index].videoUrl.replace(
                          "youtu.be/",
                          "www.youtube.com/embed/"
                        )
                  }
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-[800px] h-[450px] rounded-lg"
                ></iframe>
              ) : (
                <video
                  src={SLIDES[index].videoUrl}
                  controls
                  autoPlay
                  className="w-[800px] h-[450px] object-contain rounded-lg bg-black"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, } from "framer-motion";
import { ArrowRight, X, Play } from "lucide-react";
import type { Transition } from "framer-motion";

const images = [
  {
    src: "https://images.ctfassets.net/pj0maraabon4/4D9puPq2G9Ka2tIRveI0RL/da4f774b3bffc0db78a940d83a6bda7c/workfront___Fusion.jpg",
    video:
      "https://videos.ctfassets.net/pj0maraabon4/4nzwh8CJomPfZjdBUAbpSE/bf2142c36ccdd8956d23502a683b892b/3.mp4",
    title:
      "Effortless Custom Form Migration with Workfront| DLUX COE |",
  },
  {
    src: "https://images.ctfassets.net/pj0maraabon4/7tOyIigqOru1Hl4ipGXjJy/485b1b91f34b21b4e24cee879a5952f8/Product_Recommentation.jpg",
    video:
      "https://videos.ctfassets.net/pj0maraabon4/4SadDV6KH3l3HxHtwQmOVt/cda0e499b9f75693c98c66e73a23b6ad/Product_recommendation.mp4",
    title:
      "AI-Powered Product Recommendation| adobe sensei | Commerce",
  },
  {
    src: "https://images.ctfassets.net/pj0maraabon4/3Q0eCGn44WyQ7H8Qak8gOu/589494a533f07a14a991188c1f8124db/hero-aem-integration.jpg",
    video:
      "https://videos.ctfassets.net/pj0maraabon4/3sqvkwblysuyTcUU6vyXT2/d777d4a9b8db5600a7a8ce61184dae47/Product_recommendation-002__1___1___1_.mp4",
    title:
      "Your Shopping Experience Made Better ",
  },
  {
    src: "https://images.ctfassets.net/pj0maraabon4/TcciqXaBG41DwA7MqVGCH/843264f254a68d9043243ab12ab7b73c/workfront_chatgpt.jpg",
    video:
      "https://videos.ctfassets.net/pj0maraabon4/4nEhKbDWPRXIvLQ7FissuL/03ed545b776ec943473a2106b40c2597/1.mp4",
    title:
      "Integration Of Workfront with Chatgpt | DLUX Innovation| Improved Efficiency",
  },
  {
    src: "https://images.ctfassets.net/pj0maraabon4/3H6gS0GTd3qBH63xDWdXBI/7b9af0a3c39a7d6cbc7851e42861e368/sales_force.jpg",
    video:
      "https://videos.ctfassets.net/pj0maraabon4/T8FgmjIH1PT1siGKC1XZN/1e4e2a36bc0fb11856103848ccd6dc26/6.mp4",
    title:
      "Ready to streamline your disconnected Workflows | Salesforce |",
  },
  {
    src: "https://images.ctfassets.net/pj0maraabon4/7EfPXl9ZZaHz8NjhtQOi8r/5314dd928d7d5e153796d344e7c7509e/Mastering_Multilingual_Site_Management_with_Adobe_Experience_Manager_MSM.png",
    video:
      "https://videos.ctfassets.net/pj0maraabon4/1vSlJBQN0oVuXUPWwmIkJF/c98da52d45b2cf48529b630d09051207/1731567568212.mp4",
    title:
      "Integrating Microsoft 365 with Aprimo | Work Management Tool",
  },
  {
    src: "https://images.ctfassets.net/pj0maraabon4/6LEf7JKCfZkPCQIZL0C57v/8363311095c5d99df6cc1e7adefcc2c1/Real_Time.jpg",
    video:
      "https://videos.ctfassets.net/pj0maraabon4/6beKvkSg8y2YKh3v7QxNiZ/08de91f870f351a1e3e3b887fd7b3bfc/ceo-videos-08.mp4",
    title:
      "Integrating Adobe Workfront & Tableau's visualisation Tool | Snowflake ",
  },
];

const HeroBanner = () => {
  const [currentImages] = useState(images);
  const [popupVideo, setPopupVideo] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.overflow = popupVideo ? "hidden" : "auto";
  }, [popupVideo]);

  const imgVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

const transition: Transition = {
  duration: 1.5,
  ease: [0.42, 0, 0.58, 1], // cubic-bezier for easeInOut
};
  const ImageBox = ({ item, direction, idx }: any) => (
    <div className="relative w-full h-full">
      <motion.img
        key={`${item.src}-${idx}`}
        src={item.src}
        alt={item.title}
        className="w-full h-full object-cover rounded-lg cursor-pointer"
        onClick={() => setPopupVideo(item.video)}
        custom={direction}
        variants={imgVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={transition}
      />

      <div
        className="absolute inset-0 flex items-center justify-center cursor-pointer"
        onClick={() => setPopupVideo(item.video)}
      >
        <div className="bg-black/50 p-3 rounded-full">
          <Play size={36} className="text-white" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[35%] content-end text-sm lg:text-md text-white font-semibold px-4 py-2 bg-gradient-to-t from-black/100 via-black/80 to-transparent">
        {item.title}
      </div>
    </div>
  );

  return (
    <>
      <section className="relative w-full text-white overflow-hidden pb-16 pt-[80px] lg:pt-[120px]">

        {/* HEADING */}
        <div className="relative z-10 flex flex-col items-center justify-center py-16">
          <div className="absolute top-[20%] left-[40%] w-80 h-80 rounded-full bg-gradient-to-r from-[#F12D06] to-[#F17C06] blur-[100px] opacity-70 -z-10" />

          <motion.div
            className="justify-items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-center max-w-4xl leading-tight">
              DLUX - Center of Excellence
            </h1>
            <p className="max-w-xl text-center mt-6 mb-6 text-[16px]">
              Watch real solutions unfold - with video walkthroughs across Adobe
              Workfront, Fusion, DAM, Salesforce, and more.
            </p>
          </motion.div>

          <Link href="/contact-us">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-6 px-6 py-4 rounded-full bg-gradient-to-r from-[#ff3901] to-[#F07800] font-medium flex items-center gap-2 text-white"
            >
              Contact Us
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </div>

        {/* DESKTOP 7 CARD */}
        <div className="hidden desktop:flex justify-center items-center gap-4">
          <div className="bg-[#ff390140] backdrop-blur-md border-[2px] border-[#ff39014d] rounded-xl overflow-hidden shadow" style={{ width: "305px", height: "230px" }}>
            <ImageBox item={currentImages[0]} direction="left" idx={0} />
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-[#ff390140] backdrop-blur-md border-[2px] border-[#ff39014d] rounded-xl overflow-hidden shadow" style={{ width: "305px", height: "230px" }}>
              <ImageBox item={currentImages[1]} direction="left" idx={1} />
            </div>
            <div className="bg-[#ff390140] backdrop-blur-md border-[2px] border-[#ff39014d] rounded-xl overflow-hidden shadow" style={{ width: "305px", height: "160px" }}>
              <ImageBox item={currentImages[2]} direction="left" idx={2} />
            </div>
          </div>

          <div className="bg-[#ff390140] backdrop-blur-md border-[2px] border-[#ff39014d] rounded-xl overflow-hidden shadow-2xl" style={{ width: "415px", height: "460px" }}>
            <ImageBox item={currentImages[3]} direction="left" idx={3} />
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-[#ff390140] backdrop-blur-md border-[2px] border-[#ff39014d] rounded-xl overflow-hidden shadow" style={{ width: "305px", height: "160px" }}>
              <ImageBox item={currentImages[4]} direction="right" idx={4} />
            </div>
            <div className="bg-[#ff390140] backdrop-blur-md border-[2px] border-[#ff39014d] rounded-xl overflow-hidden shadow" style={{ width: "305px", height: "230px" }}>
              <ImageBox item={currentImages[5]} direction="right" idx={5} />
            </div>
          </div>

          <div className="bg-[#ff390140] backdrop-blur-md border-[2px] border-[#ff39014d] rounded-xl overflow-hidden shadow" style={{ width: "305px", height: "230px" }}>
            <ImageBox item={currentImages[6]} direction="right" idx={6} />
          </div>
        </div>
           {/* Tablet 3-card */}
        <div className="hidden tablet:flex lg:hidden justify-center items-center gap-2 px-2 overflow-hidden">
          <div className="bg-[#ff390140] backdrop-blur-md border-[2px] border-[#ff39014d] rounded-xl overflow-hidden shadow flex-shrink-0" style={{ width: "100%", height: "200px" }}>
            <ImageBox item={currentImages[2]} direction="left" idx={2} />
          </div>
          <div className="bg-[#ff390140] backdrop-blur-md border-[2px] border-[#ff39014d] rounded-xl overflow-hidden shadow-2xl flex-shrink-0" style={{ width: "350px", height: "320px" }}>
            <ImageBox item={currentImages[3]} direction="center" idx={3} />
          </div>
          <div className="bg-[#ff390140] backdrop-blur-md border-[2px] border-[#ff39014d] rounded-xl overflow-hidden shadow flex-shrink-0" style={{ width: "100%", height: "200px" }}>
            <ImageBox item={currentImages[4]} direction="right" idx={4} />
          </div>
        </div>
          <div className="flex md:hidden justify-center items-center px-2">
        <div
          className="bg-[#ff390140] backdrop-blur-md 
           border-[2px] border-[#ff39014d] rounded-xl overflow-hidden shadow-2xl"
          style={{ width: "100%", height: "100%" }}
        >
          <ImageBox item={currentImages[3]} direction="center" idx={3} />
        </div>
      </div>

        {/* POPUP VIDEO */}
        <AnimatePresence>
          {popupVideo && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[999999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative rounded-xl shadow-xl p-4 bg-white/10 backdrop-blur-md border-[2px] border-[rgba(187,124,228,0.3)] flex flex-col items-center w-full h-full justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <button
                  className="absolute top-4 right-4 text-black bg-white/10 backdrop-blur-md border border-black/20 rounded-full p-2"
                  onClick={() => setPopupVideo(null)}
                >
                  <X size={24} />
                </button>

                <video
                  src={popupVideo}
                  controls
                  autoPlay
                  className="w-[90%] md:w-[800px] rounded-lg"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </section>
    </>
  );
};

export default HeroBanner;

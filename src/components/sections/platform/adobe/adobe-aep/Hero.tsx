"use client";

import { motion } from "framer-motion";
import React from "react";

const VIDEO_SRC =
    "https://videocdn.cdnpk.net/videos/ac83adfd-2d52-5606-852a-c4bb6631c0e6/horizontal/previews/magnific_watermarked/large.mp4";

export default function HeroBanner() {
    return (
        <section className="relative w-full bg-white py-[40px] overflow-hidden font-sans">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-extrabold tracking-tight text-black max-w-4xl leading-[1.18] sm:leading-[1.14]"
                >
                    What Adobe Experience <br className="hidden sm:inline" />
                    Platform Does{" "}
                    <span className="text-[#FF4F00] inline-block">for Your Business</span>
                </motion.h1>

                {/* Hero Visual Container */}
                <motion.div
                    initial={{ opacity: 0, y: 35, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full max-w-[1100px] mx-auto pt-10 sm:pt-16 pb-0 flex justify-center items-end"
                >
                    {/* ORANGE BACKGROUND BOX */}
                    <div
                        style={{
                            background: "linear-gradient(90deg, #FE780C 0%, #FE3908 100%)",
                        }}
                        className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[1200px] h-[220px] sm:h-[300px] lg:h-[362px] rounded-[30px] opacity-100 rotate-0 shadow-xl shadow-[#FE3908]/25 z-0"
                    />

                    {/* DESKTOP SCREEN MOCKUP (lg:block) */}
                    <div className="relative z-10 hidden lg:block w-[907px] max-w-[95%] rounded-t-[24px] bg-[#000000] p-2 pb-0 shadow-2xl border-t-2 border-x-2 border-white/15 overflow-hidden">
                        <div className="relative aspect-[16/9.5] w-full bg-[#050508] rounded-t-[18px] overflow-hidden">
                            <video
                                className="h-full w-full object-cover object-center"
                                src={VIDEO_SRC}
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        </div>
                    </div>

                    {/* TABLET SCREEN MOCKUP (sm:block lg:hidden) */}
                    <div className="relative z-10 hidden sm:block lg:hidden w-[84%] max-w-[680px] rounded-t-[24px] bg-[#000000] p-2 pb-0 shadow-2xl border-t-2 border-x-2 border-white/15 overflow-hidden">
                        <div className="relative aspect-[16/10] w-full bg-[#050508] rounded-t-[18px] overflow-hidden">
                            <video
                                className="h-full w-full object-cover object-center"
                                src={VIDEO_SRC}
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        </div>
                    </div>

                    {/* MOBILE PHONE MOCKUP (block sm:hidden) */}
                    <div className="relative z-10 block sm:hidden w-[270px] max-w-[85vw] rounded-t-[36px] bg-[#000000] p-2 pb-0 shadow-2xl border-t-2 border-x-2 border-white/15 overflow-hidden">
                        {/* Phone Top Notch & Status Bar */}
                        <div className="relative bg-[#000000] pt-2 pb-1.5 px-4 flex items-center justify-between text-white text-[11px] font-medium tracking-tight">
                            <span>9:41</span>
                            <div className="h-4 w-16 bg-[#18181C] rounded-full flex items-center justify-center border border-white/10">
                                <div className="h-1.5 w-6 bg-[#000000] rounded-full" />
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-[10px]">5G</span>
                                <div className="w-3 h-2 rounded-[1px] border border-white bg-white/30" />
                            </div>
                        </div>

                        <div className="relative aspect-[9/16] w-full bg-[#050508] rounded-t-[28px] overflow-hidden">
                            <video
                                className="h-full w-full object-cover object-center"
                                src={VIDEO_SRC}
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

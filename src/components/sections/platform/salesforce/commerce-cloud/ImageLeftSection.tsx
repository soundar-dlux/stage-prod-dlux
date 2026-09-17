"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  memo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface Props {
  videoUrl?: string;
  description?: string;
  poster?: string;
}

function ImageLeftSection({ videoUrl, description, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const formattedVideoUrl =
    videoUrl?.startsWith("http") ? videoUrl : videoUrl ? `https:${videoUrl}` : "";

  const formattedPoster =
    poster?.startsWith("http") ? poster : poster ? `https:${poster}` : "";

  const closeModal = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  }, []);

  const openModal = useCallback(() => setIsPlaying(true), []);

  useEffect(() => {
    document.body.style.overflow = isPlaying ? "hidden" : "";
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [isPlaying, closeModal]);

  if (!formattedVideoUrl) return null;

  return (
    <>
      {/* SECTION */}
      <section className="relative w-full px-4 sm:px-6 lg:px-20 py-10 lg:py-16 bg-brand-black text-white overflow-hidden">

        {/* subtle glow */}
        <div className="absolute -top-40 -left-40 w-[300px] h-[300px] bg-brand-primary/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-[300px] h-[300px] bg-brand-secondary/20 blur-3xl rounded-full" />

        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">

          {/* VIDEO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative w-full"
          >
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl">

              {/* Thumbnail Video */}
              <video
                poster={formattedPoster}
                preload="none"
                playsInline
                className="w-full h-full object-cover cursor-pointer"
                onClick={openModal}
              >
                <source src={formattedVideoUrl} type="video/mp4" />
              </video>

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent" />

              {/* play button */}
              <button
                onClick={openModal}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-brand-primary text-white text-2xl shadow-lg group-hover:scale-110 transition">
                  ▶
                </div>
              </button>
            </div>
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl space-y-5 text-base md:text-lg leading-relaxed text-white/70"
          >
            <p>{description}</p>

            <p>
              Whether you are{" "}
              <span className="text-brand-primary font-semibold">
                launching
              </span>
              , scaling, or replatforming, our expertise and{" "}
              <span className="text-brand-primary font-semibold">
                rapid deployment
              </span>{" "}
              ensure cost-effective solutions for{" "}
              <span className="text-brand-primary font-semibold">
                seamless customer journeys
              </span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MODAL */}
      {mounted && isPlaying &&
        createPortal(
          <AnimatePresence>
            <>
              {/* backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[9999]"
              />

              {/* modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 flex items-center justify-center z-[10000] p-4"
              >
                <div className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">

                  {/* close */}
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/60 text-white border border-white/20"
                  >
                    ✕
                  </button>

                  {/* video */}
                  <video
                    ref={videoRef}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  >
                    <source src={formattedVideoUrl} type="video/mp4" />
                  </video>
                </div>
              </motion.div>
            </>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

export default memo(ImageLeftSection);
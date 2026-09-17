"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LifeAtDluxData } from "@/src/app/about/our-team/types";
import TestimonialSection from "./TestimonialSection";
import PremiumVideoModal from "@/src/components/ui/modal/PremiumVideoModal";
import VideoCarousel from "@/src/components/ui/Carousel/VideoCarousel";

interface LifeAtDluxSectionProps {
  lifeAtDlux: LifeAtDluxData;
}

export default function LifeAtDluxSection({
  lifeAtDlux,
}: LifeAtDluxSectionProps) {
  const [open, setOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const videos = lifeAtDlux?.lifeAtDluxVideoCollection?.items || [];
  const testimonials =
    lifeAtDlux?.testimonialImagesCollection?.items || [];

  // ✅ safer split
  const [titleMain, titleSub] =
    (lifeAtDlux?.lifeAtDluxContent || "").split(":");

  return (
    <section className="relative w-full overflow-hidden bg-brand-black py-8 lg:py-10 px-6">

      {/* ===== Background ===== */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-neutral-950 to-brand-black" />
      <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[180px]" />
      <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] bg-brand-secondary/20 rounded-full blur-[200px]" />

      <div className="relative mx-auto max-w-6xl text-center">

        {/* ===== Heading ===== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mb-12 md:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-brand-white leading-tight">
            {titleMain}
            {titleSub && (
              <>
                <br />
                <span className="bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo bg-clip-text text-transparent">
                  {titleSub}
                </span>
              </>
            )}
          </h2>

          <p className="mt-5 mx-auto max-w-3xl text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed">
            {lifeAtDlux?.lifeAtDluxPara}
          </p>

          {/* Divider */}
          <div className="mt-6 mx-auto h-[2px] w-20 rounded-full bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo" />
        </motion.div>

        {/* ===== Video Carousel ===== */}
        {videos.length > 0 && (
          <div className="mt-12 md:mt-14">
            <VideoCarousel
              videos={videos.map((v) => v.url)}
              onVideoClick={(url) => {
                setActiveVideoUrl(url);
                setOpen(true);
              }}
            />
          </div>
        )}

        {/* ===== Testimonials ===== */}
        {testimonials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-60px" }}
            className="mt-16 md:mt-20"
          >
            <TestimonialSection
              testimonialImagesCollection={testimonials}
            />
          </motion.div>
        )}
      </div>

      {/* ===== Modal ===== */}
      {open && activeVideoUrl && (
        <PremiumVideoModal
          videoUrl={activeVideoUrl}
          onClose={() => {
            setOpen(false);
            setActiveVideoUrl(null);
          }}
        />
      )}
    </section>
  );
}
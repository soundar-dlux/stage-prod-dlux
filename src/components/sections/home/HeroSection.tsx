"use client";

import Link from "next/link";
import { useState,useEffect } from "react";
import PrimaryButton from "../../ui/Buttons/PrimaryButton";
import SecondaryButton from "../../ui/Buttons/SecondaryButton";
import CommonModal from "../../ui/modal/CommonModal";
import HomeCta from "../../ui/Forms/HomeCta";
import Image from "next/image";

export default function HeroSection() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <section
      role="banner"
      aria-labelledby="hero-heading"
      aria-describedby="hero-description"
      className="relative min-h-[calc(100vh-72px)] sm:min-h-[calc(100vh-96px)] w-full overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {isMobile ? (
          <Image
            src="/hero-fallback-image.webp"
            alt="Hero Background"
            fill
            priority
             fetchPriority="high"
            quality={70}
            className="object-cover"
            
          />
        ) : (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/hero-section-fallback.webp"
          >
            <source
              src="https://videos.ctfassets.net/pj0maraabon4/2827loOqx8pgVX2MBiUwva/98e87276799364602d416c275c122353/dluxtech-home-bg-com.webm"
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 to-black/75" />

      {/* Content */}
      <div
        className="
          relative z-10 mx-auto flex
          min-h-[calc(100vh-72px)]
          sm:min-h-[calc(100vh-0px)]
          max-w-7xl
          flex-col
          items-center
          justify-center
          px-4
          sm:px-6
          text-center
        "
      >
        <h1
          id="hero-heading"
          className="
            max-w-4xl
            text-3xl
            font-semibold
            md:leading-[1.3]
            text-white
            sm:text-4xl
            md:text-5xl
          "
        >
          Shape your Business with Intelligent AI Martech
          <span className="block sm:hidden" />
          <span className="hidden sm:inline"> </span>& Digital Innovation
        </h1>

        <p id="hero-description" className="sr-only">
          DLUX helps businesses grow using intelligent marketing technology,
          artificial intelligence, and digital innovation solutions.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 sm:mt-10 gap-4 flex-col flex md:flex-row">
          {/* ✅ FIXED BUTTON */}
          <PrimaryButton
            onClick={() => setOpen(true)}
            className="px-8 py-3.5 text-sm sm:text-base"
          >
            Book a Free Strategy Call
          </PrimaryButton>

          {/* LINK BUTTON (Already correct) */}
          <Link
            href="/resources/video-library"
            aria-label="Watch overview of our AI and Martech services"
            title="Watch overview"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
          >
            <SecondaryButton className="px-8 py-3.5 text-sm sm:text-base">
              Watch Overview
            </SecondaryButton>
          </Link>
        </div>
      </div>

      {/* MODAL */}
      <CommonModal open={open} onClose={() => setOpen(false)}>
        <div className="mb-4 text-center">
          <h2 className="text-xl font-semibold text-white">
            Book a Free Strategy Call
          </h2>
          <p className="text-sm text-gray-400">
            Fill the form and our team will contact you.
          </p>
        </div>

        <HomeCta />
      </CommonModal>
    </section>
  );
}

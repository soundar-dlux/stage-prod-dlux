
"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedParticles from "@/src/components/WB-Component/Loader/AnimatedParticles";
import AnimatedSpark from "@/src/components/WB-Component/Loader/AnimatedSpark";
import Badge from "@/src/components/WB-Component/Badge";

interface HeroBannerProps {
  videoSrc?: string;
  illustrationSrc?: string;
  illustrationAlt?: string;
  contactHref?: string;
  mediaType?: "video" | "image";
}

const HERO_MEDIA =
  "https://images.ctfassets.net/pj0maraabon4/4nm0DxFPOkdPnJ858xsoGU/1eccaf089d291f41c8c3448b8e662a45/Bynder-final.gif";

export default function HeroBanner({
  videoSrc,
  illustrationSrc = HERO_MEDIA,
  illustrationAlt = "Bynder digital asset management platform illustration",
  contactHref = "/contact-us",
  mediaType = "image",
}: HeroBannerProps) {
  return (
    <section
      className="relative isolate overflow-hidden pb-[20px]"
      style={{
        background:
          "linear-gradient(176.3deg, #F7F7F7 86.02%, #FE3908 253.26%)",
      }}
    >
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[54%] top-6 sm:left-[56%] sm:top-7">
          <AnimatedSpark size={48} color="#FF4B16" />
        </div>

        <div className="absolute right-[8%] top-5 sm:right-[10%] sm:top-7">
          <AnimatedParticles />
        </div>
      </div>

      <div className="relative mx-auto grid min-h-[447px] max-w-[1280px] grid-cols-1 items-center gap-10 px-6 py-16 sm:px-10 md:grid-cols-2 md:gap-6 md:px-12 lg:px-16 lg:py-20">

        {/* Left Content */}
        <div className="relative z-10 max-w-[490px]">
          <Badge className="mb-6">Bynder DAM with DLUX</Badge>

          <h1 className="text-[34px] font-extrabold leading-[1.12] tracking-[-1px] text-black sm:text-[40px] lg:text-[50px]">
            Make Every Digital
            <br />
            Asset Work Harder
            <br />
            for <span className="text-[#FF571C]">Your Brand</span>
          </h1>

          <p className="mt-5 max-w-[430px] text-sm leading-[1.55] text-[#555555] sm:text-base">
            Bynder gives your teams one place to find, manage and deliver
            content, and DLUX helps you set it up so the brand stays consistent
            across every market you operate in.
          </p>

          <Link
            href={contactHref}
            className="mt-6 inline-flex min-w-[172px] items-center justify-center rounded-full bg-gradient-to-r from-[#FF7900] to-[#FF390D] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/25"
          >
            Contact Us
          </Link>
        </div>

        {/* Right Media */}
        <div className="relative flex min-h-[280px] items-center justify-center md:min-h-[340px]">
          <div className="relative z-10 w-full max-w-[520px]">

            {mediaType === "video" && videoSrc ? (
              <video
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={illustrationAlt}
                className="h-auto w-full rounded-xl object-contain drop-shadow-sm"
              />
            ) : illustrationSrc ? (
              <Image
                src={illustrationSrc}
                alt={illustrationAlt}
                width={600}
                height={430}
                priority
                unoptimized={illustrationSrc.endsWith(".gif")}
                className="h-auto w-full object-contain drop-shadow-sm"
              />
            ) : null}

          </div>
        </div>
      </div>
    </section>
  );
}

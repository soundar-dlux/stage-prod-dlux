
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
  className="relative isolate mb-[30px] overflow-hidden"
  style={{
    background:
      "linear-gradient(176.3deg, #F7F7F7 86.02%, #FE3908 253.26%)",
  }}
>
  <div className="relative mx-auto grid min-h-[447px] max-w-[1280px] grid-cols-1 items-center gap-8 px-5 py-10 sm:px-8 md:grid-cols-2 md:gap-8 md:px-12 md:py-12 lg:gap-10 lg:px-16 lg:py-16">

    {/* Left Content */}
    <div className="relative z-10 w-full max-w-[490px]">
      <Badge className="mb-6">Bynder DAM with DLUX</Badge>

      <h1 className="text-[34px] font-extrabold leading-[1.12] tracking-[-1px] text-black sm:text-[40px] lg:text-[50px]">
        Make Every Digital
        <br />
        Asset Work Harder
        <br />
        for <span className="bg-gradient-to-r from-subGradientText-from to-subGradientText-to bg-clip-text text-transparent">Your Brand</span>
      </h1>

      <p className="mt-5 max-w-[430px] text-base leading-[1.6] text-[#555555] sm:text-lg">
        Bynder gives your teams one place to find, manage and deliver
        content, and DLUX helps you set it up so the brand stays consistent
        across every market you operate in.
      </p>

      <Link
        href={contactHref}
        className="mt-6 inline-flex min-h-[48px] min-w-[172px] items-center justify-center rounded-full bg-gradient-to-r from-[#FF7900] to-[#FF390D] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/25"
      >
        Contact Us
      </Link>
    </div>

    {/* Right Media */}
    <div className="relative flex w-full items-center justify-center pt-8 md:pt-0">

      {/* Animated Decorations */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 mx-auto max-w-[622px]">
        <div className="absolute left-[4%] top-0 sm:left-[8%]">
          <AnimatedSpark size={42} color="#FF4B16" />
        </div>

        <div className="absolute right-[4%] top-0 sm:right-[8%]">
          <AnimatedParticles />
        </div>
      </div>

      {/* Asset Container */}
      <div
        className="relative z-10 w-full max-w-[622px]"
        style={{ aspectRatio: "622 / 481" }}
      >
        {mediaType === "video" && videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={illustrationAlt}
            className="h-full w-full object-contain"
          />
        ) : illustrationSrc ? (
          <Image
            src={illustrationSrc}
            alt={illustrationAlt}
            width={622}
            height={481}
            priority
            unoptimized={illustrationSrc.endsWith(".gif")}
            className="h-full w-full object-contain"
          />
        ) : null}
      </div>
    </div>
  </div>
</section>

  );
}

"use client";

import { useState, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import PremiumVideoModal from "@/src/components/ui/modal/PremiumVideoModal";
import { Asset, ContentItem } from "@/src/app/platform/adobe/workfront-fusion/types";

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

interface FusionVideoShowcaseProps {
  fusionStaticVideos: ContentItem[];
  fusionStaticThumbmail: Asset[];
  fusionVideos: ContentItem[];
  fusionVideosThumbmail: Asset[];
  fusionStaticContent: string;
}

const FusionVideoShowcase = ({
  fusionStaticVideos = [],
  fusionStaticThumbmail = [],
  fusionVideos = [],
  fusionVideosThumbmail = [],
  fusionStaticContent,
}: FusionVideoShowcaseProps) => {

  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const staticVideo = fusionStaticVideos?.[0];
  const staticThumb = fusionStaticThumbmail?.[0];

  const mergedVideos = fusionVideos
    .map((video, i) => ({
      title: video?.title,
      videoUrl: video?.url,
      thumbnailUrl: fusionVideosThumbmail?.[i]?.url,
    }))
    .filter(v => v.videoUrl && v.thumbnailUrl);

  const paragraphs = fusionStaticContent?.split(".").filter(Boolean);

  return (
    <section
      id="video-showcase"
      className="bg-black text-white py-8 lg:py-10 px-5 sm:px-8 lg:px-[6%]"
    >
      <div className="max-w-7xl mx-auto">

        {/* HERO */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {staticVideo && staticThumb && (
            <div
              className="rounded-xl overflow-hidden border shadow-lg"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <div className="relative aspect-video group">
                <Image
                  src={staticThumb.url}
                  alt="Featured video"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <button
                  onClick={() => setVideoSrc(staticVideo.url!)}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center transition group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.secondary})`,
                    }}
                  >
                    <div className="w-0 h-0 border-l-[16px] border-l-white 
                                    border-t-[10px] border-t-transparent 
                                    border-b-[10px] border-b-transparent ml-1" />
                  </div>
                </button>
              </div>

              <div className="px-4 py-3">
                <h3 className="text-sm font-semibold text-white">
                  {staticVideo.title}
                </h3>
              </div>
            </div>
          )}

          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug">
              {paragraphs?.[0]}
            </h2>

            <div className="mt-4 space-y-2 text-white/70 text-base md:text-lg leading-relaxed">
              {paragraphs?.slice(1).map((text, i) => (
                <p key={i}>{text}.</p>
              ))}
            </div>

            <Link href="/video-library">
              <button
                className="mt-5 px-5 py-2 rounded-full text-sm font-medium transition hover:scale-105"
                style={{
                  background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`,
                }}
              >
                Explore More →
              </button>
            </Link>
          </div>
        </div>

        {/* CAROUSEL */}
        <div className="mt-12">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide px-1">

            {mergedVideos.map((item, i) => (
              <div
                key={i}
                className="min-w-[250px] sm:min-w-[280px] group relative rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={item.thumbnailUrl!}
                    alt={item.title || ""}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />

                  {/* Play Button */}
                  <button
                    onClick={() => setVideoSrc(item.videoUrl!)}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.secondary})`,
                      }}
                    >
                      <div className="w-0 h-0 border-l-[16px] border-l-white 
                              border-t-[10px] border-t-transparent 
                              border-b-[10px] border-b-transparent ml-1" />
                    </div>
                  </button>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white text-sm font-semibold leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"
                  style={{
                    boxShadow: `0 0 30px ${BRAND.primary}40`,
                  }}
                />
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* MODAL */}
      {videoSrc && (
        <PremiumVideoModal
          videoUrl={videoSrc}
          onClose={() => setVideoSrc(null)}
        />
      )}
    </section>
  );
};

export default memo(FusionVideoShowcase);
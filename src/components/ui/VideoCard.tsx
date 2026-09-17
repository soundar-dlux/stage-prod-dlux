"use client";

import Image from "next/image";

interface VideoCardProps {
  title: string;
  thumbnail: string;
  onPlay: () => void;
}

export default function VideoCard({
  title,
  thumbnail,
  onPlay,
}: VideoCardProps) {
  return (
    <div
      onClick={onPlay}
      className="
        group relative w-[260px] cursor-pointer
        rounded-2xl bg-[#141414]
        transition-all duration-500
        hover:-translate-y-4 hover:scale-105
        hover:shadow-[0_30px_60px_rgba(0,0,0,0.7)]
      "
    >
      {/* Thumbnail */}
      <div className="relative h-[160px] overflow-hidden rounded-t-2xl">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black text-xl">
            ▶
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="p-4">
        <p className="text-sm font-semibold text-white">{title}</p>
      </div>
    </div>
  );
}
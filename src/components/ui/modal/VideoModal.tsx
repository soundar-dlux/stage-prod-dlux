"use client";

import { getSafeVideoEmbedUrl } from "@/src/lib/security/content-urls";

interface VideoModalProps {
  open: boolean;
  videoUrl: string;
  onClose: () => void;
}

export default function VideoModal({
  open,
  videoUrl,
  onClose,
}: VideoModalProps) {
  if (!open) return null;

  const safeEmbedUrl = getSafeVideoEmbedUrl(videoUrl, { autoplay: true });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Video modal"
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative w-[90%] max-w-4xl overflow-hidden rounded-xl bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close video modal"
          className="absolute right-3 top-3 z-10 rounded-full bg-black/60 px-3 py-1 text-white hover:bg-black/80 transition"
        >
          ✕
        </button>

        {/* Video */}
        {safeEmbedUrl ? (
          <iframe
            src={safeEmbedUrl}
            title="Video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-[500px] w-full border-0"
          />
        ) : (
          <div className="flex h-[500px] w-full items-center justify-center text-sm text-white/70">
            Video source is unavailable or unsupported.
          </div>
        )}
      </div>
    </div>
  );
}
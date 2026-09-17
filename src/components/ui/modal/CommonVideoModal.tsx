"use client";

import { useEffect } from "react";
import { Linkedin, ExternalLink } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  videoUrl?: string;
  onClose: () => void;
}

export default function CommonVideoModal({
  isOpen,
  videoUrl,
  onClose,
}: VideoModalProps) {

  const getEmbedUrl = (url?: string) => {
    if (!url) return "";
    let embedUrl = url;

    // Format YouTube sharing links to standard embed paths
    if (url.includes("youtu.be")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      embedUrl = `https://www.youtube.com/embed/${id}`;
    } else if (url.includes("youtube.com/watch")) {
      try {
        const params = new URL(url);
        const id = params.searchParams.get("v");
        embedUrl = `https://www.youtube.com/embed/${id}`;
      } catch {
        const match = url.match(/[?&]v=([^&#]*)/);
        if (match && match[1]) {
          embedUrl = `https://www.youtube.com/embed/${match[1]}`;
        }
      }
    }

    // Append autoplay correctly, avoiding duplicate '?' query symbols
    if (!embedUrl.includes("autoplay=1")) {
      const separator = embedUrl.includes("?") ? "&" : "?";
      embedUrl = `${embedUrl}${separator}autoplay=1`;
    }

    return embedUrl;
  };

  const getOriginalUrl = (url?: string) => {
    if (!url) return "";
    if (url.includes("linkedin.com/embed/feed/update")) {
      return url.replace("linkedin.com/embed/feed/update", "linkedin.com/feed/update");
    }
    if (url.includes("youtube.com/embed/")) {
      const id = url.split("youtube.com/embed/")[1]?.split("?")[0];
      return `https://www.youtube.com/watch?v=${id}`;
    }
    return url;
  };

  /* ✅ Hook always runs — condition handled inside */
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  /* ✅ Early return AFTER hook */
  if (!isOpen) return null;

  const isLinkedIn = videoUrl?.includes("linkedin.com");
  const isYouTube = videoUrl?.includes("youtube.com") || videoUrl?.includes("youtu.be");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Video modal"
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-[90%] md:w-[800px] aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close video modal"
          className="absolute top-3 right-3 z-10 bg-white/20 hover:bg-white/40
          text-white rounded-full w-9 h-9 flex items-center justify-center
          transition"
        >
          ✕
        </button>

        {/* Video */}
        <iframe
          src={getEmbedUrl(videoUrl)}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />

        {/* LinkedIn Fallback Watch Button */}
        {isLinkedIn && (
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black/85 border border-white/10 px-4 py-3 rounded-lg backdrop-blur-md">
            <span className="text-[11px] text-white/70 hidden sm:inline">
              If the video is blocked by cookies/security, watch directly on LinkedIn:
            </span>
            <a
              href={getOriginalUrl(videoUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0077b5] hover:bg-[#006297] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:scale-[1.02] ml-auto"
            >
              <Linkedin className="h-3.5 w-3.5" />
              Watch on LinkedIn
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}

        {/* YouTube Fallback Watch Button */}
        {isYouTube && (
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black/85 border border-white/10 px-4 py-3 rounded-lg backdrop-blur-md">
            <span className="text-[11px] text-white/70 hidden sm:inline">
              If the video player shows a configuration error, watch directly on YouTube:
            </span>
            <a
              href={getOriginalUrl(videoUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#ff0000] hover:bg-[#cc0000] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:scale-[1.02] ml-auto animate-pulse"
            >
              Watch on YouTube
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

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
          className="absolute right-3 top-3 z-10 rounded-full bg-black/60 px-3 py-1 text-white"
        >
          ✕
        </button>

        {/* Video */}
        <iframe
          src={`${videoUrl}${
            videoUrl.includes("?") ? "&" : "?"
          }autoplay=1`}
          allow="autoplay; fullscreen"
          className="h-[500px] w-full"
        />
      </div>
    </div>
  );
}
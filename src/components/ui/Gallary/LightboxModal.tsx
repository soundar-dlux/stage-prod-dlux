"use client";

interface Props {
  image: string | null;
  onClose: () => void;
}

export default function LightboxModal({ image, onClose }: Props) {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <img
        src={image}
        alt="preview"
        className="max-w-full max-h-full object-contain rounded-lg"
      />

      {/* CLOSE BUTTON */}
      <button
        className="absolute top-5 right-5 text-white text-3xl"
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  );
}
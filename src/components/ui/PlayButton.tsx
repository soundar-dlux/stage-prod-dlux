"use client";

interface PlayButtonProps {
  onClick: () => void;
}

export default function PlayButton({ onClick }: PlayButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                 w-[60px] h-[60px] rounded-full bg-black/60
                 hover:scale-110 transition flex items-center justify-center"
    >
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <circle cx="100" cy="100" r="90" fill="#333" fillOpacity="0.6" />
        <polygon points="70,55 70,145 145,100" fill="white" />
      </svg>
    </button>
  );
}

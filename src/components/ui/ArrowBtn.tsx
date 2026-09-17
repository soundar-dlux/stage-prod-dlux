"use client";

interface ArrowBtnProps {
  dir: "left" | "right";
  onClick: () => void;
}

export default function ArrowBtn({ dir, onClick }: ArrowBtnProps) {
  return (
    <button
      onClick={onClick}
      className="w-[50px] h-[50px] rounded-full bg-black
                 flex items-center justify-center shadow"
    >
      <span className="text-white text-xl">
        {dir === "left" ? "‹" : "›"}
      </span>
    </button>
  );
}

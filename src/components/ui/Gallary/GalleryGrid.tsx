"use client";

interface Props {
  images: string[];
  onSelect: (img: string) => void;
}

export default function GalleryGrid({ images, onSelect }: Props) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {images.map((img, i) => (
        <div
          key={i}
          className="break-inside-avoid cursor-pointer group"
          onClick={() => onSelect(img)}
        >
          <div className="overflow-hidden rounded-xl bg-[#111]">
            <img
              src={img}
              alt="gallery"
              className="w-full h-auto object-contain transition duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
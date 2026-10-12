"use client";

import { useState, memo, useEffect } from "react";
import GalleryGrid from "@/src/components/ui/Gallary/GalleryGrid";
import LightboxModal from "@/src/components/ui/Gallary/LightboxModal";

interface GallerySectionProps {
  initialImages?: string[];
}

const GallerySection = ({ initialImages = [] }: GallerySectionProps) => {
  const [images, setImages] = useState<string[]>(initialImages);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (initialImages.length > 0) {
      setImages(initialImages);
    }
  }, [initialImages]);

  return (
    <section className="w-full bg-black py-14">
      {/* CENTER WRAPPER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
          Gallery
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-400 text-center mt-3 mb-10 max-w-2xl mx-auto">
          Get a glimpse of life at DLUX
        </p>

        {/* GRID */}
        <GalleryGrid images={images} onSelect={setActive} />
      </div>

      {/* LIGHTBOX (outside wrapper for full screen) */}
      <LightboxModal image={active} onClose={() => setActive(null)} />
    </section>
  );
};

export default memo(GallerySection);
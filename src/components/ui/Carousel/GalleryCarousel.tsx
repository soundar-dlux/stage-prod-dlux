"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  url: string;
  title?: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
  autoPlay?: boolean;
  interval?: number;
  showHeading?: boolean;
  heading?: React.ReactNode;
  subHeading?: string;
  description?: string;
}

export default function GalleryGrid({
  items,
  showHeading = false,
  heading,
  subHeading,
  description,
}: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  if (!items?.length) return null;

  return (
    <section className="relative w-full py-10">
      <div className="mx-auto max-w-7xl px-6 text-center">

        {/* ===== Heading ===== */}
        {showHeading && (
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-semibold text-white">
              {heading}
              {subHeading && (
                <span className="block mt-2 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  {subHeading}
                </span>
              )}
            </h2>

            {description && (
              <p className="mt-4 text-gray-300">{description}</p>
            )}

            <div className="mx-auto mt-4 h-[2px] w-16 bg-orange-500 rounded-full" />
          </div>
        )}

        {/* ===== GRID ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer overflow-hidden rounded-xl bg-black/60"
              onClick={() => setSelectedImage(item)}
            >
              <Image
                src={item.url}
                alt={item.title || "Gallery"}
                width={500}
                height={400}
                className="w-full h-[180px] sm:h-[200px] object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===== MODAL ===== */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white text-2xl"
              >
                ✕
              </button>

              <Image
                src={selectedImage.url}
                alt={selectedImage.title || "Preview"}
                width={1200}
                height={800}
                className="w-full h-auto rounded-xl object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
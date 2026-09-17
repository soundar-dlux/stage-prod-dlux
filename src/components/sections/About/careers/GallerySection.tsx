"use client";

import { useEffect, useState, memo } from "react";
import GalleryGrid from "@/src/components/ui/Gallary/GalleryGrid";
import LightboxModal from "@/src/components/ui/Gallary/LightboxModal";

/* ================= TYPES ================= */

type ImageItem = {
  url: string;
};

type GalleryItem = {
  imagesCollection?: {
    items: ImageItem[];
  };
};

/* ================= API ================= */

async function fetchGallery(): Promise<string[]> {
  const res = await fetch(
    "https://graphql.contentful.com/content/v1/spaces/pj0maraabon4/environments/production",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 6t-wgSsZnD80bBuG3_VNcGKE0lF-LAE7EPa5NE286HU",
      },
      body: JSON.stringify({
        query: `
          query {
            gallaryCollection {
              items {
                imagesCollection {
                  items {
                    url
                  }
                }
              }
            }
          }
        `,
      }),
    }
  );

  const data = await res.json();

  const items: GalleryItem[] =
    data?.data?.gallaryCollection?.items || [];

  return items.flatMap(
    (item) => item.imagesCollection?.items?.map((img) => img.url) || []
  );
}

/* ================= COMPONENT ================= */

const GallerySection = () => {
  const [images, setImages] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    async function loadGallery() {
      try {
        const imgs = await fetchGallery();
        setImages(imgs);
      } catch (err) {
        console.error(err);
      }
    }

    loadGallery();
  }, []);

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
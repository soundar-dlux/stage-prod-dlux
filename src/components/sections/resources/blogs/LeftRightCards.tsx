"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type CardType = {
  title: string;
  description: string;
  url: string;
};

const QUERY = `
{
  blogPageCollection {
    items {
      dluxBlogCollection {
        items {
          title
          description
          url
        }
      }
    }
  }
}
`;

const LeftRightCards: React.FC = () => {
  const [cardsData, setCardsData] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCards = async () => {
      try {
        const response = await fetch(
          "https://graphql.contentful.com/content/v1/spaces/pj0maraabon4/environments/production",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer 6t-wgSsZnD80bBuG3_VNcGKE0lF-LAE7EPa5NE286HU",
            },
            body: JSON.stringify({ query: QUERY }),
            signal: controller.signal,
          }
        );

        const data = await response.json();

        const items =
          data?.data?.blogPageCollection?.items?.[0]?.dluxBlogCollection
            ?.items ?? [];

        const mappedCards: CardType[] = items.map(
          (item: any, index: number) => ({
            title: item?.title ?? `Card ${index + 1}`,
            description:
              item?.description ?? "No description available.",
            url: item?.url ?? "/placeholder.png",
          })
        );

        setCardsData(mappedCards);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error fetching cards:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCards();

    return () => controller.abort(); // cleanup
  }, []);

  // Memoized cards (avoid re-render recalculation)
  const renderedCards = useMemo(() => {
    return cardsData.map((card, index) => (
      <motion.div
        key={index}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
        className="group relative h-[220px] rounded-lg overflow-hidden cursor-pointer will-change-transform"
      >
        {/* IMAGE */}
        <Image
          src={card.url}
          alt={card.title}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300" />

        {/* HOVER CONTENT */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300">
          <h3 className="text-sm font-semibold mb-1 leading-snug">
            {card.title}
          </h3>

          <p className="text-xs text-gray-300 line-clamp-2">
            {card.description}
          </p>
        </div>

        {/* DEFAULT TITLE */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10 group-hover:opacity-0 transition">
          <h3 className="text-sm font-semibold">{card.title}</h3>
        </div>
      </motion.div>
    ));
  }, [cardsData]);

  return (
    <section className="bg-black py-20 px-6 md:px-16 text-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* LEFT */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">
            Dlux <span className="text-gray-400">Blogs</span>
          </h2>

          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl">
            Your Go–to Hub for Martech expert perspectives, tips, and deep dives into the world of enterprise marketing technology and digital operations.
          </p>

          <div className="w-20 h-[2px] bg-white mt-6 opacity-60" />
        </div>

        {/* RIGHT */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[220px] rounded-lg bg-white/10 animate-pulse"
                />
              ))
            : renderedCards}
        </div>
      </div>
    </section>
  );
};

export default LeftRightCards;
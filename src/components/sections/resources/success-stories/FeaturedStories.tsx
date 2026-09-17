"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { CaseStudy } from "@/src/app/resources/success-stories/types";

interface Props {
  caseStudies: CaseStudy[];
}

export default function FeaturedStories({ caseStudies }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const router = useRouter();

  const tags = useMemo(() => {
    const allTags = caseStudies.flatMap((i) =>
      Array.isArray(i.tags) ? i.tags : i.tags ? [i.tags] : []
    );
    return ["All", ...Array.from(new Set(allTags))];
  }, [caseStudies]);

  const filteredStories = caseStudies.filter((story) => {
    const tagMatch =
      selectedTag === "All" ||
      (Array.isArray(story.tags)
        ? story.tags.includes(selectedTag)
        : story.tags === selectedTag);

    const text = searchTerm.toLowerCase();
    const searchMatch =
      story.title?.toLowerCase().includes(text) ||
      story.shortDescription?.toLowerCase().includes(text);

    return tagMatch && searchMatch;
  });

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="bg-black text-white max-w-7xl mx-auto px-6 py-20"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Featured <span className="text-brand-primary">Success Stories</span>
        </h1>
        <p className="text-gray-400 text-md md:text-lg max-w-4xl mx-auto">
          Discover our case studies powered by DLUX — real results from real clients.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex justify-center mb-8"
      >
        <div className="relative w-full md:w-[440px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search article..."
            className="w-full p-[10px] pl-12 rounded-[14px] bg-white text-black"
          />
        </div>
      </motion.div>

      {/* Tags */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-3 mb-10"
      >
        {tags.map((tag) => (
          <motion.button
            key={tag}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setSelectedTag(tag)}
            className={`px-5 py-2 rounded-full border text-sm transition ${
              selectedTag === tag
                ? "bg-white text-black"
                : "border-gray-600 text-gray-300 hover:border-white"
            }`}
          >
            {tag}
          </motion.button>
        ))}
      </motion.div>

      {/* Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 overflow-hidden rounded-2xl"
      >
        {filteredStories.length ? (
          filteredStories.map((story) => (
            <motion.div
              key={story.slug}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              onClick={() => router.push(`/resources/success-stories/${story.slug}`)}
              className="relative h-[300px] md:h-[340px] group cursor-pointer overflow-hidden"
            >
              <Image
                src={story.banner?.url || "/placeholder.jpg"}
                alt={story.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-[900ms]"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />

              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition">
                {story.clientLogo?.url && (
                  <Image
                    src={story.clientLogo.url}
                    alt={story.clientLogo.title || ""}
                    width={160}
                    height={60}
                    className="mb-3 object-contain"
                  />
                )}
                <h3 className="text-lg font-semibold mb-1 line-clamp-2">
                  {story.title}
                </h3>
                <p className="text-sm text-gray-300 line-clamp-3">
                  {story.shortDescription}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-3 text-center py-20 text-gray-500"
          >
            No articles found.
          </motion.p>
        )}
      </motion.div>
    </motion.section>
  );
}

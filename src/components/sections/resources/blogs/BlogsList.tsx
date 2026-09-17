"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaArrowRight, FaPlay, FaAngleRight } from "react-icons/fa6";
import Link from "next/link";
import { GraphQLClient, gql } from "graphql-request";

/* ================= TYPES ================= */

type Blog = {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  tag: string;
  filterTags: string[];
  link: string;
};

type Video = {
  title: string;
  description: string;
  videoSrc: { url: string };
  videoBanner: { url: string };
  trending?: boolean;
};

/* ================= DUMMY DATA ================= */


const videosQuery = gql`
  query {
    coEVideosCollection {
      items {
        title
        description
        videoSrc {
          url
        }
        trending
        videoBanner {
          url
        }
      }
    }
  }
`;

const endpoint =
  "https://graphql.contentful.com/content/v1/spaces/pj0maraabon4/environments/production";

const client = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer 6t-wgSsZnD80bBuG3_VNcGKE0lF-LAE7EPa5NE286HU`,
  },
});

export default function BlogsList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [showAllFilters, setShowAllFilters] = useState(false);

  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  useEffect(() => {
    let isMounted = true;
    const fetchBlogsAndCategories = async () => {
      try {
        const [blogsRes, catsRes] = await Promise.all([
          fetch("https://admin.dluxtech.com/api/blogs?all=true"),
          fetch("https://admin.dluxtech.com/api/categories"),
        ]);
        const blogsData = await blogsRes.json();
        const catsData = await catsRes.json();

        if (!isMounted) return;

        if (blogsData.success) {
          const mappedBlogs: Blog[] = blogsData.blogs.map((b: any) => ({
            title: b.title,
            description: b.excerpt || "",
            url: b.featuredImage
              ? (b.featuredImage.startsWith("http") || b.featuredImage.startsWith("data:"))
                ? b.featuredImage
                : `https://admin.dluxtech.com${b.featuredImage}`
              : "/placeholder.png",
            publishedAt: b.publishDate || b.createdAt,
            tag: b.categories?.[0] || "",
            filterTags: b.categories || [],
            link: b.slug ? b.slug.replace("httpswwwdluxtechcomblog", "") : "",
          }));
          setBlogs(mappedBlogs);
        }

        if (catsData.success) {
          // Filter categories that are active and have at least 1 blog
          const activeCats = catsData.categories.filter(
            (c: any) =>
              c.isActive &&
              (c.blogCount > 0 ||
                (blogsData.success &&
                  blogsData.blogs.some((b: any) =>
                    b.categories?.includes(c.name)
                  )))
          );
          setCategories(activeCats);
        }
      } catch (err) {
        console.error("Error fetching blogs/categories data:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBlogsAndCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchVideos = async () => {
      try {
        const data: any = await client.request(videosQuery);
        if (!isMounted) return;
        const items = data?.coEVideosCollection?.items || [];
        setVideos(items);
      } catch (err) {
        console.error("Error fetching CoE videos:", err);
      }
    };
    fetchVideos();
    return () => {
      isMounted = false;
    };
  }, []);

  const filters = useMemo(() => {
    if (categories.length > 0) {
      return ["All", "Popular", ...categories.map((c) => c.name)];
    }
    const tags = Array.from(new Set(blogs.flatMap((b) => b.filterTags || [])));
    return ["All", "Popular", ...tags.filter((t) => t !== "All" && t !== "Popular")];
  }, [blogs, categories]);

  /* ================= MEMO ================= */

  const filteredBlogs = useMemo(() => {
    return blogs.filter((b, index) => {
      if (activeFilter === "All") return true;
      if (activeFilter === "Popular") {
        // The first 3 blogs are considered popular/featured
        return index < 3;
      }
      return b.filterTags?.includes(activeFilter);
    });
  }, [blogs, activeFilter]);

  const visibleFilters = useMemo(
    () => (showAllFilters ? filters : filters.slice(0, 4)),
    [filters, showAllFilters]
  );

  const featuredVideo = videos[0];
  const otherVideos = videos.slice(1);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="w-full bg-black text-white"
    >
      <div className="flex flex-col lg:flex-row gap-10 px-5 md:px-10 py-12">

        {/* LEFT */}
        <div className="flex-1">
          <h4 className="text-gray-400 text-sm mb-2">BLOG</h4>

          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Maybe You Also Like
          </h2>

          <p className="text-gray-400 mb-8 max-w-xl">
            Explore the latest insights, stories, and use-cases from our resources.
          </p>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-3 mb-8">
            {visibleFilters.map((f, i) => (
              <button
                key={i}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full border text-sm transition ${activeFilter === f
                  ? "bg-white text-black"
                  : "border-white/30 text-white"
                  }`}
              >
                {f}
              </button>
            ))}

            {filters.length > 4 && (
              <button
                onClick={() => setShowAllFilters(!showAllFilters)}
                className="border border-white px-4 py-2 rounded-full"
              >
                {showAllFilters ? "Hide" : "See More"}
              </button>
            )}
          </div>

          {/* BLOG GRID */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white/5 animate-pulse rounded-2xl overflow-hidden border border-white/10 h-[380px]"
                >
                  <div className="bg-white/10 h-[200px] w-full" />
                  <div className="p-5 space-y-4">
                    <div className="h-6 bg-white/10 rounded w-3/4" />
                    <div className="h-4 bg-white/10 rounded w-full" />
                    <div className="h-4 bg-white/10 rounded w-5/6" />
                  </div>
                </div>
              ))
            ) : filteredBlogs.length === 0 ? (
              <div className="col-span-full py-12 text-center text-gray-400">
                No blogs found in this category.
              </div>
            ) : (
              filteredBlogs.map((blog, i) => (
                <div
                  key={i}
                  className="group bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* IMAGE */}
                  <div className="relative w-full h-[200px] overflow-hidden">
                    <Image
                      src={blog.url}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute bottom-3 left-3 text-xs text-white/80 bg-black/40 px-2 py-1 rounded">
                      {blog.publishedAt
                        ? new Date(blog.publishedAt).toLocaleDateString()
                        : ""}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 flex flex-col justify-between h-[180px]">
                    <h3 className="text-base font-semibold leading-snug line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-sm text-gray-400 line-clamp-3 mt-2">
                      {blog.description}
                    </p>

                    <Link
                      href={`/blog/${blog.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition"
                    >
                      Read More
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        <FaAngleRight />
                      </span>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR (STICKY) */}
        {!showAllFilters && (
          <div className="w-full lg:w-[320px]">
            <div className="lg:sticky lg:top-24 bg-white/5 rounded-2xl p-5 border border-white/10">

              <h3 className="font-bold mb-4">
                Also Check-Out Our CoE Videos
              </h3>

              {/* FEATURED */}
              {featuredVideo && (
                <div
                  onClick={() => setSelectedVideo(featuredVideo)}
                  className="relative cursor-pointer mb-4"
                >
                  <Image
                    src={featuredVideo.videoBanner?.url || "/placeholder.png"}
                    alt="video"
                    width={400}
                    height={220}
                    className="rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-white text-2xl bg-black/40">
                    <FaPlay />
                  </div>
                </div>
              )}

              {/* LIST */}
              <div className="space-y-3">
                {otherVideos.map((v, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedVideo(v)}
                    className="flex gap-3 cursor-pointer"
                  >
                    <Image
                      src={v.videoBanner?.url || "/placeholder.png"}
                      alt="video"
                      width={80}
                      height={60}
                      className="rounded object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold">{v.title}</p>
                      <span className="text-xs text-gray-400">
                        {v.description?.slice(0, 50)}...
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://www.dluxtech.com/video-library"
                target="_blank"
                className="mt-5 flex items-center justify-between border border-white px-4 py-2 rounded-full"
              >
                View More <FaArrowRight />
              </a>

            </div>
          </div>
        )}
      </div>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)} // outside click close
          >
            <motion.div
              className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()} // prevent closing inside click
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-lg backdrop-blur transition"
              >
                ✕
              </button>

              {/* VIDEO */}
              <div className="w-full h-[60vh] md:h-[70vh] bg-black">
                <video
                  src={selectedVideo.videoSrc?.url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>

              {/* OPTIONAL TITLE + DESC */}
              <div className="p-4 border-t border-white/10">
                <h3 className="text-base font-semibold">
                  {selectedVideo.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                  {selectedVideo.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
} 
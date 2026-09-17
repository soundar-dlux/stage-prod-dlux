"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

type Blog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  categories: string[];
  publishDate: string;
  createdAt: string;
};

export default function BlogDetailPage() {
  const params = useParams();
  const detailUrlName = params?.detailUrlName as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (url: string) => {
    if (!url) return "";
    return (url.startsWith("http") || url.startsWith("data:")) ? url : `https://admin.dluxtech.com${url}`;
  };

  const blurPlaceholder =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPSIjMTExIiB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLz4=";

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const res = await fetch("https://admin.dluxtech.com/api/blogs?all=true");
        const result = await res.json();
        if (!isMounted) return;

        if (result.success) {
          const items: Blog[] = (result.blogs || []).map((b: any) => ({
            ...b,
            slug: b.slug ? b.slug.replace("httpswwwdluxtechcomblog", "") : "",
          }));
          const current = items.find((item) => item.slug === detailUrlName);
          setBlog(current || null);
          setAllBlogs(items);
        }
      } catch (err) {
        console.error("Error fetching blog details:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (detailUrlName) fetchData();

    return () => {
      isMounted = false;
    };
  }, [detailUrlName]);

  if (loading)
    return (
      <div className="text-center py-20 text-gray-400 bg-[#0b0b0b]">
        Loading...
      </div>
    );

  if (!blog)
    return (
      <div className="text-center py-20 text-gray-400 bg-[#0b0b0b]">
        No content available.
      </div>
    );

  const imageUrl = blog.featuredImage ? getImageUrl(blog.featuredImage) : "";

  const suggested = allBlogs
    .filter((item) => item.slug !== detailUrlName)
    .slice(0, 3);

  const sidebar = allBlogs
    .filter((item) => item.slug !== detailUrlName)
    .slice(0, 5);

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20 py-16 mt-[80px] grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* MAIN */}
        <div className="lg:col-span-3">

          {imageUrl && (
            <Image
              src={imageUrl}
              alt={blog.title}
              width={1200}
              height={600}
              priority
              placeholder="blur"
              blurDataURL={blurPlaceholder}
              className="w-full object-cover rounded-xl mb-8"
            />
          )}

          {/* 🔥 MAIN TITLE */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {blog.title}
          </h1>

          <div
            className="blog-content-html"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* SUGGESTED */}
          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-[#ff3901]">
              You may also like
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {suggested.map((item) => {
                const img = item.featuredImage || "";

                return (
                  <a
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="bg-[#111] rounded-xl overflow-hidden border border-[#222] hover:border-[#ff3901] transition"
                  >
                    {img && (
                      <Image
                        src={getImageUrl(img)}
                        alt={item.title}
                        width={400}
                        height={250}
                        placeholder="blur"
                        blurDataURL={blurPlaceholder}
                        className="w-full h-[180px] object-cover"
                      />
                    )}

                    <div className="p-4">
                      <h4 className="text-sm font-medium text-gray-300 hover:text-[#ff3901]">
                        {item.title}
                      </h4>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <a
                href="/resources/blogs"
                className="inline-block bg-[#ff3901] hover:bg-[#e63200] px-6 py-3 rounded-lg font-medium transition"
              >
                View More Blogs →
              </a>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-1 space-y-6">

          {/* Latest Posts */}
          <div className="sticky top-24 bg-[#111] border border-[#222] rounded-xl p-5">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#ff3901]">
              Latest Posts
            </h3>

            <div className="space-y-4">
              {sidebar.map((item) => (
                <a
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="block text-sm text-gray-300 hover:text-[#ff3901]"
                >
                  • {item.title}
                </a>
              ))}
            </div>
          </div>

          {/* CONTACT CTA */}
          <div className="sticky top-[300px]">
            <div className="bg-gradient-to-br from-[#111] to-[#0d0d0d] border border-[#222] rounded-xl p-6 shadow-lg">

              <p className="text-[#ff3901] text-sm mb-2 font-medium">
                📩 Business Enquiries
              </p>

              <h3 className="text-lg font-semibold text-white mb-3">
                Let’s Connect
              </h3>

              <p className="text-sm text-gray-400 leading-6 mb-5">
                Reach out at <span className="text-white font-medium">sales@dluxtech.com</span>
              </p>

              <a
                href="mailto:sales@dluxtech.com"
                className="block text-center bg-[#ff3901] hover:bg-[#e63200] text-white font-medium px-4 py-3 rounded-lg transition"
              >
                Contact Us
              </a>

              <p className="text-xs text-gray-500 mt-3 text-center">
                We typically respond within 24 hours
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
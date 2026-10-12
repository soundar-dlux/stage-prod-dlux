import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getBlogBySlug,
  getSuggestedBlogs,
  getSidebarBlogs,
  getBlogImageUrl,
} from "@/src/lib/cms/blogs";
import { sanitizeBlogHtml } from "@/src/lib/security/sanitize-blog-html";

interface Props {
  params: Promise<{ detailUrlName: string }>;
}

const BLUR_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPSIjMTExIiB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLz4=";

/**
 * Dynamically generates metadata for SEO and OpenGraph tags from the blog post.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { detailUrlName } = await params;
  if (!detailUrlName) {
    return { title: "Blog | DLUX Tech" };
  }

  const blog = await getBlogBySlug(detailUrlName);
  if (!blog) {
    return {
      title: "Blog Post Not Found | DLUX Tech",
      robots: { index: false, follow: false },
    };
  }

  const imageUrl = getBlogImageUrl(blog.featuredImage);

  return {
    title: `${blog.title} | DLUX Tech`,
    description: blog.excerpt || blog.title,
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.title,
      url: `https://www.dluxtech.com/blog/${blog.slug}`,
      siteName: "DLUX Tech",
      type: "article",
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt || blog.title,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { detailUrlName } = await params;

  if (!detailUrlName) {
    return notFound();
  }

  // Retrieve blog post using server-only loader
  const blog = await getBlogBySlug(detailUrlName);

  if (!blog) {
    return notFound();
  }

  // Fetch suggested and sidebar blogs in parallel
  const [suggested, sidebar] = await Promise.all([
    getSuggestedBlogs(detailUrlName, 3),
    getSidebarBlogs(detailUrlName, 5),
  ]);

  // Enforce server-side HTML sanitization with the security allowlist
  const safeContentHtml = sanitizeBlogHtml(blog.content);
  const imageUrl = getBlogImageUrl(blog.featuredImage);

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20 py-16 mt-[80px] grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* MAIN COLUMN */}
        <div className="lg:col-span-3">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={blog.title}
              width={1200}
              height={600}
              priority
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              className="w-full object-cover rounded-xl mb-8"
            />
          )}

          {/* MAIN TITLE */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* SECURE SANITIZED BLOG CONTENT */}
          <article
            className="blog-content-html"
            dangerouslySetInnerHTML={{ __html: safeContentHtml }}
          />

          {/* SUGGESTED ARTICLES */}
          {suggested.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-[#ff3901]">
                You may also like
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                {suggested.map((item) => {
                  const img = item.featuredImage
                    ? getBlogImageUrl(item.featuredImage)
                    : "";

                  return (
                    <Link
                      key={item.slug}
                      href={`/blog/${item.slug}`}
                      className="bg-[#111] rounded-xl overflow-hidden border border-[#222] hover:border-[#ff3901] transition"
                    >
                      {img && (
                        <Image
                          src={img}
                          alt={item.title}
                          width={400}
                          height={250}
                          placeholder="blur"
                          blurDataURL={BLUR_PLACEHOLDER}
                          className="w-full h-[180px] object-cover"
                        />
                      )}

                      <div className="p-4">
                        <h4 className="text-sm font-medium text-gray-300 hover:text-[#ff3901]">
                          {item.title}
                        </h4>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/resources/blogs"
                  className="inline-block bg-[#ff3901] hover:bg-[#e63200] px-6 py-3 rounded-lg font-medium transition"
                >
                  View More Blogs →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Latest Posts */}
          {sidebar.length > 0 && (
            <div className="sticky top-24 bg-[#111] border border-[#222] rounded-xl p-5">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#ff3901]">
                Latest Posts
              </h3>

              <div className="space-y-4">
                {sidebar.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="block text-sm text-gray-300 hover:text-[#ff3901] transition"
                  >
                    • {item.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

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
                Reach out at{" "}
                <span className="text-white font-medium">sales@dluxtech.com</span>
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
        </aside>
      </div>
    </div>
  );
}
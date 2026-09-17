"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { BlogPost } from "@/src/app/resources/our-webinars/types";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3 },
  },
};

export default function BlogSection({ blogs }: { blogs: BlogPost[] }) {
  return (
    <section
      className="bg-black bg-[url('https://images.ctfassets.net/pj0maraabon4/460BvYglILJP3CQpLh0QLh/7b2648fa189b605a87ca11c8ab66b93c/blog-background-banner.png')]
      bg-cover bg-center bg-no-repeat bg-blend-multiply px-6 md:px-12 lg:px-20 py-[80px] text-white"
    >
      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex justify-between items-center mb-10"
      >
        <h2 className="text-3xl font-bold">BLOG</h2>
        <Link href="/resources/blogs" className="hover:underline">
          View All Blogs
        </Link>
      </motion.div>

      {/* Blog Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col lg:flex-row gap-8 lg:pl-[50px] pt-12"
      >
        {blogs.map((post, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative rounded-lg shadow-lg flex-1 pb-6 cursor-pointer"
          >
            {post.detailImageCollection?.items[0]?.url && (
              <div className="relative h-[220px] w-full">
                <Image
                  src={post.detailImageCollection.items[0].url}
                  alt={post.detailTitle}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}

            <div className="pt-7">
              <p className="text-sm mb-2">
                {new Date(post.detailPublishDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <h3 className="text-lg lg:text-2xl font-semibold">
                <Link
                  href={`/blog/${post.detailUrlName}`}
                  className="hover:underline"
                >
                  {post.detailTitle}
                </Link>
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

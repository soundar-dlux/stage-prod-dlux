import "server-only";
import { BLOGS_QUERY } from "@/src/app/resources/our-webinars/queries";
import { BlogsData } from "@/src/app/resources/our-webinars/types";
import { fetchContentfulGraphQL } from "./server-client";

export async function fetchBlogs(): Promise<BlogsData> {
  const data = await fetchContentfulGraphQL<{
    resourcesBlogsCollection?: { items?: BlogsData["blogs"] };
  }>(BLOGS_QUERY, { revalidate: 60 });

  return {
    blogs: data?.resourcesBlogsCollection?.items ?? [],
  };
}

import { BLOGS_QUERY } from "@/src/app/resources/our-webinars/queries";
import { BlogsData } from "@/src/app/resources/our-webinars/types";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;

export async function fetchBlogs(): Promise<BlogsData> {
  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/production`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query: BLOGS_QUERY }),
      next: { revalidate: 60 },
    }
  );

  const { data, errors } = await res.json();

  if (errors) {
    console.error(errors);
    throw new Error("Failed to fetch blogs");
  }

  return {
    blogs: data.resourcesBlogsCollection.items ?? [],
  };
}

import "server-only";
import { fetchContentfulGraphQL } from "./server-client";

export interface BlogHeroBannerItem {
  url: string;
}

export interface BlogCardItem {
  title: string;
  description: string;
  url: string;
}

export interface BlogVideoItem {
  title: string;
  description: string;
  videoSrc: { url: string };
  videoBanner: { url: string };
  trending?: boolean;
}

export interface BlogResourcesData {
  heroBanners: string[];
  leftRightCards: BlogCardItem[];
  videos: BlogVideoItem[];
}

const BLOG_RESOURCES_QUERY = `
  query GetBlogResources {
    blogPageCollection(limit: 1) {
      items {
        heroBannerCollection {
          items {
            url
          }
        }
        dluxBlogCollection {
          items {
            title
            description
            url
          }
        }
      }
    }
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

/**
 * Server-only loader that retrieves all Contentful resources needed by the /resources/blogs page.
 */
export async function fetchBlogResourcesData(): Promise<BlogResourcesData> {
  const data = await fetchContentfulGraphQL<any>(BLOG_RESOURCES_QUERY);

  const blogPageItem = data?.blogPageCollection?.items?.[0];

  const heroBanners: string[] =
    blogPageItem?.heroBannerCollection?.items
      ?.map((item: any) => item?.url)
      ?.filter((url: any): url is string => typeof url === "string" && url.length > 0) ?? [];

  const leftRightCards: BlogCardItem[] =
    blogPageItem?.dluxBlogCollection?.items
      ?.map((item: any, idx: number) => ({
        title: item?.title || `Card ${idx + 1}`,
        description: item?.description || "",
        url: item?.url || "",
      }))
      ?.filter((card: BlogCardItem) => card.url.length > 0) ?? [];

  const videos: BlogVideoItem[] =
    data?.coEVideosCollection?.items
      ?.map((item: any) => ({
        title: item?.title || "",
        description: item?.description || "",
        videoSrc: { url: item?.videoSrc?.url || "" },
        videoBanner: { url: item?.videoBanner?.url || "" },
        trending: Boolean(item?.trending),
      }))
      ?.filter((video: BlogVideoItem) => video.videoSrc.url.length > 0) ?? [];

  return {
    heroBanners,
    leftRightCards,
    videos,
  };
}

/**
 * Retrieve hero banner URLs for the blog section.
 */
export async function fetchBlogHeroBanners(): Promise<string[]> {
  const data = await fetchBlogResourcesData();
  return data.heroBanners;
}

/**
 * Retrieve left/right highlight cards for the blog section.
 */
export async function fetchBlogLeftRightCards(): Promise<BlogCardItem[]> {
  const data = await fetchBlogResourcesData();
  return data.leftRightCards;
}

/**
 * Retrieve CoE videos for the blog section.
 */
export async function fetchBlogVideos(): Promise<BlogVideoItem[]> {
  const data = await fetchBlogResourcesData();
  return data.videos;
}

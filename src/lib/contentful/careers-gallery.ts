import "server-only";
import { fetchContentfulGraphQL } from "./server-client";

interface GalleryImageItem {
  url?: string;
}

interface GalleryCollectionItem {
  imagesCollection?: {
    items?: GalleryImageItem[];
  };
}

interface CareersGalleryQueryResult {
  gallaryCollection?: {
    items?: GalleryCollectionItem[];
  };
}

const CAREERS_GALLERY_QUERY = `
  query GetCareersGallery {
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
`;

/**
 * Server-only loader that retrieves gallery image URLs for the careers page.
 */
export async function fetchCareersGallery(): Promise<string[]> {
  const data = await fetchContentfulGraphQL<CareersGalleryQueryResult>(
    CAREERS_GALLERY_QUERY
  );

  const items = data?.gallaryCollection?.items ?? [];

  return items.flatMap(
    (item) =>
      item.imagesCollection?.items
        ?.map((img) => img.url)
        ?.filter((url): url is string => typeof url === "string" && url.length > 0) ?? []
  );
}

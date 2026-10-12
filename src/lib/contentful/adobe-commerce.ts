import "server-only";
import { fetchContentfulGraphQL } from "./server-client";

export interface CommerceBannerSlide {
  id: string;
  title?: string;
  description?: string;
  video?: string;
  image?: string;
}

export interface CommerceVideoItem {
  id: string;
  title?: string;
  video?: string;
  image?: string;
}

export interface CommerceImageLeftData {
  title?: string;
  description?: string;
  url?: string;
}

export interface CommerceFeatureItem {
  title: string;
  description: string;
  url: string;
}

export interface CommerceServiceItem {
  title: string;
  description: string;
  url: string;
}

export interface CommerceCaseStudyItem {
  title: string;
  slug: string;
  client: string;
  shortDescription: string;
  banner?: { url?: string };
}

export interface CommerceTestimonialItem {
  title?: string;
  description?: string;
  url?: string;
}

export interface AdobeCommercePageData {
  slides: CommerceBannerSlide[];
  videos: CommerceVideoItem[];
  imageLeft: CommerceImageLeftData | null;
  features: CommerceFeatureItem[];
  services: CommerceServiceItem[];
  caseStudies: CommerceCaseStudyItem[];
  testimonials: CommerceTestimonialItem[];
}

const ADOBE_COMMERCE_QUERY = `
  query GetAdobeCommerceData {
    commerceVideosCollection {
      items {
        sys { id }
        title
        description
        video
        image { url }
      }
    }
    platformAdobeCommerces(id: "231JBLMJLXr5L3FUHFNGEI") {
      imageLeftContent {
        title
        description
        url
      }
      adobeCommerceFeatutreCollection {
        items {
          title
          description
          url
        }
      }
      adobeServiceCollection {
        items {
          title
          description
          url
        }
      }
      dluxClientsSayCollection {
        items {
          title
          description
          url
        }
      }
    }
    caseStudyCollection(limit: 3) {
      items {
        title
        slug
        client
        shortDescription
        banner { url }
      }
    }
  }
`;

/**
 * Server-only loader that retrieves all Contentful data for the Adobe Commerce page.
 */
export async function fetchAdobeCommercePageData(): Promise<AdobeCommercePageData> {
  const data = await fetchContentfulGraphQL<any>(ADOBE_COMMERCE_QUERY);

  // Parse banner slides and CoE videos
  const videoItems = data?.commerceVideosCollection?.items ?? [];

  const slides: CommerceBannerSlide[] = videoItems.map((item: any) => ({
    id: item?.sys?.id || "",
    title: item?.title || "",
    description: item?.description || "",
    video: item?.video || "",
    image: item?.image?.url || "",
  }));

  const videos: CommerceVideoItem[] = videoItems.map((item: any) => ({
    id: item?.sys?.id || "",
    title: item?.title || "",
    video: item?.video || "",
    image: item?.image?.url || "",
  }));

  // Parse platform commerce page entry
  const platformEntry = data?.platformAdobeCommerces;

  const imageLeft: CommerceImageLeftData | null =
    platformEntry?.imageLeftContent ?? null;

  const features: CommerceFeatureItem[] =
    platformEntry?.adobeCommerceFeatutreCollection?.items?.map((item: any) => ({
      title: item?.title || "",
      description: item?.description || "",
      url: item?.url || "",
    })) ?? [];

  const services: CommerceServiceItem[] =
    platformEntry?.adobeServiceCollection?.items?.map((item: any) => ({
      title: item?.title || "",
      description: item?.description || "",
      url: item?.url || "",
    })) ?? [];

  const testimonials: CommerceTestimonialItem[] =
    platformEntry?.dluxClientsSayCollection?.items?.map((item: any) => ({
      title: item?.title || "",
      description: item?.description || "",
      url: item?.url || "",
    })) ?? [];

  // Parse case studies
  const caseStudies: CommerceCaseStudyItem[] =
    data?.caseStudyCollection?.items?.map((item: any) => ({
      title: item?.title || "",
      slug: item?.slug || "",
      client: item?.client || "",
      shortDescription: item?.shortDescription || "",
      banner: item?.banner ? { url: item?.banner?.url } : undefined,
    })) ?? [];

  return {
    slides,
    videos,
    imageLeft,
    features,
    services,
    caseStudies,
    testimonials,
  };
}

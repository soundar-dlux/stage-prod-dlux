// types.ts
export interface Asset {
  url: string;
}

export interface ContentItem {
  title?: string;
  description?: string;
  url?: string; // 🔥 image URL directly
}

export interface Collection<T> {
  items: T[];
}

export interface BannerSection {
  title: string;
  description: string;
  url: string;
}

export interface HealthCheck {
  title?: string;
  url?: string;
}

export interface FusionData1 {
  bannersection: BannerSection;
  imageLeft: ContentItem; // ✅ SINGLE OBJECT
  playBookCollection: Collection<ContentItem>;
  clientSayingCollection: Collection<ContentItem>;
  blogSectionCollection: Collection<ContentItem>;
  eqiqImagesCollection: Collection<Asset>;
  healthCheck: HealthCheck;
}

export interface FusionData2 {
  fusionVideosCollection: Collection<ContentItem>;
  fusionVideosThumbmailCollection: Collection<Asset>;
  fusionstaticvideosCollection: Collection<ContentItem>;
  fusionStaticThumbmailCollection: Collection<Asset>;
  fusionVideosDescription: string;
}

export interface FusionResponse {
  fusionData1: FusionData1;
  fusionData2: FusionData2;
}

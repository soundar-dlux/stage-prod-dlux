/* =====================
   Shared
===================== */

export interface ContentfulAsset {
  url: string;
}

export interface ContentfulCollection<T> {
  items: T[];
}

/* =====================
   Banner
===================== */

export interface Banner {
  title: string;
  description?: string | null;
  url: string;
}

export interface PrimaryBannerData {
  banner: Banner | null;
}

/* =====================
   Secondary
===================== */

export interface SecondaryImage {
  title: string;
  description: string;
  url: string;
}

export interface SecondaryBannerData {
  secondaryImage: SecondaryImage | null;
}

/* =====================
   Hero
===================== */

export interface HeroImage {
  description: string;
  url: string;
}

export interface HeroBannerData {
  heroImage: HeroImage | null;
}

/* =====================
   Testimonials
===================== */

export interface TestimonialImage {
  title: string;
  description: string;
  url: string;
}

/* =====================
   Life at DLUX
===================== */

export interface LifeAtDluxData {
  lifeAtDluxContent: string;
  lifeAtDluxPara: string;
  lifeAtDluxVideoCollection: ContentfulCollection<ContentfulAsset>;
  lifeAtDluxVideoThumbnailCollection: ContentfulCollection<ContentfulAsset>;
  testimonialImagesCollection: ContentfulCollection<TestimonialImage>;
}

/* =====================
   Full Query Response
===================== */

export interface OurTeamQueryResponse {
  primaryBanner: PrimaryBannerData | null;
  secondaryBanner: SecondaryBannerData | null;
  heroBanner: HeroBannerData | null;
  lifeAtDlux: LifeAtDluxData | null;
}

// app/services/content-management-dam/types.ts

/* ---------- Common ---------- */

export interface ContentfulImage {
  url: string;
}

export interface ImageCollection {
  items: ContentfulImage[];
}

/* ---------- Hero ---------- */

export interface HeroData {
  dluxServiceHeading: string;
  dluxServiceImage?: ContentfulImage;
}

/* ---------- Content + DAM Intro ---------- */

export interface ContentAndDamData {
  dluxServiceHeading: string;
  dluxServiceImage?: ContentfulImage;
}

/* ---------- Our Services ---------- */

export interface OurServicesData {
  dluxServiceHeading: string;
  dluxServiceImageManyCollection: ImageCollection;
}

/* ---------- Key Features ---------- */

export interface KeyFeaturesData {
  dluxServiceHeading: string;
  dluxServiceImageManyCollection: ImageCollection;
}

/* ---------- Why Choose DLUX ---------- */

export interface WhyChooseDluxData {
  dluxServiceHeading: string;
  dluxServiceImage?: ContentfulImage; // video URL
  dluxServiceImageManyCollection: ImageCollection;
}

/* ---------- FINAL NORMALIZED PAGE TYPE ---------- */

export interface ContentManagementDAMPageData {
  hero: HeroData;
  contentAndDam: ContentAndDamData;
  ourServices: OurServicesData;
  keyFeatures: KeyFeaturesData;
  whyChooseDlux: WhyChooseDluxData;
}

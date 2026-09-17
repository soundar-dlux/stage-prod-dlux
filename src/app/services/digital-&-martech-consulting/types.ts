export interface Image {
  url: string;
}

export interface ImageCollection {
  items: Image[];
}

export interface ServiceBlock {
  dluxServiceHeading: string;
  dluxServiceImage?: Image;
  dluxServiceImageManyCollection?: ImageCollection;
}

export interface DigitalMartechPageData {
  dluxServiceMainPage: ServiceBlock;
  DigitalPage_Digital: ServiceBlock;
  DigitalPage_Whatdoyoustandtogain: ServiceBlock;
  DigitalPage_BusinessProcessOptimizationServices: ServiceBlock;
}

// app/adobe-workfront-managed-services/types.ts

export interface ImageItem {
  url: string;
}

export interface ImageCollection {
  items: ImageItem[];
}

export interface OurClients {
  dluxHeading?: string;
  dluxPara?: string;
  dluxImageCollection: ImageCollection;
}

export interface ClientReview {
  clientheading?: string;
  clientText?: string;
  clientParagraph: string;
  clientH3: string;
}

export interface AdobeWorkfrontPageData {
  ourClients: OurClients[];
  dluxClientReview: ClientReview[];
  client2: ClientReview[];
  client3: ClientReview[];
  client4: ClientReview[];
  girl_banner: {
    dluxImageCollection: ImageCollection;
  }[];
}

export interface BlogImage {
  url: string;
}

export interface BlogPost {
  detailUrlName: string;
  detailTitle: string;
  detailPublishDate: string;
  listingTileDescription?: string;
  detailImageCollection?: {
    items: BlogImage[];
  };
}

export interface BlogsData {
  blogs: BlogPost[];
}

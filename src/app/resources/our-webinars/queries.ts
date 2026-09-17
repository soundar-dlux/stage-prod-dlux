export const BLOGS_QUERY = `
  query GetLatestBlogs {
    resourcesBlogsCollection(
      order: detailPublishDate_DESC
      limit: 3
    ) {
      items {
        detailUrlName
        detailTitle
        detailPublishDate
        listingTileDescription
        detailImageCollection {
          items {
            url
          }
        }
      }
    }
  }
`;

export const SUCCESS_STORIES_QUERY = `
query GetCaseStudies {
  caseStudyCollection(order: sys_publishedAt_DESC) {
    items {
      title
      slug
      shortDescription
      tags
      banner {
        url
        title
      }
      clientLogo {
        url
        title
      }
    }
  }
}
`;

export const SUCCESS_STORY_BY_SLUG_QUERY = `
query GetCaseStudyBySlug($slug: String!) {
  caseStudyCollection(where: { slug: $slug }, limit: 1) {
    items {
      title
      slug
      client
      industry
      location
      summary
      shortDescription
      challengesBottlenecks
      turningPoint
      conclusion
      tags
      banner {
        url
        description
      }
      clientLogo {
        url
        title
      }
      caseStudyPdf {
        url
        fileName
      }
    }
  }
}
`;

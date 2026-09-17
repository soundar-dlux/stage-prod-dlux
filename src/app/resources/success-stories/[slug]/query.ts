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
        banner {
          url
          description
        }
        caseStudyPdf {
          url
          fileName
        }
      }
    }
  }
`;

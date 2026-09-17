export const CONTENT_MANAGEMENT_DAM_QUERY = `
{
  hero: dluxServiceMainPage(id: "3AT96xWfZNTg7hlxEdqlyz") {
    dluxServiceHeading
    dluxServiceImage {
      url
    }
  }

  contentAndDam: dluxServiceMainPage(id: "1k5WQKqVmzK1Vm0r8Rrf2g") {
    dluxServiceHeading
    dluxServiceImage {
      url
    }
  }

  ourServices: dluxServiceMainPage(id: "1DEqTzP2Jo1l9IwpFwd4uh") {
    dluxServiceHeading
    dluxServiceImageManyCollection {
      items {
        url
      }
    }
  }

  keyFeatures: dluxServiceMainPage(id: "5uhaLT4joRQ6qosfxE1leR") {
    dluxServiceHeading
    dluxServiceImageManyCollection {
      items {
        url
      }
    }
  }

  whyChooseDlux: dluxServiceMainPage(id: "5zkNACqlxDX4j3LbdH2zGn") {
  dluxServiceHeading
  dluxServiceImage {
    url
  }
  dluxServiceImageManyCollection {
    items {
      url
    }
  }
}

}
`;

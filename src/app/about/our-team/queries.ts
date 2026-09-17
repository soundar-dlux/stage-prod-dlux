export const OUR_TEAM_QUERY = `
query {
  primaryBanner: aboutOurTeam(id: "r8PCeiSqZoaGxiLto0wOg") {
    banner {
      title
      description
      url
    }
  }

  secondaryBanner: aboutOurTeam(id: "4GIGM6f48K7Bakk8bZm8Gv") {
    secondaryImage {
      title
      description
      url
    }
  }

  heroBanner: aboutOurTeam(id: "6d1AqQ3umAFivZPzE75UIB") {
    heroImage {
      description
      url
    }
  }

  lifeAtDlux: aboutOurTeam(id: "3UZ2RqfX9PZVdqJhLB5Nhs") {
    lifeAtDluxContent
    lifeAtDluxPara

    lifeAtDluxVideoThumbnailCollection {
      items {
        url
      }
    }

    lifeAtDluxVideoCollection {
      items {
        url
      }
    }

    testimonialImagesCollection {
      items {
        title
        description
        url
      }
    }
  }
}
`;

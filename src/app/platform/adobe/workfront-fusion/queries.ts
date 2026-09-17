// queries.ts
export const WORKFRONT_FUSION_QUERY = `
{
  fusionData1: platformWorkfrontFusion(id: "7jHaQI4LMrYzWiGfgMpGz3") {
    bannersection {
      title
      description
      url
    }

    imageLeft {
      title
      description
      url
    }

    playBookCollection {
      items {
        title
        description
        url
      }
    }

    clientSayingCollection {
      items {
        title
        description
        url
      }
    }

    blogSectionCollection {
      items {
        title
        description
        url
      }
    }

    eqiqImagesCollection {
      items {
        url
      }
    }

    healthCheck {
      title
      url
    }
  }

  fusionData2: platformWorkfrontFusion(id: "46VPS8aoUJuGGBSwulgq6L") {
    fusionVideosCollection {
      items {
        title
        url
      }
    }

    fusionVideosThumbmailCollection {
      items {
        url
      }
    }

    fusionstaticvideosCollection {
      items {
        title
        url
      }
    }

    fusionStaticThumbmailCollection {
      items {
        url
      }
    }

    fusionVideosDescription
  }
}
`;

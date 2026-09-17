import ServiceDetailsSection from "@/src/components/sections/platform/salesforce/commerce-cloud/ServiceDetailsSection";
import ImageLeftSection from "@/src/components/sections/platform/salesforce/commerce-cloud/ImageLeftSection";
import CommerceHeroSection from "@/src/components/sections/platform/salesforce/commerce-cloud/CommerceHeroSection";
import ContactUsCTASection from "@/src/components/sections/platform/salesforce/commerce-cloud/ContactUsCTASection";

/* ---------------- STATIC SERVICES ---------------- */

const services = {
  title: "Our Salesforce Commerce Cloud",
  items: [
    {
      image: "https://images.ctfassets.net/pj0maraabon4/1EAWoQEWS7PgyVE1z9jr4g/988c86d26bf26df7ac7674815108b300/sd_1.png",
      title: "Implementation Excellence",
      description:
        "As a leading SFCC partner, we deliver high-performance, multi-brand, and multi-country sites tailored for growth—on budget and on time.",
    },
    {
      image: "https://images.ctfassets.net/pj0maraabon4/2Z9qE9Fcss4Xba1bTQmi9p/ec4310c279211be019b7a7959402952e/sd_2.png",
      title: "Managed Services",
      description:
        "Get 24/7 monitoring, audits, version upgrades, and certified SFCC support for platform optimization and issue resolution.",
    },
    {
      image: "https://images.ctfassets.net/pj0maraabon4/2LaSfpql2jiDqW1rhNasbO/2d3104f790a4a10f94f8613365bff06a/sd_3.png",
      title: "SiteGenesis to SFRA Migration",
      description:
        "Seamlessly migrate from SiteGenesis to SFRA or implement new SFRA setups with our expert planning and execution.",
    },
    {
      image: "https://images.ctfassets.net/pj0maraabon4/4s15jcc8bSz5AjjcPC2rvL/4ce955802f93692d6465e4cf8a487f4d/sd_4.png",
      title: "Cross-Platform Migration",
      description:
        "Transition smoothly to SFCC from platforms like Magento, Shopify, Oracle Commerce, and more with our proven expertise.",
    },
    {
      image: "https://images.ctfassets.net/pj0maraabon4/4uMc6CmzKYaCZuhnWTUzaQ/20001d8c0f93ae211d068b1f264cb755/sd_5.png",
      title: "Comprehensive Integrations",
      description:
        "As SFCC and MuleSoft partners, we integrate SFCC with OMS, CMS, ERP, and over 100 apps and services for unified operations.",
    },
    {
      image: "https://images.ctfassets.net/pj0maraabon4/30jfZfvqYQbZlNB6vEp6Cm/726b67d42b43d6e3a95695e5b82af9fb/sd_6.png",
      title: "Dedicated SFCC Developers",
      description:
        "Stay ahead with skilled developers for platform enhancements, new implementations, and managed support—cost-effectively.",
    },
  ],
};

/* ---------------- FETCH CONTENTFUL ---------------- */

async function getPageData() {
  const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
  const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

  if (!SPACE_ID) {
    throw new Error("Missing CONTENTFUL_SPACE_ID in .env.local");
  }

  if (!ACCESS_TOKEN) {
    throw new Error("Missing CONTENTFUL_ACCESS_TOKEN in .env.local");
  }

  const query = `
    query {
      platformCommerceCloud(id: "3nTMVnqCMpAp2Vf1n20pkh") {
        commerceCloudBannerSection {
          url
          title
          description
        }

        commerceCloudVideoCollection(limit: 1) {
          items {
            url
            contentType
          }
        }

        commerceCloudImageSectionCollection(limit: 1) {
          items {
            url
          }
        }
      }

      platformCommerceCloudCollection(limit: 1) {
        items {
          commerceCloudSecondaryImage {
            url
            description
          }
        }
      }
    }
  `;

  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/production`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Contentful Error:", errorText);
    throw new Error("Failed to fetch Contentful data");
  }

  const json = await res.json();

  const main = json?.data?.platformCommerceCloud;

  const rawVideo =
    main?.commerceCloudVideoCollection?.items?.[0];

  const videoUrl = rawVideo?.url
    ? rawVideo.url.startsWith("http")
      ? rawVideo.url
      : `https:${rawVideo.url}`
    : "";

  const rawPoster =
    main?.commerceCloudImageSectionCollection?.items?.[0]?.url;

  const posterUrl = rawPoster
    ? rawPoster.startsWith("http")
      ? rawPoster
      : `https:${rawPoster}`
    : "";

  const secondary =
    json?.data?.platformCommerceCloudCollection?.items?.[0]
      ?.commerceCloudSecondaryImage;

  return {
    banner: main?.commerceCloudBannerSection ?? null,
    videoUrl,
    posterUrl,
    secondaryDescription: secondary?.description ?? "",
  };
}

/* ---------------- PAGE ---------------- */

export default async function CommerceCloudPage() {
  const { banner, videoUrl, posterUrl, secondaryDescription } =
    await getPageData();

  return (
    <main className="bg-black text-white">

      {banner && (
        <CommerceHeroSection banner={banner} />
      )}

      {videoUrl && (
        <ImageLeftSection
          videoUrl={videoUrl}
          poster={posterUrl}
          description={secondaryDescription}
        />
      )}

      <ServiceDetailsSection
        title={services.title}
        services={services.items}
      />

      <ContactUsCTASection />

    </main>
  );
}
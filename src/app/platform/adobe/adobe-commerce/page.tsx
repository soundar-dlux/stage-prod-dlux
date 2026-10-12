import Banner from "@/src/components/sections/platform/adobe/adobe-commerce/Banner";
import CoeVideos from "@/src/components/sections/platform/adobe/adobe-commerce/CoeVideos";
import ImageLeftSection from "@/src/components/sections/platform/adobe/adobe-commerce/ImageLeftSection";
import FeatureSection from "@/src/components/sections/platform/adobe/adobe-commerce/FeatureSection";
import AdobeServiceCards from "@/src/components/sections/platform/adobe/adobe-commerce/AdobeServiceCards";
import CaseStudySection from "@/src/components/sections/platform/adobe/adobe-commerce/CaseStudySection";
import Testimonials from "@/src/components/sections/platform/adobe/adobe-commerce/Testimonials";
import { fetchAdobeCommercePageData } from "@/src/lib/contentful/adobe-commerce";

export default async function AdobeCommercePage() {
  const data = await fetchAdobeCommercePageData();

  return (
    <main className="overflow-hidden">
      <Banner initialSlides={data.slides.slice(-3)} />
      <CoeVideos initialVideos={data.videos} />
      <ImageLeftSection initialContent={data.imageLeft} />
      <FeatureSection initialFeatures={data.features} />
      <AdobeServiceCards initialServices={data.services} />
      <CaseStudySection initialCaseStudies={data.caseStudies} />
      <Testimonials initialTestimonials={data.testimonials} />
    </main>
  );
}
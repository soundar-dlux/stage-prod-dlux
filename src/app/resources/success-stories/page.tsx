import { fetchSuccessStories } from "@/src/lib/contentful/success-stories";
import HeroBanner from "@/src/components/sections/resources/success-stories/HeroBanner";
import IconCards from "@/src/components/sections/resources/success-stories/IconCards";
import FeaturedStories from "@/src/components/sections/resources/success-stories/FeaturedStories";
import ContactSection3D from "@/src/components/ui/modal/contact-cta";



export default async  function SuccessStoriesPage() {
    const data = await fetchSuccessStories();
  return (
   <>
      <HeroBanner />
      <IconCards/>
      <FeaturedStories caseStudies={data.caseStudies} />
      <ContactSection3D/>
   </>
  );
}


// app/webinars/page.tsx

import BlogSection from "@/src/components/sections/resources/our-webinars/BlogSection";
import CommunityCTA from "@/src/components/sections/resources/our-webinars/CommunityCTA";
import FAQSection from "@/src/components/sections/resources/our-webinars/FAQSection";
import HeroSection from "@/src/components/sections/resources/our-webinars/HeroSection";
import SpeakersSection from "@/src/components/sections/resources/our-webinars/SpeakersSection";
import VideoShowcase from "@/src/components/sections/resources/our-webinars/VideoShowcase";
import WhoWeAreSection from "@/src/components/sections/resources/our-webinars/WhoWeAreSection";
import { fetchBlogs } from "@/src/lib/contentful/our-webinar-blog";


export default async function WebinarsPage() {
   const { blogs } = await fetchBlogs();

  return <>
  <HeroSection />;
  <VideoShowcase/>
  <WhoWeAreSection/>
  <SpeakersSection/>
  <CommunityCTA/>
  <BlogSection blogs={blogs} />
  <FAQSection/>
  </>
  
}

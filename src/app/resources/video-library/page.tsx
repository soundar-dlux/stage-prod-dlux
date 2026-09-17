import AprimoDam from "@/src/components/sections/resources/video-library/AprimoDam";
import CEOvideo from "@/src/components/sections/resources/video-library/CEOvideos";
import ClientLogos from "@/src/components/sections/resources/video-library/ClientLogos";
import DigitalCommerce from "@/src/components/sections/resources/video-library/DigitalCommerce";
import HeroBanner from "@/src/components/sections/resources/video-library/HeroBanner";
import Salesforce from "@/src/components/sections/resources/video-library/Salesforce";
import Testimonials from "@/src/components/sections/resources/video-library/Testimonials";
import WorkflowAutomation from "@/src/components/sections/resources/video-library/WorkflowAutomation";
import VideoLibraryCTA from "@/src/components/sections/resources/video-library/VideoLibraryCTA";


export default function VideoLibraryPage() {
  return (
    <>
    <HeroBanner/>
   <ClientLogos/>   
   <Testimonials/>
   <CEOvideo/>
  <WorkflowAutomation/>
   <DigitalCommerce/>
   <AprimoDam/>
   <Salesforce/>
   <VideoLibraryCTA/>
   
    </>
   
  );
}
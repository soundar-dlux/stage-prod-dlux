import type { Metadata } from "next";
import Banner from "@/src/components/sections/platform/adobe/workfront-fusion/banner";
import FusionHealthCheckCTA from "@/src/components/sections/platform/adobe/workfront-fusion/FusionHealthCheckCTA";
import FusionPlaybookSection from "@/src/components/sections/platform/adobe/workfront-fusion/FusionPlaybookSection";
import FusionTestimonialsSection from "@/src/components/sections/platform/adobe/workfront-fusion/FusionTestimonialsSection";
import FusionTrainingAndBlogsSection from "@/src/components/sections/platform/adobe/workfront-fusion/FusionTrainingAndBlogsSection";
import FusionVideoShowcase from "@/src/components/sections/platform/adobe/workfront-fusion/FusionVideoShowcase";
import ImageLeft from "@/src/components/sections/platform/adobe/workfront-fusion/ImageLeft";
import { fetchWorkfrontFusion } from "@/src/lib/contentful/workfrontfusion";
import ContactSection3D from "@/src/components/ui/modal/contact-cta";

export const metadata: Metadata = {
  title: "Adobe Workfront Fusion Solutions | Workflow Automation | DLUX",
  description:
    "Accelerate automation with Adobe Workfront Fusion by DLUX. Connect systems, streamline workflows, and deliver seamless operational efficiency across marketing and enterprise teams.",
};

export default async function AdobeWorkFrontFusion() {
  const data = await fetchWorkfrontFusion();
  if (!data) return null;

  const fusionData = data.fusionData1;

  return (
    <main className="overflow-hidden">
      <Banner
        banner={fusionData.bannersection}
        eqiqImagesCollection={fusionData.eqiqImagesCollection.items}
      />

      <ImageLeft
        imageLeft={fusionData.imageLeft}
        content1="Connect. Automate. Deliver with Fusion"
        content2="Seamless Workflow Connections"
      />

      <FusionPlaybookSection
        playBook={fusionData.playBookCollection?.items || []}
        dlux="DLUX"
        dluxplaybook="Playbook"
      />

      <FusionVideoShowcase
        fusionStaticVideos={data.fusionData2.fusionstaticvideosCollection.items}
        fusionStaticThumbmail={
          data.fusionData2.fusionStaticThumbmailCollection.items
        }
        fusionVideos={data.fusionData2.fusionVideosCollection.items}
        fusionVideosThumbmail={
          data.fusionData2.fusionVideosThumbmailCollection.items
        }
        fusionStaticContent={data.fusionData2.fusionVideosDescription}
      />

      <FusionTestimonialsSection
        clientSaying={fusionData.clientSayingCollection.items}
      />

      <FusionTrainingAndBlogsSection
        blogSection={fusionData.blogSectionCollection.items}
        blogTitle="Training & News"
        blogDescription="Latest blogs, updates, and learning resources from DLUX EQIQ."
        eqiqImagesCollection={fusionData.eqiqImagesCollection.items}
      />

<ContactSection3D />
    </main>
  );
}

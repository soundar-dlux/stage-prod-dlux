import { fetchDigitalMartechPage } from "@/src/lib/contentful/digital-martech-consulting";
import HeroSection from "@/src/components/sections/digital-martech-consulting/HeroSection";
import StackSection from "@/src/components/sections/digital-martech-consulting/StackSection";
import StandToGainSection from "@/src/components/sections/digital-martech-consulting/StandToGainSection";
import StandToGainProgressSection from "@/src/components/sections/digital-martech-consulting/StandToGainSection";
import ProcessSection from "@/src/components/sections/digital-martech-consulting/ProcessSection";
import ServiceIntroSection from "@/src/components/sections/digital-martech-consulting/ServiceIntroSection";
import ContactSection3D from "@/src/components/ui/modal/contact-cta";

export const metadata = {
  title: "Digital & MarTech Consulting | DLUX",
  description:
    "Lead the evolution of MarTech excellence with DLUX. Enhance your marketing strategies with personalized AI solutions.",
};

export default async function DigitalMartechConsultingPage() {
  const data = await fetchDigitalMartechPage();
const processImages =
  data.DigitalPage_BusinessProcessOptimizationServices
    .dluxServiceImageManyCollection?.items ?? [];
    
  return (
    <>
      <HeroSection
        heading={data.dluxServiceMainPage.dluxServiceHeading}
        image={data.dluxServiceMainPage.dluxServiceImage!.url}
      />
      <ServiceIntroSection/>

<StackSection
  heading="Stack your wins with MarTech - it's the way to go!"
  description="With the right MarTech solutions, you can streamline your operations,
enhance your marketing efforts, and deliver exceptional experiences that
captivate your target audience and create new KPIs for success."
  vector1="https://images.ctfassets.net/xxxx/Group-1038.png"
  vector2="https://images.ctfassets.net/xxxx/Rectangle-644.png"
  vector3="https://images.ctfassets.net/xxxx/Group-1037.png"
  stacks={[
    {
      title: "DataIKU",
      items: ["DSS"],
    },
    {
      title: "Adobe",
      items: ["Workfront", "AEM"],
    },
    {
      title: "Aprimo",
      items: ["DAM", "Content Management"],
    },
    {
      title: "Salesforce",
      items: [
        "Sales cloud",
        "B2C & B2B Cloud",
        "Service & Commerce Cloud",
      ],
    },
  ]}
/>
<StandToGainProgressSection
  heading={data.DigitalPage_Whatdoyoustandtogain.dluxServiceHeading}
  steps={[
    {
      title: "Streamlined Marketing Journey",
      description:
        "From manual toil to data-driven agility! Set out on a path to enhanced efficiency with MarTech as your guide. Navigate the intricacies of business landscapes with ease, fueled by seamless collaboration across marketing operations. This strategic synergy empowers your team to execute dynamic marketing strategies confidently, leaving behind the noise and uncertainty.",
      image:
        data.DigitalPage_Whatdoyoustandtogain
          .dluxServiceImageManyCollection?.items?.[0]?.url ?? "",
    },
    {
      title: "Your Strategic Roadmap Partners",
      description:
        "We believe that every successful business starts with a clear sense of purpose. That's why we're dedicated to helping you craft a strategy that fosters seamless collaboration within your team and drives continuous improvement in your performance metrics. Let's work together to identify your driving force and unite your team to bring your vision to fruition.",
      image:
        data.DigitalPage_Whatdoyoustandtogain
          .dluxServiceImageManyCollection?.items?.[1]?.url ?? "",
    },
    {
      title: "Implementation, Integration & Development",
      description:
        "DLUX seamlessly integrates Adobe products with cutting -edge iPaaS (Integration-Platform-as-a-Service) solutions.Our personalized approach streamlines operations, boosts productivity, and cuts inefficiencies through automation. With expert guidance, we identify optimal integrations and essential stakeholders. Let DLUX empower your organization in today's digital landscape.",
      image:
        data.DigitalPage_Whatdoyoustandtogain
          .dluxServiceImageManyCollection?.items?.[2]?.url ?? "",
    },
    {
      title: "Analytics-Driven Business Intelligence",
      description:
        "Specializing in BI strategy, data warehousing, and integration with Adobe Workfront, we ensure clarity on key metrics through expert data strategy and modeling. Our advanced extraction capabilities enable dynamic reporting by merging Workfront data with others. With impactful visualizations in Tableau, PowerBI, and Adobe Analytics, DLUX empower clients for operational excellence through informed decision-making.",
      image:
        data.DigitalPage_Whatdoyoustandtogain
          .dluxServiceImageManyCollection?.items?.[3]?.url ?? "",
    },
  ]}
/>


<ProcessSection
  heading={
    data.DigitalPage_BusinessProcessOptimizationServices.dluxServiceHeading
  }
  steps={[
    {
      title: "Comprehensive Understanding",
      description:
        "Gain deep insights into your marketing operations, setting the stage for process improvements and tech advances.",
      image: processImages[0]?.url ?? "",
    },
    {
      title: "Process Revamps",
      description:
        "Implement strategic process revamps tailored to your organization's unique needs, driving efficiency and effectiveness.",
      image: processImages[1]?.url ?? "",
    },
    {
      title: "Technology Upgrades",
      description:
        "Leverage cutting-edge technology upgrades to enhance your operational capabilities and stay ahead of the competition.",
      image: processImages[2]?.url ?? "",
    },
  ]}
  videoUrl={processImages[3]?.url ?? ""}
/>
<ContactSection3D/>
    </>
  );
}

import HeroSection from "@/src/components/sections/content-management-dam/HeroSection";
import ContentIntroSection from "@/src/components/sections/content-management-dam/ContentIntroSection";
import OneStopSection from "@/src/components/sections/content-management-dam/OneStopSection";
import OurServicesSection from "@/src/components/sections/content-management-dam/OurServicesSection";
import { getContentManagementDAM } from "@/src/lib/contentful/content-management-dam";
import KeyFeaturesSection from "@/src/components/sections/content-management-dam/KeyFeaturesSection";
import WhyChooseDluxSection from "@/src/components/sections/content-management-dam/WhyChooseDluxSection";
import ContactSection3D from "@/src/components/ui/modal/contact-cta";

export default async function ContentManagementDAMPage() {
  const data = await getContentManagementDAM();

  if (!data?.hero || !data?.contentAndDam) {
    throw new Error("Content Management DAM data missing");
  }

  return (
    <>
      {/* HERO */}
      <HeroSection
        title={data.hero.dluxServiceHeading}
        imageUrl={data.hero.dluxServiceImage?.url}
      />

      {/* CONTENT + DAM */}
      <ContentIntroSection
        title={data.contentAndDam.dluxServiceHeading}
        imageUrl={data.contentAndDam.dluxServiceImage?.url}
        description={`Do you find yourself grappling with disorganized content management, hindering your ability to reach your target audience effectively? Search no more!

DLUX is partnered with Adobe and Aprimo, offering you a seamless solution to centralize the management of all your digital content. Embrace a simplified approach to content creation, organization, and delivery for enhanced efficiency.

We offer a comprehensive solution that fully empowers you to leverage your digital assets.Seamlessly create compelling content, efficiently organize it based on specific criteria, and easily distribute it to your intended audience. Employ the capabilities of our all-encompassing digital content and asset management solution, empowering your team to craft impactful brand experiences like never before. Also, experience a paradigm shift with our content management and digital asset management services, simplifying processes and letting creativity shine in the spotlight without the burden of manual efforts.`}
      />

      {/* ONE STOP */}
      <OneStopSection
        title="DLUX – One-Stop Shop for Your Organization's Digital Assets!"
        description={`We specialize in optimizing your content operations and maximizing the potential of our DAM implementation services. Our edicated team of specialists excels at implementing automation and delivering exceptional content services, ensuring you generate valuable leads and drive substantial sales. Our streamlined approach fosters lead and sales growth and provides significant cost savings. DLUX makes content management tasks a breeze, injecting creativity and transforming them into something extraordinary!

With DLUX, you can ensure your message reaches the right audience and delivers the right impact at the right time. Join us as we venture into the staggering arena of content management!

`}
      />

      {/* OUR SERVICES */}
      <OurServicesSection
        services={[
          {
            icon: data.ourServices?.dluxServiceImageManyCollection?.items?.[0]?.url,
            title: "Seamless Implementation",
            description:
              "Experience a smooth transition into advanced content management and DAM systems. Our team of experts will work closely with you to understand your business goals and optimize your content management and DAM systems, empowering you to efficiently organize, distribute, and track your digital assets.",
          },
          {
            icon: data.ourServices?.dluxServiceImageManyCollection?.items?.[1]?.url,
            title: "Strategic Consulting",
            description:
              "Navigate the complexities of content management with confidence. We provide strategic consulting services to guide your organization in maximizing the benefits of AEM and Aprimo DAM. From optimizing workflows to enhancing collaboration, our consultants are dedicated to elevating your digital content strategies.",
          },
        ]}
      />
      <KeyFeaturesSection
  heading={data.keyFeatures.dluxServiceHeading}
  features={[
    {
      icon:
        data.keyFeatures.dluxServiceImageManyCollection.items[0]?.url,
      title: "Innovation-driven Solutions",
      description:
        "Stay ahead in the digital landscape with DLUX’s innovation-driven solutions. Our partnership ensures your organization is equipped with contemporary tools and strategies to create, organize, and deliver impactful brand experiences.",
    },
    {
      icon:
        data.keyFeatures.dluxServiceImageManyCollection.items[1]?.url,
      title: "Powerhouse Collaboration",
      description:
        "DLUX collaborates with Adobe Experience Manager DAM and Aprimo DAM to create a powerhouse alliance, bringing together cutting-edge technologies to amplify your content management capabilities.",
    },
  ]}
/>
 <WhyChooseDluxSection
        heading={data.whyChooseDlux.dluxServiceHeading}
        videoUrl={data.whyChooseDlux.dluxServiceImage?.url}
        items={[
          {
            icon:
              data.whyChooseDlux.dluxServiceImageManyCollection.items[0]?.url,
            title: "Expertise",
            description:
              "Benefit from our team's expertise in implementing and optimizing Adobe Experience Manager DAM and Aprimo DAM. Our consultants are committed to enhancing your content management journey.",
          },
          {
            icon:
              data.whyChooseDlux.dluxServiceImageManyCollection.items[1]?.url,
            title: "Tailored Solutions",
            description:
              "Recognizing that every organization has unique requirements, DLUX provides tailored solutions that align with your specific goals and challenges.",
          },
          {
            icon:
              data.whyChooseDlux.dluxServiceImageManyCollection.items[2]?.url,
            title: "Future-Ready Approach",
            description:
              "Stay future-ready with DLUX's forward-thinking approach. Our partnership with Adobe Experience Manager DAM and Aprimo DAM ensures preparedness for evolving digital content trends.",
          },
        ]}
      />
      <ContactSection3D/>
    </>
  );
}

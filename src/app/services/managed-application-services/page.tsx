import { fetchManagedApplicationServices } from "@/src/lib/contentful/managed-application-services";
import HeroSection from "@/src/components/sections/managed-application-services/HeroSection";
import ServiceIntroSection from "@/src/components/sections/managed-application-services/ServiceIntroSection";
import AMSReinventedSection from "@/src/components/sections/managed-application-services/AMSReinventedSection";
import OneOfAKindApproachSection from "@/src/components/sections/managed-application-services/OneOfAKindApproachSection";
import ContactSection3D from "@/src/components/ui/modal/contact-cta";

export const metadata = {
  title: "Managed Application Services | Expert Solutions | DLUX",
  description:
    "Optimize performance, reliability, and ROI with DLUX Managed Application Services. End-to-end support across your application lifecycle.",
};

export default async function ManagedApplicationServicesPage() {
  const data = await fetchManagedApplicationServices();
  const amsImages =
    data.ManagedApplicationPage_AMSReinvented.dluxServiceImageManyCollection
      ?.items ?? [];
  const approachImages =
    data.ManageApplicationPage_Our_One_Of_A_KindApproach
      .dluxServiceImageManyCollection?.items ?? [];
  return (
    <>
      {/* HERO SECTION */}
      <HeroSection
        image={data.dluxServiceMainPage.dluxServiceImage?.url ?? ""}
        heading={data.dluxServiceMainPage.dluxServiceHeading}
      />
      <ServiceIntroSection
        image={
          data.ManagedApplicationPage_ManagedApplicationServices
            .dluxServiceImageManyCollection?.items?.[0]?.url ?? ""
        }
        heading={
          data.ManagedApplicationPage_ManagedApplicationServices
            .dluxServiceHeading
        }
        leftText={`Hold on a moment... What makes us break out of the mold of other application management providers? What distinguishes us as the unique trailblazers in the industry?
          
When it comes to services, we go beyond mere management and strive to optimize your ROI in business applications. We focus on enhancing responsiveness and productivity, maximizing your resources for optimal results. Our team goes above and beyond by reimagining and using workflow automation to manage your most important business applications.`}
        rightText={`Have you encountered a situation where handling business applications gets complex? Is a bug putting your entire team at risk? Here is where Managed Application Services (AMS) stands as a lifesaver whenever your IT team has lots to get on with. DLUX offers advisory-led Application Managed Services to address organizations' challenges in managing applications throughout their lifecycle.

We have dedicated, certified experts who specialize in maintaining and understanding your applications. Our approach assesses your organization's capabilities and personalizes services to meet your unique business needs. With our expertise and support, you can navigate custom and business application complexities effortlessly, and ensure maximum value and ROI from your applications.

From strategic planning and smooth deployment to continuous maintenance and steadfast support, we manage every stage of your business's application lifecycle. When the need arises in work management, we move quickly to ensure a fluid flow that seamlessly incorporates upgrades and changes into the framework of your organization.

Our expert team collaborates closely with yours to design, build, and configure custom-tailored solutions that integrate seamlessly with your existing infrastructure. With rigorous testing and proven deployment strategies, we ensure a smooth transition and a flawless user experience. We also continuously monitor and optimize your application for peak performance, security, and alignment with your evolving needs. Trust us to handle every detail so you may zero in on your company's success.`}
      />
      <AMSReinventedSection
        heading={data.ManagedApplicationPage_AMSReinvented.dluxServiceHeading}
        features={[
          {
            title: "Data Management",
            description:
              "We meticulously manage your application data journey. From the initial import/export process to nurturing it with thorough data cleansing, we ensure every bit is carefully archived, stored, and safeguarded for the long haul. Your data's security and integrity are our top priorities, guaranteeing its resilience and reliability as your organization evolves.",
            image: amsImages[0]?.url ?? "",
          },
          {
            title: "Application Performance & Management",
            description:
              "We're a diverse team of experts passionate about optimizing your applications for seamless efficiency. With our expertise, you can trust your applications to work like clockwork without hiccups or slowdowns.We prioritize enhancing performance and user experience, exceeding your expectations as your business expands.",
            image: amsImages[1]?.url ?? "",
          },
          {
            title: "Upgrades & Patching Best Practices",
            description:
              "Stay ahead of the curve with our seamless application upgrade and patching services. Our experts will ensure your applications are always up-to-date with the newest features, enhancements,and security patches to mitigate risks and maintain compliance. Let us take care of the technical complexities so you can fully refocus on fostering innovation and accomplishing your company's objectives.",
            image: amsImages[2]?.url ?? "",
          },
          {
            title: "User-Focused Monitoring Systems",
            description:
              "We oversee the entire development cycle, from testing to production. Our team delves into SQL databases, extracting insights to optimize performance. We're not just about, numbers; we care about your application's ecosystem., With meticulous tracking of metrics, we ensure smooth, operations and readiness for any challenge. Consider us your partners, committed to your success every step of the way.",
            image: amsImages[3]?.url ?? "",
          },
        ]}
      />
      <OneOfAKindApproachSection
        heading={
          data.ManageApplicationPage_Our_One_Of_A_KindApproach
            .dluxServiceHeading
        }
        steps={[
          {
            title: "Effective application management services",
            description:
              "DLUX manages your business applications for peak performance, ensuring smooth operation and efficiency.",
            image: approachImages[0]?.url ?? "",
          },
          {
            title: "Monitoring and troubleshooting",
            description:
              "We proactively monitor and troubleshoot applications to prevent disruptions before they impact your business.",
            image: approachImages[1]?.url ?? "",
          },
          {
            title: "Robust technical support team",
            description:
              "Our skilled team optimizes, upgrades, and troubleshoots applications to boost system performance.",
            image: approachImages[2]?.url ?? "",
          },
        ]}
        videoUrl={approachImages[3]?.url ?? ""}
      />
      <ContactSection3D/>
    </>
  );
}

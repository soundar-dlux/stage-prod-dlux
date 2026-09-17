// app/services/training-change-management/page.tsx

import FutureReadyWorkforceSection from "@/src/components/sections/training-change-management/FutureReadyWorkforceSection";
import HeroSection from "@/src/components/sections/training-change-management/HeroSection";
import ServiceIntroSection from "@/src/components/sections/training-change-management/ServiceIntroSection";
import WhyChooseDLUXSection from "@/src/components/sections/training-change-management/WhyChooseSection";
import ContactSection3D from "@/src/components/ui/modal/contact-cta";
import { getTrainingChangeManagement } from "@/src/lib/contentful/training-change-management";

export default async function TrainingChangeManagementPage() {
  // ✅ Fetch data on the server
  const page = await getTrainingChangeManagement();
    const whyChoose =
    page.Traning_changePage_WhyChooseDLUX;
 const workforce =
    page.Traning_ChangePage_BuildingaFutureReadyWorkforce;
  const serviceBlock = page.Traning_ChangePage_TrainingandChangeManagement;
  return (
    <>
      <HeroSection
        title={page.dluxServiceMainPage.dluxServiceHeading}
        imageUrl={
          page.dluxServiceMainPage.dluxServiceImageManyCollection?.items?.[0]
            ?.url ?? ""
        }
      />
      <ServiceIntroSection
        heading={serviceBlock.dluxServiceHeading}
        imageUrl={serviceBlock.dluxServiceImage?.url}
        leftDescription={
          "As a top MarTech business consultant and an Adobe Bronze Solution Partner, we can help maximize the value of Adobe products and ensure the company maintains its competitiveness in the quickly changing marketing technology industry. We guarantee this through effective training and change management."
        }
        rightDescription={`Change is a governing factor driving companies to navigate and adapt to changing market dynamics.

At various junctures, businesses must adjust their operations to align with the ever-evolving MarTech landscape to reach the company's goals and objectives.

Our team is well equipped with the latest insights, best practices, and industry trends. With training programs, we enable your team to welcome the change confidently, and our tailored strategy ensures that the guidance and assistance you get are in line with your aims and objectives.

The purpose of change management is to cultivate innovation in technologies, workflows, and strategic approaches, propelling the organization to move up a gear from its current state to a desired future state.`}
      />
            <FutureReadyWorkforceSection
        heading={workforce.dluxServiceHeading}
        items={[
          {
            title: "Fostering Adaptability",
            description: `Employees who undergo extensive training and receive change management support are better equipped to adapt swiftly to changes, boosting efficiency faster.

This flexibility promotes a constant improvement culture, enabling the workforce to stay ahead of challenges and seize growth opportunities.`,
            imageUrl:
              workforce.dluxServiceImageManyCollection?.items?.[0]?.url,
          },
          {
            title: "Empowering Leaders Through Training",
            description: `Training sessions cultivate empowering leaders within your team and equip them with skills essential for effective change management.

The ability to understand and communicate information gained through training increases their capacity to guide team members, ensuring a flawless transition during periods of change.`,
            imageUrl:
              workforce.dluxServiceImageManyCollection?.items?.[1]?.url,
          },
          {
            title: "Encouraging Resilience and Productivity",
            description: `Efficient change management can uplift spirits and enhance productivity, fostering a positive outlook among teams toward marketing evolution.

This optimistic perspective strengthens resilience and motivates active participation, eventually pulling the organization closer to reaching its objectives.`,
            imageUrl:
              workforce.dluxServiceImageManyCollection?.items?.[2]?.url,
          },
        ]}
      />
  <WhyChooseDLUXSection
        heading={whyChoose.dluxServiceHeading}
        items={[
          {
            title: "Cutting-Edge DL Technology",
            description:
              "Cutting-edge Deep Learning technology for adaptive and personalized training experiences.",
            iconUrl:
              whyChoose.dluxServiceImageManyCollection?.items?.[0]?.url,
          },
          {
            title: "Seamless Change Integration",
            description:
              "Seamlessly integrates with change management processes, facilitating smooth transitions and targeted skill development.",
            iconUrl:
              whyChoose.dluxServiceImageManyCollection?.items?.[1]?.url,
          },
          {
            title: "Data-Driven Improvement",
            description:
              "Detailed analytics for continuous optimization of training strategies, ensuring effective employee development and organizational growth.",
            iconUrl:
              whyChoose.dluxServiceImageManyCollection?.items?.[2]?.url,
          },
        ]}
        videoUrl={
          whyChoose.dluxServiceImageManyCollection?.items?.[3]?.url
        }
      />
      <ContactSection3D/>
    </>
  );
}

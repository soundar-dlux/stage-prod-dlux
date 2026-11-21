import React from "react";
import ServiceProcess, {
  ProcessStep,
} from "@/src/components/WB-Component/Section/ServiceProcess";
import HorizontalLine from "@/src/components/WB-Component/Line/HorizontalLine";

const bynderProcessSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    subtitle: "strategy, workflows and metadata.",
    description:
      "We map how content moves through your organization today, then design approval processes, asset lifecycles and taxonomies that balance global brand standards with local market needs.",
  },
  {
    number: "02",
    title: "Design",
    subtitle: "Bynder modules and governance.",
    description:
      "We configure the Bynder modules you are licensed for, set up role-based access for each team, and align the setup with your privacy, security and data-residency requirements. Configuration supports compliance, though it does not guarantee it on its own.",
  },
  {
    number: "03",
    title: "Deliver",
    subtitle: "migration and integration.",
    description:
      "We migrate your existing assets and metadata into Bynder and connect it to the tools your teams already use, through marketplace connectors or custom integrations.",
  },
  {
    number: "04",
    title: "Optimize",
    subtitle: "adoption and continuous improvement.",
    description:
      "A DAM only delivers value when people use it well, so we train each team, review usage after go-live, and refine the setup as your needs grow.",
  },
];

export default function BynderServicesSection() {
 return (
  <>
    <ServiceProcess
      highlightText="DLUX"
      title="+ Bynder Services"
      description="DLUX helps organizations shape their DAM around their business goals, brand standards and existing ways of working. We follow a four-stage approach, Discover, Design, Deliver and Optimize, so that every decision about the platform traces back to how your teams need to work."
      steps={bynderProcessSteps}
      imageSrc="https://images.ctfassets.net/pj0maraabon4/6AOKsOk9Ynd1L2jIBlLyZQ/253d1cec53705c18fa8d8508100b2d65/Four-Stage_Orange_Workflow_Infographic-Photoroom_1.svg"
      imageAlt="DLUX + Bynder 4-stage services approach: Discover, Design, Deliver, and Optimize"
    />
 
  </>
);
}


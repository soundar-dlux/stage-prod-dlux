"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Workflow,
  Settings,
  Shield,
  Users,
  LucideIcon,
} from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type ServiceCardProps = {
  service: Service;
  index: number;
  isInView: boolean;
};

function ServiceCard({
  service,
  index,
  isInView,
}: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#FF3901]/40 hover:bg-white/[0.05]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF3901]/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF3901] to-[#F07800] shadow-lg shadow-[#FF3901]/20">
          <Icon className="h-8 w-8 text-white" />
        </div>

        <h3 className="mb-4 text-2xl font-semibold text-white">
          {service.title}
        </h3>

        <p className="text-base leading-7 text-gray-400">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  const services: Service[] = [
    {
      icon: Workflow,
      title: "Branded Workflows",
      description:
        "Designs branded workflows, approval processes, and metadata schemes aligned with your global standards and tailored to local markets. ",
    },
    {
      icon: Settings,
      title: "Module Configuration",
      description:
        "Configures key Bynder modules: Bynder Studio, AI Agents, Asset Workflow, CX Omnichannel, and Analytics - maximizing efficiency and asset utilization.",
    },
    {
      icon: Shield,
      title: "Secure Integration",
      description:
        "Integrates DAM securely within your MarTech ecosystem, providing role-based access, sharing controls, and compliance with data residency and privacy regulations, including GDPR, SOC 2, and ISO standards. ",
    },
    {
      icon: Users,
      title: "User Adoption",
      description:
        "Delivers on comprehensive onboarding and user adoption programs across marketing, creative, legal, and operational teams. ",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-8 lg:py-14"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#FF3901]/5 to-black" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mb-6 text-4xl font-bold md:leading-tight text-white md:text-5xl"
          >
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              DLUX + Bynder
            </span>{" "}<br/>
            Consulting Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-lg leading-8 text-gray-400 md:text-xl"
          >
            Our DAM expertise ensures your organization benefits from
            optimized workflows, secure integrations, and strong user
            adoption.
          </motion.p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}



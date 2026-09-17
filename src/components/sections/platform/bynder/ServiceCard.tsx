"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

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

export default function ServiceCard({
  service,
  index,
  isInView,
}: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FF3901]/20 to-[#F07800]/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 group-hover:border-[#FF3901]/50">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF3901] to-[#F07800]"
        >
          <Icon className="h-7 w-7 text-white" />
        </motion.div>

        <h3 className="mb-4 text-2xl font-bold text-white">
          {service.title}
        </h3>

        <p className="leading-relaxed text-gray-400">
          {service.description}
        </p>

        <motion.div
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          className="absolute bottom-0 left-0 h-1 rounded-full bg-gradient-to-r from-[#FF3901] to-[#F07800]"
        />
      </div>
    </motion.div>
  );
}
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type ServiceItem = {
  icon: string;
  title: string;
  description: string;
};

type OurServicesSectionProps = {
  services: ServiceItem[];
};

export default function OurServicesSection({
  services,
}: OurServicesSectionProps) {
  return (
    <section className="relative overflow-hidden bg-black py-8 lg:py-10 text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[320px] h-[320px] bg-[#FF3901]/10 blur-[130px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-[#F07800]/10 blur-[140px] rounded-full" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-14 lg:mb-20 text-center"
        >
          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            <span className="text-white">Our </span>
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Services
            </span>
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-white/60 text-base sm:text-lg leading-8">
            We provide scalable, future-ready solutions designed to help your
            business move faster, work smarter, and grow with confidence.
          </p>
        </motion.div>

        {/* Services Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-2xl transition-all duration-500 hover:border-[#FF3901]/40 hover:bg-white/10 hover:shadow-[0_20px_60px_rgba(255,57,1,0.12)]"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-[#FF3901]/20 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[180px] h-[180px] bg-[#F07800]/15 blur-[100px] rounded-full" />
              </div>

              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 h-[4px] w-0 bg-gradient-to-r from-[#F07800] to-[#FF3901] transition-all duration-500 group-hover:w-full" />

              <div className="relative z-10 p-7 md:p-8 lg:p-10">
                {/* Top Row */}
                <div className="flex items-start justify-between gap-4 mb-8">
                  {/* Icon Box */}
                  <div className="relative flex items-center justify-center w-[78px] h-[78px] rounded-[24px] border border-[#FF3901]/20 bg-gradient-to-br from-[#FF3901]/15 to-[#F07800]/10 backdrop-blur-md shadow-[0_10px_30px_rgba(255,57,1,0.12)]">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-contain"
                    />
                  </div>

                  {/* Number Badge */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white/40 font-semibold text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                    {service.title}
                  </h3>

                  <p className="text-sm sm:text-base md:text-lg leading-7 text-white/65">
                    {service.description}
                  </p>
                </div>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
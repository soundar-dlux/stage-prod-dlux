"use client";

import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import SectionBadge from "../../ui/SectionBadge";

interface IconSet {
  icon1: StaticImageData;
  icon2: StaticImageData;
  icon3: StaticImageData;
  icon4: StaticImageData;
  icon5: StaticImageData;
  icon6: StaticImageData;
  icon7: StaticImageData;
  icon8: StaticImageData;
}

interface FeatureItem {
  icon: StaticImageData;
  title: string;
  description: string;
}

export default function DluxWorkfrontSection({
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon8,
}: IconSet) {
  const featuresRow1: FeatureItem[] = [
    {
      icon: icon1,
      title: "Service Breakdown",
      description:
        "Standby traffic management, basic troubleshooting, issue resolution, and new module implementation within the allocated hours.",
    },
    {
      icon: icon2,
      title: "Local Adobe Collaboration",
      description:
        "Managing relationships for swift resolutions and updates with local Adobe teams.",
    },
  ];

  const featuresRow2: FeatureItem[] = [
    {
      icon: icon3,
      title: "Training and Upskilling",
      description:
        "Offering refresher training or upskilling sessions for the team.",
    },
    {
      icon: icon4,
      title: "Expert Team Support",
      description:
        "Constant support with standby Traffic Manager and backup Admin.",
    },
    {
      icon: icon5,
      title: "Handholding / Adoption support",
      description:
        "Your virtual deskside assistant, ready to answer your questions and provide assistance via chat and email support.",
    },
  ];

  const featuresRow3: FeatureItem[] = [
    {
      icon: icon6,
      title: "Migration Services",
      description:
        "Offering migration services for Workfront Proof HQ discontinuation.",
    },
    {
      icon: icon7,
      title: "Integration Services",
      description:
        "Eliminate manual work and connect Workfront to your existing tools for seamless data flow and streamlined workflows.",
    },
    {
      icon: icon8,
      title: "Security and Compliance",
      description:
        "Regular security assessments and penetration testing ensure your Adobe Workfront meets industry standards and safeguards your data.",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative overflow-hidden py-8 lg:py-10 px-6"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0d0d0d] to-black" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-orange-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-orange-600/10 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-14 lg:mb-20"
        >
          
           <SectionBadge
                  label=" Premium Support Services"
                  iconSrc="https://images.ctfassets.net/pj0maraabon4/4WH6837PWmPPMC4GKpyDbY/1a3fbb4bb45e6b9490e97039d47de480/dlux-dark-logo-subtitle.svg"
                  iconAlt="Star Icon"
                />

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mt-5">
            <span className="text-white">DLUX + </span>
            <span className="bg-gradient-to-r from-brand-gradientFrom  to-brand-gradientTo bg-clip-text text-transparent">
              Workfront
            </span>
          </h1>

          <p className="text-white/60 text-base sm:text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            Let our experts help you maximize your Adobe Workfront investment
            with dedicated support, automation, training, and enterprise-grade
            services.
          </p>
        </motion.div>

        {/* Top Intro + Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[28px] border border-orange-500/20 bg-white/5 backdrop-blur-xl p-8 lg:p-10 flex flex-col justify-between min-h-[320px]"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 blur-[80px] rounded-full" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-orange-500/20">
                +
              </div>

              <h2 className="mt-8 text-2xl lg:text-3xl font-bold text-white leading-snug">
                Let Our Experts Help You Increase Your Adobe Investment Returns
              </h2>

              <p className="mt-5 text-white/60 leading-relaxed text-[15px]">
                From troubleshooting and migrations to integrations and
                enterprise support, we ensure your team gets the most out of
                Adobe Workfront.
              </p>
            </div>

            <div className="relative z-10 mt-8 flex items-center gap-3">
              <div className="w-10 h-[2px] bg-orange-500 rounded-full" />
              <span className="text-orange-300 text-sm font-medium tracking-[2px] uppercase">
                Enterprise Ready
              </span>
            </div>
          </motion.div>

          {featuresRow1.map((item, index) => (
            <FeatureCard key={index} delay={index * 0.2} {...item} />
          ))}
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {featuresRow2.map((item, index) => (
            <FeatureCard key={index} delay={index * 0.2} {...item} />
          ))}
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuresRow3.map((item, index) => (
            <FeatureCard key={index} delay={index * 0.2} {...item} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/* ---------------- CARD ---------------- */
function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
}: FeatureItem & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -10 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-7 lg:p-8 min-h-[280px] transition-all duration-500 hover:border-brand-primary/40 hover:bg-white/10"
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Top line */}
      <div className="absolute top-0 left-0 h-[3px] w-0 bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo transition-all duration-500 group-hover:w-full" />

      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/15 to-orange-700/5 backdrop-blur-md flex items-center justify-center mb-6">
          <Image
            src={icon}
            alt={title}
            className="w-8 h-8 object-contain"
          />
        </div>

        <h3 className="text-[20px] sm:text-[22px] font-bold text-white mb-4 leading-snug">
          {title}
        </h3>

        <p className="text-[14px] sm:text-[15px] leading-[28px] text-white/65">
          {description}
        </p>

        {/* <div className="mt-8 flex items-center gap-2 text-orange-300 text-sm font-medium tracking-wide">
          <span>Learn More</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div> */}
      </div>
    </motion.div>
  );
}
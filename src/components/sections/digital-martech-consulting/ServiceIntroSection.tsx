"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  Zap,
  Target,
  BarChart3,
  Workflow,
} from "lucide-react";
import SectionBadge from "../../ui/SectionBadge";
import Link from "next/link";
import PrimaryButton from "../../ui/Buttons/PrimaryButton";

export default function ServiceIntroSection() {
  const features = [
    {
      icon: Workflow,
      title: "Streamline Your Workflow",
      description: "From disorganization to seamless outcomes",
    },
    {
      icon: Zap,
      title: "Real-Time Agility",
      description: "Optimize technology for maximum ROI",
    },
    {
      icon: Target,
      title: "Strategic Management",
      description: "Every dollar fuels your growth",
    },
    {
      icon: BarChart3,
      title: "Integrated Ecosystem",
      description: "Seamlessly connected MarTech tools",
    },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/3 -left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "#FF3901", opacity: 0.15 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 -right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "#F07800", opacity: 0.15 }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "#FF3901", opacity: 0.1 }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] sm:bg-[size:3rem_3rem] md:bg-[size:4rem_4rem]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
           <SectionBadge
                      label="MarTech Excellence"
                      iconSrc="https://images.ctfassets.net/pj0maraabon4/28ATinJOjDLVX2WIv8ewsz/5701a5a23309328dd0436678f1f92603/46b95943c3053783fc289bf504656384e8a8c95d.png"
                      iconAlt="AI Icon"
                    />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold my-7  text-white"
            
          >
            <span className="bg-clip-text text-transparent" style={{
              backgroundImage:
                "linear-gradient(to right, #F07800, #FF3901)",
            }}> Digital and MarTech</span> Consulting
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed px-2"
            style={{ color: "rgba(255, 255, 255, 0.8)" }}
          >
            Are your marketing measures creating a disorienting loop? No hassle!
            DLUX has got your back. We dedicate ourselves to aligning with your
            needs, understanding your challenges, and addressing your pain.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 mb-16 sm:mb-20">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-start gap-3 sm:gap-4 mb-4">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom right, #FF3901, #F07800)",
                  }}
                >
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mt-1">
                  Streamlined Path to Success
                </h3>
              </div>
              <p
                className="leading-relaxed text-sm sm:text-base"
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                Our commitment is to streamline your path from disorganization
                to a track record of seamless outcomes. We help you create,
                automate, track, and enhance your work management. Through our
                MarTech consulting services, we ensure that every step of your
                journey towards efficiency is guided with expertise and
                precision.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-start gap-3 sm:gap-4 mb-4">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom right, #F07800, #FF3901)",
                  }}
                >
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mt-1">
                  Maximized ROI
                </h3>
              </div>
              <p
                className="leading-relaxed text-sm sm:text-base"
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                Don't let your marketing strategy sit on the shelf! We optimize
                your marketing technology investments for real-time agility and
                maximized ROI. Our team becomes your trusted partner,
                strategically managing your budget to ensure every dollar fuels
                your growth and accelerates goal achievement.
              </p>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-start gap-3 sm:gap-4 mb-4">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom right, #FF3901, #F07800)",
                  }}
                >
                  <Workflow className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mt-1">
                  Unified Digital Ecosystem
                </h3>
              </div>
              <p
                className="leading-relaxed text-sm sm:text-base"
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                We guarantee a single digital ecosystem that seamlessly
                integrates different MarTech tools using precise engineering for
                the streamlined and effective functioning of your workflow.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-start gap-3 sm:gap-4 mb-4">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom right, #F07800, #FF3901)",
                  }}
                >
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mt-1">
                  Expert Solutions
                </h3>
              </div>
              <p
                className="leading-relaxed text-sm sm:text-base"
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                We are a team of seasoned professionals providing precise
                solutions into your unique needs. By utilizing leading-edge
                MarTech integration, we reinforce our efforts, promoting an
                organized and effective approach to accomplishing your business
                goals.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              <div
                className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom right, rgba(255, 57, 1, 0.2), rgba(240, 120, 0, 0.2))",
                }}
              />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6 h-full hover:bg-white/10 transition">
                <feature.icon
                  className="w-6 h-6 sm:w-8 sm:h-8 mb-3 sm:mb-4"
                  style={{ color: "#F07800" }}
                />
                <h4 className="text-base sm:text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h4>
                <p
                  className="text-xs sm:text-sm"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                >
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div className="text-center mt-16 sm:mt-20">
         <Link href="/about">
            <PrimaryButton className="px-8 py-3.5 text-sm sm:text-base">
             Get Started Today
            </PrimaryButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
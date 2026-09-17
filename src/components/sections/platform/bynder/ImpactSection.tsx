"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  TrendingUp,
  Boxes,
  Shield,
  Zap,
  Lock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import ImpactNumber from "./ImpactNumber";
import BenefitLine from "./BenefitLine";
import Link from "next/link";

export type Impact = {
  value: string;
  title: string;
  description: string;
};

export default function ImpactSection() {
  const ref = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
  });

  const impacts: Impact[] = [
    {
      value: "70%",
      title: "Reduction in Manual Workload",
      description:
        "AI-assisted automation and workflow orchestration",
    },
    {
      value: "100%",
      title: "Brand Governance",
      description:
        "Every asset aligns with your standards across markets",
    },
    {
      value: "4000+",
      title: "Global Organizations",
      description:
        "Trust Bynder for their digital asset management",
    },
  ];

  const security = [
    "GDPR Compliant",
    "HIPAA Certified",
    "CCPA Ready",
    "ISO Standards",
    "SOC 2 Type II",
    "Enterprise Encryption",
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #FF3901 0%, #F07800 50%, #FF3901 100%)",
          backgroundSize: "200% 100%",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="mb-6 text-4xl font-bold text-white md:text-5xl"
          >
            The{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Business Impact
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-400 md:text-xl"
          >
            With Bynder DAM, your organization can see:
          </motion.p>
        </motion.div>

        <div className="mb-24 grid gap-8 md:grid-cols-3">
          {impacts.map((impact, index) => (
            <ImpactNumber
              key={impact.title}
              impact={impact}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mb-24"
        >
          <div className="grid gap-16 md:grid-cols-2">
            <div className="space-y-8">
              <BenefitLine
                icon={TrendingUp}
                text="Improved brand governance ensuring every asset aligns with your standards across markets without bottlenecks. "
                delay={0.7}
                isInView={isInView}
              />
              
               <BenefitLine
                icon={Boxes}
                text="Increased ROI from reduced asset duplication and enhanced reuse across campaigns and channels. "
                delay={0.8}
                isInView={isInView}
              />
              
             
            </div>

            <div className="space-y-8">
               <BenefitLine
                icon={Zap}
                text="Scalable support for growth, maintaining performance and compliance even at scale. "
                delay={1}
                isInView={isInView}
              />
              {/* <BenefitLine
                icon={Shield}
                text="Enterprise-grade security with encryption, compliant with GDPR, HIPAA, CCPA, and ISO standards. "
                delay={0.9}
                isInView={isInView}
              />
              */}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1 }}
          className="mb-24"
        >
          <h3 className="mb-12 text-center text-3xl font-bold text-white">
            <Lock className="mr-3 inline-block h-8 w-8 text-[#FF3901]" />
            Enterprise-Grade Security
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            {security.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  delay: 1.2 + index * 0.1,
                  type: "spring",
                }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="rounded-full border border-[#FF3901]/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>

        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="relative  text-white bg-gradient-to-r from-brand-primary to-brand-secondary rounded-3xl p-12 text-center overflow-hidden flex justify-center"
        >
          <div className="absolute inset-0 bg-black/20" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl"
          />

          <div className="relative z-10 justify-centre text-center">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className="text-2xl md:text-4xl font-bold mb-4 max-w-2xl"
            >
              Ready to Transform Your Digital Asset Management?
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
              className="text-md md:text-xl mb-8 opacity-90 max-w-2xl"
            >
              Contact DLUX today to future-proof your digital asset management and gain unmatched
              marketing agility with Bynder.
            </motion.p>
          <Link
            href="/contact-us"
            aria-label="Watch overview of our AI and Martech services"
            title="Watch overview"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
          >
            
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 40px rgba(255, 255, 255, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-black rounded-full font-bold md:text-lg inline-flex items-center gap-2"
            >
              Contact DLUX Today
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
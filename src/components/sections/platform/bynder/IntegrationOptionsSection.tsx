
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import WbCard from "@/src/components/WB-Component/Cards/WbCard";

export default function IntegrationOptionsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  });

  const cardBackground =
    "linear-gradient(180deg, #FFFDFB 0%, #FFF9F5 50%, #FFF3EB 100%)";

  const cardClassName =
    "h-full !justify-start !p-7 sm:!p-10 lg:!p-12 hover:shadow-[0_12px_36px_rgba(255,80,13,0.08)]";

  return (
    <section
      ref={sectionRef}
      className="relative bg-[linear-gradient(180.82deg,#FFFFFF_0.71%,#FE3908_1031.19%)] py-16 sm:py-20 lg:py-10"
    >
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8 ">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center sm:mb-16"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-[#111111] sm:text-4xl md:text-5xl">
            Integration{" "}
            <span className="text-[#FF500D]">Options</span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 items-stretch gap-6 sm:gap-8 lg:grid-cols-2">

          {/* Bynder Marketplace */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="h-full"
          >
            <WbCard
              width="100%"
              height="100%"
              borderRadius="28px"
              borderWidth="1px"
              borderColor="gradient"
              cardBackground={cardBackground}
              showDots={false}
              showButton={false}
              paddingTop="36px"
              paddingBottom="36px"
              paddingLeft="36px"
              paddingRight="36px"
              gap="20px"
              className={cardClassName}
              icon={
                <Image
                  src="https://images.ctfassets.net/pj0maraabon4/2wNDZuMC8R77r7EUtOcTLr/3ad71a528e16e64f133bbc20adc0ef49/Layer_1__6_.svg"
                  alt="Bynder Marketplace"
                  width={56}
                  height={56}
                  className="h-12 w-12 object-contain sm:h-14 sm:w-14"
                />
              }
              title="Bynder Marketplace"
              titleClassName="text-xl font-bold text-[#FF500D] sm:text-2xl normal-case tracking-normal"
              description="The Bynder Marketplace lists more than 150 prebuilt integrations, developed by Bynder and its technology partners. These include connectors for Adobe Workfront, Asana, monday.com and Figma, which let teams search for and use approved assets without leaving the tools they work in every day."
              descriptionClassName="mt-2 max-w-none text-[14px] font-normal leading-relaxed text-[#555555] sm:text-[15px]"
            />
          </motion.div>

          {/* Custom Integrations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-full"
          >
            <WbCard
              width="100%"
              height="100%"
              borderRadius="28px"
              borderWidth="1px"
              borderColor="gradient"
              cardBackground={cardBackground}
              showDots={false}
              showButton={false}
              paddingTop="36px"
              paddingBottom="36px"
              paddingLeft="36px"
              paddingRight="36px"
              gap="20px"
              className={cardClassName}
              icon={
                <Image
                  src="https://images.ctfassets.net/pj0maraabon4/7oRxMZKR0ImKF1LWACyMTr/4061eadfa3a60f7139a0eacaed7e68c4/Layer_1__7_.svg"
                  alt="Custom integrations from DLUX"
                  width={56}
                  height={56}
                  className="h-12 w-12 object-contain sm:h-14 sm:w-14"
                />
              }
              title="Custom integrations from DLUX"
              titleClassName="text-xl font-bold text-[#FF500D] sm:text-2xl normal-case tracking-normal"
              description="Where a ready-made connector doesn't exist or doesn't go far enough, we design and build one around your requirements. Our integration approaches for Jira and Wrike, for example, use Bynder's API and event-based triggers to link work items and workflows with Bynder assets and metadata. We can also connect Bynder through integration platforms such as Boomi, as shown in our implementation walkthrough below. For most applications that offer an accessible API, we can scope and build a connection to Bynder."
              descriptionClassName="mt-2 max-w-none text-[14px] font-normal leading-relaxed text-[#555555] sm:text-[15px]"
            />
          </motion.div>

        </div>

        {/* Bottom Information Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex items-start gap-3 px-1 sm:mt-10 sm:px-2"
        >
          <div className="mt-0.5 flex-shrink-0">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border-[1.8px] border-[#FF500D] text-[#FF500D]">
              <span className="text-xs font-bold leading-none">i</span>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-[#555555] sm:text-sm">
            Connector availability, licensing, permissions and
            supported fields vary by account and configuration, so
            we confirm what is possible for your environment during
            the Discover stage.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

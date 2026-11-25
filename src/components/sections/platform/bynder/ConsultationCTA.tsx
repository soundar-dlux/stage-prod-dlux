
"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDownCircle } from "lucide-react";
import PrimaryButton from "@/src/components/WB-Component/Buttons/PrimaryButton";
import Image from "next/image";

export interface AepCtaSectionProps {
  title?: React.ReactNode;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  className?: string;
}

export function ConsultationCTA({
  title = (
    <>
      Let's talk about your{" "}
      <span className="bg-gradient-to-r from-subGradientText-from to-subGradientText-to bg-clip-text text-transparent">
        DAM priorities.</span>
    </>
  ),
  description = "Whether you are evaluating Bynder for the first time or rethinking an existing DAM, an initial conversation with our consultants is the best place to start. We'll look at how content moves through your organization today, where the friction sits, and what a Bynder implementation would need to address. Where it helps, we'll follow up with a demonstration shaped around your own workflows.",
  buttonText = "Request a Consultation",
  buttonHref = "#implementation-guide",
  onButtonClick,
  className = "",
}: AepCtaSectionProps) {
  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else if (buttonHref) {
      window.location.assign(buttonHref);
    }
  };

  return (
    <section className="relative bg-[linear-gradient(182.02deg,#000000_1.7%,#FE3908_221.82%)] p-20 mt-[30px] mb-[30px]">
      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center gap-[10px]">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold tracking-tight text-white lg:leading-tight mb-4"
        >
          {title}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/85 text-sm sm:text-base leading-relaxed max-w-5xl mx-auto mb-6 font-normal text-center"
        >
          {description}
        </motion.p>

        {/* Primary CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-2 flex items-center justify-center"
        >
          <PrimaryButton
            href={buttonHref}
            onClick={handleClick}
            icon={true}
            customIcon={
              <Image
                src="https://images.ctfassets.net/pj0maraabon4/1E9qiHsYodL6QNs5NIVS5R/c1135dc33e6dbcb9a201619ad5f4eb98/Layer_1__10_.svg"
                alt="Arrow"
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
            }
          >
            {buttonText}
          </PrimaryButton>
        </motion.div>
      </div>
    </section>
  );
}

export default ConsultationCTA;

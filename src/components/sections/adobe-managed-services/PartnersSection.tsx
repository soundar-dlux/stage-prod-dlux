"use client";

import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

interface PartnersSectionProps {
  partner1: StaticImageData;
  partner2: StaticImageData;
  partner3: StaticImageData;
}

export default function PartnersSection({
  partner1,
  partner2,
  partner3,
}: PartnersSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="my-10 lg:my-[90px] px-6"
    >
      <div
        className="
          flex flex-col lg:flex-row
          justify-center items-center
          gap-8 md:gap-[50px]
          max-w-6xl mx-auto
        "
      >
        {/* Box 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="
            w-full sm:w-[330px]
            h-[120px] sm:h-[150px]
            rounded-[15px] bg-white
            flex justify-center items-center
            transition-shadow
            hover:shadow-[0_0_20px_5px_rgba(255,255,255,0.8)]
          "
        >
          <Image src={partner2} alt="partner 1" className="max-h-[60px] sm:max-h-[80px] w-60" />
        </motion.div>

        {/* Box 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="
            w-full sm:w-[330px]
            h-[120px] sm:h-[150px]
            rounded-[15px] bg-white
            flex justify-center items-center
            transition-shadow
            hover:shadow-[0_0_20px_5px_rgba(255,255,255,0.8)]
          "
        >
          <Image src={partner1} alt="partner 2" className="max-h-[60px] sm:max-h-[80px] w-60" />
        </motion.div>

        {/* Box 3 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="
            w-full sm:w-[330px]
            h-[120px] sm:h-[150px]
            rounded-[15px] bg-white
            flex justify-center items-center
            transition-shadow
            hover:shadow-[0_0_20px_5px_rgba(255,255,255,0.8)]
          "
        >
          <Image src={partner3} alt="partner 3" className="max-h-[60px] sm:max-h-[80px] w-60" />
        </motion.div>
      </div>
    </motion.section>
  );
}

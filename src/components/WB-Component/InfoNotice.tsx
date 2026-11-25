
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface InfoNoticeProps {
  message: string;
  highlightedText?: string;
  highlightClassName?: string;
  isInView?: boolean;
  className?: string;
}

const InfoNotice = ({
  message,
  highlightedText,
highlightClassName =
  "bg-gradient-to-r from-[#FE780C] to-[#FE3908] bg-clip-text text-transparent font-semibold",  isInView = true,
  className = "",
}: InfoNoticeProps) => {
  const renderMessage = () => {
    if (!highlightedText || !message.includes(highlightedText)) {
      return message;
    }

    const parts = message.split(highlightedText);

    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < parts.length - 1 && (
          <span className={highlightClassName}>
            {highlightedText}
          </span>
        )}
      </span>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`w-full py-[30px] ${className}`}
    >
      <div className="flex w-full items-center justify-start gap-3">

        {/* Information Icon */}
        <Image
          src="https://images.ctfassets.net/pj0maraabon4/7L6TbT32gFmQ9vpvepF8xz/23f2e1b1755690084655406057ed08c3/Layer_1__9_.svg"
          alt="Information"
          width={38}
          height={38}
          className="h-[38px] w-[38px] shrink-0 object-contain"
        />

        {/* Notice Message */}
        <p className="w-full text-left text-base leading-[1.6] text-[#222222]">
          {renderMessage()}
        </p>

      </div>
    </motion.div>
  );
};

export default InfoNotice;

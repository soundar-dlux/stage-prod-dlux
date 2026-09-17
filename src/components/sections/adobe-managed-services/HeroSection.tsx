"use client";

import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import PrimaryButton from "../../ui/Buttons/PrimaryButton";
import SecondaryButton from "../../ui/Buttons/SecondaryButton";

interface HeroSectionProps {
  awmsHeroPrimaryOuter: StaticImageData;
  awmsHeroPrimaryInner: StaticImageData;
  awmsHeroPrimaryImg: StaticImageData;
}

export default function HeroSection({
  awmsHeroPrimaryOuter,
  awmsHeroPrimaryInner,
  awmsHeroPrimaryImg,
}: HeroSectionProps) {
  const handleButtonClick = () => {
    const formUrl =
      "https://forms.zohopublic.in/dluxtech/form/Webform/formperma/Mm_XtA7tFlnwtYUUkLXV7HIr-dQSLYjyNHFHCm_YQK0";

    const width = 700;
    const height = 648;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    window.open(
      formUrl,
      "_blank",
      `width=${width},height=${height},left=${left},top=${top},scrollbars=1,resizable=1`,
    );
  };

  return (
    <section
      className="
      mt-[100px] md:mt-[140px] lg:mt-[150px]
      pb-[50px]
      flex flex-col lg:flex-row
      justify-center items-center
      gap-[60px] md:gap-[100px] lg:gap-[150px]
      px-6 md:px-10 lg:px-0
      text-center lg:text-left
    "
    >
      {/* LEFT CONTENT */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-[700px]"
      >
        {/* DLUX + WORKFRONT BOX */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex justify-center  items-center w-[220px] md:w-[250px] h-[50px] bg-gradient-to-b from-[#333333] to-[#0D0D0D] mx-auto lg:mx-0"
        >
          <h5 className="font-bold text-white text-sm md:text-base">
            DLUX + WORKFRONT
          </h5>
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.5 }}
          className="mt-6"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl leading-[40px] md:leading-[55px] lg:leading-[70px] font-bold text-white">
            Your everyday
          </h1>

          <h1 className="text-[32px] md:text-[45px] lg:text-[55px] leading-[40px] md:leading-[50px] lg:leading-[60px] font-bold bg-gradient-to-r from-[#fe780c] to-[#fe3908] bg-clip-text text-transparent">
            workflow simplified
          </h1>

          <p className="pt-[10px] text-[14px] md:text-[16px] leading-[24px] md:leading-[30px] w-full lg:w-[60%] mx-auto lg:mx-0 text-white">
            Luxman Pai&apos;s strategic finesse &amp; Shantanu Narayen&apos;s
            seasoned leadership teams up for a fresh spin on Adobe&apos;s
            Content Operations!
          </p>
        </motion.div>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center lg:justify-start gap-[15px] md:gap-[20px] mt-[20px]"
        >
          <PrimaryButton
            onClick={handleButtonClick}
          >
            Talk to our experts
          </PrimaryButton>
          <SecondaryButton
            onClick={handleButtonClick}
          >
            Subscribe Now
          </SecondaryButton>
        </motion.div>
      </motion.div>

      {/* RIGHT CONTENT */}
      <motion.div
        initial={{ opacity: 0, x: 80, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="relative w-full max-w-[500px] h-[400px] md:h-[500px] lg:h-[500px]"
      >
        {/* OUTER ROTATING */}
        <Image
          src={awmsHeroPrimaryOuter}
          alt="hero outer"
          className="absolute inset-0 w-full h-full object-contain animate-spin-slow"
        />

        {/* INNER ROTATING */}
        <Image
          src={awmsHeroPrimaryInner}
          alt="hero inner"
          className="absolute inset-0 w-full h-full object-contain animate-spin-reverse"
        />

        {/* CENTER IMAGE */}
        <Image
          src={awmsHeroPrimaryImg}
          alt="hero center"
          className="absolute inset-0 w-full h-full object-contain"
        />

        {/* TAGS */}
        <div className="absolute top-4 left-4 w-[140px] md:w-[180px] h-[40px] md:h-[50px] rounded-[40px] bg-gradient-to-b from-[#333333] to-[#0D0D0D] flex items-center justify-center text-[12px] md:text-[14px] font-bold text-white">
          YOUR GROWTH
        </div>

        <div className="absolute top-4 right-4 w-[140px] md:w-[180px] h-[40px] md:h-[50px] rounded-[40px] bg-gradient-to-b from-[#333333] to-[#0D0D0D] flex items-center justify-center text-[12px] md:text-[14px] font-bold text-white">
          YOUR STORY
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[140px] md:w-[180px] h-[40px] md:h-[50px] rounded-[40px] bg-gradient-to-b from-[#333333] to-[#0D0D0D] flex items-center justify-center text-[12px] md:text-[14px] font-bold text-white">
          YOUR EVOLUTION
        </div>
      </motion.div>
    </section>
  );
}

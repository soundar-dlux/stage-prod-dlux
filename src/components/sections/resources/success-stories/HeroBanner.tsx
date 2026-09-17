"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/src/components/sections/resources/success-stories/HeroBanner.module.css";
import { motion } from "framer-motion";
import PrimaryButton from "@/src/components/ui/Buttons/PrimaryButton";


const HeroBanner = () => {
  const images = [
    "https://images.ctfassets.net/pj0maraabon4/TcciqXaBG41DwA7MqVGCH/843264f254a68d9043243ab12ab7b73c/workfront_chatgpt.jpg",
    "https://images.ctfassets.net/pj0maraabon4/TcciqXaBG41DwA7MqVGCH/843264f254a68d9043243ab12ab7b73c/workfront_chatgpt.jpg",
  ];

  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setAnimating(false);
      }, 1200);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextIndex = (index + 1) % images.length;

  return (
  <motion.section
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
  className="flex flex-col md:flex-row items-center justify-between w-full bg-black text-white py-12 md:py-20 gap-6 overflow-hidden relative top-8"
>

      {/* ===== MOBILE VIEW ===== */}
      <div className="w-full flex flex-col items-center mb-8 md:hidden">
        <div className="w-full h-[400px] relative overflow-hidden rounded-3xl mb-8">
          <Image
            src={images[index]}
            alt="Mobile"
            fill
           className={`object-cover ${styles.imageStack} ${
  animating ? styles.fadeLeft : ""
}`} />
    <Image
            src={images[nextIndex]}
            alt="Mobile Next"
            fill
            className={`object-cover ${styles.imageStack} ${
  animating ? styles.fadeRight : "opacity-0"
}`}

          />
        </div>

      <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center px-6"
        >
          <h1 className="text-2xl font-bold leading-snug mb-4">
            Real Results. Real Clients. Real Impact.
          </h1>
          <p className="text-gray-400 text-md md:text-lg leading-relaxed max-w-md mx-auto my-6">
            Uncover the truth behind every triumph, where real journeys ignite bold transformation and authentic stories fuel unstoppable success.
          </p>

          <Link href="/contact-us">
            <PrimaryButton>
              Contact Us
            </PrimaryButton>
          </Link>
      </motion.div>
      </div>

      {/* ===== LEFT COLUMN ===== */}
      <div className="hidden md:block w-[8%] h-[600px] relative overflow-hidden">
        <Image
          src={images[index]}
          alt="Left"
          fill
          className={`object-cover rounded-r-3xl image-stack ${
            animating ? "fade-left" : ""
          }`}
        />
        <Image
          src={images[nextIndex]}
          alt="Left Next"
          fill
          className={`object-cover rounded-r-3xl image-stack ${
            animating ? "fade-right" : "opacity-0"
          }`}
        />
      </div>

      {/* ===== MIDDLE COLUMN ===== */}
      <div className="hidden md:block w-[42%] text-left space-y-6 z-20 px-[60px]">
        <h1 className="text-5xl font-bold leading-snug">
          Real Results. Real Clients. Real Impact.
        </h1>
        <p className="text-gray-400 leading-relaxed max-w-md pb-6 text-md md:text-lg">
          Uncover the truth behind every triumph, where real journeys ignite bold transformation and authentic stories fuel unstoppable success.
        </p>

        <Link href="/contact-us">
          <PrimaryButton>
            Contact Us
          </PrimaryButton>
        </Link>
      </div>

      {/* ===== RIGHT COLUMN ===== */}
      <div className="hidden md:block w-[50%] h-[600px] relative rounded-3xl overflow-hidden">
        <Image
          src={images[index]}
          alt="Right"
          fill
          className={`object-cover image-stack ${
            animating ? "fade-left" : ""
          }`}
        />
        <Image
          src={images[nextIndex]}
          alt="Right Next"
          fill
          className={`object-cover image-stack ${
            animating ? "fade-right" : "opacity-0"
          }`}
        />
      </div>
    </motion.section>
  );
};

export default HeroBanner;

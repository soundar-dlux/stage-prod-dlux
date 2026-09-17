"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaLinkedin } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

interface Speaker {
  id: number;
  name: string;
  role: string;
  description: string;
  company: string;
  image: string;
  linkedin?: string;
}

const speakers: Speaker[] = [
  {
    id: 1,
    name: "LUXMAN PAI",
    role: "President & CEO",
    description:
      "Martech | Gen AI Advisory Strategy, Innovation & Enterprise Leadership",
    company: "DLUX TECH",
    image:
      "https://images.ctfassets.net/pj0maraabon4/4XHOwXn2rVjuzI70MFqXIJ/90650ef0eb6962f3c908cb49c3931cc3/lux.webp",
    linkedin: "https://www.linkedin.com/in/luxmanpai/",
  },
  {
    id: 2,
    name: "SEAN CAMPBELL",
    role: "Principal Solutions Consultant",
    description:
      "Transformational Leader | AI Strategist | Architect of Memorable Customer Experiences",
    company: "DLUX TECH",
    image:
      "https://images.ctfassets.net/pj0maraabon4/6zcanEn3hppAEzniWa6P7a/d9170c15580e56cfdddc86261c172beb/SEAN.webp",
    linkedin: "https://www.linkedin.com/in/campbell/",
  },
  {
    id: 3,
    name: "NIC MESKER",
    role: "Sr. Martech Consultant",
    description:
      "Martech Visionary | AI Growth Strategist & Agile Transformation Leader",
    company: "DLUX TECH",
    image:
      "https://images.ctfassets.net/pj0maraabon4/jX3ZezUkaoABpsXJKi8Ze/1dc4c2acbc10ecd4392734190e8df739/nic.webp",
    linkedin: "https://www.linkedin.com/in/nic-mesker-11b9911b/",
  },
];

export default function SpeakersSection() {
  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-[60px] bg-black text-white overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-[20%] -left-[10%] w-80 h-80 bg-gradient-to-r from-[#F12D06] to-[#F17C06] blur-[130px] opacity-70" />
      <div className="absolute top-[70%] right-0 w-80 h-80 bg-gradient-to-r from-[#F12D06] to-[#F17C06] blur-[130px] opacity-70" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {/* Heading */}
        <motion.h2
          className="text-2xl md:text-3xl font-bold mb-10"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          SPEAKERS
        </motion.h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="relative w-[340px] h-[440px] group rounded-[15px] overflow-hidden bg-[#111]"
            >
              {/* Image */}
              <Image
                src={speaker.image}
                alt={speaker.name}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition" />

              {/* Name */}
              <h3 className="absolute left-4 bottom-4 text-xl font-bold transition-all duration-500 group-hover:bottom-[160px] z-10">
                {speaker.name}
              </h3>

              {/* Details */}
              <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-300">
                <h5 className="text-gray-300 font-semibold">
                  {speaker.role}
                </h5>
                <p className="text-gray-300 text-sm mt-2">
                  {speaker.description}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  {speaker.company}
                </p>

                {speaker.linkedin && (
                  <a
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center p-2 bg-white text-black rounded hover:bg-blue-500 hover:text-white transition"
                  >
                    <FaLinkedin size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden">
          <Swiper modules={[Navigation]} slidesPerView={1} spaceBetween={20}>
            {speakers.map((speaker) => (
              <SwiperSlide key={speaker.id}>
                <div className="relative h-[480px] rounded-[15px] overflow-hidden bg-[#111]">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    className="object-cover object-top"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

                  <h3 className="absolute left-4 bottom-4 text-lg font-bold">
                    {speaker.name}
                  </h3>

                  <div className="absolute bottom-0 p-4">
                    <h5 className="text-gray-300 font-semibold">
                      {speaker.role}
                    </h5>
                    <p className="text-gray-300 text-sm mt-2">
                      {speaker.description}
                    </p>

                    {speaker.linkedin && (
                      <a
                        href={speaker.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex mt-3 p-2 bg-white text-black rounded hover:bg-blue-500 hover:text-white"
                      >
                        <FaLinkedin size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>
    </section>
  );
}

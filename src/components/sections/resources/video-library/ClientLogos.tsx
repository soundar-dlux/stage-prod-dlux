"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const fleetData = [
  {
    title: "Luxury Sedans",
    img: "https://images.ctfassets.net/pj0maraabon4/7j6lmSUHeMebkEec0Pgqk/02385ebb3bcbf8c951236ae4a9d24fe7/adobe.png",
  },
  {
    title: "SUVs",
    img: "https://images.ctfassets.net/pj0maraabon4/29Bg7qu2eV5aMWjUBvRB1i/7ea33ffa22915fe47cdad736f31003c6/Group_918.png",
  },
  {
    title: "Convertibles",
    img: "https://images.ctfassets.net/pj0maraabon4/3cydXFqdyuWFkc2WYkyUgK/78c69f6ac0445291fa0391ac87f2f174/Mask_Group_68.png",
  },
  {
    title: "Sports Cars",
    img: "https://images.ctfassets.net/pj0maraabon4/7AkGf6wr03XKdsJefQq2La/4c0c882583b8459641366382c54da5cf/image.png",
  },
  {
    title: "Electric Cars",
    img: "https://images.ctfassets.net/pj0maraabon4/1v0pkcjofxyJ9IsbWGxy5v/56ef4689fc915962f2d5a1bf7d10cccd/image_16.png",
  },
  {
    title: "Limousines",
    img: "https://images.ctfassets.net/pj0maraabon4/3f3gymCyBE2a57NH4DDTlL/46994506f0a3ef20f0a818308d02b11e/Group_7391.png",
  },
];

const ClientLogos = () => {
  return (
    <section
      className="relative w-full py-16 overflow-hidden text-white"
      aria-labelledby="partners-heading"
    >
      {/* Heading */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2
          id="partners-heading"
          className="text-4xl lg:text-5xl font-bold"
        >
          Our Proud{" "}
          <span className="bg-gradient-to-r from-[#ff3901] to-[#F07800] bg-clip-text text-transparent">
            Partners
          </span>
        </h2>

        <p className="text-gray-300 mt-6 max-w-xl mx-auto text-sm lg:text-base">
          We are honored to collaborate with trusted partners who share our
          vision and contribute to our collective success.
        </p>
      </motion.div>

      {/* Auto Scrolling Marquee */}
      <div className="relative w-full overflow-hidden">
        <div className="marquee group flex w-max gap-6">
          {[...fleetData, ...fleetData].map((item, i) => (
            <div
              key={i}
              className="min-w-[150px] lg:min-w-[250px] bg-[#1A1A1A] rounded-xl p-6 border border-white flex items-center justify-center shadow-md"
            >
              <div className="relative w-[120px] h-[60px]">
                <Image
                  src={item.img}
                  alt={`${item.title} partner logo`}
                  title={`${item.title} - Official Partner`}
                  fill
                  sizes="(max-width:768px) 120px, 250px"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Animation */}
      <style jsx>{`
        .marquee {
          animation: scroll 25s linear infinite;
        }

        .group:hover .marquee {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default ClientLogos;

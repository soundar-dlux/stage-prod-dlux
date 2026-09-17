"use client";

import { memo } from "react";
import Image from "next/image";

const BRAND = {
  primary: "#FF3901",
};

const CONTENT = {
  title: "Adobe Workfront –",
  highlight: "Your Ultimate Collaborator",
  para1:
    "Whether in IT consulting or running a marketing firm, Adobe Workfront provides a comprehensive project management platform. Our proven Workfront services go beyond implementation, offering strategic guidance, seamless setup, expert management, and ongoing support.",
  para2:
    "With our dedicated team supporting you every step of the way, rest assured that complicated dashboards are a relic of a bygone era. Welcome a user-friendly experience with Adobe Workfront, where capabilities meet simplicity, paving the way for enhanced organizational prowess.",
};

const AboutWorkfront = () => {
  return (
    <section className="bg-black py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        <div className="flex justify-center md:justify-start">
          <Image
            src="https://images.ctfassets.net/pj0maraabon4/6ixt6MFWUshf4PURrBkzsL/0c51289beba11bcb986e7262338002ed/adwf_adobe.png"
            alt="Adobe Workfront"
            width={420}
            height={240}
            priority
            className="opacity-90"
          />
        </div>

        <div className="space-y-6">
          <h3 className="font-bold text-white text-3xl md:text-4xl lg:text-5xl">
            {CONTENT.title}
            <span style={{ color: BRAND.primary }}>
              {" "}
              {CONTENT.highlight}
            </span>
          </h3>

          <p className="text-white/70 text-base md:text-lg leading-7">
            {CONTENT.para1}
          </p>

          <p className="text-white/70 text-base md:text-lg leading-7">
            {CONTENT.para2}
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(AboutWorkfront);
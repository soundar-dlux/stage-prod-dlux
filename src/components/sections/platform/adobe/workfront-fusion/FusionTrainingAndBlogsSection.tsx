"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Asset,
  ContentItem,
} from "@/src/app/platform/adobe/workfront-fusion/types";

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

interface FusionTrainingAndBlogsSectionProps {
  blogSection: ContentItem[];
  blogTitle: string;
  blogDescription: string;
  eqiqImagesCollection: Asset[];
}

export default function FusionTrainingAndBlogsSection({
  blogSection = [],
  blogTitle,
  blogDescription,
  eqiqImagesCollection = [],
}: FusionTrainingAndBlogsSectionProps) {
  return (
    <section className="bg-black text-white px-4 sm:px-6 lg:px-[7%] py-8 lg:py-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
        
        {/* LEFT */}
   <div
  className="relative rounded-3xl overflow-hidden min-h-[520px] 
  flex items-center justify-center 
  p-4 sm:p-6 pt-20 md:pt-28 lg:pt-6"
  style={{
    backgroundImage: `
      linear-gradient(135deg, rgba(40,60,40,0.85), rgba(120,40,0,0.85)),
      url(${eqiqImagesCollection?.[0]?.url || ""})
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>

  {/* HEADING */}
  <h2 className="absolute 
    top-4 sm:top-6 md:top-10 lg:top-6 
    text-center 
    text-[26px] sm:text-[34px] md:text-[44px] lg:text-5xl 
    font-semibold text-white leading-tight px-4">
    Looking to master <br /> Workfront Fusion?
  </h2>

  {/* CENTER MODEL */}
  <div className="relative flex flex-col items-center mt-16 sm:mt-20 lg:mt-16">
    
    {/* LOGO */}
    <Image
      src="https://images.ctfassets.net/pj0maraabon4/6BmjbiPNGVAh0soYeW6fuR/1700c7e42434cd2d5c606253cf05be0c/eqiq.8feb1d9fafb0738f5e4b.png"
      alt="DLUX EQIQ"
      width={90}
      height={90}
      className="absolute -top-8 sm:-top-10 opacity-90 w-[60px] sm:w-[80px] lg:w-[90px]"
    />

    {/* INSTRUCTOR */}
    {eqiqImagesCollection?.[1]?.url && (
      <Image
        src={eqiqImagesCollection[1].url}
        alt="Instructor"
        width={420}
        height={420}
        className="h-[240px] sm:h-[300px] md:h-[340px] lg:h-[320px] object-contain"
      />
    )}
  </div>

  {/* ===== MOBILE / TABLET STACK ===== */}
  <div className="flex flex-col gap-3 w-full mt-6 lg:hidden">
    
    {/* COURSE */}
    <a
      href="https://www.dluxeqiq.com/#/signup"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white rounded-xl px-4 py-3 shadow"
    >
      <p className="text-sm font-semibold text-orange-500">
        Adobe Workfront :
      </p>
      <p className="text-sm font-semibold text-orange-500">
        Fusion Course
      </p>
    </a>

    {/* CONTACT */}
    <div className="bg-white rounded-xl px-4 py-3 shadow">
      <p className="font-semibold text-orange-500 mb-1">
        Connect With Us:
      </p>
      <p className="text-sm text-black">
        <a href="tel:+919498727767">+91 9498727767</a>
      </p>
      <p className="text-sm text-black break-words">
        <a href="https://www.dluxeqiq.com" target="_blank" rel="noopener noreferrer">
          www.dluxeqiq.com
        </a>
      </p>
    </div>

    {/* ONLINE LEARNING */}
    <a
      href="https://www.dluxeqiq.com/#/signup"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white text-orange-500 px-4 py-2 rounded-full text-sm font-medium text-center shadow"
    >
      Online Learning
    </a>
  </div>

  {/* ===== DESKTOP (UNCHANGED) ===== */}

  {/* LEFT CARD */}
  <a
    href="https://www.dluxeqiq.com/#/signup"
    target="_blank"
    rel="noopener noreferrer"
    className="hidden lg:block absolute left-6 
    top-32 md:top-40 lg:top-32 
    bg-white rounded-xl px-5 py-4 w-[220px] shadow-md"
  >
    <p className="text-sm font-semibold text-orange-500">
      Adobe Workfront :
    </p>
    <p className="text-sm font-semibold text-orange-500">
      Fusion Course
    </p>
  </a>

  {/* RIGHT CARD */}
  <div
    className="hidden lg:block absolute right-6 
    top-36 md:top-44 lg:top-36 
    bg-white rounded-xl px-5 py-4 w-[230px] shadow-md"
  >
    <p className="font-semibold text-orange-500 mb-2">
      Connect With Us:
    </p>
    <p className="text-sm text-black">
      <a href="tel:+919498727767">+91 9498727767</a>
    </p>
    <p className="text-sm text-black">
      <a href="https://www.dluxeqiq.com" target="_blank" rel="noopener noreferrer">
        www.dluxeqiq.com
      </a>
    </p>
  </div>

  {/* LEFT BOTTOM BUTTON */}
  <a
    href="https://www.dluxeqiq.com/#/signup"
    target="_blank"
    rel="noopener noreferrer"
    className="hidden lg:block absolute left-10 bottom-24 
    bg-white text-orange-500 px-5 py-2 rounded-full text-sm font-medium shadow"
  >
    Online Learning
  </a>

  {/* CTA BUTTON */}
  <a
    href="https://www.dluxeqiq.com/#/signup"
    target="_blank"
    rel="noopener noreferrer"
    className="absolute bottom-4 sm:bottom-6 
    bg-orange-500 hover:bg-orange-600 
    text-white px-6 sm:px-8 py-2.5 sm:py-3 
    rounded-full text-sm sm:text-base font-semibold 
    shadow-lg transition"
  >
    Enroll Now
  </a>

</div>

        {/* RIGHT BLOG */}
        <div>
          <div className="max-w-2xl mb-12">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold"
              style={{ color: BRAND.primary }}
            >
              {blogTitle || "Get The Latest News Here"}
            </h2>

            <p className="text-white/70 mt-4 text-base md:text-lg leading-relaxed">
              {blogDescription ||
                "Learn how teams use Workfront Fusion to simplify complex workflows and scale smarter."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {blogSection.slice(0, 4).map((item, index) => (
              <div
                key={index}
                className="group rounded-2xl overflow-hidden transition"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div className="relative w-full h-[220px] overflow-hidden">
                  {item.url && (
                    <Image
                      src={item.url}
                      alt={item.title || "Blog"}
                      fill
                      className="object-cover group-hover:scale-105 transition"
                    />
                  )}
                </div>

                <div className="p-6 flex flex-col justify-between h-[180px]">
                  <Link href={item.description || "#"}>
                    <h4
                      className="text-lg md:text-xl font-medium transition"
                      style={{ color: "#FFFFFF" }}
                    >
                      {item.title}
                    </h4>
                  </Link>

                  <Link
                    href={item.description || "#"}
                    className="text-sm transition"
                    style={{ color: `${BRAND.primary}` }}
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/resources/blogs"
              className="px-8 py-3 rounded-full transition"
              style={{
                border: `1px solid ${BRAND.primary}`,
                color: BRAND.primary,
              }}
            >
              Explore More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
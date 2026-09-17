"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import PrimaryButton from "@/src/components/ui/Buttons/PrimaryButton";

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

export default function AboutOverviewSection() {
  return (
    <section
      className="relative bg-brand-black text-brand-white overflow-hidden py-8 lg:py-10"
      aria-labelledby="about-heading"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,57,1,0.06),transparent_70%)]" />

      {/* Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Image */}
          <MotionDiv
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-60px" }}
            className="flex justify-center lg:justify-start"
          >
            <Image
              src="https://images.ctfassets.net/pj0maraabon4/1i6OxIa9k2MUjHemM6WDer/52c87713b28bca443b7fda78604a3e6b/silhouette-confident-businesspeople.jpg"
              alt="DLUX team working on AI and marketing solutions"
              width={420}
              height={420}
              quality={80}
              sizes="(max-width: 768px) 280px, (max-width: 1024px) 340px, 420px"
              className="w-[280px] sm:w-[340px] lg:w-[420px] h-auto object-contain transition-transform duration-500 hover:scale-105"
            />
          </MotionDiv>

          {/* Content */}
          <MotionDiv
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-60px" }}
            className="text-center lg:text-left"
          >
            {/* Heading */}
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 leading-tight"
            >
              Who We Are
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300 max-w-xl mx-auto lg:mx-0">
              We are a dynamic team of sharp minds shaping a thriving digital economy that integrates marketing and advertising with AI technologies.
              We assist clients across Australia, New Zealand, India, and the US delivering implementation services for platforms like Adobe, Aprimo, Salesforce, Bynder and Dataiku
            </p>

            <p className="mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300 max-w-xl mx-auto lg:mx-0">
              By partnering with cutting edge products , We bring innovation, knowledge, and measurable Outcomes to every project.
              No matter how complex your business needs are, our solutions help you stay ahead.
            </p>

            {/* Divider */}
            <div className="mt-5 h-[2px] w-14 bg-brand-primary mx-auto lg:mx-0" />

            {/* CTA */}
            <div className="mt-7 flex justify-center lg:justify-start">
              <Link href="/contact-us" prefetch={false}>
                <PrimaryButton>
                  Lets Connect
                </PrimaryButton>
              </Link>
            </div>
          </MotionDiv>

        </div>
      </div>
    </section>
  );
}
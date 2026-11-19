import React from "react";
import Image from "next/image";

export interface ProcessStep {
  number: string;
  title: string;
  subtitle?: string;
  description: string;
}

interface ServiceProcessProps {
  title: string;
  highlightText?: string;
  description: string;
  steps: ProcessStep[];
  imageSrc: string;
  imageAlt?: string;
  className?: string;
}

export default function ServiceProcess({
  title,
  highlightText,
  description,
  steps,
  imageSrc,
  imageAlt = "Service process illustration",
  className = "",
}: ServiceProcessProps) {
  return (
    <section className={`w-full bg-white py-16 md:py-20 lg:py-24 ${className}`}>
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Left Content */}
        <div className="w-full">
          {/* Heading */}
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-black sm:text-4xl lg:text-[42px] leading-tight">
            {highlightText && (
              <span className="text-[#FF500D]">{highlightText}</span>
            )}
            {highlightText && " "}
            {title}
          </h2>

          {/* Description */}
          <p className="max-w-[520px] text-[14px] sm:text-[15px] leading-relaxed text-[#555555]">
            {description}
          </p>

          {/* Process Steps */}
          <div className="mt-8 space-y-0">
            {steps.map((step) => (
              <div
                key={step.number}
                className="grid grid-cols-[36px_1fr] items-start gap-3 border-t border-[#EAEAEA] py-5 sm:py-6"
              >
                {/* Number */}
                <span className="text-[13px] sm:text-[14px] font-bold text-[#333333]">
                  {step.number}
                </span>

                {/* Step Content */}
                <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#555555]">
                  <span className="font-semibold text-[#FF500D]">
                    {step.title}:
                  </span>{" "}
                  {step.subtitle && (
                    <span className="font-semibold text-[#222222]">
                      {step.subtitle}{" "}
                    </span>
                  )}
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Illustration */}
        <div className="relative flex w-full items-center justify-center">
          <div className="relative w-full max-w-[460px] sm:max-w-[500px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={700}
              height={1000}
              className="h-auto w-full object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 460px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

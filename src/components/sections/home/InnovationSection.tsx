"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeContainer, fadeUpItem } from "@/src/lib/animations";
import PrimaryButton from "../../ui/Buttons/PrimaryButton";

export default function InnovationSection() {
  return (
    <section
      aria-labelledby="innovation-heading"
      aria-describedby="innovation-description"
      className="bg-black py-8 lg:py-10 text-white"
    >
      <motion.div
        className="mx-auto max-w-7xl px-6"
        variants={fadeContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid gap-12 lg:grid-cols-[480px_1fr] lg:items-stretch justify-center">
          {/* LEFT IMAGE COLUMN */}
          <motion.div
            variants={fadeUpItem}
            className="relative mx-auto h-[500px] w-full max-w-[480px] overflow-hidden rounded-3xl sm:h-[600px]"
          >
            <Image
              src="https://images.ctfassets.net/pj0maraabon4/qfd4Z4l3Pl8yddcL9ETeI/f9852972b5d142524505cbf51a791aae/person-using-vr-ar-googles-01.webp"
              alt="DLUX AI & Martech Innovation Center showcasing immersive technologies like virtual reality and augmented reality for enterprise digital transformation and AI-driven experiences"
              title="DLUX AI & Martech Innovation Center – Immersive AI and Digital Innovation"
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover w-[50%]"
              priority={false}
            />
          </motion.div>

          {/* RIGHT CONTENT COLUMN */}
          <motion.div
            variants={fadeUpItem}
            className="flex flex-col justify-center"
          >
            {/* Tag */}
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-gray-300 border border-white/10">
              <Image
                src="https://images.ctfassets.net/pj0maraabon4/4WH6837PWmPPMC4GKpyDbY/1a3fbb4bb45e6b9490e97039d47de480/dlux-dark-logo-subtitle.svg"
                alt="DLUX AI & Martech Innovation Center logo representing advanced artificial intelligence, marketing technology solutions, and digital transformation expertise"
                title="DLUX AI & Martech Innovation Center"
                width={24}
                height={24}
                priority
              />
              AI Innovation Center
            </span>

            {/* Heading */}
            <h2
              id="innovation-heading"
              className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl"
            >
              DLUX  AI & Martech Innovation Center
            </h2>

            {/* Description */}
            <p
              id="innovation-description"
              className="mt-6 text-gray-400 text-base sm:text-lg"
            >
              Our collaboration creates a complete transformation ecosystem —
              from ideation to enterprise-scale deployment.
            </p>

            <p className="mt-4 text-gray-400 text-base sm:text-lg">
              Together, we combine deep technology implementation expertise with
              AI-led experimentation and Martech innovation.
            </p>

            <p className="mt-4 text-gray-400 text-base sm:text-lg">
              This ensures our clients don’t just plan transformation — they
              execute it with confidence.{" "}
            </p>

            {/* Hidden SEO content */}
            <p className="sr-only">
              DLUX AI Innovation Center provides artificial intelligence,
              martech solutions, enterprise transformation, and digital
              innovation services.
            </p>

            {/* CTA Box */}
            <div
              className="mt-10 rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              role="region"
              aria-label="Call to action for innovation center"
            >
              <p className="text-gray-300 text-sm sm:text-base">
                Strategy. Innovation. Execution. Unified.
              </p>

              <Link
                href="/services/digital-&-martech-consulting"
                aria-label="Learn more about DLUX AI and Martech Innovation Center services"
                title="Learn more about DLUX AI & Martech Innovation Center"
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
              >
                <PrimaryButton className="px-6 py-2 text-sm font-medium">
                  Know More
                </PrimaryButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

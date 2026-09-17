"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeContainer, fadeUpItem } from "@/src/lib/animations";
import PrimaryButton from "../../ui/Buttons/PrimaryButton";

export default function DluxEqiqSection() {
  return (
    <section
      aria-labelledby="dluxeqiq-heading"
      aria-describedby="dluxeqiq-description"
      className="bg-black text-white sm:pt-10"
    >
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2"
        variants={fadeContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* LEFT IMAGE COLUMN */}
        <motion.div
          variants={fadeUpItem}
          className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-auto"
        >
          <Image
            src="https://images.ctfassets.net/pj0maraabon4/4w0FVIZiHUPvMAFnFXwBGJ/c7e486a2daabfd702e2ead20e6ef6af7/martech-ai.jpg"
            alt="DLUX EQIQ learners and professionals collaborating on marketing technology and AI strategy, representing career growth in MarTech and AdTech industries"
            title="DLUX EQIQ – Career Development in MarTech and AdTech"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        {/* RIGHT CONTENT COLUMN */}
        <motion.div
          variants={fadeUpItem}
          className="flex flex-col justify-center bg-[#1e1e1e] px-6 py-16 sm:px-12 lg:px-20"
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
            DLUX EQIQ
          </span>

          {/* Heading */}
          <h2
            id="dluxeqiq-heading"
            className="mt-6 text-3xl font-semibold sm:text-4xl md:leading-[1.5]"
          >
            Launch Your Career in MarTech & AdTech with DLUX EQIQ{" "}
            <br className="hidden sm:block" />
          </h2>

          {/* Paragraphs */}
          <p
            id="dluxeqiq-description"
            className="mt-6 text-gray-400 text-base leading-relaxed"
          >
            Our DLUX EQIQ provides a clear, practical roadmap for launching your
            career in the exciting fields of MarTech (Marketing Technology) and
            AdTech (Advertising Technology). Whether you're a student, a recent
            graduate, or looking to switch careers, this resource offers
            actionable steps and insights to get you started.
          </p>

          <p className="mt-6 text-gray-400 text-base leading-relaxed">
            Forget the fluff—we're focusing on real-world skills and end-to-end
            implementations.
          </p>

          <p className="mt-6 text-gray-400 text-base leading-relaxed">
            Join DLUX EQIQ now and build the career the market is demanding for
          </p>

          {/* Hidden SEO content */}
          <p className="sr-only">
            DLUX EQIQ offers training in marketing technology, advertising
            technology, AI tools, and digital transformation careers for
            students and professionals.
          </p>

          {/* CTA */}
          <div
            className="mt-6"
            role="region"
            aria-label="DLUX EQIQ call to action"
          >
            <Link
              href="https://www.dluxeqiq.com/#/contactus"
              aria-label="Contact DLUX EQIQ to start your career in Martech and AdTech"
              title="Contact DLUX EQIQ"
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            >
              <PrimaryButton className="px-8 py-3.5 text-sm sm:text-base">
                DLUXEQIQ Contact us
              </PrimaryButton>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
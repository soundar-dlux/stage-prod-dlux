"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeContainer, fadeUpItem } from "@/src/lib/animations";
import TestimonialsCarousel from "../../ui/modal/TestimonialsCarousel";

export default function TestimonialsSection() {
  return (
    <section
      className="bg-black py-8 lg:py-10 text-white"
      aria-labelledby="testimonials-heading"
      aria-describedby="testimonials-description"
    >
      <motion.div
        className="mx-auto max-w-7xl px-6"
        variants={fadeContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Section Header */}
        <motion.div variants={fadeUpItem} className="max-w-3xl">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-gray-300 border border-white/10">
            <Image
              src="https://images.ctfassets.net/pj0maraabon4/4WH6837PWmPPMC4GKpyDbY/1a3fbb4bb45e6b9490e97039d47de480/dlux-dark-logo-subtitle.svg"
              alt="DLUX logo representing client success stories, testimonials, and trusted AI and Martech consulting services"
              title="DLUX Client Testimonials and Success Stories"
              width={24}
              height={24}
              priority
            />
            Testimonials
          </span>

          <h2
            id="testimonials-heading"
            className="mt-6 text-3xl font-semibold sm:text-4xl"
          >
            What <span className="text-brand-primary">Our Clients</span> Say About Us
          </h2>

          <p id="testimonials-description" className="mt-4 text-gray-400">
            The world has entrusted us — the proof is in their success stories.
            Don’t just take our word for it; let our customers speak about the
            quality of our work.
          </p>

          {/* Hidden SEO content */}
          <p className="sr-only">
            Read customer testimonials and client success stories about DLUX AI,
            Martech consulting, Adobe solutions, and enterprise digital
            transformation services.
          </p>
        </motion.div>

        {/* Carousel Component */}
        <div role="region" aria-label="Client testimonials carousel">
          <TestimonialsCarousel />
        </div>
      </motion.div>
    </section>
  );
}

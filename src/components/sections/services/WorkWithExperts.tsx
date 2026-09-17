"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PrimaryButton from "../../ui/Buttons/PrimaryButton";

export default function WorkWithExperts() {
  return (
    <section className="relative bg-black text-white py-20 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-brand-primary/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-brand-primary/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Work With Our{" "}
            <span className="text-brand-primary">Experts</span>
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed text-md md:text-lg">
            We have a team of certified professionals eager to collaborate with
            you to maximize the potential of tech tools. DLUX customizes our
            services to perfectly suit your needs and a budget that is easy on
            your wallet, too.
          </p>

          <p className="text-gray-400 mb-8 leading-relaxed text-md md:text-lg">
            Something extraordinary is in the works. Are you eager to uncover the
            excitement? Join us and be part of the journey!
          </p>
           <Link
            href="/contact-us"
            aria-label="Book a free strategy call with our team"
            title="Book a free strategy call"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
          >
            <PrimaryButton className="px-8 py-3.5 text-sm sm:text-base">
               Let's Huddle!
            </PrimaryButton>
          </Link>
        </motion.div>

        {/* RIGHT GLASS CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10 shadow-2xl">
            
            {/* Glow overlay */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-primary/20 to-transparent opacity-70" />

            <div className="relative">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-brand-primary">
                Why Choose DLUX?
              </h3>

              <ul className="space-y-4 text-gray-300 text-md md:text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-brand-primary">✔</span>
                  Tailored solutions for your business goals
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-primary">✔</span>
                  Certified experts with real-world experience
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-primary">✔</span>
                  Continuous support and optimization
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-primary">✔</span>
                  Cost-effective and scalable approach
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
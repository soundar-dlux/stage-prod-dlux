"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AemFooterCtaSection() {
  return (
    <section
      className="bg-black py-32 px-6"
      aria-labelledby="aem-footer-cta-heading"
    >
      <div className="max-w-7xl mx-auto">

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-800/60 via-neutral-900 to-black px-10 md:px-16 gradient-card-border"
        >
          {/* Soft Glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.08),transparent_60%)]" />

          {/* Background Image */}
          <img
            src="https://images.ctfassets.net/pj0maraabon4/5sySsTXVcEzcW7TLQWDALo/1b940acae7af76a3ba6170baf8b819c8/bg-gradient-banner.webp"
            alt="Decorative gradient background"
            className="pointer-events-none absolute top-0 right-0 w-full h-full opacity-100 blur-[1px] object-cover"
            loading="lazy"
          />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center m-0 font-sans">

            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true }}
              className="py-10 md:py-16"
            >
              <h2
                id="aem-footer-cta-heading"
                className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug font-sans text-white"
              >
                Don’t Let Slow Sites and <br />
                Disconnected Assets Hold You Back
              </h2>

              <p className="mt-4 text-[#FFFFFF]/60 text-sm md:text-lg max-w-xl">
                Join top brands already achieving 10× faster page creation,
                100% better load times, and dramatically higher conversions
                with AEM Sites & Assets. Get a free, no-obligation AEM
                strategy review.
              </p>

              <div className="mt-6 text-gray-300 text-sm space-y-2">
                <p className="font-medium text-sm md:text-lg text-[#FFFFFF]/60">
                  In one short session, see:
                </p>

                <ul className="list-disc text-sm md:text-lg list-inside space-y-1 text-[#FFFFFF]/60">
                  <li>How to fix your Core Web Vitals & load times</li>
                  <li>How to 5–10× content speed with AI</li>
                  <li>How unified Sites + Assets boost your ROI</li>
                </ul>

                <p className="mt-2 text-[#FFFFFF]/60 text-sm md:text-lg">
                  Reserve your spot — limited slots each week.
                </p>
              </div>
             <Link href="/contact-us"> 
              <button
                className="mt-8 inline-flex items-center rounded-full border border-white/30 px-8 py-3 text-sm md:text-lg font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
                aria-label="Know more about AEM strategy review"
              >
                Know More
              </button>
              </Link>
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative flex justify-center md:justify-end"
            >
              <img
                src="https://images.ctfassets.net/pj0maraabon4/4lriG19ccVIeclMf1zHjyc/b9e7687f2fd36b818c719264372d049d/aem-cta-woman-img.png"
                alt="AEM strategy consultation illustration"
                className="w-[260px] md:w-[320px] lg:w-[100%] object-contain drop-shadow-2xl"
                loading="lazy"
              />
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { memo } from "react";

/* ================= ANIMATIONS ================= */
const fadeLeft = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
};

const fadeRight = {
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
};

const transition = { duration: 0.6 };
const viewport = { once: true, margin: "-60px" };

/* ================= REUSABLE CARD ================= */
const PartnerCard = memo(function PartnerCard({
  href,
  image,
  alt,
  children,
}: {
  href: string;
  image: string;
  alt: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={alt}
      {...fadeRight}
      transition={transition}
      viewport={viewport}
      whileHover={{ y: -6 }}
      className="relative max-w-sm w-full mx-auto group"
    >
      <div className="rounded-2xl border border-white/10 bg-neutral-900 overflow-hidden transition-all duration-300 group-hover:border-brand-primary/40 group-hover:shadow-[0_0_40px_rgba(255,57,1,0.2)]">

        {/* Logo */}
        <div className="flex items-center justify-center py-8 bg-brand-black">
          <Image
            src={image}
            alt={alt}
            width={500}
            height={300}
            loading="lazy"
            className="w-[70%] h-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </motion.a>
  );
});

/* ================= MAIN ================= */
export default function Partner() {
  return (
    <section className="relative w-full bg-brand-black text-brand-white py-8 lg:py-10 overflow-hidden">

      <div className="max-w-6xl mx-auto px-6 space-y-16 md:space-y-20">

        {/* ===== TOP ===== */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <motion.div
            {...fadeLeft}
            transition={transition}
            viewport={viewport}
            className="space-y-5"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
              A Proud Adobe
              <br />
              <span className="bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo bg-clip-text text-transparent">
                Solution Partner
              </span>
            </h2>

            <p className="text-white/70 text-sm sm:text-base max-w-lg leading-relaxed">
              As an esteemed Adobe Partner, we leverage various resources, tools, and support, empowering us to deliver tailored solutions to our clients' specific requirements. Our close collaboration with Adobe gives us an in-depth understanding of their offerings. It enabled us to offer our clients expert guidance and strategic counsel, ensuring they maximized the value of their Adobe investments.
            </p>

            <p className="text-white/70 text-sm sm:text-base max-w-lg leading-relaxed">
              Our partnership with Adobe is about far more than technology; it's about a shared dedication to creativity, innovation and customer-centric values. Together, we enable our clients to achieve remarkable results and flourish in a dynamic digital landscape.
            </p>
          </motion.div>

          {/* RIGHT */}
          <PartnerCard
            href="https://www.adobe.com"
            image="https://images.ctfassets.net/pj0maraabon4/5fBZJAiinjcfb4sivaFG8J/a529dac7e4b277bfc481262883cbd47d/Adobe_Silver.png"
            alt="Adobe Workfront"
          >
            <p className="text-white/70 text-sm leading-relaxed">
              Whether you're looking to optimize your existing setup, integrate with other systems, or migrate to Adobe Workfront from legacy solutions, our team is here to guide you every step of the way.
            </p>
          </PartnerCard>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-white/10" />

        {/* ===== BOTTOM ===== */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <PartnerCard
            href="https://www.mediavalet.com"
            image="https://images.ctfassets.net/pj0maraabon4/1qvbVosDO1IrOULT0iSKTu/12be9384269ae90bb08c4e71841bb8f4/media_valet_iimage.png"
            alt="MediaValet DAM"
          >
            <h3 className="text-brand-white text-lg font-semibold">
              MediaValet
            </h3>
            <p className="text-white/50 text-xs mt-1">
              Digital Asset Management Solution
            </p>
          </PartnerCard>

          {/* RIGHT */}
          <motion.div
            {...fadeUp}
            transition={transition}
            viewport={viewport}
            className="space-y-4 max-w-lg"
          >
            <h3 className="text-brand-white text-2xl font-semibold">
              DLUX × MediaValet Partnership
            </h3>

            <p className="text-xs uppercase tracking-widest text-white/50">
              Why This Partnership Matters
            </p>

            <p className="text-white/70 text-sm leading-relaxed">
              We’re excited to announce a ground breaking partnership between DLUX Tech and MediaValet, combining our expertise in marketing technology with MediaValet’s industry-leading Digital Asset Management (DAM) platform.
            </p>

            <p className="text-white/70 text-sm leading-relaxed">
              Together, we’re redefining how businesses manage, share, and optimize their digital content. From enhanced searchability to automated workflows, businesses can now achieve greater efficiency and scalability in content management.
            </p>
          </motion.div>
        </div>
      </div>

      {/* BACKGROUND AURA */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[360px] h-[360px] rounded-full blur-[120px] opacity-10 pointer-events-none bg-gradient-to-r from-brand-gradientFrom to-transparent" />
    </section>
  );
}
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import LogoCard from "./LogoCard";

import { motion } from "framer-motion";
import { ClientsData } from "./types";

interface Props {
  clients: ClientsData;
}

export default function ClientsMarquee({ clients }: Props) {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const logos = clients.dluxImageCollection.items.slice(0, 10);
  const row1 = logos.slice(0, 5);
  const row2 = logos.slice(5, 10);

  /* ---------- GSAP MARQUEE ---------- */
  useEffect(() => {
    if (!row1Ref.current || !row2Ref.current) return;

    const row1El = row1Ref.current;
    const row2El = row2Ref.current;

    const row1Width = row1El.scrollWidth / 2;
    const row2Width = row2El.scrollWidth / 2;

    gsap.set(row1El, { x: 0 });
    gsap.set(row2El, { x: -row2Width });

    gsap.to(row1El, {
      x: -row1Width,
      duration: 30,
      ease: "none",
      repeat: -1,
    });

    gsap.to(row2El, {
      x: 0,
      duration: 34,
      ease: "none",
      repeat: -1,
    });
  }, [clients]);

  return (
    <section className="bg-neutral-900 text-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold font-sans"
        >
          {clients.dluxHeading}
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="h-[2px] bg-gradient-to-r from-orange-500 to-orange-700 mx-auto mt-6"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          viewport={{ once: true }}
          className="mt-4 text-gray-400 max-w-2xl mx-auto font-sans md:text-lg"
        >
          {clients.dluxPara}
        </motion.p>
      </div>

      <div className="space-y-10">
        <div className="relative w-full overflow-hidden">
          <div ref={row1Ref} className="flex w-max">
            {[...row1, ...row1].map((logo, index) => (
              <LogoCard key={index} logo={logo.url} />
            ))}
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div ref={row2Ref} className="flex w-max">
            {[...row2, ...row2].map((logo, index) => (
              <LogoCard key={index} logo={logo.url} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

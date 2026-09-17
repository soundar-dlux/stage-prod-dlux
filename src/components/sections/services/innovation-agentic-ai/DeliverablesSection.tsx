"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function DeliverablesSection() {
  const fastEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const deliverables = [
    {
      title: "Personalized Agentic Opportunity Map for your firm",
      number: "1",
    },
    {
      title: "Live ROI projection for your top 3 use cases",
      number: "2",
    },
    {
      title: "Clear, no-BS plan",
      number: "3",
    },
    {
      title: "Roadmap to production",
      number: "4",
    },
  ];

  return (
    <section className="bg-[#0B0D12] text-white py-28 px-6">
      <div className="max-w-7xl mx-auto text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: fastEase }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-20"
        >
          What is Lorem Ipsum?
        </motion.h2>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-10">

          {deliverables.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: fastEase,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.015,
                transition: { duration: 0.25 }
              }}
              className={`
                relative group
                w-[260px]
                h-[380px]
                rounded-2xl
                overflow-hidden
                border border-white/10
                bg-white/5
                backdrop-blur-xl
                will-change-transform
                ${index % 2 !== 0 ? "mt-12" : ""}
              `}
            >
              {/* Background Image */}
              <Image
                src="https://images.ctfassets.net/pj0maraabon4/3TyQlumi8wD4eIqzj9UFaN/7cddedb3f7e4b86ab35b8aaff8f64927/a7fa5af90f357228caa975432e6386848028612e.jpg"
                alt="Deliverable"
                fill
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Number */}
              <div className="absolute top-4 left-4 text-3xl font-bold text-white/80">
                {item.number}
              </div>

              {/* Text */}
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <p className="text-sm text-white/90 leading-snug">
                  {item.title}
                </p>
              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type TimelineItem = {
  title: string;
  content: React.ReactNode;
};

export default function GrowthTimeline() {
 const data: TimelineItem[] = useMemo(
    () => [
      {
        title: "2024",
        content: (
          <p>
            In 2024, our doors have been graced by numerous
            partnerships and clients, including the largest insurance
            companies, fostering a robust network. Like a resilient
            tree, we stand steadfast and unwavering in the face of
            challenges. Together, we boldly navigate the dynamic
            Marketing Technology landscape, leveraging our triumphs
            and eagerly seizing emerging opportunities on the frontier.
          </p>
        ),
      },
      {
        title: "2023",
        content: (
          <p>
            In 2023, DLUX experienced a remarkable year of growth
            and expansion. Our team has seen an influx of clients
            and a wealth of talent, transforming our branches into a
            cohesive and supportive family. Together, we teamed up
            to bridge the gap between marketing and technology, all
            the while maintaining the friendly cultures and values that
            define our workplace.
          </p>
        ),
      },
      {
        title: "2022",
        content: (
          <p>
            Our cornerstones are our guiding beacons. In 2022, one
            of the largest global retailers entered the DLUX realm as
            our first workfront customer, enriching our journey with new
            horizons. We blossomed to our full potential when the first
            two team leads crossed the threshold of DLUX.
          </p>
        ),
      },
      {
        title: "2021",
        content: (
          <p>
            In 2021, DLUX sowed the seeds of MarTech, which grew
            just as a seed's root began to sprout and spread. Much
            like the roots, our expertise expanded, revitalizing the
            flames of determination and propelling us toward new heights.
          </p>
        ),
      },
      {
        title: "2017",
        content: (
          <p>
            DLUX sprouted in 2017 as a digital marketing consultancy
            and has since undergone an epic transformation, setting
            the groundwork for unprecedented expansion.
          </p>
        ),
      },
    ],
    []
  );

  return (
    <section className="relative bg-brand-black text-brand-white py-8 lg:py-10 px-6 overflow-hidden">
      
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-brand-primary/10 blur-[140px] rounded-full" />
      </div>

      {/* Title */}
      <div className="text-center mb-12 md:mb-16 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold">
          Our{" "}
          <span className="bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo bg-clip-text text-transparent">
            Growth Journey
          </span>
        </h2>

        <div className="mx-auto mt-5 h-[2px] w-20 bg-brand-primary rounded-full" />
      </div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto">
        
        {/* Line */}
        <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-brand-primary to-brand-secondary -translate-x-1/2" />

        {data.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-60px" }}
              className={`relative mb-14 flex ${
                isLeft ? "justify-start" : "justify-end"
              }`}
            >
              {/* Card */}
              <div className="w-full md:w-[46%]">
                <div className="group bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-7 transition-all duration-300 hover:border-brand-primary/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(255,57,1,0.2)]">
                  
                  <h3 className="text-brand-primary text-xl md:text-2xl font-semibold mb-2">
                    {item.title}
                  </h3>

                  <div className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {item.content}
                  </div>
                </div>
              </div>

              {/* Dot */}
              <div className="absolute left-1/2 top-5 -translate-x-1/2">
                <div className="w-4 h-4 rounded-full bg-brand-primary shadow-[0_0_12px_rgba(255,57,1,0.8)]" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
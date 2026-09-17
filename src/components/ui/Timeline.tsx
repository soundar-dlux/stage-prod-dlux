"use client";

import React from "react";
import { motion } from "framer-motion";

export type TimelineItem = {
  title: string;
  content: React.ReactNode;
};

type TimelineProps = {
  data: TimelineItem[];
  className?: string;
};

export default function ReusableTimeline({
  data,
  className = "",
}: TimelineProps) {
  return (
    <div className={`relative max-w-5xl mx-auto ${className}`}>
      
      {/* Vertical Line */}
      <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-white/10">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          transition={{ duration: 1.5 }}
          className="w-full bg-gradient-to-b from-orange-500 to-orange-400"
        />
      </div>

      <div className="space-y-20">
        {data.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div key={index} className="relative flex items-center">
              
              {/* LEFT */}
              {isLeft && (
                <TimelineCard item={item} align="right" />
              )}

              {/* DOT */}
              <div className="absolute left-1/2 -translate-x-1/2 z-10">
                <motion.div
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-10 h-10 rounded-full bg-orange-500/30 flex items-center justify-center"
                >
                  <div className="w-4 h-4 bg-orange-500 rounded-full" />
                </motion.div>
              </div>

              {/* RIGHT */}
              {!isLeft && (
                <TimelineCard item={item} align="left" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- CARD ---------- */

function TimelineCard({
  item,
  align,
}: {
  item: TimelineItem;
  align: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? 80 : -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-[45%] p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 text-white
        ${align === "left" ? "ml-auto text-left" : "mr-auto text-right"}`}
    >
      <h3 className="text-xl font-bold mb-2 text-orange-400">
        {item.title}
      </h3>

      <div className="text-white/70 text-sm leading-relaxed">
        {item.content}
      </div>
    </motion.div>
  );
}
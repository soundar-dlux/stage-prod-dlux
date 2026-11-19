
"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedParticlesProps {
  className?: string;
}

const particles = [
  { x: 34, y: 0, size: 15, delay: 0, duration: 3.2 },
  { x: 73, y: 15, size: 15, delay: 0.5, duration: 3.8 },
  { x: 0, y: 25, size: 9, delay: 0.8, duration: 2.8 },
  { x: 22, y: 29, size: 15, delay: 0.3, duration: 3.5 },
  { x: 49, y: 29, size: 12, delay: 1, duration: 3.1 },
  { x: 7, y: 51, size: 12, delay: 0.6, duration: 3.6 },
  { x: 72, y: 56, size: 12, delay: 0.2, duration: 3.4 },
  { x: 38, y: 68, size: 12, delay: 0.9, duration: 3.7 },
  { x: 55, y: 17, size: 5, delay: 0.4, duration: 2.5 },
  { x: 52, y: 53, size: 7, delay: 1.2, duration: 3 },
];

const darkParticles = [
  { x: 23, y: 20, size: 12 },
  { x: 66, y: 66, size: 10 },
  { x: 53, y: 53, size: 5 },
];

export default function AnimatedParticles({
  className = "",
}: AnimatedParticlesProps) {
  return (
    <div
      className={`relative w-[88px] h-[80px] pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Orange particles */}
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            background:
              "radial-gradient(circle at 35% 30%, #FF8A24 0%, #FE590D 65%, #FE3908 100%)",
            boxShadow: "0 0 10px rgba(254, 57, 8, 0.15)",
          }}
          animate={{
            y: [0, -5, 3, 0],
            scale: [1, 1.12, 0.94, 1],
            opacity: [0.85, 1, 0.9, 0.85],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Dark particles */}
      {darkParticles.map((particle, index) => (
        <motion.span
          key={`dark-${index}`}
          className="absolute rounded-full bg-[#111820]"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, 4, -3, 0],
            opacity: [0.5, 0.9, 0.6, 0.5],
          }}
          transition={{
            duration: 3 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.4,
          }}
        />
      ))}
    </div>
  );
}

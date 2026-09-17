"use client";

import { useEffect, useRef } from "react";

export default function MagneticCubes() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // 👇 Get parent section
    const section = scene.closest("section");
    if (!section) return;

    const cubes = scene.querySelectorAll<HTMLDivElement>(".cube");

    let currentX = -20;
    let currentY = 35;
    let targetX = -20;
    let targetY = 35;

    let frame: number;

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      cubes.forEach((cube, index) => {
        const depth = (index + 1) * 12;
        const intensity = 1 - index * 0.05;

        cube.style.transform = `
          rotateX(${currentX * intensity}deg)
          rotateY(${currentY * intensity}deg)
          translateZ(${depth}px)
        `;

        const lightX = currentY * 0.8;
        const lightY = currentX * 0.8;

        cube.style.boxShadow = `
          ${-lightX}px ${lightY}px 40px rgba(0,0,0,0.25)
        `;
      });

      frame = requestAnimationFrame(animate);
    };

    animate();

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();

      const percentX = (e.clientX - rect.left) / rect.width;
      const percentY = (e.clientY - rect.top) / rect.height;

      const centerX = percentX - 0.5;
      const centerY = percentY - 0.5;

      targetY = centerX * 140;
      targetX = -centerY * 140;
    };

    const handleLeave = () => {
      targetX = -20;
      targetY = 35;
    };

    // 🔥 Attach to whole section
    section.addEventListener("mousemove", handleMove);
    section.addEventListener("mouseleave", handleLeave);

    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener("mousemove", handleMove);
      section.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const cubePositions = [
    "top-[20px] left-[260px]",
    "top-[170px] left-[340px]",
    "top-[170px] left-[220px]",
    "top-[300px] left-[300px]",
    "top-[300px] left-[180px]",
    "top-[430px] left-[260px]",
    "top-[330px] left-[40px]",
  ];

  return (
    <div
      ref={sceneRef}
      className="relative w-[500px] h-[600px] perspective-[2000px]"
    >
      {cubePositions.map((pos, i) => (
        <div
          key={i}
          className={`cube absolute w-[120px] h-[120px] ${pos}`}
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(-20deg) rotateY(35deg)",
            transition: "transform 0.08s linear",
          }}
        >
          <div className="absolute w-full h-full bg-[#f5f5f5]" style={{ transform: "translateZ(60px)" }} />
          <div className="absolute w-full h-full bg-[#d6d6d6]" style={{ transform: "rotateY(180deg) translateZ(60px)" }} />
          <div className="absolute w-full h-full bg-[#e3e3e3]" style={{ transform: "rotateY(90deg) translateZ(60px)" }} />
          <div className="absolute w-full h-full bg-[#cfcfcf]" style={{ transform: "rotateY(-90deg) translateZ(60px)" }} />
          <div className="absolute w-full h-full bg-white" style={{ transform: "rotateX(90deg) translateZ(60px)" }} />
          <div className="absolute w-full h-full bg-gradient-to-br from-orange-500 to-orange-600" style={{ transform: "rotateX(-90deg) translateZ(60px)" }} />
        </div>
      ))}
    </div>
  );
}
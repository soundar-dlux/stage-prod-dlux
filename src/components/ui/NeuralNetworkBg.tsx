"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function NeuralNetworkBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    const DPR = window.devicePixelRatio || 1;

    canvas.width = width * DPR;
    canvas.height = height * DPR;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.scale(DPR, DPR);

    const PARTICLE_COUNT = 40; // minimal particles
    const CONNECT_DISTANCE = 180;

    const particles: Particle[] = [];

    const mouse = {
      x: width / 2,
      y: height / 2,
    };

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < 200) {
          p.x += dxMouse * 0.0005;
          p.y += dyMouse * 0.0005;
        }

        // draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.fill();

        // connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];

          const dx = p.x - p2.x;
          const dy = p.y - p2.y;

          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DISTANCE) {
            const opacity = 1 - dist / CONNECT_DISTANCE;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);

            ctx.strokeStyle = `rgba(255,255,255,${opacity * 0.25})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // cursor link
        if (distMouse < 160) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);

          ctx.strokeStyle = `rgba(255,255,255,${1 - distMouse / 160})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      requestAnimationFrame(draw);
    };

    draw();

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();

      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMove);

    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;

      canvas.width = width * DPR;
      canvas.height = height * DPR;

      ctx.scale(DPR, DPR);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.55)" }}
      >
        <source
          src="https://cdn.pixabay.com/video/2022/10/01/133143-755982926_large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* subtle center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />

      {/* neural particle layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70"
      />
    </div>
  );
}
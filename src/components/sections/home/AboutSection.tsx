"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
  animate,
  useMotionTemplate,
  MotionValue,
} from "framer-motion";

import { useRef, useEffect, useState } from "react";
import { fadeContainer, fadeUpItem } from "@/src/lib/animations";
import SecondaryButton from "../../ui/Buttons/SecondaryButton";

type StatCardProps = {
  value: number;
  suffix?: string;
  label: string;
  progress: MotionValue<number>;
};

function StatCard({ value, suffix = "+", label, progress }: StatCardProps) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (!isInView) return;

    if (isMobile) {
      setDisplay(value);
      return;
    }

    const controls = animate(count, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.floor(latest)),
    });

    return () => controls.stop();
  }, [isInView, value, count, isMobile]);

  // ✅ All hooks called unconditionally — isMobile only affects which value is used
  const scaleTransform = useTransform(progress, [0, 1], [0.7, 1]);
  const opacityTransform = useTransform(progress, [0, 0.4], [0, 1]);
  const blurTransform = useTransform(progress, [0, 1], [10, 0]);
  const blurFilter = useMotionTemplate`blur(${blurTransform}px)`;

  const scale = isMobile ? 1 : scaleTransform;
  const opacity = isMobile ? 1 : opacityTransform;
  const filter = isMobile ? "blur(0px)" : blurFilter;

  return (
    <motion.div
      ref={ref}
      role="group"
      aria-label={`${value}${suffix} ${label}`}
      style={{
        scale,
        opacity,
        filter,
        willChange: isMobile ? "auto" : "transform, opacity, filter",
      }}
      className="
        flex
        md:h-52 w-52        
        items-center justify-center
        rounded-2xl
        md:rounded-3xl
        bg-white/5
        p-5 sm:p-6
        text-center
        backdrop-blur-sm
        transition
        hover:bg-white/10
      "
    >
      <div>
        <div
          className="text-lg sm:text-xl lg:text-3xl font-semibold text-white"
          aria-live="polite"
        >
          {display}
          {suffix}
        </div>

        <p className="mt-1 text-[10px] sm:text-xs lg:text-sm text-white/70">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

function InteractiveStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "center 60%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    mass: 0.4,
  });

  // ✅ All useTransform calls are unconditional — isMobile only selects which value to pass
  const xLeftTransform = useTransform(smoothProgress, [0, 1], [0, -130]);
  const xRightTransform = useTransform(smoothProgress, [0, 1], [0, 130]);
  const yTopTransform = useTransform(smoothProgress, [0, 1], [0, -110]);
  const yBottomTransform = useTransform(smoothProgress, [0, 1], [0, 110]);

  const xLeft = isMobile ? 0 : xLeftTransform;
  const xRight = isMobile ? 0 : xRightTransform;
  const yTop = isMobile ? 0 : yTopTransform;
  const yBottom = isMobile ? 0 : yBottomTransform;

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Company statistics and achievements"
      className="
        relative
        w-full
        lg:h-[520px]
      "
    >
      <div className="grid grid-cols-2 gap-4 sm:gap-6 place-items-center lg:hidden">
        <StatCard
          value={80}
          label="Certified Experts"
          progress={smoothProgress}
        />
        <StatCard value={30} label="Clients" progress={smoothProgress} />
        <StatCard
          value={30}
          label="Connected Partners"
          progress={smoothProgress}
        />
        <StatCard
          value={50}
          suffix="K+"
          label="Hours of Delivery"
          progress={smoothProgress}
        />
      </div>

      <div className="hidden lg:block">
        <div
          className="
            relative
            flex
            overflow-visible
            h-[320px]
            sm:h-[420px]
            lg:h-[520px]
            items-center
            justify-center
            pt-10 sm:pt-16
          "
        >
          <motion.div style={{ x: xLeft, y: yTop }} className="absolute">
            <StatCard
              value={80}
              label="Certified Experts"
              progress={smoothProgress}
            />
          </motion.div>

          <motion.div style={{ x: xRight, y: yTop }} className="absolute">
            <StatCard value={30} label="Clients" progress={smoothProgress} />
          </motion.div>

          <motion.div style={{ x: xLeft, y: yBottom }} className="absolute">
            <StatCard
              value={30}
              label="Connected Partners"
              progress={smoothProgress}
            />
          </motion.div>

          <motion.div style={{ x: xRight, y: yBottom }} className="absolute">
            <StatCard
              value={50}
              suffix="K+"
              label="Hours of Delivery"
              progress={smoothProgress}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      aria-labelledby="about-heading"
      aria-describedby="about-description"
      className="relative bg-black py-8 md:py-10"
    >
      {isMobile ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl font-semibold text-white"
            >
              Our Story in a Nutshell
            </h2>

            <p
              id="about-description"
              className="mt-6 text-sm sm:text-base text-white/70"
            >
              DLUX Tech is Australia's leading AI, MarTech, and AdTech
              professional services firm, headquartered in Sydney and powered by
              a global delivery center of innovation experts in Coimbatore,
              India.
            </p>

            <p className="sr-only">
              DLUX Tech provides marketing technology consulting, AI solutions,
              and digital transformation services globally.
            </p>

            <div className="mt-8">
              <Link
                href="/about"
                aria-label="Learn more about DLUX company, services and global presence"
                title="Learn more about DLUX company"
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
              >
                <SecondaryButton className="px-6 py-3 text-sm">
                  Wondering Who We Really Are?
                </SecondaryButton>
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <Image
                src="https://images.ctfassets.net/pj0maraabon4/6Wkw5RzBIk8yctjUjdvJfZ/aa91e2840aae7dacef7917c82bb5b185/aboutus-image.png"
                alt="DLUX Tech team working on marketing technology and AI solutions"
                title="DLUX Tech team working on marketing technology and AI solutions"
                width={700}
                height={500}
                className="rounded-3xl"
              />
            </div>

            <InteractiveStats />
          </div>
        </div>
      ) : (
        <motion.div
          className="mx-auto max-w-7xl px-4 sm:px-6"
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <motion.h2
              id="about-heading"
              variants={fadeUpItem}
              className="text-3xl sm:text-4xl font-semibold text-white"
            >
              Our Story in a Nutshell
            </motion.h2>

            <motion.p
              id="about-description"
              variants={fadeUpItem}
              className="mt-6 text-sm sm:text-base text-white/70"
            >
              DLUX Tech is Australia's leading AI, MarTech, and AdTech
              professional services firm, headquartered in Sydney and powered by
              a global delivery center of innovation experts in Coimbatore,
              India.
            </motion.p>

            <p className="sr-only">
              DLUX Tech provides marketing technology consulting, AI solutions,
              and digital transformation services globally.
            </p>

            <motion.div variants={fadeUpItem} className="mt-8">
              <Link
                href="/about"
                aria-label="Learn more about DLUX company, services and global presence"
                title="Learn more about DLUX company"
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
              >
                <SecondaryButton className="px-6 py-3 text-sm">
                  Wondering Who We Really Are?
                </SecondaryButton>
              </Link>
            </motion.div>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-2 items-center">
            <motion.div variants={fadeUpItem}>
              <Image
                src="https://images.ctfassets.net/pj0maraabon4/6Wkw5RzBIk8yctjUjdvJfZ/aa91e2840aae7dacef7917c82bb5b185/aboutus-image.png"
                alt="DLUX Tech team working on marketing technology and AI solutions"
                title="DLUX Tech team working on marketing technology and AI solutions"
                width={700}
                height={500}
                className="rounded-3xl"
              />
            </motion.div>

            <InteractiveStats />
          </div>
        </motion.div>
      )}
    </section>
  );
}
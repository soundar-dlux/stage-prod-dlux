'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import SectionBadge from '@/src/components/ui/SectionBadge';
import PrimaryButton from '@/src/components/ui/Buttons/PrimaryButton';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center pt-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/1 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: "#ff3901" }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: "#ff3901" }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: "#ff3901",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-[#FF3901] opacity-10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-[#F07800] opacity-10 rounded-full blur-[120px]" />
          </div>

          <motion.div
            style={{ opacity, scale }}
            className="max-w-7xl mx-auto px-6 py-20 relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl"
            >
                {/* Tag */}
                        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/5 px-4 py-2 mb-6 text-sm text-gray-300 border border-white/10">
                          <Image
                            src="https://images.ctfassets.net/pj0maraabon4/1Y5NWzy7HutcqoE11np3JJ/735a7e5d1ad8ba5e9c76f7861e1c36e8/bynder-logo-blue.svg"
                            alt="DLUX AI & Martech Innovation Center logo representing advanced artificial intelligence, marketing technology solutions, and digital transformation expertise"
                            title="DLUX AI & Martech Innovation Center"
                            width={120}
                            height={120}
                            priority
                                 />
                        </span>
             

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-6xl font-bold mb-6 md:leading-tight text-white"
              >
                Transform Your Brand's{' '}
                <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                  Digital Asset Flow
                </span>{' '}
                with Bynder DAM
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl text-gray-400 mb-8 leading-relaxed "
              >
                Bynder empowers marketing teams to centralize, organize, and distribute digital
                assets through an intuitive, cloud-native platform tailored for APAC businesses.
                Leveraging AI-powered features and seamless automation, Bynder accelerates
                workflows, enhances asset discoverability, and supports omnichannel content
                delivery.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
             <Link
            href="/contact-us"
            aria-label="Watch overview of our AI and Martech services"
            title="Watch overview"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
          >
                 <PrimaryButton className="px-8 py-3.5 text-sm sm:text-base">
                             Get Started
                            </PrimaryButton>
                            </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-[#FF3901] rounded-full flex items-start justify-center p-2"
            >
              <motion.div className="w-1 h-2 bg-[#FF3901] rounded-full" />
            </motion.div>
          </motion.div>
        </section>
  );
}
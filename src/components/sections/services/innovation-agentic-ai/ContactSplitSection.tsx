"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  "https://images.ctfassets.net/pj0maraabon4/7meiNrilG1zyl0RUA7vII1/a0da14ff244e989a2eb2f3cd19f07d2e/c5eadd8d7c624fe04767b157db7b597ee51e97f1.jpg",
  "https://images.ctfassets.net/pj0maraabon4/6mTVEhiEf6vfUbiFH2vkJS/f47bce4b41f31321d889acdec314cbc3/ar-vr--768x512.jpg",
];

export default function ContactSplitSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const premiumEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [paused]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  return (
    <section className="bg-black py-20 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: premiumEase }}
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 justify-items-center"
      >
        {/* LEFT IMAGE CARD */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: premiumEase }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden group w-[645px] h-[650px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative w-full h-full overflow-hidden">
            {images.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`Slide ${index}`}
                fill
                sizes="645px"
                priority={index === 0}
                className={`object-cover transition-opacity duration-1000 ease-in-out ${
                  index === current ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          <button onClick={nextSlide} className="absolute inset-0 z-10" />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index ? "w-10 bg-white" : "w-6 bg-white/40"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* RIGHT FORM CARD */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: premiumEase }}
          viewport={{ once: true }}
          className="relative rounded-2xl p-10 md:p-14 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 text-white overflow-hidden w-[645px] h-[650px]"
        >
          {/* Top Left Decorative */}
          <Image
            src="https://images.ctfassets.net/pj0maraabon4/5XKAXNLYeq12BRWnNNnEKY/e1c0691f53ad443cc40c94dc01694be4/Group__4_.png"
            alt="Decorative shape"
            width={85}
            height={60}
            className="absolute top-[70px] left-0 invert opacity-70 pointer-events-none"
          />

          {/* Bottom Right Decorative */}
          <Image
            src="https://images.ctfassets.net/pj0maraabon4/uEfhdQdczkwSlgEvq21TZ/af22f4f5314e0a3c04ab0e6ce72849e3/Group__3_.png"
            alt="Decorative shape"
            width={378}
            height={250}
            className="absolute bottom-0 right-0 w-[378px] h-auto invert opacity-70 pointer-events-none"
          />

          <h2 className="text-3xl md:text-4xl font-bold mb-10 relative z-10">
            What is Lorem Ipsum?
          </h2>

        <form className="space-y-6 relative z-10">
  <div className="grid md:grid-cols-2 gap-6">
    <input
      type="text"
      placeholder="First Name"
      className="bg-white/10 backdrop-blur-md text-white placeholder-white/70 
                 px-6 py-4 rounded-full 
                 border border-[hsla(13,100%,50%,0.49)] 
                 outline-none focus:outline-none"
    />
    <input
      type="text"
      placeholder="Last Name"
      className="bg-white/10 backdrop-blur-md text-white placeholder-white/70 
                 px-6 py-4 rounded-full 
                 border border-[hsla(13,100%,50%,0.49)] 
                 outline-none focus:outline-none"
    />
  </div>

  <div className="grid md:grid-cols-2 gap-6">
    <input
      type="email"
      placeholder="Email"
      className="bg-white/10 backdrop-blur-md text-white placeholder-white/70 
                 px-6 py-4 rounded-full 
                 border border-[hsla(13,100%,50%,0.49)] 
                 outline-none focus:outline-none"
    />
    <input
      type="tel"
      placeholder="Phone"
      className="bg-white/10 backdrop-blur-md text-white placeholder-white/70 
                 px-6 py-4 rounded-full 
                 border border-[hsla(13,100%,50%,0.49)] 
                 outline-none focus:outline-none"
    />
  </div>

  <textarea
    rows={4}
    placeholder="Message"
    className="w-full bg-white/10 backdrop-blur-md text-white placeholder-white/70 
               px-6 py-4 rounded-2xl 
               border border-[hsla(13,100%,50%,0.49)] 
               outline-none focus:outline-none"
  />

  <div className="flex justify-center pt-4">
    <button
      type="submit"
      className="px-10 py-3 rounded-full border border-black text-black 
                 bg-white hover:bg-black hover:text-white 
                 transition-all duration-300 font-medium"
    >
      Download PDF
    </button>
  </div>
</form>
        </motion.div>
      </motion.div>
    </section>
  );
}
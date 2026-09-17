"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const IconCards = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="bg-black text-white max-w-7xl mx-auto px-6 md:py-20 relative"
    >
      {/* Top Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Driving Success Beyond <span className="text-brand-primary"> Implementation</span>
        </h2>
        <p className="text-gray-400 text-md md:text-lg max-w-3xl mx-auto leading-relaxed">
          Success isn’t just about implementations — it’s about business
          transformation. DLUX success stories showcase how Fortune 500s and
          fast-scaling teams leverage AI and Martech platforms to streamline
          workflows, optimize content management, power eCommerce automation,
          and accelerate growth.
        </p>
      </motion.div>

      {/* First Row */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
      >
        {/* Card 1 */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
          className="bg-[#101010] rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform"
        >
          <div className="relative w-full h-48 md:h-56">
            <Image
              src="https://images.ctfassets.net/pj0maraabon4/2wSRFZc07744dw3Ei4Cbqo/4dd1a84930ef0462472b7101ffb017c0/abstract-orange-glowing-lines-background.jpg"
              alt="Proven Outcomes"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-2">
              Proven <br /> Outcomes
            </h3>
            <p className="text-gray-400 text-lg">
              Efficiency gains, cost savings, and revenue growth.
            </p>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
          className="bg-[#101010] md:col-span-2 relative rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform"
        >
          <div className="relative z-10 p-8 bg-[#101010] backdrop-blur-sm h-full flex flex-col justify-center">
            <Image
              src="https://images.ctfassets.net/pj0maraabon4/2zYJ5hEhrvvsOZgLBMsryR/93054debbdabd6c2cbca8b8736b531b3/Clip_path_group.png"
              alt="Background"
              fill
              className="object-cover"
            />

            {/* Popup Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex justify-center my-6"
            >
              <div className="bg-[#1a1a1a]/80 backdrop-blur-lg rounded-2xl shadow-lg w-full max-w-[300px] text-center p-6 hover:scale-[1.02] transition">
                <h3 className="mb-2 text-2xl">Let's Connect</h3>
                <Link href="/contact-us">
                  <button className="rounded-[12px] border border-[#ffffff14] px-[24px] py-[7.5px] hover:bg-gray-700 transition">
                    Contact Us
                  </button>
                </Link>
              </div>
            </motion.div>

            <h3 className="text-2xl font-semibold mb-2">
              See how brands like yours turn goals into real results
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Explore our client case studies with proven strategies, key
              metrics, and measurable impact.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Second Row */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Card 1 */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
          className="bg-[#101010] rounded-2xl p-8 hover:scale-[1.02] transition-transform"
        >
          <div className="w-[55px] h-[55px] bg-[#FFFFFF14] rounded-lg flex items-center justify-center mb-4">
            <Image
              src="https://images.ctfassets.net/pj0maraabon4/2jIREOrYeKfOKGIrxf3sc8/85613829eceb9fc4430e5ddfa832d659/Icon--02.png"
              alt="Cross Industry Wins"
              width={40}
              height={40}
            />
          </div>
          <h3 className="text-2xl font-semibold mb-2">
            Cross <br /> Industry Wins
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            Retail, healthcare, finance, media, and beyond.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
          className="bg-[#101010] rounded-2xl p-8 hover:scale-[1.02] transition-transform"
        >
          <div className="w-[55px] h-[55px] bg-[#FFFFFF14] rounded-lg flex items-center justify-center mb-4">
            <Image
              src="https://images.ctfassets.net/pj0maraabon4/4wIvWbhXfcYa4NXw1CtjB8/635b6de2319a0e7b34fe22c6ac6cefe9/freepik__adjust__35762_2.svg"
              alt="Future Ready Tech"
              width={40}
              height={40}
            />
          </div>
          <h3 className="text-2xl font-semibold mb-2">
            Future <br /> Ready Tech
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            AI, automation, and integrations that scale.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
          className="bg-[#101010] rounded-2xl p-8 hover:scale-[1.02] transition-transform"
        >
          <div className="w-[55px] h-[55px] bg-[#FFFFFF14] rounded-lg flex items-center justify-center mb-4">
            <Image
              src="https://images.ctfassets.net/pj0maraabon4/4twrLfRzRAK901DAO6HHx/c50878a597cb87b494cd1fe15db807aa/dlux-dark-logo__2__1.svg"
              alt="DLUX CoE Advantage"
              width={40}
              height={40}
            />
          </div>
          <h3 className="text-2xl font-semibold mb-2">
            DLUX CoE <br /> Advantage
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            Strategies built on playbooks, not guesswork.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default IconCards;

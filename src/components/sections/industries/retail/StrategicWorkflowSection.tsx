"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const KNOCK_IMG =
  "https://images.ctfassets.net/pj0maraabon4/60lA2VeZenh3m5eXmDjgQP/f4fea090210c50f0d4e7486b0e2f5f69/knockImg.2eec7f1077ec1ba3f794.png";

const SMILE_IMG =
  "https://images.ctfassets.net/pj0maraabon4/1bK2wyARdZBuoRtHJFPdiF/f54bbe7202c0a107db5a4f2d7ad64781/smileImg.b7830afb96da20e9cffa.png";

const INTEGRATION_IMG =
  "https://images.ctfassets.net/pj0maraabon4/3cWQmi9L5XPOpLqMlrKxEE/f32532a05dc874d123fbd5af2e1bd7dd/integrationImg.f2d1b90c5106bfd26b6e.png";

export default function StrategicSections() {
  return (
    <section className="w-full bg-black py-6 md:py-10 lg:py-14 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-20 md:space-y-24">

        {/* Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FE780C]/20 to-transparent blur-3xl rounded-6xl lg:rounded-2xl scale-110 pointer-events-none" />

            <Image
              src={KNOCK_IMG}
              alt="Strategic approach"
              width={500}
              height={350}
              className="relative w-full max-w-md h-auto object-contain rounded-6xl lg:rounded-2xl shadow-2xl"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
              Strategic Approach and Workflow
            </h3>
            <p className="text-sm sm:text-base md:text-lg leading-6 md:leading-8 text-white/90">
              DLUX, your Martech partner, streamlines customer satisfaction with
              tailored strategies and advanced technology. Our certified
              consultants integrate connected work and technologies for impactful
              brand experiences. With DLUX, achieving marketing objectives becomes
              manageable, ensuring unforgettable customer engagement.
            </p>
          </motion.div>
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16">

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
              Personalized Customer Experiences
            </h3>
            <p className="text-sm sm:text-base md:text-lg leading-6 md:leading-8 text-white/90">
              Retailers that craft personalized, high-caliber customer experiences
              are three times more likely to surpass their competitors. Throughout
              each stage of our process, we emphasize how you can seamlessly
              integrate people, processes, and technology to shape your customer’s
              journey through omnichannel personalization.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center order-1 md:order-2 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FE780C]/20 to-transparent blur-3xl rounded-2xl scale-110 pointer-events-none" />

            <Image
              src={SMILE_IMG}
              alt="Customer experience"
              width={500}
              height={350}
              className="relative w-full max-w-md h-auto object-contain rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Section 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FE780C]/20 to-transparent blur-3xl rounded-2xl scale-110 pointer-events-none" />

            <Image
              src={INTEGRATION_IMG}
              alt="Technology integration"
              width={500}
              height={350}
              className="relative w-full max-w-md h-auto object-contain rounded-2xl shadow-2xl"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
              Integration of Technologies
            </h3>
            <p className="text-sm sm:text-base md:text-lg leading-6 md:leading-8 text-white/90">
              By seamlessly integrating your current systems and harnessing the
              capabilities of Adobe Experience Cloud and more, you’ll attain
              agility, speed, and a robust marketing platform that synchronizes
              seamlessly with your customer channels in real time.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

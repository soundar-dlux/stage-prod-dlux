"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const DATA = [
  {
    title: "ISO/IEC 27001 Certified",
    icon: "https://images.ctfassets.net/pj0maraabon4/3aTuZsI0bw2tr8yapXvWNE/b5751922b11b5dd7745f3cdf6bb711f4/asset_1.png",
    image:
      "https://images.ctfassets.net/pj0maraabon4/oVkKtuff5GEqtiIYqUofZ/6334210fdc648660a1893ebe1b27dc1c/Untitled_design__4_.png",
    desc: "DLUX is ISO/IEC 27001 certified ensuring world-class security standards across systems and operations.",
    points: [
      "End-to-end risk assessment",
      "Encryption & access control",
      "Security training",
      "Internal audits",
    ],
  },
  {
    title: "GDPR & SOC 2 Alignment",
    icon: "https://images.ctfassets.net/pj0maraabon4/2CO1F9rXP1xmrh4cYVjobD/c1677dc6f40ddd6d5672ea12aa106c93/asset_2.png",
    image:
      "https://images.ctfassets.net/pj0maraabon4/7AQEvAldj4DYenn5VvR842/70ce271010ad89b15c7b082421cc3223/f5efed0b-7bd9-47de-9158-15573574a46c.png",
    desc: "Aligned with global compliance standards ensuring transparency and trust.",
    points: [
      "Minimising risks",
      "Transparent data flows",
      "GDPR rights",
      "Secure-by-design",
    ],
  },
  {
    title: "Secure by Design",
    icon: "https://images.ctfassets.net/pj0maraabon4/1Tigm6d8XwnUr2tocESPb5/dfbd19d82b192c7eb6b7a26a80202963/asset_3.png",
    image:
      "https://images.ctfassets.net/pj0maraabon4/4CmmfukTbGuMdXcpfI5Ury/212c4ab444808980e96f168e8638c8ea/65b0bcf8-ee0a-4e0b-81b7-a57b83143a0e.png",
    desc: "Security is built into every layer — not added later.",
    points: [
      "Secure cloud infrastructure",
      "RBAC & SSO",
      "Secure APIs",
      "AI governance",
    ],
  },
];

export default function TrustSecuritySection() {
  return (
    <section className="bg-brand-black text-brand-white py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-28">

        {DATA.map((item, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center justify-center gap-16 ${
                isReversed ? "lg:flex-row-reverse" : ""
              }`}
            >

              {/* TEXT */}
              <motion.div
                initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="w-full lg:w-[480px] space-y-4"
              >
                <h2 className="flex items-center gap-3 text-brand-primary text-2xl md:text-3xl font-semibold">
                  <Image src={item.icon} alt="" width={24} height={24} />
                  {item.title}
                </h2>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>

                <ul className="space-y-2 pt-2">
                  {item.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <span className="text-brand-primary">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* IMAGE */}
              <motion.div
                initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="w-full lg:w-[480px] flex justify-center"
              >
                <div className="w-[280px] h-[220px] md:w-[320px] md:h-[250px] relative rounded-xl overflow-hidden border border-white/10 bg-white/5">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </motion.div>

            </div>
          );
        })}

      </div>
    </section>
  );
}
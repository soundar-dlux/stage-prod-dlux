"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const partners = [
  {
    name: "Adobe",
    logo: "https://images.ctfassets.net/pj0maraabon4/zh2GE5gTOKAnAcvc98Oav/4057ce472c9ef708ebab5a86ae52aaf5/2.png",
  },
  {
    name: "MediaValet",
    logo: "https://images.ctfassets.net/pj0maraabon4/3BUTd0cQylZlnmje8wqYo0/e4df3be706ae90fb5edc24f0293a10e0/1.png",
  },
  {
    name: "Aprimo",
    logo: "https://images.ctfassets.net/pj0maraabon4/6PmKrW0h15oJ8pP5846hk8/fe92cf97018bce267d8e8be6f01823ab/3.png",
  },
  {
    name: "Salesforce",
    logo: "https://images.ctfassets.net/pj0maraabon4/3kJZWmK18wPsqzTO2eaS9d/7724612e433fba2680efb70a9eb680e5/4.png",
  },
  {
    name: "Dataiku",
    logo: "https://images.ctfassets.net/pj0maraabon4/6ahVtlwUqsXRkgag1jbpbl/300ba612b38a1c4e0c4cefab29ad702a/5.png",
  },
];

export default function PartnersLogo() {
  return (
    <section
      aria-labelledby="partners-heading"
      aria-describedby="partners-description"
      className="relative w-full bg-black text-white py-8 lg:py-20 overflow-hidden"
    >
      {/* 🌌 Soft Cinematic Spotlight */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-orange-500/10 blur-[160px] rounded-full" />
      </div>

      {/* Heading */}
      <div className="relative z-10 text-center mb-20 px-6">
        <motion.h2
          id="partners-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-semibold tracking-tight"
        >
          Trusted by <span className="text-brand-primary">Industry Leaders</span>
        </motion.h2>

        {/* Hidden SEO content */}
        <p id="partners-description" className="sr-only">
          DLUX partners with leading platforms including Adobe, Salesforce,
          Aprimo, Dataiku, and MediaValet to deliver advanced martech and AI
          solutions.
        </p>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="h-[2px] bg-gradient-to-r from-orange-500 to-orange-700 mx-auto mt-6"
          aria-hidden="true"
        />
      </div>

      {/* 🔥 Premium Card Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div
          className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-10 md:p-14"
          role="region"
          aria-label="Partner companies logos"
        >
          {/* Inner subtle glow */}
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* Logos */}
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 items-center"
            role="list"
          >
            {partners.map((item, index) => (
              <motion.div
                key={index}
                role="listitem"
                aria-label={`Partner: ${item.name}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 0.9, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center justify-center group relative"
              >
                {/* Hover spotlight */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-orange-500/20 to-orange-700/20 blur-xl rounded-full"
                  aria-hidden="true"
                />

                <Image
                  src={item.logo}
                  alt={`${item.name} logo – trusted technology partner of DLUX for AI, Martech, and enterprise digital transformation solutions`}
                  title={`${item.name} partnership with DLUX`}
                  width={120}
                  height={50}
                  className="object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition duration-500 rounded-xl"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Fade (Luxury finish) */}
      <div
        className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}

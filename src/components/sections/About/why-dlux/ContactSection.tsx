"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section className="px-6 lg:px-24 py-16 bg-brand-black text-brand-white text-center">
      
      {/* 🔥 Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-[10%] top-[10%] w-[400px] h-[400px] bg-brand-primary/10 blur-[120px] rounded-full" />
      </div>

      {/* 🔥 Container */}
      <div className="relative max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-5">
          <h2 className="text-brand-primary text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            Contact Us
          </h2>

          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            If you have questions regarding this Policy or about DLUX’s privacy
            practices, or to file any complaints, please send your inquiries to
            our team.
          </p>
        </div>

        {/* 🔥 Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">

            {/* LEFT CONTENT */}
            <div className="space-y-6">
              
              <div>
                <p className="text-brand-white font-semibold text-lg">
                  Privacy Team
                </p>
                <p className="text-gray-300 mt-1">
                  DLUX TECH CORP PTY LTD
                </p>
              </div>

              {/* Address */}
              <div className="text-gray-400 leading-relaxed space-y-1">
                <p>Suite-3, Level 2, 9 George Street</p>
                <p>Parramatta CBD, Sydney – NSW 2150</p>
              </div>

              {/* Email */}
              <div>
                <p className="text-gray-400 text-sm mb-1">Email</p>
                <a
                  href="mailto:trust@dluxtech.com"
                  className="text-brand-primary text-base font-medium hover:underline"
                >
                  trust@dluxtech.com
                </a>
              </div>

              {/* Docs */}
              <div className="text-gray-400 text-sm">
                📄 Documentation available on request (ISO certificate, policies,
                technical safeguards)
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative flex justify-center lg:justify-end group"
            >
              {/* glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* image card */}
              <div className="relative w-full max-w-xs sm:max-w-sm rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="https://images.ctfassets.net/pj0maraabon4/67HHUhsPSKbfGYObOz7dUE/29eade2cd0e4288b98e676ca4b2121ea/100010.jpg"
                  alt="Contact"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
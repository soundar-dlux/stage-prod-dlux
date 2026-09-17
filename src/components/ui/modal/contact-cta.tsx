"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function ContactSection3D() {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -6;
    const rotateY = ((x / rect.width) - 0.5) * 6;

    card.style.transform = `
      perspective(1400px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  };

  const reset = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = `perspective(1400px) rotateX(0deg) rotateY(0deg)`;
  };

  const fields = [
    { name: "Name_First", placeholder: "First Name", type: "text" },
    { name: "Name_Last", placeholder: "Last Name", type: "text" },
    { name: "Email", placeholder: "Email Address", type: "email" },
    { name: "PhoneNumber_countrycode", placeholder: "Phone Number", type: "tel" },
  ];

  return (
    <section className="relative bg-brand-black text-brand-white py-8 lg:py-10 px-6 md:px-16 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-white/5 blur-[180px]" />
        <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-white/5 blur-[180px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-60px" }}
        className="w-full max-w-7xl mx-auto"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseLeave={reset}
          className="transition-transform duration-300 will-change-transform"
        >
          {/* OUTER CARD */}
          <div className="rounded-[32px] bg-gradient-to-br from-white/10 to-white/5 p-[1px] shadow-[0_40px_120px_rgba(0,0,0,0.9)]">

            {/* INNER CARD */}
            <div className="rounded-[30px] bg-black/80 border border-white/10 p-8 md:p-12 backdrop-blur-xl">

              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* LEFT */}
                <div className="space-y-6 md:space-y-8">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
                    Let’s Build <br />
                    <span className="bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo bg-clip-text text-transparent">
                      Something Great
                    </span>
                  </h2>

                  <p className="text-gray-400 max-w-md text-sm md:text-base leading-relaxed">
                    Discover how DLUX can streamline your workflow with powerful
                    MarTech solutions, delivering seamless experiences from start to finish.
                  </p>

                  {/* CONTACT */}
                  <div className="space-y-5 text-gray-400">

                    <a href="tel:+61411048090" className="flex items-center gap-4 hover:text-brand-white transition">
                      <div className="p-3 rounded-full bg-white/5">
                        <Image src="https://images.ctfassets.net/pj0maraabon4/2KkSpVRyic1hEzPwePcIxH/0bcd2fb52837138c1e6327817b7ac58c/call.png" alt="" width={18} height={18} />
                      </div>
                      +61 411 048 090
                    </a>

                    <a href="mailto:sales@dluxtech.com" className="flex items-center gap-4 hover:text-brand-white transition">
                      <div className="p-3 rounded-full bg-white/5">
                        <Image src="https://images.ctfassets.net/pj0maraabon4/KJitWngDu6rTHjB7nKaK7/5ce39b75cdacd12f2a62be3ddd03c2ce/message.png" alt="" width={18} height={18} />
                      </div>
                      sales@dluxtech.com
                    </a>

                    <a
                      href="https://www.google.com/maps?q=Parramatta+CBD+Sydney+NSW+2150"
                      target="_blank"
                      className="flex items-start gap-4 hover:text-brand-white transition"
                    >
                      <div className="p-3 rounded-full bg-white/5">
                        <Image src="https://images.ctfassets.net/pj0maraabon4/75qcDK6lfBzwrznkKTXyWU/cbf1d3750f1197aee908b59bc11e7f5f/location.png" alt="" width={18} height={18} />
                      </div>
                      Suite-3, Level 2, 9 George Street <br />
                      Parramatta CBD, Sydney - NSW 2150
                    </a>

                  </div>
                </div>

                {/* RIGHT FORM */}
                <div className="space-y-6">

                  <form
                    action="https://forms.zohopublic.in/dluxtech/form/ContactUs/formperma/31chFm8VXcXIgilsROO-K9qJZ1vauQDQ-ITFT9TZAbU/htmlRecords/submit"
                    method="POST"
                    autoComplete="off"
                    className="space-y-5"
                  >
                    {fields.map((field) => (
                      <input
                        key={field.name}
                        type={field.type}
                        name={field.name}
                        required
                        placeholder={field.placeholder}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white placeholder-gray-500 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/40 transition"
                      />
                    ))}

                    <textarea
                      name="MultiLine"
                      rows={3}
                      required
                      placeholder="Your Message"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white placeholder-gray-500 focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary/40 transition resize-none"
                    />

                    <button
                      type="submit"
                      className="w-full py-3 rounded-full font-semibold text-brand-white bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo hover:opacity-90 transition-all duration-300 shadow-[0_0_20px_rgba(255,57,1,0.3)]"
                    >
                      Send Message
                    </button>
                  </form>

                </div>

              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
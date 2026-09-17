
"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { Mail, MapIcon, Phone } from "lucide-react";
import Image from "next/image";


export default function ContactFormSection() {
  useEffect(() => {
    const container = document.getElementById(
      "zf_div_yDN6eKbrtAH11RME4LZgO6s-M8ogDvOaP693n-cytaQ"
    );

    if (!container || container.querySelector("iframe")) return;

    const iframe = document.createElement("iframe");

    iframe.src =
      "https://forms.dluxtech.com/dluxtech/form/ContactUs/formperma/yDN6eKbrtAH11RME4LZgO6s-M8ogDvOaP693n-cytaQ?zf_rszfm=1";

    iframe.style.border = "none";
    iframe.style.width = "100%";
    iframe.style.height = "800px";
    iframe.setAttribute("aria-label", "Contact Us");

    container.appendChild(iframe);

    const handleMessage = (event: MessageEvent) => {
      const evntData = event.data;

      if (typeof evntData !== "string") return;

      const zf_ifrm_data = evntData.split("|");

      if (zf_ifrm_data.length < 2) return;

      const zf_perma = zf_ifrm_data[0];
      const newHeight =
        parseInt(zf_ifrm_data[1], 10) + 15 + "px";

      const iframe =
        container.getElementsByTagName("iframe")[0];

      if (
        iframe &&
        iframe.src.includes("formperma") &&
        iframe.src.includes(zf_perma)
      ) {
        iframe.style.height = newHeight;
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    
    <section className="py-6 md:py-10 lg:py-14 px-4 md:px-10 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16">
      
        {/* LEFT SIDE - FORM */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/5 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm text-white/80"
        >
          <p className="text-brand-primary font-semibold mb-2">
            Get in Touch
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
            Let's talk business!
          </h2>

          <p className="mb-8 text-sm sm:text-base leading-relaxed">
            DLUX is your ultimate launchpad to rocket-power your
            journey towards greatness. Your personal genie is just
            a call away, here to craft custom solutions that fit you
            like a glove.
          </p>

          <div className="border-t border-gray-700 mb-6"></div>
          <div
      id="zf_div_yDN6eKbrtAH11RME4LZgO6s-M8ogDvOaP693n-cytaQ"
      className="w-full"
    />
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col gap-8"
        >
          {/* IMAGE CARD */}
          <div className="relative rounded-3xl overflow-hidden h-[300px] sm:h-[350px] md:h-[400px]">
            <Image
              src="https://images.ctfassets.net/pj0maraabon4/19Qy7fFymE6OlCnyGXhaSj/0c2d0601d4e7c130569176707db580ec/emotional-young-woman-designer-talking-by-phone.jpg"
              alt="Contact"
              title="Contact DLUX"
              fill
              className="object-cover"
            />
          </div>
          
          {/* CONTACT INFO CARDS */}
          <div className="grid sm:grid-cols-2 gap-6 text-white">
            {[
              {
                icon: <Mail size={22} />,
                title: "Email",
                value: "sales@dluxtech.com",
              },
              {
                icon: <Phone size={22} />,
                title: "Phone",
                value: "+61 411 048 090",
              },
              {
                icon: <MapIcon size={22} />,
                title: "Address",
                value:
                  "Suite-3, Level 2, 9 George Street Parramatta CBD, Sydney - NSW 2150",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white/5 rounded-2xl p-6 flex items-start gap-4 shadow-sm hover:bg-white/10 transition"
              >
                <div className="bg-white/20 p-3 rounded-xl text-brand-primary">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-300 whitespace-pre-line">
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

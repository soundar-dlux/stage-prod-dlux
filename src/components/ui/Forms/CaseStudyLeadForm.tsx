"use client";

import { useState } from "react";
import SmallFormModal from "../modal/SmallFormModal";

export default function CaseStudyLeadForm({
  pdfUrl,
  open,
  setOpen,
}: {
  pdfUrl?: string;
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <SmallFormModal open={open} onClose={() => setOpen(false)}>

      {/* HEADER */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white">
          Get Full Case Study
        </h3>
        <p className="text-white/50 text-sm mt-1">
          Enter your details to download
        </p>
      </div>

      {/* FORM */}
      <form
        action="https://forms.zohopublic.in/dluxtech/form/CaseStudy/formperma/0LVpLbO3hslRPlQhT44Z9tQvahSsqj3xJwwmeLn_4Sg/htmlRecords/submit"
        method="POST"
        target="hidden_iframe"
        onSubmit={() => {
          setLoading(true);

          setTimeout(() => {
            setLoading(false);
            setOpen(false);

            if (pdfUrl) {
              window.open(pdfUrl, "_blank");
            }
          }, 1000);
        }}
        className="space-y-4"
      >
        {/* ZOHO HIDDEN */}
        <input type="hidden" name="zf_referrer_name" value="" />
        <input type="hidden" name="zf_redirect_url" value="" />
        <input type="hidden" name="zc_gad" value="" />

        {/* NAME GRID */}
        <div className="grid grid-cols-2 gap-3">
          <input
            name="Name_First"
            required
            placeholder="First name"
            className="w-full px-3 py-2.5 rounded-lg 
            bg-[#0b0b0b] border border-white/10 
            text-white text-sm placeholder:text-white/40
            focus:outline-none focus:border-orange-500 
            focus:ring-1 focus:ring-orange-500/30 transition"
          />

          <input
            name="Name_Last"
            required
            placeholder="Last name"
            className="w-full px-3 py-2.5 rounded-lg 
            bg-[#0b0b0b] border border-white/10 
            text-white text-sm placeholder:text-white/40
            focus:outline-none focus:border-orange-500 
            focus:ring-1 focus:ring-orange-500/30 transition"
          />
        </div>

        {/* EMAIL */}
        <input
          name="Email"
          type="email"
          required
          placeholder="Work email"
          className="w-full px-3 py-2.5 rounded-lg 
          bg-[#0b0b0b] border border-white/10 
          text-white text-sm placeholder:text-white/40
          focus:outline-none focus:border-orange-500 
          focus:ring-1 focus:ring-orange-500/30 transition"
        />

        {/* PHONE */}
        <input
          name="PhoneNumber_countrycode"
          placeholder="Phone number"
          className="w-full px-3 py-2.5 rounded-lg 
          bg-[#0b0b0b] border border-white/10 
          text-white text-sm placeholder:text-white/40
          focus:outline-none focus:border-orange-500 
          focus:ring-1 focus:ring-orange-500/30 transition"
        />

        {/* CTA BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg 
          bg-gradient-to-r from-orange-500 to-orange-600 
          text-white text-sm font-medium 
          shadow-md hover:opacity-90 
          active:scale-[0.98] transition-all duration-150"
        >
          {loading ? "Submitting..." : "Download Now"}
        </button>
      </form>

      {/* HIDDEN IFRAME */}
      <iframe name="hidden_iframe" className="hidden" />

    </SmallFormModal>
  );
}
"use client";

import { useState } from "react";
import SmallFormModal from "../modal/SmallFormModal";

interface Props {
  slug?: string;
  assetId?: string;
  pdfUrl?: string;
  open: boolean;
  setOpen: (val: boolean) => void;
}

export default function CaseStudyLeadForm({
  slug,
  assetId,
  pdfUrl,
  open,
  setOpen,
}: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/downloads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          slug,
          assetId,
          pdfUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(
          data.error || "Unable to verify submission. Please try again."
        );
        setLoading(false);
        return;
      }

      // Verified by server: download authorized asset
      setLoading(false);
      setOpen(false);

      if (data.downloadUrl) {
        const link = document.createElement("a");
        link.href = data.downloadUrl;
        link.download = data.fileName || "case-study.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <SmallFormModal
      open={open}
      onClose={() => {
        if (!loading) setOpen(false);
      }}
    >
      {/* HEADER */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white">
          Get Full Case Study
        </h3>
        <p className="text-white/50 text-sm mt-1">
          Enter your details to download
        </p>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/40 rounded-lg text-red-200 text-xs">
          {errorMessage}
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* NAME GRID */}
        <div className="grid grid-cols-2 gap-3">
          <input
            name="Name_First"
            required
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2.5 rounded-lg 
            bg-[#0b0b0b] border border-white/10 
            text-white text-sm placeholder:text-white/40
            focus:outline-none focus:border-orange-500 
            focus:ring-1 focus:ring-orange-500/30 transition disabled:opacity-50"
          />

          <input
            name="Name_Last"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2.5 rounded-lg 
            bg-[#0b0b0b] border border-white/10 
            text-white text-sm placeholder:text-white/40
            focus:outline-none focus:border-orange-500 
            focus:ring-1 focus:ring-orange-500/30 transition disabled:opacity-50"
          />
        </div>

        {/* EMAIL */}
        <input
          name="Email"
          type="email"
          required
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="w-full px-3 py-2.5 rounded-lg 
          bg-[#0b0b0b] border border-white/10 
          text-white text-sm placeholder:text-white/40
          focus:outline-none focus:border-orange-500 
          focus:ring-1 focus:ring-orange-500/30 transition disabled:opacity-50"
        />

        {/* PHONE */}
        <input
          name="PhoneNumber_countrycode"
          required
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={loading}
          className="w-full px-3 py-2.5 rounded-lg 
          bg-[#0b0b0b] border border-white/10 
          text-white text-sm placeholder:text-white/40
          focus:outline-none focus:border-orange-500 
          focus:ring-1 focus:ring-orange-500/30 transition disabled:opacity-50"
        />

        {/* CTA BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg 
          bg-gradient-to-r from-orange-500 to-orange-600 
          text-white text-sm font-medium 
          shadow-md hover:opacity-90 
          active:scale-[0.98] transition-all duration-150 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Verifying & Generating Download..." : "Download Now"}
        </button>
      </form>
    </SmallFormModal>
  );
}
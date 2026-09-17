"use client";

import { useState } from "react";
import {
  FaDownload,
  FaLink,
  FaShareAlt,
  FaCheck,
} from "react-icons/fa";
import CaseStudyLeadForm from "@/src/components/ui/Forms/CaseStudyLeadForm";

export default function CaseStudyActions({
  pdfUrl,
}: {
  pdfUrl?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Check this case study",
        url: shareUrl,
      });
    } else {
      handleCopy();
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-4">

        {/* DOWNLOAD → OPENS FORM */}
        {pdfUrl && (
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full 
            bg-gradient-to-r from-orange-500 to-orange-600 
            text-white text-sm font-medium hover:scale-105 transition"
          >
            <FaDownload size={14} />
            Download
          </button>
        )}

        {/* COPY */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 rounded-full 
          bg-white/10 border border-white/20 text-white text-sm 
          hover:bg-white/20 transition"
        >
          {copied ? <FaCheck size={14} /> : <FaLink size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>

        {/* SHARE */}
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-full 
          bg-white/10 border border-white/20 text-white text-sm 
          hover:bg-white/20 transition"
        >
          <FaShareAlt size={14} />
          Share
        </button>
      </div>

      {/* ✅ REUSED FORM */}
      <CaseStudyLeadForm
        pdfUrl={pdfUrl}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
"use client";

import { useState } from "react";
import {
  FaDownload,
  FaLink,
  FaShareAlt,
  FaCheck,
} from "react-icons/fa";
import CaseStudyLeadForm from "@/src/components/ui/Forms/CaseStudyLeadForm";

interface Props {
  slug?: string;
  pdfUrl?: string;
  title?: string;
}

export default function CaseStudyActions({ slug, pdfUrl }: Props) {
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

  const hasDownload = Boolean(slug || pdfUrl);

  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        {/* DOWNLOAD → OPENS FORM */}
        {hasDownload && (
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full 
            bg-gradient-to-r from-orange-500 to-orange-600 
            text-white text-sm font-medium hover:scale-105 transition cursor-pointer"
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
          hover:bg-white/20 transition cursor-pointer"
        >
          {copied ? <FaCheck size={14} /> : <FaLink size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>

        {/* SHARE */}
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-full 
          bg-white/10 border border-white/20 text-white text-sm 
          hover:bg-white/20 transition cursor-pointer"
        >
          <FaShareAlt size={14} />
          Share
        </button>
      </div>

      {/* REUSED GATED FORM */}
      <CaseStudyLeadForm
        slug={slug}
        pdfUrl={pdfUrl}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
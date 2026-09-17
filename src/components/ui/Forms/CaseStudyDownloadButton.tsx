"use client";

import { useState } from "react";
import CommonModal from "../modal/CommonModal";

interface Props {
  pdfUrl: string;
  title?: string;
}

export default function CaseStudyDownloadButton({
  pdfUrl,
  title,
}: Props) {
  const [open, setOpen] = useState(false);

  if (!pdfUrl) return null;

  return (
    <>
      {/* Premium Animated Button */}
      <button
        onClick={() => setOpen(true)}
        className="relative group inline-flex items-center justify-center px-10 py-4 overflow-hidden rounded-full bg-black text-white font-semibold tracking-wide transition-all duration-500 hover:scale-105 active:scale-95"
      >
        {/* Soft Glow */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 via-white/5 to-white/10 opacity-0 blur-xl transition duration-500 group-hover:opacity-100"></span>

        {/* Shine Sweep Animation */}
        <span className="absolute left-[-100%] top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-all duration-700 group-hover:left-[120%]"></span>

        {/* Text */}
        <span className="relative z-10">
          Download Full Case Study
        </span>
      </button>

      {/* Modal */}
      <CommonModal
        open={open}
        onClose={() => setOpen(false)}
        title={title || "Case Study Preview"}
      >
        {/* PDF Preview */}
        <div className="h-[75vh] bg-gray-100">
          <iframe
            src={pdfUrl}
            className="w-full h-full"
          />
        </div>

        {/* Download Section */}
        <div className="p-6 text-center border-t">
          <a
            href={pdfUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            title="Download PDF"
            className="relative group inline-flex items-center justify-center px-10 py-4 overflow-hidden rounded-full bg-black text-white font-semibold tracking-wide transition-all duration-500 hover:scale-105 active:scale-95"
          >
            {/* Glow */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 via-white/5 to-white/10 opacity-0 blur-xl transition duration-500 group-hover:opacity-100"></span>

            {/* Shine */}
            <span className="absolute left-[-100%] top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-all duration-700 group-hover:left-[120%]"></span>

            <span className="relative z-10">
              Download PDF
            </span>
          </a>
        </div>
      </CommonModal>
    </>
  );
}
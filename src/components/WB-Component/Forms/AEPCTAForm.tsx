"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ShieldCheck, Loader2, CheckCircle2 } from "lucide-react";
import { CtaModal } from "../Modal/CtaModal";
import { PrimaryButton } from "../Buttons/PrimaryButton";

// Extend React HTML attributes to support Zoho CRM custom attributes
declare module "react" {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    fieldType?: string | number;
    fieldtype?: string | number;
    compname?: string;
    phoneFormat?: string | number;
    phoneformat?: string | number;
    isCountryCodeEnabled?: boolean | string;
    iscountrycodeenabled?: boolean | string;
  }
}

export interface AEPCTAFormProps {
  /** Controls modal visibility when mode="modal" */
  isOpen?: boolean;
  /** Callback fired when closing the modal */
  onClose?: () => void;
  /** Custom top badge / pill text */
  badge?: React.ReactNode;
  /** Main title displayed at top of form */
  title?: React.ReactNode;
  /** Description or subtitle text */
  description?: React.ReactNode;
  /** Value for zf_redirect_url hidden input */
  redirectUrl?: string;
  /** PDF URL to view in a new window after submission */
  pdfUrl?: string;
  /** Value for zf_referrer_name hidden input */
  referrerName?: string;
  /** Value for zc_gad hidden input (GCLID) */
  zcGad?: string;
  /** Label for submit button */
  submitButtonText?: string;
  /** Optional custom submit handler */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  /** Render mode: "modal" (default) or "embedded" */
  mode?: "modal" | "embedded";
  /** Additional custom class names */
  className?: string;
  /** Additional custom class names for modal overlay */
  overlayClassName?: string;
}

export function AEPCTAForm({
  isOpen = true,
  onClose = () => { },
  title = (
    <>
      AEP Implementation <span className="text-[#FE3908]">Enquiry Form</span>
    </>
  ),
  redirectUrl = "",
  pdfUrl = "https://assets.ctfassets.net/pj0maraabon4/4DlkXknKeC31BQvLWdnO0K/7d393a25d88129bae325f72ec0956a80/AEP_Implementation_guide.pdf",
  referrerName = "",
  zcGad = "",
  submitButtonText = "Submit",
  onSubmit,
  mode = "modal",
  className = "",
  overlayClassName = "",
}: AEPCTAFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);

    if (onSubmit) {
      onSubmit(e);
    }

    // Native HTML form POST with target="_blank" opens Zoho's redirect in a new tab.
    // Transition to success state after brief submission animation.
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Auto-close modal after showing success message
      setTimeout(() => {
        if (onClose) {
          onClose();
        }
        // Reset state for subsequent form openings
        setTimeout(() => {
          setIsSubmitted(false);
        }, 300);
      }, 1600);
    }, 500);
  };

  const effectiveRedirectUrl = pdfUrl || redirectUrl;

  const formContent = (
    <AnimatePresence mode="wait">
      {isSubmitted ? (
        <motion.div
          key="success-card"
          initial={{ opacity: 0, scale: 0.88, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          transition={{ duration: 0.35, type: "spring", stiffness: 320, damping: 24 }}
          className="flex flex-col items-center justify-center text-center py-6 sm:py-8 px-4 gap-3 font-sans"
        >
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, duration: 0.45, type: "spring", stiffness: 350 }}
            className="w-14 h-14 rounded-full bg-[#FE3908]/10 flex items-center justify-center text-[#FE3908]"
          >
            <CheckCircle2 className="w-9 h-9 text-[#FE3908]" />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl font-bold text-gray-900"
          >
            Enquiry Submitted!
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xs sm:text-sm text-gray-600 max-w-xs leading-relaxed"
          >
            Thank you for reaching out. Our Adobe experts will get back to you shortly.
          </motion.p>
        </motion.div>
      ) : (
        <motion.form
          key="form-card"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          action="https://forms.zohopublic.in/dluxtech/form/AEPPageImplementationForm/formperma/6EYVRIQq_Hhq0UKm_cfBcnOBjX9oza2Yz6szCyetbgc/htmlRecords/submit"
          name="form"
          id="form"
          method="POST"
          target="_blank"
          acceptCharset="UTF-8"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className={`flex flex-col gap-4 w-full font-sans ${mode === "embedded" ? className : ""}`}
        >
          {/* Hidden Fields for Zoho tracking & mandatory parameters */}
          <input type="hidden" name="zf_referrer_name" value={referrerName} />
          <input type="hidden" name="zf_redirect_url" value={effectiveRedirectUrl} />
          <input type="hidden" name="zc_gad" value={zcGad} />

          {/* Header displayed only in embedded mode */}
          {mode === "embedded" && (
            <div className="flex flex-col gap-1.5 mb-1">
              {title && (
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 leading-snug">
                  {title}
                </h2>
              )}
            </div>
          )}

          {/* Form Fields Stack */}
          <div className="flex flex-col gap-3">
            {/* NAME (FIRST & LAST) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* FIRST NAME */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="Name_First"
                  className="text-[11px] font-bold text-[#374151] tracking-wider uppercase flex items-center gap-1"
                >
                  FIRST NAME
                </label>
                <input
                  type="text"
                  id="Name_First"
                  name="Name_First"
                  maxLength={255}
                  fieldtype="7"
                  placeholder="First Name"
                  className="
                    w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]
                    text-gray-900 text-sm placeholder-[#9CA3AF]
                    focus:outline-none focus:ring-2 focus:ring-[#FE3908]/20 focus:border-[#FE3908] focus:bg-white
                    transition-all duration-200
                  "
                />
              </div>

              {/* LAST NAME */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="Name_Last"
                  className="text-[11px] font-bold text-[#374151] tracking-wider uppercase flex items-center gap-1"
                >
                  LAST NAME
                </label>
                <input
                  type="text"
                  id="Name_Last"
                  name="Name_Last"
                  maxLength={255}
                  fieldtype="7"
                  placeholder="Last Name"
                  className="
                    w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]
                    text-gray-900 text-sm placeholder-[#9CA3AF]
                    focus:outline-none focus:ring-2 focus:ring-[#FE3908]/20 focus:border-[#FE3908] focus:bg-white
                    transition-all duration-200
                  "
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="Email"
                className="text-[11px] font-bold text-[#374151] tracking-wider uppercase flex items-center gap-1"
              >
                EMAIL <span className="text-[#FE3908]">*</span>
              </label>
              <input
                type="email"
                id="Email"
                name="Email"
                maxLength={255}
                defaultValue=""
                fieldtype="9"
                placeholder="work@company.com"
                required
                className="
                  w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]
                  text-gray-900 text-sm placeholder-[#9CA3AF]
                  focus:outline-none focus:ring-2 focus:ring-[#FE3908]/20 focus:border-[#FE3908] focus:bg-white
                  transition-all duration-200
                "
              />
            </div>

            {/* MOBILE */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="international_PhoneNumber_countrycode"
                className="text-[11px] font-bold text-[#374151] tracking-wider uppercase"
              >
                MOBILE
              </label>
              <input
                type="text"
                id="international_PhoneNumber_countrycode"
                compname="PhoneNumber"
                name="PhoneNumber_countrycode"
                phoneformat="1"
                iscountrycodeenabled="false"
                maxLength={20}
                defaultValue=""
                fieldtype="11"
                placeholder="Mobile Number"
                className="
                  w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]
                  text-gray-900 text-sm placeholder-[#9CA3AF]
                  focus:outline-none focus:ring-2 focus:ring-[#FE3908]/20 focus:border-[#FE3908] focus:bg-white
                  transition-all duration-200
                "
              />
            </div>

            {/* HOW CAN WE HELP? */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="SingleLine"
                className="text-[11px] font-bold text-[#374151] tracking-wider uppercase"
              >
                HOW CAN WE HELP?
              </label>
              <input
                type="text"
                id="SingleLine"
                name="SingleLine"
                defaultValue=""
                fieldtype="1"
                maxLength={255}
                placeholder="Tell us about your project requirements..."
                className="
                  w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]
                  text-gray-900 text-sm placeholder-[#9CA3AF]
                  focus:outline-none focus:ring-2 focus:ring-[#FE3908]/20 focus:border-[#FE3908] focus:bg-white
                  transition-all duration-200
                "
              />
            </div>
          </div>

          {/* Primary Submit Button */}
          <div className="w-full flex justify-center mt-1">
            <PrimaryButton
              type="submit"
              disabled={isSubmitting}
              className="w-full justify-center !min-h-[44px] !py-3 !px-6"
            >
              <span className="flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>{submitButtonText}</span>
                    <Send className="w-4 h-4 text-white" />
                  </>
                )}
              </span>
            </PrimaryButton>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );

  if (mode === "embedded") {
    return (
      <div
        className={`w-full max-w-[480px] p-5 sm:p-7 rounded-2xl bg-white border border-[#E9E9E9] shadow-xl ${className}`}
      >
        {formContent}
        <div className="pt-3 border-t border-[#E9E9E9] flex items-center justify-center gap-2 text-gray-500 text-[11px] text-center mt-4">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FE3908]" />
          <span>We respect your privacy. Direct submission to Zoho CRM.</span>
        </div>
      </div>
    );
  }

  return (
    <CtaModal
      isOpen={isOpen}
      onClose={onClose}
      badge={null}
      title={title}
      description={null}
      showForm={false}
      className={className}
      overlayClassName={overlayClassName}
      footerNote="We respect your privacy. Direct submission to Zoho CRM."
    >
      {formContent}
    </CtaModal>
  );
}

export default AEPCTAForm;



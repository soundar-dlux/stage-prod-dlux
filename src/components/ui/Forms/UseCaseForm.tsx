"use client";

import { useState, useEffect, useRef } from "react";
import CommonModal from "../modal/CommonModal";
import { motion } from "framer-motion";
import ModalFormButton from "./ModalFormButton";

interface Props {
  useCase: string;
  pdf: string;
  open: boolean;
  onClose: () => void;
}

export default function UseCaseForm({
  useCase,
  pdf,
  open,
  onClose,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [currentUseCase, setCurrentUseCase] = useState("");
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // ✅ ALWAYS SYNC STATE
  useEffect(() => {
    setCurrentUseCase(useCase);
  }, [useCase]);

  // ✅ ALSO SYNC DOM (extra safety)
  useEffect(() => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = currentUseCase;
    }
  }, [currentUseCase]);

  const handleSubmit = () => {
    setLoading(true);

    // 🔥 ensure latest value before submit
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = currentUseCase;
    }

    setTimeout(() => {
      setLoading(false);
      onClose();

      if (pdf) {
        window.open(pdf, "_blank");
      }
    }, 1200);
  };

  return (
    <CommonModal open={open} onClose={onClose} title="Use Case Access">
      <div className="max-w-md mx-auto py-4">
        <p className="text-white/60 mb-6 text-sm">
          Fill in your details to access this use case.
        </p>

        <form
          action="https://forms.zohopublic.in/dluxtech/form/UseCase/formperma/s_J_55VkajPWW4bseOCq7Usz3VhfiIdc3upDK4Hq8bM/htmlRecords/submit"
          method="POST"
          target="hidden_iframe"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* ✅ FIXED hidden input */}
          <input
            ref={hiddenInputRef}
            type="hidden"
            name="Dropdown"
            value={currentUseCase}
            readOnly
          />

          {/* INPUTS */}
          {[
            { label: "First Name", name: "Name_First", type: "text" },
            { label: "Last Name", name: "Name_Last", type: "text" },
            { label: "Work Mail", name: "Email", type: "email" },
            {
              label: "Phone Number",
              name: "PhoneNumber_countrycode",
              type: "text",
            },
          ].map((field, i) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative"
            >
              <input
                type={field.type}
                name={field.name}
                required={field.name !== "PhoneNumber_countrycode"}
                placeholder=" "
                className="peer w-full px-4 pt-5 pb-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-sm text-white backdrop-blur-md focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/40 outline-none"
              />

              <label
                className="absolute left-4 top-3 text-white/50 text-xs transition-all
                peer-placeholder-shown:top-4 
                peer-placeholder-shown:text-sm 
                peer-focus:-top-1.5 
                peer-focus:text-[10px] 
                peer-not-placeholder-shown:-top-1.5 
                peer-not-placeholder-shown:text-[10px]"
              >
                {field.label}
              </label>
            </motion.div>
          ))}

          <ModalFormButton
            loading={loading}
            label="Submit"
            loadingLabel="Processing..."
          />
        </form>

        <iframe name="hidden_iframe" style={{ display: "none" }} />
      </div>
    </CommonModal>
  );
}
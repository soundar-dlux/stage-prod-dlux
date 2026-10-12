"use client";

import { useState, useEffect } from "react";
import CommonModal from "../modal/CommonModal";
import { motion } from "framer-motion";
import ModalFormButton from "./ModalFormButton";

interface Props {
  useCase: string;
  useCaseId?: string;
  pdf?: string;
  open: boolean;
  onClose: () => void;
}

export default function UseCaseForm({
  useCase,
  useCaseId,
  pdf,
  open,
  onClose,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUseCase, setCurrentUseCase] = useState("");

  const [formData, setFormData] = useState({
    Name_First: "",
    Name_Last: "",
    Email: "",
    PhoneNumber_countrycode: "",
  });

  useEffect(() => {
    setCurrentUseCase(useCase);
    setErrorMessage("");
  }, [useCase, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/downloads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.Name_First,
          lastName: formData.Name_Last,
          email: formData.Email,
          phone: formData.PhoneNumber_countrycode,
          useCase: currentUseCase || useCase,
          assetId: useCaseId,
          pdfUrl: pdf,
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

      setLoading(false);
      onClose();

      if (data.downloadUrl) {
        const link = document.createElement("a");
        link.href = data.downloadUrl;
        link.download = data.fileName || "use-case.pdf";
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
    <CommonModal
      open={open}
      onClose={() => {
        if (!loading) onClose();
      }}
      title="Use Case Access"
    >
      <div className="max-w-md mx-auto py-4">
        <p className="text-white/60 mb-6 text-sm">
          Fill in your details to access this use case.
        </p>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/40 rounded-lg text-red-200 text-xs">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
                value={(formData as any)[field.name]}
                onChange={handleChange}
                required={field.name !== "PhoneNumber_countrycode"}
                disabled={loading}
                placeholder=" "
                className="peer w-full px-4 pt-5 pb-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-sm text-white backdrop-blur-md focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/40 outline-none disabled:opacity-50"
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
            loadingLabel="Verifying..."
          />
        </form>
      </div>
    </CommonModal>
  );
}
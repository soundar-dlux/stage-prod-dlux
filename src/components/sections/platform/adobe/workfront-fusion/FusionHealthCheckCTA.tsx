"use client";

import { useState } from "react";
import Image from "next/image";

export default function FusionHealthCheckCTA() {
  const [formData, setFormData] = useState({
    SingleLine: "",
    Email: "",
    PhoneNumber_countrycode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const tempErrors: Record<string, string> = {};

    if (!formData.SingleLine.trim()) {
      tempErrors.SingleLine = "Name is required";
    } else if (!/^[A-Za-z\s.'-]+$/.test(formData.SingleLine)) {
      tempErrors.SingleLine = "Name must contain only letters";
    }

    if (!formData.Email.trim()) {
      tempErrors.Email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.Email)) {
      tempErrors.Email = "Invalid email format";
    }

    if (!formData.PhoneNumber_countrycode.trim()) {
      tempErrors.PhoneNumber_countrycode = "Phone number is required";
    } else if (!/^[0-9+\-\s()]{6,25}$/.test(formData.PhoneNumber_countrycode)) {
      tempErrors.PhoneNumber_countrycode = "Invalid phone number format";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
    setServerError("");

    try {
      const res = await fetch("/api/downloads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.SingleLine,
          email: formData.Email,
          phone: formData.PhoneNumber_countrycode,
          assetId: "fusion-readiness-guide",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(
          data.error || "Unable to verify submission. Please try again."
        );
        setSubmitted(false);
        return;
      }

      // Download authorized asset securely
      if (data.downloadUrl) {
        const a = document.createElement("a");
        a.href = data.downloadUrl;
        a.download = data.fileName || "fusion-readiness-guide.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

      setShowForm(false);
      setFormData({
        SingleLine: "",
        Email: "",
        PhoneNumber_countrycode: "",
      });
      setSubmitted(false);
      setErrors({});
    } catch {
      setServerError("Network error. Please try again.");
      setSubmitted(false);
    }
  };

  return (
    <section className="pt-[35px]">
      {/* ================= CTA BANNER ================= */}
      <div className="bg-gradient-to-r from-[#ea5623] to-[#f87e26] text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-[4%] lg:px-[8%] py-4">
          <div className="text-left md:w-[70%] lg:w-[55%]">
            <h2 className="text-[18px] md:text-[24px] lg:text-[33px] font-bold mb-2">
              Is Adobe Fusion Right for You?
            </h2>
            <p className="text-[14px] lg:text-[17px]">
              Take our Free Fusion Readiness Health Check to find out where your
              integration gaps are — and how to close them.
            </p>
          </div>

          <div
            onClick={() => {
              setServerError("");
              setShowForm(true);
            }}
            className="flex items-center gap-4 px-4 py-3 rounded-full cursor-pointer
              bg-white/20 border border-white/30 backdrop-blur-md
              shadow-lg transition hover:bg-white/30"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 animate-[arrowPulse_1.4s_ease-in-out_infinite]">
              <Image
                src="https://dluxeqiq.com/assets/rightArrow.png"
                alt="arrow"
                width={16}
                height={16}
                className="invert"
              />
            </span>
            <p className="font-bold text-[12px] md:text-[14px] lg:text-[16px]">
              Start the Health Check
            </p>
          </div>
        </div>

        <div className="flex justify-center pb-5">
          <p className="flex items-center gap-2 text-[#ccc] text-xs">
            <Image
              src="https://dluxeqiq.com/assets/lockicon.png"
              alt="lock"
              width={25}
              height={25}
            />
            We respect your privacy. No spam — just actionable insights.
          </p>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[999]">
          <form
            onSubmit={handleSubmit}
            className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl
              w-[70%] md:w-[50%] lg:w-[24%] p-8 text-white shadow-2xl"
          >
            <span
              className="absolute top-3 right-4 text-2xl cursor-pointer"
              onClick={() => !submitted && setShowForm(false)}
            >
              ×
            </span>

            <h2 className="text-[24px] mb-4 font-bold">
              <span className="text-white">Sign up</span>{" "}
              <span className="text-[#f85032]">in Seconds</span>
            </h2>

            {serverError && (
              <div className="mb-4 p-2.5 bg-red-500/20 border border-red-500/40 rounded-lg text-red-200 text-xs text-left">
                {serverError}
              </div>
            )}

            {/* Name */}
            <div className="flex items-center border-b border-gray-400 mb-1">
              <Image
                src="https://dluxeqiq.com/assets/icon1.png"
                alt=""
                width={50}
                height={50}
              />
              <input
                type="text"
                name="SingleLine"
                value={formData.SingleLine}
                onChange={handleChange}
                placeholder="Your Name"
                disabled={submitted}
                className="flex-1 bg-transparent outline-none text-white text-sm"
              />
            </div>
            {errors.SingleLine && (
              <p className="text-[#ff6b6b] text-xs text-left">
                {errors.SingleLine}
              </p>
            )}

            {/* Email */}
            <div className="flex items-center border-b border-gray-400 mt-3 mb-1">
              <Image
                src="https://dluxeqiq.com/assets/icon2.png"
                alt=""
                width={50}
                height={50}
              />
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                placeholder="Your Email"
                disabled={submitted}
                className="flex-1 bg-transparent outline-none text-white text-sm"
              />
            </div>
            {errors.Email && (
              <p className="text-[#ff6b6b] text-xs text-left">
                {errors.Email}
              </p>
            )}

            {/* Phone */}
            <div className="flex items-center border-b border-gray-400 mt-3 mb-1">
              <Image
                src="https://dluxeqiq.com/assets/icon3.png"
                alt=""
                width={50}
                height={50}
              />
              <input
                type="text"
                name="PhoneNumber_countrycode"
                value={formData.PhoneNumber_countrycode}
                onChange={handleChange}
                placeholder="Your Phone Number"
                disabled={submitted}
                className="flex-1 bg-transparent outline-none text-white text-sm"
              />
            </div>
            {errors.PhoneNumber_countrycode && (
              <p className="text-[#ff6b6b] text-xs text-left">
                {errors.PhoneNumber_countrycode}
              </p>
            )}

            <button
              type="submit"
              disabled={submitted}
              className="w-[65%] mx-auto mt-4 py-3 rounded-full font-bold text-sm
                bg-gradient-to-r from-[#f85032] to-[#e73827] hover:scale-105 transition disabled:opacity-50 cursor-pointer"
            >
              {submitted ? "Verifying..." : "Submit"}
            </button>
          </form>
        </div>
      )}

      {/* Arrow Animation */}
      <style jsx global>{`
        @keyframes arrowPulse {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(6px);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}

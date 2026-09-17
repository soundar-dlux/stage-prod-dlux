"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CaseStudy } from "@/src/app/resources/success-stories/types";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  story: CaseStudy;
  relatedStories: CaseStudy[];
}

export default function StoryDetailClient({ story, relatedStories }: Props) {
  const router = useRouter();

  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const isValidPhone = (phone: string) =>
    /^[0-9+\-\s()]{6,20}$/.test(phone.trim());

  const handleDownloadClick = () => {
    setErrorMsg("");
    setFormData({ name: "", email: "", phone: "" });
    setShowPopup(true);
  };

  const handleZohoSubmit = () => {
    setTimeout(() => {
      const pdfUrl = story?.caseStudyPdf?.url;
      if (pdfUrl) {
        const newTab = window.open(pdfUrl, "_blank");

        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = story?.caseStudyPdf?.fileName || "case-study.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }, 500);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((p) => ({ ...p, [field]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      setErrorMsg("Please enter a valid email.");
      return;
    }
    if (!formData.phone.trim() || !isValidPhone(formData.phone)) {
      setErrorMsg("Please enter a valid phone number.");
      return;
    }

    setSubmitting(true);

    try {
      const pdfUrl = story?.caseStudyPdf?.url;

      if (pdfUrl) {
        setShowPopup(false);
        window.open(pdfUrl, "_blank", "noopener,noreferrer");
      } else {
        setErrorMsg("PDF not available for this case study.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setErrorMsg("Something went wrong. Try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-black text-white min-h-screen">
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full h-[320px] md:h-[460px] bg-cover bg-center flex items-end border-b border-gray-800"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.85)), url('${
            story.banner?.url || "/images/default-placeholder.jpg"
          }')`,
        }}
      >
        <div className="p-4 pb-10 max-w-full mx-auto md:mx-[90px]">
          <h1 className="text-2xl md:text-5xl font-bold leading-tight mb-4">
            {story.title}
          </h1>
        </div>
      </motion.div>

      {/* WHITE CONTENT CARD */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white text-black max-w-full md:mx-[90px] mt-10 m-3 rounded-2xl shadow-lg p-6 md:p-10 relative z-20"
      >
        <div className="md:grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 flex flex-col items-center">
          {/* LEFT CONTENT */}
          <div>
            {story.summary && (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-7 rounded-sm bg-gradient-to-b from-orange-500 to-red-600"></div>
                  <h2 className="text-[28px] font-bold">Executive Summary</h2>
                </div>
                <p className="text-gray-700 mb-6">{story.summary}</p>
              </>
            )}

            {story.challengesBottlenecks && (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-7 rounded-sm bg-gradient-to-b from-orange-500 to-red-600"></div>
                  <h2 className="text-[28px] font-bold ">
                    Challenges & Bottlenecks
                  </h2>
                </div>
                <p className="text-gray-700 mb-6  leading-relaxed">
                  {story.challengesBottlenecks}
                </p>
              </>
            )}

            {story.turningPoint && (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-7 rounded-sm bg-gradient-to-b from-orange-500 to-red-600"></div>
                  <h2 className="text-[28px] font-bold text-black font-opensans">
                    Turning Point
                  </h2>
                </div>
                <p className="text-gray-700  leading-relaxed  mb-6">
                  {story.turningPoint}
                </p>
              </>
            )}

            {story.conclusion && (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-7 rounded-sm bg-gradient-to-b from-orange-500 to-red-600"></div>
                  <h2 className="text-[28px] font-bold text-black font-opensans">
                    Conclusion
                  </h2>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed ">
                  {story.conclusion}
                </p>
              </>
            )}
          </div>

          {/* RIGHT COMPANY CARD */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-[#D9D9D9] rounded-xl overflow-hidden w-[346px] md:relative"
          >
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-7 rounded-sm bg-gradient-to-b from-orange-500 to-red-600"></div>
                <h2 className="text-[18px] font-bold text-black font-opensans">
                  Company
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 font-medium">Client</p>
                  <p className="text-black font-semibold">
                    {story.client || "Unknown Client"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-600 font-medium">Industry</p>
                  <p className="text-black font-semibold">
                    {story.industry || "Not Available"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-600 font-medium">Location</p>
                  <p className="text-black font-semibold">
                    {story.location || "Not Available"}
                  </p>
                </div>
              </div>
            </div>

            {/* KEEPING CTA IMAGE PART EXACT */}
            <div className="relative w-full h-60 rounded-b-xl overflow-hidden">
              <img
                src="https://images.ctfassets.net/pj0maraabon4/6y8wFX0wjfCjpDEnYeVKxF/97fb5d243fdff20a639e6518e19c7035/6a0a6f6f0a80f5c092694b6b99d1d1c7c170574d.jpg"
                alt={story.title}
                title={story.title ? `${story.title} banner` : "Case study banner"}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/60"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
                <p className="text-lg font-semibold leading-tight">
                  Watched Our Videos ? <br /> Talk to Our Experts
                </p>

                <Link
                  href="/contact-us"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Contact DLUX"
                >
                  <button className="mt-4 border border-white rounded-full px-5 py-2 text-sm hover:bg-white hover:text-black transition">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[linear-gradient(90deg,#FF3901_0%,#F07800_100%)] h-[268px] flex flex-col items-center justify-center text-white p-8 md:mx-20 rounded-xl text-center md:my-10 mt-3"
        >
          <p className="mb-4 text-lg font-bold w-full md:w-[50%]">
            {story.banner?.description ||
              "Explore how innovation transformed this client’s success story."}
          </p>

          <button
            onClick={handleDownloadClick}
            className="bg-black text-white px-6 py-2 rounded-[60px] h-[59px] w-[241px] font-semibold hover:bg-gray-800 transition"
          >
            Download
          </button>
        </motion.div>

        {/* RELATED STORIES */}
        <div className="mt-16">
          <h2 className="text-[40px] font-bold mb-16">Featured Case Studies</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedStories.map((item) => (
              <motion.div
                key={item.slug}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                onClick={() =>
                  router.push(`/resources/success-stories/${item.slug}`)
                }
                className="cursor-pointer rounded-xl overflow-hidden bg-gray-50 hover:shadow-lg transition flex flex-col h-full"
              >
                <div className="h-56 w-full overflow-hidden">
                  <img
                    src={item.banner?.url || ""}
                    alt={item.title}
                    title={item.title ? `${item.title} banner` : "Featured case study image"}
                    className="w-full h-full object-cover rounded-[16px]"
                  />
                </div>

                <div className="p-5 flex flex-col flex-grow bg-white">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 text-sm flex-grow line-clamp-3">
                    {item.shortDescription}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* POPUP */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => !submitting && setShowPopup(false)}
            ></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative z-50 w-[92%] max-w-md p-7 rounded-3xl bg-white/10 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.45)] text-white"
            >
              <button
                onClick={() => !submitting && setShowPopup(false)}
                className="absolute right-4 top-4 text-xl"
              >
                ✕
              </button>

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold">Access the Case Study</h3>

                <p className="text-sm text-gray-200 mt-2">
                  Fill this quick form to get the PDF.
                </p>
              </div>

              <form
                action="https://forms.zohopublic.in/dluxtech/form/CaseStudy/formperma/0LVpLbO3hslRPlQhT44Z9tQvahSsqj3xJwwmeLn_4Sg/htmlRecords/submit"
                method="POST"
                onSubmit={handleZohoSubmit}
                className="space-y-5"
              >
                <input
                  type="text"
                  name="Name_First"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/15"
                  placeholder="First Name"
                />

                <input
                  type="email"
                  name="Email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/15"
                  placeholder="Email"
                />

                <input
                  type="text"
                  name="PhoneNumber_countrycode"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/15"
                  placeholder="Phone"
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-br from-orange-500 via-red-500 to-red-700 font-semibold"
                >
                  Submit & Download
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

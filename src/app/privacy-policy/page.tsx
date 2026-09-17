import PrivacyHeroSection from "@/src/components/sections/privacy-policy/PrivacyHeroSection";
import PrivacyPolicy from "@/src/components/sections/privacy-policy/PrivacyPolicy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | DLUX TECH CORP PTY LTD",
  description:
    "Read the official Privacy Policy of DLUX TECH CORP PTY LTD. Learn how we collect, use, store, and protect personal information in compliance with the Privacy Act 1988 (Cth).",
  keywords: [
    "DLUX Privacy Policy",
    "DLUX Data Protection",
    "Privacy Act 1988",
    "Australian Privacy Principles",
    "DLUX Personal Information",
  ],
  openGraph: {
    title: "Privacy Policy | DLUX TECH CORP PTY LTD",
    description:
      "Understand how DLUX collects, uses and protects your personal information.",
    url: "https://www.dluxtech.com/privacy-policy",
    siteName: "DLUX Tech",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
<>
 <PrivacyHeroSection/>
 <PrivacyPolicy/>
 </>

  );
}

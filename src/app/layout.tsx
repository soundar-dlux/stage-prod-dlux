import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "../app/globals.css";
import Header from "@/src/components/layout/Header";
import Footer from "../components/layout/Footer";
import { TempNav } from "../components/layout/tempNav";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "DLUX Tech | Agentic AI, Martech Consulting | Adobe & Salesforce Experts",

  description:
    "DLUX Tech is a leading Adobe Partner and enterprise Martech consulting company specializing in Agentic AI, Workfront, Workfront Fusion, Aprimo, Salesforce, and Dataiku. We deliver automation, integration, and scalable digital transformation solutions.",

  verification: {
    google: "13QWeGuJp7jaG0xpnO24Lwuv8RBcP2EC7bqBFvMikYw",
  },

  openGraph: {
    title: "DLUX | Technology Amplified, Marketing Simplified",
    description:
      "Revolutionizing digital journeys with scalable martech solutions designed for performance, personalization, and growth.",
    url: "https://www.dluxtech.com",
    siteName: "DLUX",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "DLUX marketing technology solutions overview",
      },
    ],
    type: "website",
  },

  alternates: {
    canonical: "https://www.dluxtech.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} antialiased`}>
        {/* <Header /> */}
        <TempNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
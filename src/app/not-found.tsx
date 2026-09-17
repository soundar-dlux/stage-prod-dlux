"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PrimaryButton from "../components/ui/Buttons/PrimaryButton";
import SecondaryButton from "../components/ui/Buttons/SecondaryButton";
import Image from "next/image";

export default function Custom404Page() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [router]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white flex items-center justify-center px-6 pt-[10%] pb-20">
      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-100px] h-[320px] w-[320px] rounded-full bg-orange-500/20 blur-[120px]" />
      <div className="absolute bottom-[-120px] right-[-100px] h-[320px] w-[320px] rounded-full bg-red-500/20 blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,115,0,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,60,0,0.08),transparent_30%)]" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Main Card */}
      <div className="relative z-10 max-w-6xl w-full gap-10 items-center rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(255,90,0,0.12)] p-8 md:p-14 overflow-hidden">
        {/* Decorative Glow Border */}
        <div className="absolute inset-0 rounded-[40px] border border-white/10 pointer-events-none" />
        <div className="absolute -top-20 -right-20 h-56 w-56 bg-orange-500/20 blur-[100px] rounded-full" />

        {/* Left Content */}
        <div className="relative z-10 space-y-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-gray-300 border border-white/10">
            <Image
              src="https://images.ctfassets.net/pj0maraabon4/4WH6837PWmPPMC4GKpyDbY/1a3fbb4bb45e6b9490e97039d47de480/dlux-dark-logo-subtitle.svg"
              alt="DLUX AI & Martech Innovation Center logo representing advanced artificial intelligence, marketing technology solutions, and digital transformation expertise"
              title="DLUX AI & Martech Innovation Center"
              width={24}
              height={24}
              priority
            />
           Oops! Page Not Found
          </span>

          <div>
            <h1 className="text-[90px] md:text-[130px] font-black leading-none tracking-[-6px] bg-gradient-to-b from-white via-orange-200 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,120,0,0.25)]">
              404
            </h1>

            <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-white">
              Even the best explorers get lost sometime
            </h2>
          </div>

          <p className="max-w-xl text-base md:text-lg leading-8 text-gray-400">
           Looks like you’ve taken a wrong turn… or the page has moved.<br/> But don’t worry — we’ll help you get back on track.
          </p>
         

          {/* Auto Redirect Notice */}
          <div className="inline-flex items-center gap-2 rounded-2xl border border-orange-500/20 bg-orange-500/10 px-5 py-3 text-sm text-orange-200 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
            Redirecting to homepage in{" "}
            <span className="font-bold text-white">{countdown}s</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/">
              <PrimaryButton>Back to Home</PrimaryButton>
            </Link>

            <Link href="/contact-us">
              <SecondaryButton>Contact Support</SecondaryButton>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-4 pt-6 sm:grid-cols-3">
            {[
              { title: "Homepage", desc: "Return to start" },
              { title: "Services", desc: "Explore offerings" },
              { title: "Contact-Us", desc: "Reach our team" },
            ].map((item, index) => (
              <a
                key={index}
                href={`/${
                  item.title.toLowerCase() === "homepage"
                    ? ""
                    : item.title.toLowerCase()
                }`}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:bg-white/[0.06]"
              >
                <h3 className="text-sm font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {item.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
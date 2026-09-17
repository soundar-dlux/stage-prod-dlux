"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  initial: {
    opacity: 0,
    y: 40,
  },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.8, 0.25, 1], // ✅ Proper typed easing
    },
  },
};
export default function CookiePolicySection() {
  return (
    <section className="relative max-w-6xl mx-auto px-6 py-24 text-white">

      

      <div className="space-y-20 text-[16px] leading-relaxed">

        {/* COOKIE NOTICE INTRO */}
        <motion.section {...fadeUp}>
          <p className="mb-6 text-white/90">
            This Cookie Notice applies to DLUX TECH CORP PTY LTD ("DLUX",
            "we", "us", or "our") and informs you about our use of cookies
            across our websites, applications, and services ("Service").
            For more details on personal information handling, please review our{" "}
            <Link href="/privacy-policy" className="text-orange-400 underline">
              Privacy Policy
            </Link>.
          </p>

          <p className="mb-6 text-white/90">
            When accessing our Services in certain jurisdictions, you may
            receive a notification regarding cookies. By clicking
            "accept cookies," you consent to the use of these technologies.
          </p>

          <p className="mb-6 text-white/90">
            You may withdraw consent at any time. Adjust your browser
            settings to reject or limit cookies. Please note that disabling
            cookies may affect functionality.
          </p>

          <p className="text-white/90">
            We may periodically update this Cookie Notice. Updated versions
            will be published at{" "}
            <a
              href="https://www.dluxtech.com"
              className="text-orange-400 underline"
              target="_blank"
            >
              www.dluxtech.com
            </a>.
          </p>
        </motion.section>

        {/* WHAT ARE COOKIES */}
        <motion.section {...fadeUp}>
          <h2 className="text-2xl font-semibold mb-6">What Are Cookies</h2>

          <p className="mb-6 text-white/90">
            Cookies are small files placed on your device when you access our
            Services. They help identify your browser and remember preferences.
          </p>

          <p className="text-white/90">
            Cookies set by DLUX are “first-party cookies.” Others are
            “third-party cookies,” used for analytics, advertising,
            and social features.
          </p>
        </motion.section>

        {/* WHY WE USE COOKIES */}
        <motion.section {...fadeUp}>
          <h2 className="text-2xl font-semibold mb-6">Why We Use Cookies</h2>

          <p className="mb-6 text-white/90">
            Essential cookies ensure core functionality such as secure login
            sessions.
          </p>

          <p className="mb-6 text-white/90">
            We also use cookies for interest-based advertising, analytics,
            and personalization.
          </p>

          <ul className="list-disc pl-6 space-y-3 text-white/90">
            <li>Recognize returning visitors</li>
            <li>Improve website performance</li>
            <li>Integrate social media</li>
            <li>Analyze browsing behaviors</li>
            <li>Understand customer interests</li>
          </ul>
        </motion.section>

        {/* COOKIES WE USE */}
        <motion.section {...fadeUp}>
          <h2 className="text-2xl font-semibold mb-8">
            The Cookies We Use
          </h2>

          <div className="space-y-10">

            <div>
              <h3 className="font-semibold text-lg mb-2">
                Strictly Necessary Cookies
              </h3>
              <p className="text-white/90">
                Required for secure access and service operation.
                These cannot be refused.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                Performance & Functionality Cookies
              </h3>
              <p className="text-white/90">
                Recognize returning users and remember preferences.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                Analytical Cookies (Google Analytics)
              </h3>
              <p className="text-white/90">
                Help us measure service usage and improve performance.
                You may opt out via Google tools.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                Tracking & Advertising Cookies
              </h3>
              <p className="text-white/90">
                Used to display relevant advertisements and measure
                effectiveness.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                Social Media Cookies
              </h3>
              <p className="text-white/90">
                Enable integration of social features and advertising.
              </p>
            </div>

          </div>
        </motion.section>

        {/* CONTROL COOKIES */}
        <motion.section id="control-cookies" {...fadeUp}>
          <h2 className="text-2xl font-semibold mb-6">
            How to Control Cookies
          </h2>

          <p className="mb-6 text-white/90">
            You can modify browser settings to block or delete cookies.
            Certain features may not function properly if disabled.
          </p>

          <ul className="list-disc pl-6 space-y-3 text-white/90">
            <li>
              <a href="https://support.google.com/chrome" className="underline text-orange-400">Google Chrome</a>
            </li>
            <li>
              <a href="https://support.mozilla.org" className="underline text-orange-400">Mozilla Firefox</a>
            </li>
            <li>
              <a href="https://support.apple.com" className="underline text-orange-400">Safari</a>
            </li>
            <li>
              <a href="https://support.microsoft.com" className="underline text-orange-400">Microsoft Edge</a>
            </li>
          </ul>
        </motion.section>

        {/* WEB BEACONS */}
        <motion.section {...fadeUp}>
          <h2 className="text-2xl font-semibold mb-6">Web Beacons</h2>

          <p className="text-white/90">
            Web beacons (tracking pixels) help monitor navigation,
            advertisement performance, and email engagement.
          </p>
        </motion.section>

        {/* TARGETED ADS */}
        <motion.section {...fadeUp}>
          <h2 className="text-2xl font-semibold mb-6">
            Targeted Advertising
          </h2>

          <p className="text-white/90">
            Third-party advertising networks may use cookies for targeted
            advertising and analytics beyond our control.
          </p>
        </motion.section>

        {/* CONTACT */}
        <motion.section {...fadeUp}>
          <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>

          <address className="not-italic space-y-2 text-white/90">
            <p>Privacy Team</p>
            <p>DLUX TECH CORP PTY LTD</p>
            <p>Suite-3, Level 2, 9 George Street</p>
            <p>Parramatta CBD, Sydney - NSW 2150</p>
            <p>
              Email:{" "}
              <a
                href="mailto:privacy@dluxtech.com"
                className="text-orange-400 underline"
              >
                privacy@dluxtech.com
              </a>
            </p>
          </address>
        </motion.section>

      </div>
    </section>
  );
}

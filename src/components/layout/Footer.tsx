"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import { footerLinks, FooterLink } from "@/src/lib/Footer/footerLinks";
import { JSX } from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Logo + Social */}
          <div>
            <Image
              src="/dlux_tech_logo_fin.webp"
              alt="DLUX AI and Martech Innovation Center logo representing artificial intelligence, marketing technology, and digital transformation solutions"
              title="DLUX AI & Martech Innovation Center"
              width={140}
              height={40}
              sizes="(max-width:768px) 100vw, 180px"
              priority
            />

            <div className="flex gap-4 mt-6">
              <SocialIcon
                icon={<FaLinkedinIn />}
                label="LinkedIn"
                href="https://www.linkedin.com/company/dlux-tech-corp/"
              />

              <SocialIcon
                icon={<FaTwitter />}
                label="Twitter"
                href="https://x.com/Dlux_Tech"
              />

              <SocialIcon
                icon={<FaYoutube />}
                label="YouTube"
                href="https://www.youtube.com/@DLUXTECH"
              />

              <SocialIcon
                icon={<FaInstagram />}
                label="Instagram"
                href="https://www.instagram.com/dlux_tech/"
              />

              <SocialIcon
                icon={<FaFacebookF />}
                label="Facebook"
                href="https://www.facebook.com/DLUXTech/"
              />
            </div>
          </div>

          {/* Map */}
          <div className="lg:flex justify-end">
            <Image
              src="/footer-globe-map-03.png"
              alt="Global Presence"
              title="DLUX global presence map"
              width={700}
              height={360}
              className="opacity-100"
            />
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-16">
          <FooterColumn title="Quick Links" links={footerLinks.quickLinks} />
          <FooterColumn title="About DLUX" links={footerLinks.about} />
          <FooterColumn title="Resources" links={footerLinks.resources} />

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>

            <ul className="space-y-4 text-sm text-gray-300">
              {/* Address (Google Maps link optional) */}
              <li className="flex gap-3">
                <MdLocationOn className="text-lg mt-1" />
                <Link
                  href="https://www.google.com/maps?q=Parramatta+CBD+Sydney+NSW+2150"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View DLUX office on Google Maps"
                  className="hover:text-[#FF3901] transition"
                >
                  Suite-3, Level 2, 9 George Street
                  <br />
                  Parramatta CBD, Sydney – NSW 2150
                </Link>
              </li>

              <li className="flex gap-3 items-center">
                <MdEmail className="text-lg" />
                <a
                  href="mailto:sales@dluxtech.com"
                  title="Email sales@dluxtech.com"
                  className="hover:text-[#FF3901] transition"
                >
                  sales@dluxtech.com
                </a>
              </li>

              <li className="flex gap-3 items-center">
                <MdPhone className="text-lg" />
                <a
                  href="tel:+61411048090"
                  title="Call DLUX"
                  className="hover:text-[#FF3901] transition"
                >
                  +61 411 048 090
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} DLUX TECH CORP PVT LTD – All Rights
            Reserved
          </p>

          <div className="flex gap-6">
            <FooterBottomLink label="Privacy Policy" href="/privacy-policy" />
            <FooterBottomLink label="Cookie Policy" href="/cookie-policy" />
            <FooterBottomLink label="Trust & Security" href="/about/why-dlux" />
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Components ---------------- */

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  const pathname = usePathname();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      <ul className="space-y-3 text-sm">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                prefetch
                className={`transition-all duration-300 ${isActive
                  ? "text-[#FF3901] font-medium"
                  : "text-gray-400 hover:text-[#FF3901] hover:translate-x-1"
                  }`}
                title={link.label}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ✅ ONLY UPDATED PART */
function SocialIcon({
  icon,
  label,
  href,
}: {
  icon: JSX.Element;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-600
      hover:bg-gradient-to-r hover:from-[#FF3901] hover:to-[#F07800] hover:text-white hover:border-white transition"
    >
      {icon}
    </Link>
  );
}

function FooterBottomLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      title={label}
      className={`transition-all duration-300 ${isActive
        ? "text-[#FF3901]"
        : "text-gray-400 hover:text-[#FF3901]"
        }`}
    >
      {label}
    </Link>
  );
}

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { FaAngleRight, FaPlus, FaMinus } from "react-icons/fa6";
import { X, Menu } from "lucide-react";
import Button from "../ui/Button";

const navItems: string[] = [
  "Home",
  "About",
  "Platform",
  "Services",
  "Industries",
  "Resources",
];

interface SubMenuItem {
  title: string;
  sub?: string[];
}

const menuStructure: Record<string, SubMenuItem[]> = {
  About: [
    { title: "Our Growth Story" },
    { title: "Partners" },
    { title: "Careers" },
    { title: "Our Team" },
    { title: "Why DLUX" },
  ],
  Services: [
    { title: "Adobe Managed Services" },
    { title: "Digital & MarTech Consulting" },
    { title: "Managed Application Services" },
    { title: "Training & Change Management" },
    { title: "Content Management & DAM" },
    { title: "Innovation Agentic AI" },
  ],
  Platform: [
    {
      title: "Adobe",
      sub: [
        "Workfront",
        "Workfront Fusion",
        "Adobe AEM",
        "Adobe Commerce",
        "Adobe Analytics",
        "Adobe AEP",
      ],
    },
    { title: "Salesforce", sub: ["Commerce Cloud"] },
    { title: "Aprimo" },
    { title: "Dataiku" },
    { title: "Bynder" },
  ],
  Industries: [{ title: "Retail" }],
  Resources: [
    { title: "Blogs" },
    { title: "Success Stories" },
    { title: "Our Webinars" },
    { title: "Video Library" },
  ],
};

const toSafeSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s*&\s*/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");

export function tempNav() {
  const [open, setOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const [openMobileSub, setOpenMobileSub] = useState<string | null>(null);
  const pathname = usePathname();

  // Prevent background scrolling when mobile fullscreen menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const toggleMenu = () => setOpen(!open);

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;

    return `relative transition-colors duration-200 font-medium px-1 py-1 block ${
      isActive ? "text-[#FF3901]" : "text-gray-200 hover:text-[#FF3901]"
    }`;
  };

  return (
    <>
      {/* =================================================== */}
      {/* 🔹 SIMPLE FIXED STATIC HEADER                       */}
      {/* =================================================== */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image
              src="/dlux_tech_logo_fin.webp"
              alt="DLUX Tech Logo"
              width={165}
              height={38}
              quality={85}
              priority
              className="object-contain"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-7">
            <ul className="flex items-center gap-7">
              {navItems.map((item) => {
                const baseHref =
                  item === "Home" ? "/" : `/${toSafeSlug(item)}`;

                return (
                  <li key={item} className="relative group">
                    <Link href={baseHref} className={getLinkClass(baseHref)}>
                      <span className="relative inline-block font-semibold text-[15px]">
                        {item}

                        {/* Active / Hover Underline */}
                        <span
                          className={`absolute left-0 -bottom-1 h-[2px] w-full bg-[#FF3901] transform transition-transform duration-200 origin-left ${
                            pathname === baseHref
                              ? "scale-x-100"
                              : "scale-x-0 group-hover:scale-x-100"
                          }`}
                        />
                      </span>
                    </Link>

                    {/* DROPDOWN MENU */}
                    {menuStructure[item] && (
                      <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div className="bg-neutral-950 border border-white/15 rounded-xl shadow-2xl p-4 w-64 text-white">
                          {menuStructure[item].map((subItem, i) => {
                            const subHref = `/${toSafeSlug(item)}/${toSafeSlug(
                              subItem.title
                            )}`;

                            return (
                              <div key={i} className="relative group/sub">
                                <Link
                                  href={subHref}
                                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                                    pathname === subHref
                                      ? "text-[#FF3901] bg-white/5 font-semibold"
                                      : "text-gray-300 hover:text-[#FF3901] hover:bg-white/5"
                                  }`}
                                >
                                  <span>{subItem.title}</span>

                                  {subItem.sub && (
                                    <FaAngleRight className="text-xs opacity-70 group-hover/sub:translate-x-1 transition-transform duration-200 text-gray-400" />
                                  )}
                                </Link>

                                {/* DEEP MENU (3rd level) */}
                                {subItem.sub && (
                                  <div className="absolute left-full top-0 pl-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200">
                                    <div className="bg-neutral-950 border border-white/15 rounded-xl shadow-2xl p-4 w-64 text-white">
                                      {subItem.sub.map((deep, j) => {
                                        const deepHref = `/${toSafeSlug(
                                          item
                                        )}/${toSafeSlug(
                                          subItem.title
                                        )}/${toSafeSlug(deep)}`;

                                        return (
                                          <Link
                                            key={j}
                                            href={deepHref}
                                            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                              pathname === deepHref
                                                ? "text-[#FF3901] bg-white/5 font-semibold"
                                                : "text-gray-300 hover:text-[#FF3901] hover:bg-white/5"
                                            }`}
                                          >
                                            {deep}
                                          </Link>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* DESKTOP CTA BUTTON */}
          <div className="hidden lg:block">
            <Link href="/contact-us">
              <Button>Contact Us</Button>
            </Link>
          </div>

          {/* HAMBURGER TOGGLE BUTTON */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* =================================================== */}
      {/* 🔹 BLACK MOBILE ALL-SCREEN (FULLSCREEN) MENU       */}
      {/* =================================================== */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 w-full h-screen z-[999999] bg-black text-white flex flex-col justify-between overflow-y-auto px-6 py-6"
          >
            {/* MOBILE TOP BAR */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-5">
              <Link href="/" onClick={() => setOpen(false)}>
                <Image
                  src="/dlux_tech_logo_fin.webp"
                  alt="DLUX Tech Logo"
                  width={150}
                  height={36}
                  quality={85}
                  priority
                  className="object-contain"
                />
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800 transition-colors"
                aria-label="Close mobile menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* MOBILE NAVIGATION LINKS */}
            <div className="flex-1 py-6 flex flex-col gap-3">
              {navItems.map((item) => {
                const baseHref =
                  item === "Home" ? "/" : `/${toSafeSlug(item)}`;
                const hasSub = !!menuStructure[item];
                const isMenuOpen = openMobileMenu === item;

                return (
                  <div
                    key={item}
                    className="border-b border-neutral-900 pb-3"
                  >
                    <div className="flex items-center justify-between py-1">
                      <Link
                        href={baseHref}
                        onClick={() => setOpen(false)}
                        className={`text-xl font-bold tracking-tight transition-colors ${
                          pathname === baseHref
                            ? "text-[#FF3901]"
                            : "text-white hover:text-[#FF3901]"
                        }`}
                      >
                        {item}
                      </Link>

                      {hasSub && (
                        <button
                          onClick={() =>
                            setOpenMobileMenu(isMenuOpen ? null : item)
                          }
                          className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-gray-300 hover:text-white"
                          aria-label={`Toggle ${item} sub menu`}
                        >
                          {isMenuOpen ? (
                            <FaMinus className="text-xs" />
                          ) : (
                            <FaPlus className="text-xs" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* MOBILE SUB MENU ACCORDION */}
                    <AnimatePresence>
                      {hasSub && isMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-3 ml-4 border-l-2 border-[#FF3901]/40 pl-4 flex flex-col gap-2.5 overflow-hidden"
                        >
                          {menuStructure[item].map((subItem) => {
                            const subHref = `/${toSafeSlug(item)}/${toSafeSlug(
                              subItem.title
                            )}`;
                            const isSubOpen = openMobileSub === subItem.title;

                            return (
                              <div key={subItem.title} className="py-1">
                                <div className="flex items-center justify-between">
                                  <Link
                                    href={subHref}
                                    onClick={() => setOpen(false)}
                                    className={`text-base font-medium transition-colors ${
                                      pathname === subHref
                                        ? "text-[#FF3901]"
                                        : "text-neutral-300 hover:text-white"
                                    }`}
                                  >
                                    {subItem.title}
                                  </Link>

                                  {subItem.sub && (
                                    <button
                                      onClick={() =>
                                        setOpenMobileSub(
                                          isSubOpen ? null : subItem.title
                                        )
                                      }
                                      className="p-1.5 text-neutral-400 hover:text-white"
                                      aria-label={`Toggle ${subItem.title} sub menu`}
                                    >
                                      {isSubOpen ? (
                                        <FaMinus className="text-[10px]" />
                                      ) : (
                                        <FaPlus className="text-[10px]" />
                                      )}
                                    </button>
                                  )}
                                </div>

                                {/* DEEP MOBILE MENU */}
                                <AnimatePresence>
                                  {subItem.sub && isSubOpen && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="mt-2 ml-4 flex flex-col gap-2 border-l border-neutral-800 pl-3 overflow-hidden"
                                    >
                                      {subItem.sub.map((deep) => {
                                        const deepHref = `/${toSafeSlug(
                                          item
                                        )}/${toSafeSlug(
                                          subItem.title
                                        )}/${toSafeSlug(deep)}`;

                                        return (
                                          <Link
                                            key={deep}
                                            href={deepHref}
                                            onClick={() => setOpen(false)}
                                            className={`text-sm transition-colors py-1 ${
                                              pathname === deepHref
                                                ? "text-[#FF3901] font-medium"
                                                : "text-neutral-400 hover:text-white"
                                            }`}
                                          >
                                            {deep}
                                          </Link>
                                        );
                                      })}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* MOBILE FOOTER CTA */}
            <div className="pt-4 border-t border-neutral-800">
              <Link href="/contact-us" onClick={() => setOpen(false)}>
                <button className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FF780C] to-[#FE3908] text-white font-bold text-base shadow-xl hover:opacity-95 transition-all">
                  Contact Us
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export const TempNav = tempNav;
export default tempNav;

"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { FaAngleRight, FaAngleDown } from "react-icons/fa6";
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
  href?: string;
  sub?: Array<{ title: string; href?: string }>;
}

const menuStructure: Record<string, SubMenuItem[]> = {
  About: [
    { title: "Our Growth Story", href: "/about/our-growth-story" },
    { title: "Partners", href: "/about/partners" },
    { title: "Careers", href: "/about/careers" },
    { title: "Our Team", href: "/about/our-team" },
    { title: "Why DLUX", href: "/about/why-dlux" },
  ],
  Services: [
    { title: "Adobe Managed Services", href: "/services/adobe-managed-services" },
    { title: "Digital & MarTech Consulting", href: "/services/digital-&-martech-consulting" },
    { title: "Managed Application Services", href: "/services/managed-application-services" },
    { title: "Training & Change Management", href: "/services/training-&-change-management" },
    { title: "Content Management & DAM", href: "/services/content-management-&-dam" },
    { title: "Innovation Agentic AI", href: "/services/innovation-agentic-ai" },
  ],
  Platform: [
    {
      title: "Adobe",
      href: "/platform/adobe",
      sub: [
        { title: "Workfront", href: "/platform/adobe/workfront" },
        { title: "Workfront Fusion", href: "/platform/adobe/workfront-fusion" },
        { title: "Adobe AEM", href: "/platform/adobe/adobe-aem" },
        { title: "Adobe Commerce", href: "/platform/adobe/adobe-commerce" },
        { title: "Adobe Analytics", href: "/platform/adobe/adobe-analytics" },
        { title: "Adobe AEP", href: "/platform/adobe/adobe-aep" },
      ],
    },
    {
      title: "Salesforce",
      href: "/platform/salesforce",
      sub: [
        { title: "Commerce Cloud", href: "/platform/salesforce/commerce-cloud" },
      ],
    },
    { title: "Aprimo", href: "/platform/aprimo" },
    { title: "Dataiku", href: "/platform/dataiku" },
    { title: "Bynder", href: "/platform/bynder" },
  ],
  Industries: [
    { title: "Retail", href: "/industries/retail" },
  ],
  Resources: [
    { title: "Blogs", href: "/resources/blogs" },
    { title: "Success Stories", href: "/resources/success-stories" },
    { title: "Our Webinars", href: "/resources/our-webinars" },
    { title: "Video Library", href: "/resources/video-library" },
  ],
};

const getBaseHref = (item: string) => {
  if (item === "Home") return "/";
  return `/${item.toLowerCase().trim().replace(/\s+/g, "-")}`;
};

export function tempNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const [openMobileSub, setOpenMobileSub] = useState<string | null>(null);

  // Desktop active menu state with debounce for smooth hover transitions
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const subMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navContainerRef = useRef<HTMLElement | null>(null);

  const pathname = usePathname();

  // Close menus on page navigation
  useEffect(() => {
    setActiveMenu(null);
    setActiveSubMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  // Handle outside click to dismiss open dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(e.target as Node)
      ) {
        setActiveMenu(null);
        setActiveSubMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  // Desktop Menu Hover Handlers (Grace Period prevents accidental loss on diagonal cursor movements)
  const handleMenuEnter = (item: string) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
      menuTimeoutRef.current = null;
    }
    setActiveMenu(item);
  };

  const handleMenuLeave = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setActiveSubMenu(null);
    }, 220); // 220ms safe bridge time
  };

  const handleSubMenuEnter = (title: string) => {
    if (subMenuTimeoutRef.current) {
      clearTimeout(subMenuTimeoutRef.current);
      subMenuTimeoutRef.current = null;
    }
    setActiveSubMenu(title);
  };

  const handleSubMenuLeave = () => {
    if (subMenuTimeoutRef.current) clearTimeout(subMenuTimeoutRef.current);
    subMenuTimeoutRef.current = setTimeout(() => {
      setActiveSubMenu(null);
    }, 220); // 220ms safe bridge time
  };

  const getLinkClass = (href: string) => {
    const isActive =
      pathname === href || (href !== "/" && pathname.startsWith(href));

    return `relative transition-colors duration-200 font-medium px-2 py-2 block ${
      isActive
        ? "text-[#FF3901]"
        : "text-gray-200 hover:text-[#FF3901]"
    }`;
  };

  return (
    <>
      {/* =================================================== */}
      {/* 🔹 FIXED STATIC DESKTOP HEADER                     */}
      {/* =================================================== */}
      <header
        ref={navContainerRef}
        className="top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-white/10"
      >
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
                const baseHref = getBaseHref(item);
                const hasDropdown = !!menuStructure[item];
                const isDropdownOpen = activeMenu === item;
                const isCurrentActive =
                  pathname === baseHref ||
                  (baseHref !== "/" && pathname.startsWith(baseHref));

                return (
                  <li
                    key={item}
                    className="relative py-4"
                    onMouseEnter={() => hasDropdown && handleMenuEnter(item)}
                    onMouseLeave={() => hasDropdown && handleMenuLeave()}
                  >
                    <div className="flex items-center gap-1">
                      <Link
                        href={baseHref}
                        className={getLinkClass(baseHref)}
                        onClick={() => {
                          if (!hasDropdown) {
                            setActiveMenu(null);
                          }
                        }}
                      >
                        <span className="relative inline-block font-semibold text-[15px]">
                          {item}

                          {/* Active / Hover Underline */}
                          <span
                            className={`absolute left-0 -bottom-1 h-[2px] w-full bg-[#FF3901] transform transition-transform duration-200 origin-left ${
                              isCurrentActive
                                ? "scale-x-100"
                                : "scale-x-0 group-hover:scale-x-100"
                            }`}
                          />
                        </span>
                      </Link>

                      {hasDropdown && (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenu(isDropdownOpen ? null : item);
                            setActiveSubMenu(null);
                          }}
                          className="p-1 text-gray-400 hover:text-[#FF3901] transition-colors cursor-pointer"
                          aria-label={`Toggle ${item} menu`}
                        >
                          <FaAngleDown
                            className={`text-xs transition-transform duration-200 ${
                              isDropdownOpen ? "rotate-180 text-[#FF3901]" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* LEVEL 2 DROPDOWN MENU */}
                    <AnimatePresence>
                      {hasDropdown && isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.16, ease: "easeOut" }}
                          className="absolute left-0 top-full pt-2 z-50 pointer-events-auto"
                          onMouseEnter={() => handleMenuEnter(item)}
                          onMouseLeave={handleMenuLeave}
                        >
                          <div className="bg-neutral-950/95 border border-white/15 rounded-xl shadow-2xl p-3 w-64 text-white backdrop-blur-xl">
                            {menuStructure[item].map((subItem) => {
                              const subHref =
                                subItem.href ||
                                `${baseHref}/${subItem.title
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`;
                              const hasSubSub =
                                !!subItem.sub && subItem.sub.length > 0;
                              const isSubOpen = activeSubMenu === subItem.title;
                              const isSubActive =
                                pathname === subHref ||
                                pathname.startsWith(`${subHref}/`);

                              return (
                                <div
                                  key={subItem.title}
                                  className="relative"
                                  onMouseEnter={() =>
                                    hasSubSub && handleSubMenuEnter(subItem.title)
                                  }
                                  onMouseLeave={() =>
                                    hasSubSub && handleSubMenuLeave()
                                  }
                                >
                                  <div className="flex items-center justify-between rounded-lg hover:bg-white/10 transition-colors">
                                    <Link
                                      href={subHref}
                                      onClick={() => {
                                        setActiveMenu(null);
                                        setActiveSubMenu(null);
                                      }}
                                      className={`flex-1 flex items-center px-3 py-2.5 text-sm transition-colors ${
                                        isSubActive
                                          ? "text-[#FF3901] font-semibold"
                                          : "text-gray-300 hover:text-white"
                                      }`}
                                    >
                                      <span>{subItem.title}</span>
                                    </Link>

                                    {hasSubSub && (
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setActiveSubMenu(
                                            isSubOpen ? null : subItem.title
                                          );
                                        }}
                                        className="px-2.5 py-2.5 text-gray-400 hover:text-[#FF3901] transition-colors cursor-pointer"
                                        aria-label={`Open ${subItem.title} submenu`}
                                      >
                                        <FaAngleRight
                                          className={`text-xs transition-transform duration-200 ${
                                            isSubOpen
                                              ? "translate-x-1 text-[#FF3901]"
                                              : ""
                                          }`}
                                        />
                                      </button>
                                    )}
                                  </div>

                                  {/* LEVEL 3 FLYOUT MENU */}
                                  <AnimatePresence>
                                    {hasSubSub && isSubOpen && (
                                      <motion.div
                                        initial={{ opacity: 0, x: -6, scale: 0.98 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -4, scale: 0.98 }}
                                        transition={{ duration: 0.14, ease: "easeOut" }}
                                        className="absolute left-full top-0 pl-2.5 z-50 pointer-events-auto
                                          before:absolute before:inset-y-0 before:-left-3 before:w-4 before:content-['']"
                                        onMouseEnter={() =>
                                          handleSubMenuEnter(subItem.title)
                                        }
                                        onMouseLeave={handleSubMenuLeave}
                                      >
                                        <div className="bg-neutral-950/95 border border-white/15 rounded-xl shadow-2xl p-3 w-64 text-white backdrop-blur-xl">
                                          {subItem.sub!.map((deep) => {
                                            const deepHref =
                                              deep.href ||
                                              `${subHref}/${deep.title
                                                .toLowerCase()
                                                .replace(/\s+/g, "-")}`;
                                            const isDeepActive =
                                              pathname === deepHref;

                                            return (
                                              <Link
                                                key={deep.title}
                                                href={deepHref}
                                                onClick={() => {
                                                  setActiveMenu(null);
                                                  setActiveSubMenu(null);
                                                }}
                                                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                                  isDeepActive
                                                    ? "text-[#FF3901] bg-white/5 font-semibold"
                                                    : "text-gray-300 hover:text-[#FF3901] hover:bg-white/5"
                                                }`}
                                              >
                                                {deep.title}
                                              </Link>
                                            );
                                          })}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* =================================================== */}
      {/* 🔹 BLACK MOBILE FULLSCREEN ACCORDION MENU          */}
      {/* =================================================== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 w-full h-screen z-[999999] bg-black text-white flex flex-col justify-between overflow-y-auto px-6 py-6"
          >
            {/* MOBILE TOP BAR */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-5">
              <Link href="/" onClick={() => setMobileOpen(false)}>
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
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                aria-label="Close mobile menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* MOBILE NAVIGATION ACCORDION LINKS */}
            <div className="flex-1 py-6 flex flex-col gap-3">
              {navItems.map((item) => {
                const baseHref = getBaseHref(item);
                const hasSub = !!menuStructure[item];
                const isMenuOpen = openMobileMenu === item;
                const isCurrentActive =
                  pathname === baseHref ||
                  (baseHref !== "/" && pathname.startsWith(baseHref));

                return (
                  <div key={item} className="border-b border-neutral-900 pb-3">
                    <div className="flex items-center justify-between py-1">
                      <Link
                        href={baseHref}
                        onClick={() => setMobileOpen(false)}
                        className={`text-xl font-bold tracking-tight transition-colors ${
                          isCurrentActive
                            ? "text-[#FF3901]"
                            : "text-white hover:text-[#FF3901]"
                        }`}
                      >
                        {item}
                      </Link>

                      {hasSub && (
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMobileMenu(isMenuOpen ? null : item)
                          }
                          className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-gray-300 hover:text-white transition cursor-pointer"
                          aria-label={`Toggle ${item} sub menu`}
                        >
                          <FaAngleDown
                            className={`text-xs transition-transform duration-200 ${
                              isMenuOpen ? "rotate-180 text-[#FF3901]" : ""
                            }`}
                          />
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
                            const subHref =
                              subItem.href ||
                              `${baseHref}/${subItem.title
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`;
                            const hasSubSub =
                              !!subItem.sub && subItem.sub.length > 0;
                            const isSubOpen = openMobileSub === subItem.title;
                            const isSubActive =
                              pathname === subHref ||
                              pathname.startsWith(`${subHref}/`);

                            return (
                              <div key={subItem.title} className="py-1">
                                <div className="flex items-center justify-between">
                                  <Link
                                    href={subHref}
                                    onClick={() => setMobileOpen(false)}
                                    className={`text-base font-medium transition-colors ${
                                      isSubActive
                                        ? "text-[#FF3901]"
                                        : "text-neutral-300 hover:text-white"
                                    }`}
                                  >
                                    {subItem.title}
                                  </Link>

                                  {hasSubSub && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setOpenMobileSub(
                                          isSubOpen ? null : subItem.title
                                        )
                                      }
                                      className="p-2 text-neutral-400 hover:text-white cursor-pointer"
                                      aria-label={`Toggle ${subItem.title} sub menu`}
                                    >
                                      <FaAngleDown
                                        className={`text-xs transition-transform duration-200 ${
                                          isSubOpen
                                            ? "rotate-180 text-[#FF3901]"
                                            : ""
                                        }`}
                                      />
                                    </button>
                                  )}
                                </div>

                                {/* DEEP MOBILE MENU */}
                                <AnimatePresence>
                                  {hasSubSub && isSubOpen && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="mt-2 ml-4 flex flex-col gap-2 border-l border-neutral-800 pl-3 overflow-hidden"
                                    >
                                      {subItem.sub!.map((deep) => {
                                        const deepHref =
                                          deep.href ||
                                          `${subHref}/${deep.title
                                            .toLowerCase()
                                            .replace(/\s+/g, "-")}`;
                                        const isDeepActive =
                                          pathname === deepHref;

                                        return (
                                          <Link
                                            key={deep.title}
                                            href={deepHref}
                                            onClick={() => setMobileOpen(false)}
                                            className={`text-sm transition-colors py-1.5 ${
                                              isDeepActive
                                                ? "text-[#FF3901] font-semibold"
                                                : "text-neutral-400 hover:text-white"
                                            }`}
                                          >
                                            {deep.title}
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
              <Link href="/contact-us" onClick={() => setMobileOpen(false)}>
                <button className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FF780C] to-[#FE3908] text-white font-bold text-base shadow-xl hover:opacity-95 transition-all cursor-pointer">
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

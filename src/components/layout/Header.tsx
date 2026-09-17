"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { FaAngleRight } from "react-icons/fa6";
import MobileMenu from "../layout/MobileMenu";
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

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setOpen(!open);

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;

    return `relative transition-all duration-300 font-medium px-2 py-1 block ${isActive ? "text-[#FF3901]" : "text-gray-200 hover:text-[#FF3901]"
      }`;
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50">
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
        <motion.div
          initial={false}
          animate={{
            marginTop: scrolled ? 20 : 0,
            paddingTop: scrolled ? 12 : 24,
            paddingBottom: scrolled ? 12 : 24,
            scale: scrolled ? 0.96 : 1,
            backdropFilter: scrolled ? "blur(25px)" : "blur(0)",
            backgroundColor: scrolled
              ? "rgba(255,255,255,0.12)"
              : "rgba(255,255,255,0)",
            borderRadius: scrolled ? 9999 : 0,
          }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-6xl mx-auto px-6 flex items-center justify-between"
        >
          {/* Logo */}
          <Link href="/">
            <Image
              src="/dlux_tech_logo_fin.webp"
              alt="DLUX Logo"
              width={scrolled ? 150 : 180}
              height={40}
              quality={70}
              sizes="(max-width:768px) 100vw, 180px"
              priority
              className="transition-all duration-500"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex">
            <ul
              className={`flex items-center gap-6 ${scrolled
                  ? ""
                  : "px-6 py-3 bg-white/20 backdrop-blur-xl rounded-full shadow-inner"
                }`}
            >
              {navItems.map((item) => {
                const getBaseHref = (item: string) => {
                  if (item === "Home") return "/";

                  // if (item === "Platform") {
                  //   return "/platform/adobe/workfront";
                  // }
                  // if (item === "Resources") {
                  //   return "/resources/blogs";
                  // }

                  // if (item === "Industries") {
                  //   return "/industries/retail";
                  // }

                  // if (item === "Adobe") {
                  //   return "/platform/adobe/workfront";
                  // }

                  return `/${item.toLowerCase().replace(/\s+/g, "-")}`;
                };

                const baseHref = getBaseHref(item);
                return (
                  <li key={item} className="relative group">
                    <Link href={baseHref} className={getLinkClass(baseHref)}>
                      <span className="relative inline-block">
                        {item}

                        {/* Active + Hover Underline */}
                        <span
                          className={`absolute left-0 -bottom-1 h-[2px] w-full bg-[#FF3901] transform transition-all duration-300 origin-left ${pathname === baseHref
                              ? "scale-x-100"
                              : "scale-x-0 group-hover:scale-x-100"
                            }`}
                        />
                      </span>
                    </Link>

                    {/* Dropdown */}
                    {menuStructure[item] && (
                      <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                        <div className="bg-neutral-900 border border-white/10 rounded-md shadow-lg p-4 w-64">
                          {menuStructure[item].map((subItem, i) => {
                            const subHref = `/${item.toLowerCase()}/${subItem.title
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`;

                            return (
                              <div key={i} className="relative group/sub">
                                <Link
                                  href={subHref}
                                  className={`flex items-center justify-between py-2 transition-all ${pathname === subHref
                                      ? "text-[#FF3901]"
                                      : "text-gray-300 hover:text-[#FF3901]"
                                    }`}
                                >
                                  <span>{subItem.title}</span>

                                  {subItem.sub && (
                                    <FaAngleRight className="text-xs opacity-70 group-hover/sub:translate-x-1 transition-transform duration-200" />
                                  )}
                                </Link>

                                {/* Deep Menu */}
                                {subItem.sub && (
                                  <div className="absolute left-full top-0 pl-3 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition">
                                    <div className="bg-neutral-900 border border-white/10 rounded-md shadow-lg p-4 w-64">
                                      {subItem.sub.map((deep, j) => {
                                        const deepHref = `/${item.toLowerCase()}/${subItem.title
                                          .toLowerCase()
                                          .replace(/\s+/g, "-")}/${deep
                                            .toLowerCase()
                                            .replace(/\s+/g, "-")}`;

                                        return (
                                          <Link
                                            key={j}
                                            href={deepHref}
                                            className={`block py-2 transition ${pathname === deepHref
                                                ? "text-[#FF3901]"
                                                : "text-gray-300 hover:text-[#FF3901]"
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

          {/* Contact Button */}
          {!scrolled && (
            <div className="hidden lg:block">
              <Link href="/contact-us">
                <Button>Contact Us</Button>
              </Link>
            </div>
          )}

          {/* Hamburger */}
          <motion.button
            onClick={toggleMenu}
            whileTap={{ scale: 0.8 }}
            className="lg:hidden flex flex-col w-10 h-10 justify-center items-center"
            aria-label="Open menu"
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }}
              className="w-7 h-[3px] bg-white mb-1"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              className="w-7 h-[3px] bg-white mb-1"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }}
              className="w-7 h-[3px] bg-white"
            />
          </motion.button>
        </motion.div>
      </header>

      <AnimatePresence>
        {open && (
          <MobileMenu navItems={navItems} onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}



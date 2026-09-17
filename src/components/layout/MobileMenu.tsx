"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";

interface MobileMenuProps {
  navItems: string[];
  onClose: () => void;
}

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
        "AEM",
        "Adobe Commerce",
        // "Adobe Analytics",
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

/* ✅ BASE ROUTES (IMPORTANT) */
const validPaths = [
  "/",
  "/about",
  "/services",
  "/platform",
  "/industries",
  "/resources",
];

export default function MobileMenu({ navItems, onClose }: MobileMenuProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);

 const toSafeId = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s*&\s*/g, "-&-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-&]/g, "")
    .replace(/-+/g, "-");

  /* ✅ FIXED VALIDATION (SUPPORTS NESTED ROUTES) */
  const isValid = (href: string) =>
    validPaths.some((path) => href.startsWith(path));

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="fixed top-0 right-0 h-screen w-[85%] sm:w-[75%] z-[9999999] lg:hidden overflow-y-auto backdrop-blur-xl bg-white/10 border-l border-white/20 shadow-2xl p-6 sm:p-8 text-white"
    >
      {/* CLOSE */}
      <div className="flex justify-end mb-8">
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20"
          aria-label="Close menu"
        >
          <X size={26} />
        </button>
      </div>

      {/* MENU */}
      <div className="flex flex-col gap-6">
        {navItems.map((item) => {
          const baseHref =
            item === "Home" ? "/" : `/${toSafeId(item)}`;

          const hasSub = !!menuStructure[item];

          return (
            <div key={item}>
              
              {/* MAIN */}
              <div className="flex justify-between items-center text-lg font-medium border-b border-white/10 pb-3">
                
                <Link
                  href={baseHref}
                  onClick={(e) => {
                    if (!isValid(baseHref)) {
                      e.preventDefault(); // ❌ block invalid
                    } else {
                      onClose();
                    }
                  }}
                  className="hover:text-orange-400 transition"
                >
                  {item}
                </Link>

                {hasSub && (
                  <button
                    onClick={() =>
                      setOpenMenu(
                        openMenu === item ? null : item
                      )
                    }
                    className="text-xl px-2"
                  >
                    {openMenu === item ? "−" : "+"}
                  </button>
                )}
              </div>

              {/* SUB MENU */}
              <AnimatePresence>
                {hasSub && openMenu === item && (
                  <motion.div className="ml-4 mt-3 flex flex-col gap-3">
                    {menuStructure[item].map((subItem) => {
                      const subHref = `/${toSafeId(item)}/${toSafeId(subItem.title)}`;

                      return (
                        <div key={subItem.title}>
                          
                          <div className="flex justify-between items-center text-sm text-gray-300">
                            
                            <Link
                              href={subHref}
                              onClick={(e) => {
                                if (!isValid(subHref)) {
                                  e.preventDefault();
                                } else {
                                  onClose();
                                }
                              }}
                              className="hover:text-orange-400 transition"
                            >
                              {subItem.title}
                            </Link>

                            {subItem.sub && (
                              <button
                                onClick={() =>
                                  setOpenSub(
                                    openSub === subItem.title
                                      ? null
                                      : subItem.title
                                  )
                                }
                                className="px-2"
                              >
                                {openSub === subItem.title ? "−" : "+"}
                              </button>
                            )}
                          </div>

                          {/* DEEP */}
                          <AnimatePresence>
                            {subItem.sub &&
                              openSub === subItem.title && (
                                <motion.div className="ml-4 mt-2 flex flex-col gap-2">
                                  {subItem.sub.map((deep) => {
                                    const deepHref = `/${toSafeId(item)}/${toSafeId(subItem.title)}/${toSafeId(deep)}`;

                                    return (
                                      <Link
                                        key={deep}
                                        href={deepHref}
                                        onClick={(e) => {
                                          if (!isValid(deepHref)) {
                                            e.preventDefault();
                                          } else {
                                            onClose();
                                          }
                                        }}
                                        className="text-sm text-gray-400 hover:text-orange-400 transition"
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

      {/* CTA */}
      <button
        onClick={onClose}
        className="mt-10 w-full bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3 rounded-full font-semibold shadow-lg hover:opacity-90 transition"
      >
        Contact Us
      </button>
    </motion.div>
  );
}
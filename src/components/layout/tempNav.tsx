"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { FaAngleRight, FaAngleDown } from "react-icons/fa6";
import { X, Menu } from "lucide-react";
import Button from "../ui/Button";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

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
  sub?: Array<{
    title: string;
    href?: string;
  }>;
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
    {
      title: "Adobe Managed Services",
      href: "/services/adobe-managed-services",
    },
    {
      title: "Digital & MarTech Consulting",
      href: "/services/digital-&-martech-consulting",
    },
    {
      title: "Managed Application Services",
      href: "/services/managed-application-services",
    },
    {
      title: "Training & Change Management",
      href: "/services/training-&-change-management",
    },
    {
      title: "Content Management & DAM",
      href: "/services/content-management-&-dam",
    },
    {
      title: "Innovation Agentic AI",
      href: "/services/innovation-agentic-ai",
    },
  ],

  Platform: [
    {
      title: "Adobe",
      href: "/platform/adobe",
      sub: [
        { title: "Workfront", href: "/platform/adobe/workfront" },
        {
          title: "Workfront Fusion",
          href: "/platform/adobe/workfront-fusion",
        },
        { title: "Adobe AEM", href: "/platform/adobe/adobe-aem" },
        {
          title: "Adobe Commerce",
          href: "/platform/adobe/adobe-commerce",
        },
        {
          title: "Adobe Analytics",
          href: "/platform/adobe/adobe-analytics",
        },
        { title: "Adobe AEP", href: "/platform/adobe/adobe-aep" },
      ],
    },
    {
      title: "Salesforce",
      href: "/platform/salesforce",
      sub: [
        {
          title: "Commerce Cloud",
          href: "/platform/salesforce/commerce-cloud",
        },
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

const getBaseHref = (item: string): string => {
  if (item === "Home") return "/";

  return `/${item.toLowerCase().trim().replace(/\s+/g, "-")}`;
};

const getSubHref = (
  item: SubMenuItem,
  baseHref: string
): string => {
  if (item.href) return item.href;

  const slug = item.title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  return `${baseHref}/${slug}`;
};

const getDeepHref = (
  item: { title: string; href?: string },
  parentHref: string
): string => {
  if (item.href) return item.href;

  const slug = item.title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  return `${parentHref}/${slug}`;
};

const isPathActive = (
  pathname: string,
  href: string
): boolean => {
  return (
    pathname === href ||
    (href !== "/" && pathname.startsWith(`${href}/`))
  );
};

export function TempNav() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] =
    useState<string | null>(null);
  const [openMobileSub, setOpenMobileSub] =
    useState<string | null>(null);

  const [activeMenu, setActiveMenu] =
    useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] =
    useState<string | null>(null);

  const menuTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const subMenuTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const navContainerRef = useRef<HTMLElement | null>(null);

  const clearMenuTimeout = useCallback(() => {
    if (menuTimeoutRef.current !== null) {
      clearTimeout(menuTimeoutRef.current);
      menuTimeoutRef.current = null;
    }
  }, []);

  const clearSubMenuTimeout = useCallback(() => {
    if (subMenuTimeoutRef.current !== null) {
      clearTimeout(subMenuTimeoutRef.current);
      subMenuTimeoutRef.current = null;
    }
  }, []);

  const closeDesktopMenus = useCallback(() => {
    clearMenuTimeout();
    clearSubMenuTimeout();
    setActiveMenu(null);
    setActiveSubMenu(null);
  }, [clearMenuTimeout, clearSubMenuTimeout]);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    setOpenMobileMenu(null);
    setOpenMobileSub(null);
  }, []);

  // Clear pending timers when the component unmounts.
  useEffect(() => {
    return () => {
      clearMenuTimeout();
      clearSubMenuTimeout();
    };
  }, [clearMenuTimeout, clearSubMenuTimeout]);

  // Close desktop dropdowns when clicking outside the header.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navContainerRef.current &&
        event.target instanceof Node &&
        !navContainerRef.current.contains(event.target)
      ) {
        closeDesktopMenus();
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [closeDesktopMenus]);

  // Support Escape and prevent background scrolling on mobile.
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [mobileOpen, closeMobileMenu]);

  // Desktop menu hover handlers.
  const handleMenuEnter = (item: string) => {
    clearMenuTimeout();
    setActiveMenu(item);
  };

  const handleMenuLeave = () => {
    clearMenuTimeout();

    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setActiveSubMenu(null);
      menuTimeoutRef.current = null;
    }, 220);
  };

  const handleSubMenuEnter = (title: string) => {
    clearSubMenuTimeout();
    setActiveSubMenu(title);
  };

  const handleSubMenuLeave = () => {
    clearSubMenuTimeout();

    subMenuTimeoutRef.current = setTimeout(() => {
      setActiveSubMenu(null);
      subMenuTimeoutRef.current = null;
    }, 220);
  };

  const getLinkClass = (href: string) => {
    const isActive = isPathActive(pathname, href);

    return `relative block px-2 py-2 font-medium transition-colors duration-200 ${
      isActive
        ? "text-[#FF3901]"
        : "text-gray-200 hover:text-[#FF3901]"
    }`;
  };

  return (
    <>
      {/* Desktop and mobile header */}
      <header
        ref={navContainerRef}
        className="relative top-0 left-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur-md"
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
            aria-label="DLUX Tech home"
          >
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

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center lg:flex"
          >
            <ul className="flex items-center gap-7">
              {navItems.map((item) => {
                const baseHref = getBaseHref(item);
                const hasDropdown = Boolean(menuStructure[item]);
                const isDropdownOpen = activeMenu === item;
                const isCurrentActive = isPathActive(
                  pathname,
                  baseHref
                );

                return (
                  <li
                    key={item}
                    className="relative py-4"
                    onMouseEnter={() => {
                      if (hasDropdown) {
                        handleMenuEnter(item);
                      }
                    }}
                    onMouseLeave={() => {
                      if (hasDropdown) {
                        handleMenuLeave();
                      }
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <Link
                        href={baseHref}
                        className={getLinkClass(baseHref)}
                        onClick={() => {
                          closeDesktopMenus();
                        }}
                      >
                        <span className="relative inline-block text-[15px] font-semibold">
                          {item}

                          <span
                            className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left transform bg-[#FF3901] transition-transform duration-200 ${
                              isCurrentActive
                                ? "scale-x-100"
                                : "scale-x-0"
                            }`}
                          />
                        </span>
                      </Link>

                      {hasDropdown && (
                        <button
                          type="button"
                          onClick={() => {
                            clearMenuTimeout();
                            clearSubMenuTimeout();

                            setActiveMenu(
                              isDropdownOpen ? null : item
                            );
                            setActiveSubMenu(null);
                          }}
                          className="cursor-pointer p-1 text-gray-400 transition-colors hover:text-[#FF3901]"
                          aria-label={`Toggle ${item} menu`}
                          aria-expanded={isDropdownOpen}
                          aria-haspopup="true"
                        >
                          <FaAngleDown
                            className={`text-xs transition-transform duration-200 ${
                              isDropdownOpen
                                ? "rotate-180 text-[#FF3901]"
                                : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Level 2 dropdown */}
                    <AnimatePresence>
                      {hasDropdown && isDropdownOpen && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 8,
                            scale: 0.98,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            y: 6,
                            scale: 0.98,
                          }}
                          transition={{
                            duration: 0.16,
                            ease: "easeOut",
                          }}
                          className="absolute left-0 top-full z-50 pt-2"
                          onMouseEnter={() =>
                            handleMenuEnter(item)
                          }
                          onMouseLeave={handleMenuLeave}
                        >
                          <div className="w-64 rounded-xl border border-white/15 bg-neutral-950/95 p-3 text-white shadow-2xl backdrop-blur-xl">
                            {menuStructure[item].map(
                              (subItem) => {
                                const subHref = getSubHref(
                                  subItem,
                                  baseHref
                                );

                                const hasSubSub = Boolean(
                                  subItem.sub?.length
                                );

                                const isSubOpen =
                                  activeSubMenu === subItem.title;

                                const isSubActive =
                                  isPathActive(
                                    pathname,
                                    subHref
                                  );

                                return (
                                  <div
                                    key={subItem.title}
                                    className="relative"
                                    onMouseEnter={() => {
                                      if (hasSubSub) {
                                        handleSubMenuEnter(
                                          subItem.title
                                        );
                                      }
                                    }}
                                    onMouseLeave={() => {
                                      if (hasSubSub) {
                                        handleSubMenuLeave();
                                      }
                                    }}
                                  >
                                    <div className="flex items-center justify-between rounded-lg transition-colors hover:bg-white/10">
                                      <Link
                                        href={subHref}
                                        onClick={closeDesktopMenus}
                                        className={`flex flex-1 items-center px-3 py-2.5 text-sm transition-colors ${
                                          isSubActive
                                            ? "font-semibold text-[#FF3901]"
                                            : "text-gray-300 hover:text-white"
                                        }`}
                                      >
                                        {subItem.title}
                                      </Link>

                                      {hasSubSub && (
                                        <button
                                          type="button"
                                          onClick={(event) => {
                                            event.stopPropagation();
                                            clearSubMenuTimeout();

                                            setActiveSubMenu(
                                              isSubOpen
                                                ? null
                                                : subItem.title
                                            );
                                          }}
                                          className="cursor-pointer px-2.5 py-2.5 text-gray-400 transition-colors hover:text-[#FF3901]"
                                          aria-label={`Toggle ${subItem.title} submenu`}
                                          aria-expanded={isSubOpen}
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

                                    {/* Level 3 flyout */}
                                    <AnimatePresence>
                                      {hasSubSub && isSubOpen && (
                                        <motion.div
                                          initial={{
                                            opacity: 0,
                                            x: -6,
                                            scale: 0.98,
                                          }}
                                          animate={{
                                            opacity: 1,
                                            x: 0,
                                            scale: 1,
                                          }}
                                          exit={{
                                            opacity: 0,
                                            x: -4,
                                            scale: 0.98,
                                          }}
                                          transition={{
                                            duration: 0.14,
                                            ease: "easeOut",
                                          }}
                                          className="absolute left-full top-0 z-50 pl-2.5 before:absolute before:inset-y-0 before:-left-3 before:w-4 before:content-['']"
                                          onMouseEnter={() =>
                                            handleSubMenuEnter(
                                              subItem.title
                                            )
                                          }
                                          onMouseLeave={
                                            handleSubMenuLeave
                                          }
                                        >
                                          <div className="w-64 rounded-xl border border-white/15 bg-neutral-950/95 p-3 text-white shadow-2xl backdrop-blur-xl">
                                            {subItem.sub!.map(
                                              (deep) => {
                                                const deepHref =
                                                  getDeepHref(
                                                    deep,
                                                    subHref
                                                  );

                                                const isDeepActive =
                                                  isPathActive(
                                                    pathname,
                                                    deepHref
                                                  );

                                                return (
                                                  <Link
                                                    key={deep.title}
                                                    href={deepHref}
                                                    onClick={
                                                      closeDesktopMenus
                                                    }
                                                    className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                                                      isDeepActive
                                                        ? "bg-white/5 font-semibold text-[#FF3901]"
                                                        : "text-gray-300 hover:bg-white/5 hover:text-[#FF3901]"
                                                    }`}
                                                  >
                                                    {deep.title}
                                                  </Link>
                                                );
                                              }
                                            )}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link href="/contact-us">
              <Button>Contact Us</Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => {
              if (mobileOpen) {
                closeMobileMenu();
              } else {
                setMobileOpen(true);
              }
            }}
            className="flex cursor-pointer items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3901] lg:hidden"
            aria-label={
              mobileOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>
      </header>

      {/* Fullscreen mobile navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="fixed inset-0 z-[999999] flex h-[100dvh] w-full flex-col justify-between overflow-y-auto bg-black px-6 py-6 text-white"
          >
            {/* Mobile top bar */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-5">
              <Link
                href="/"
                onClick={closeMobileMenu}
                aria-label="DLUX Tech home"
              >
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
                type="button"
                onClick={closeMobileMenu}
                className="cursor-pointer rounded-full border border-neutral-800 bg-neutral-900 p-2.5 text-white transition-colors hover:bg-neutral-800"
                aria-label="Close mobile menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile accordion */}
            <nav
              aria-label="Mobile navigation"
              className="flex flex-1 flex-col gap-3 py-6"
            >
              {navItems.map((item) => {
                const baseHref = getBaseHref(item);
                const hasSub = Boolean(menuStructure[item]);
                const isMenuOpen =
                  openMobileMenu === item;

                const isCurrentActive = isPathActive(
                  pathname,
                  baseHref
                );

                const submenuId = `mobile-submenu-${item
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`;

                return (
                  <div
                    key={item}
                    className="border-b border-neutral-900 pb-3"
                  >
                    <div className="flex items-center justify-between py-1">
                      <Link
                        href={baseHref}
                        onClick={closeMobileMenu}
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
                          onClick={() => {
                            setOpenMobileMenu(
                              isMenuOpen ? null : item
                            );
                            setOpenMobileSub(null);
                          }}
                          className="cursor-pointer rounded-lg border border-neutral-800 bg-neutral-900 p-2.5 text-gray-300 transition hover:text-white"
                          aria-label={`Toggle ${item} submenu`}
                          aria-expanded={isMenuOpen}
                          aria-controls={submenuId}
                        >
                          <FaAngleDown
                            className={`text-xs transition-transform duration-200 ${
                              isMenuOpen
                                ? "rotate-180 text-[#FF3901]"
                                : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Mobile level 2 */}
                    <AnimatePresence initial={false}>
                      {hasSub && isMenuOpen && (
                        <motion.div
                          id={submenuId}
                          initial={{
                            opacity: 0,
                            height: 0,
                          }}
                          animate={{
                            opacity: 1,
                            height: "auto",
                          }}
                          exit={{
                            opacity: 0,
                            height: 0,
                          }}
                          transition={{ duration: 0.25 }}
                          className="mt-3 ml-4 flex flex-col gap-2.5 overflow-hidden border-l-2 border-[#FF3901]/40 pl-4"
                        >
                          {menuStructure[item].map(
                            (subItem) => {
                              const subHref = getSubHref(
                                subItem,
                                baseHref
                              );

                              const hasSubSub = Boolean(
                                subItem.sub?.length
                              );

                              const isSubOpen =
                                openMobileSub ===
                                subItem.title;

                              const isSubActive =
                                isPathActive(
                                  pathname,
                                  subHref
                                );

                              const deepMenuId = `mobile-deep-${item
                                .toLowerCase()
                                .replace(/\s+/g, "-")}-${subItem.title
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")}`;

                              return (
                                <div
                                  key={subItem.title}
                                  className="py-1"
                                >
                                  <div className="flex items-center justify-between gap-3">
                                    <Link
                                      href={subHref}
                                      onClick={closeMobileMenu}
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
                                        onClick={() => {
                                          setOpenMobileSub(
                                            isSubOpen
                                              ? null
                                              : subItem.title
                                          );
                                        }}
                                        className="cursor-pointer p-2 text-neutral-400 hover:text-white"
                                        aria-label={`Toggle ${subItem.title} submenu`}
                                        aria-expanded={isSubOpen}
                                        aria-controls={deepMenuId}
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

                                  {/* Mobile level 3 */}
                                  <AnimatePresence
                                    initial={false}
                                  >
                                    {hasSubSub &&
                                      isSubOpen && (
                                        <motion.div
                                          id={deepMenuId}
                                          initial={{
                                            opacity: 0,
                                            height: 0,
                                          }}
                                          animate={{
                                            opacity: 1,
                                            height: "auto",
                                          }}
                                          exit={{
                                            opacity: 0,
                                            height: 0,
                                          }}
                                          transition={{
                                            duration: 0.2,
                                          }}
                                          className="mt-2 ml-4 flex flex-col gap-2 overflow-hidden border-l border-neutral-800 pl-3"
                                        >
                                          {subItem.sub!.map(
                                            (deep) => {
                                              const deepHref =
                                                getDeepHref(
                                                  deep,
                                                  subHref
                                                );

                                              const isDeepActive =
                                                isPathActive(
                                                  pathname,
                                                  deepHref
                                                );

                                              return (
                                                <Link
                                                  key={deep.title}
                                                  href={deepHref}
                                                  onClick={
                                                    closeMobileMenu
                                                  }
                                                  className={`py-1.5 text-sm transition-colors ${
                                                    isDeepActive
                                                      ? "font-semibold text-[#FF3901]"
                                                      : "text-neutral-400 hover:text-white"
                                                  }`}
                                                >
                                                  {deep.title}
                                                </Link>
                                              );
                                            }
                                          )}
                                        </motion.div>
                                      )}
                                  </AnimatePresence>
                                </div>
                              );
                            }
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* Mobile CTA */}
            <div className="border-t border-neutral-800 pt-4">
              <Link
                href="/contact-us"
                onClick={closeMobileMenu}
                className="block"
              >
                <span className="block w-full rounded-full bg-gradient-to-r from-[#FF780C] to-[#FE3908] py-3.5 text-center text-base font-bold text-white shadow-xl transition-opacity hover:opacity-95">
                  Contact Us
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export const tempNav = TempNav;

export default TempNav;

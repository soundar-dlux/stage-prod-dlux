"use client";

import { useState, useEffect, useRef } from "react";
import { motion, LayoutGroup } from "framer-motion";
import {
  ChevronRight,
  Plus,
  ImageIcon,
  Rocket,
  Database,
  Route,
  BarChart3,
  LayoutDashboard,
  Target,
  GraduationCap,
} from "lucide-react";

const BRAND = "#FF3901";
const BRAND_2 = "#F07800";
const INTERVAL = 5000;
const PEEK = 56; // px of the neighbouring pills that peek + fade at top/bottom

const offerings = [
  {
    icon: Rocket,
    title: "Adobe Analytics Implementation & Setup",
    desc: "End-to-end implementation using best practices. We handle tagging strategy, variable configuration, and integration with Adobe Experience Platform (AEP), Launch/Tags, and Web SDK.",
  },
  {
    icon: Database,
    title: "Adobe Client Data Layer (ACDL) Implementation",
    desc: "Design and deploy a robust, event-driven Adobe Client Data Layer (ACDL) – the modern standard for clean, scalable data collection. We replace legacy data layers with ACDL for seamless feeding into Analytics, Target, Journey Optimizer, and beyond. Benefits: reduced custom code, better governance, and future-proofing.",
  },
  {
    icon: Route,
    title: "Complete Customer Journey Tracking",
    desc: "Track the entire customer journey across touchpoints – awareness, consideration, conversion, and loyalty. We map omnichannel interactions, enable person-based identity stitching, and deliver holistic views in Customer Journey Analytics (CJA).",
  },
  {
    icon: BarChart3,
    title: "Advanced Reporting & Custom Report Generation",
    desc: "Build tailored reports for traffic, conversion, attribution, pathing, fallout, and flow analysis. We create executive dashboards that highlight KPIs like customer lifetime value, churn risk, and campaign ROI.",
  },
  {
    icon: LayoutDashboard,
    title: "Data Visualization & Actionable Dashboards",
    desc: "Transform complex data into intuitive visualizations using Analysis Workspace, freeform tables, and custom panels. Include real-time monitoring and AI-generated insights.",
  },
  {
    icon: Target,
    title: "Segmentation, Attribution & Predictive Analytics",
    desc: "Unlimited advanced segmentation, multi-touch attribution models, predictive forecasting (purchase intent, churn), and anomaly detection powered by Adobe Sensei.",
  },
  {
    icon: GraduationCap,
    title: "Ongoing Optimization, Training & Support",
    desc: "Post-implementation audits, data governance, team training, and continuous optimization to maximize your Adobe investment.",
  },
];

function Ring({ fraction, label }: { fraction: number; label: string }) {
  const r = 16;
  const C = 2 * Math.PI * r;
  return (
    <div className="relative h-11 w-11 shrink-0">
      <svg viewBox="0 0 40 40" className="h-11 w-11 -rotate-90">
        <defs>
          <linearGradient id="aaRingGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={BRAND} />
            <stop offset="100%" stopColor={BRAND_2} />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3" />
        <circle
          cx="20"
          cy="20"
          r={r}
          fill="none"
          stroke="url(#aaRingGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - fraction)}
          className="transition-[stroke-dashoffset] duration-500 ease-out"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
        {label}
      </span>
    </div>
  );
}

export function CoreOfferings() {
  const total = offerings.length;
  const [active, setActive] = useState(0);
  const dir = useRef(1);
  const viewportRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Keep the active card centered in the fixed viewport, sizing the viewport to
  // the active card (+ a peek of the neighbours) so nothing is ever clipped.
  useEffect(() => {
    const vp = viewportRef.current;
    const el = itemRefs.current[active];
    if (!vp || !el) return;
    vp.style.height = `${el.offsetHeight + PEEK * 2}px`;
    vp.scrollTo({ top: el.offsetTop - PEEK, behavior: "smooth" });
  }, [active]);

  // Auto-advance one card at a time, ping-ponging at the ends.
  useEffect(() => {
    const t = setTimeout(() => {
      setActive((a) => {
        let d = dir.current;
        let n = a + d;
        if (n > total - 1) {
          d = -1;
          n = a - 1;
        } else if (n < 0) {
          d = 1;
          n = a + 1;
        }
        dir.current = d;
        return n;
      });
    }, INTERVAL);
    return () => clearTimeout(t);
  }, [active, total]);

  const next = () => {
    dir.current = 1;
    setActive((a) => (a + 1) % total);
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="aa-drift absolute -left-24 top-1/3 h-72 w-72 rounded-full blur-[150px]"
          style={{ background: BRAND, opacity: 0.1 }}
        />
        <div
          className="aa-drift-rev absolute -right-24 bottom-0 h-72 w-72 rounded-full blur-[150px]"
          style={{ background: BRAND_2, opacity: 0.08 }}
        />
      </div>

      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14">
          {/* ===================== LEFT: heading + paragraph ===================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left"
          >
            <h2 className="text-3xl font-bold lg:leading-tight text-white md:text-4xl lg:text-[44px]">
              Our Adobe Analytics{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(110deg, ${BRAND}, ${BRAND_2})` }}
              >
                Core Offerings
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg leading-8 text-gray-400 lg:mx-0">
              Comprehensive Adobe Analytics Services We Deliver with Outcome
              Modules
            </p>
          </motion.div>

          {/* ===================== RIGHT: Dynamic-Island viewport ===================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              ref={viewportRef}
              layoutScroll
              className="no-scrollbar relative h-[440px] overflow-hidden transition-[height] duration-500 ease-out"
              style={{
                maskImage: `linear-gradient(to bottom, transparent 0, #000 ${PEEK}px, #000 calc(100% - ${PEEK}px), transparent 100%)`,
                WebkitMaskImage: `linear-gradient(to bottom, transparent 0, #000 ${PEEK}px, #000 calc(100% - ${PEEK}px), transparent 100%)`,
              }}
            >
              <LayoutGroup>
                <div className="flex flex-col gap-3 py-14">
                  {offerings.map((o, i) => {
                    const isActive = i === active;
                    const Icon = o.icon;
                    return (
                      <motion.div
                        key={i}
                        ref={(el) => {
                          itemRefs.current[i] = el;
                        }}
                        layout
                        onClick={() => setActive(i)}
                        transition={{ layout: { type: "spring", stiffness: 280, damping: 30 } }}
                        style={{
                          borderRadius: isActive ? 28 : 9999,
                          ...(isActive
                            ? {
                                background:
                                  "linear-gradient(135deg, rgba(255,57,1,0.14), rgba(255,255,255,0.02))",
                              }
                            : {}),
                        }}
                        className={`relative overflow-hidden border backdrop-blur-xl ${
                          isActive
                            ? "border-white/15"
                            : "cursor-pointer border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"
                        }`}
                      >
                        {isActive ? (
                          <motion.div layout="position" className="relative p-5 md:p-7">
                            <div
                              className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full blur-3xl"
                              style={{ background: BRAND, opacity: 0.22 }}
                            />
                            <div className="relative flex items-center gap-3">
                              <span
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                                style={{ background: `linear-gradient(135deg, ${BRAND}, ${BRAND_2})` }}
                              >
                                <Icon className="h-5 w-5 text-white" />
                              </span>
                              <h3 className="min-w-0 flex-1 text-base font-semibold leading-snug text-white md:text-lg">
                                {o.title}
                              </h3>
                              <Ring fraction={(active + 1) / total} label={`${active + 1}/${total}`} />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  next();
                                }}
                                className="hidden shrink-0 items-center gap-1 rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white transition hover:bg-white/[0.12] sm:inline-flex"
                              >
                                Next Step <ChevronRight className="h-4 w-4" />
                              </button>
                            </div>

                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.35, delay: 0.1 }}
                              className="relative mt-5 grid gap-5 sm:grid-cols-[1.25fr_1fr] sm:items-center"
                            >
                              <p className="text-sm leading-7 text-gray-300 md:text-base">
                                {o.desc}
                              </p>
                              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-dashed border-white/15 bg-gradient-to-br from-white/[0.06] to-white/[0.01]">
                                <div
                                  className="aa-shimmer pointer-events-none absolute inset-0"
                                  style={{
                                    background:
                                      "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
                                  }}
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 opacity-50">
                                  <ImageIcon className="h-7 w-7 text-white" />
                                  <span className="text-[11px] text-white/60">
                                    Image placeholder
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          </motion.div>
                        ) : (
                          <motion.div
                            layout="position"
                            className="flex items-center gap-3 px-5 py-3.5"
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-white/70">
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="min-w-0 flex-1 truncate text-sm font-medium text-white/80">
                              {o.title}
                            </span>
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/30">
                              <Plus className="h-3.5 w-3.5" />
                            </span>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </LayoutGroup>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

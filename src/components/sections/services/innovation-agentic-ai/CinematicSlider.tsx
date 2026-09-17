"use client";

import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import UseCaseForm from "../../../ui/Forms/UseCaseForm";

const slides = [
  {
    title: "AI Powered Personalised Landing Pages",
    value: "AI Powered Personalised Landing Pages",
    desc: "+8–18% conversion rate (CVR) uplift using dynamic content tailored to each user.",
    img: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
    pdf: "https://assets.ctfassets.net/pj0maraabon4/1vLmJScTXRDqiQtc6hWEt6/055031f7046bd112d8008ba84172a395/Use_Case_1__1_.pdf",
  },
  {
    title: "Creative Automation for Paid Campaigns",
    value: "Creative Automation for Paid Campaigns",
    desc: "20–40% faster asset production with AI-generated creatives and variations.",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    pdf: "https://assets.ctfassets.net/pj0maraabon4/680vN7eDp6IAk42g7r4a0M/88addbaf6cc7e94473239d1447a16b07/Use_Case_2.pdf",
  },
  {
    title: "Real-Time Personalisation",
    value: "Real-Time Personalisation Based on Media Signal",
    desc: "+10–20% CVR lift using live media signals and behavioral data.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    pdf: "https://assets.ctfassets.net/pj0maraabon4/3mcBdXut3RidMx3wboIOOs/1fdb9b6b5da679ddd6cf6924d9f4a217/Use_Case_3.pdf",
  },
  {
    title: "Closed-Loop Creative Insights",
    value: "ClosedLoop Creative Insights",
    desc: "40–60% faster insights by connecting performance data with creative optimization.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    pdf: "https://assets.ctfassets.net/pj0maraabon4/6z2DLyeHm8pK35mjrHhQm1/512a3203aa541506e519cb3d91596c0c/Use_Case_4.pdf",
  },
  {
    title: "Product Feed-Based Experiences",
    value: "Product Feed-Based Experiences",
    desc: "6–12% increase in revenue per visit using dynamic product feeds.",
    img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da",
    pdf: "https://assets.ctfassets.net/pj0maraabon4/1n0syGxHGUv6xxqzPH7Ygb/03bba4eaeb70b4c8bf9425abb6e12cad/Use_Case_5.pdf",
  },
  {
    title: "Geo-Targeted Media Landing Pages",
    value: "GeoTargeted Media Landing Pages",
    desc: "7–15% improvement in conversions using location-based personalization.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    pdf: "https://assets.ctfassets.net/pj0maraabon4/FSZ2Y9qO5JwTT7H5aRKa1/78b9cc74a73bc5aad739be63b2be2da0/Use_Case_6.pdf",
  },
  {
    title: "Performance-Driven A/B/n Testing",
    value: "Performance-Driven A/B/n Testing",
    desc: "2–5x faster experimentation velocity with AI-driven testing.",
    img: "https://images.unsplash.com/photo-1556157382-97eda2d62296",
    pdf: "https://assets.ctfassets.net/pj0maraabon4/61VxmDTrAXsTBDFgE5dzGB/c565151aabc2ec81fdf1afd7f703a56a/Use_Case_7.pdf",
  },
  {
    title: "Edge Delivery for Ultra-Fast Pages",
    value: "Edge Delivery for Ultra-Fast Landing Pages",
    desc: "20–40% faster load speeds with edge-based content delivery.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    pdf: "https://assets.ctfassets.net/pj0maraabon4/3aWH2KMlZZat2r7mIWEbEJ/e753d454405f3e2f9a552db3ffadedaa/Use_Case_8.pdf",
  },
  {
    title: "Journey Orchestration Post-Click",
    value: "Journey Orchestration PostClick",
    desc: "10–20% increase in triggered revenue through optimized user journeys.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    pdf: "https://assets.ctfassets.net/pj0maraabon4/6tLIedXqlBGt3z4ptAjJeU/e9d5c6619062a0e24dcc7aa8db4df83a/Use_Case_9.pdf",
  },
  {
    title: "Campaign Workflow Automation",
    value: "Campaign Workflow Automation",
    desc: "30–50% reduction in campaign cycle time with AI automation.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    pdf: "https://assets.ctfassets.net/pj0maraabon4/3cxPp7qGe4J55gle7AL7uN/f6753ca39e5e2dee420e08da1282bf1f/Use_Case_10.pdf",
  },
];

export default function CinematicSlider() {
  const [active, setActive] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUseCase, setSelectedUseCase] = useState("");
  const [selectedPdf, setSelectedPdf] = useState("");

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setActive((p) => (p === 0 ? slides.length - 1 : p - 1));
  }, []);

  // ✅ FIXED CLEANUP (TS SAFE)
  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [next]);

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const visibleSlides = useMemo(() => {
    return [-1, 0, 1].map((offset) => {
      const index = (active + offset + slides.length) % slides.length;
      return { index, offset };
    });
  }, [active]);

  const openForm = (value: string, pdf: string) => {
    setSelectedUseCase(value);
    setSelectedPdf(pdf);
    setIsFormOpen(true);
  };

  return (
    <section className="relative w-full min-h-[70vh] md:h-[85vh] overflow-hidden bg-black text-white flex items-center">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src={`${slides[active].img}?auto=format&fit=crop&w=1600&q=60`}
          className="w-full h-full object-cover transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 px-4 sm:px-6 md:px-12 lg:px-16 items-center">

        {/* LEFT */}
        <div className="max-w-xl text-center md:text-left mx-auto md:mx-0">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {slides[active].title}
            </h2>

            <p className="mt-3 text-xs sm:text-sm md:text-base text-gray-300">
              {slides[active].desc}
            </p>
          </motion.div>

          <button
            onClick={() => {
              stopAutoSlide();
              openForm(slides[active].value, slides[active].pdf);
            }}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 rounded-full 
              bg-white/10 backdrop-blur-lg border border-white/20 
              hover:bg-white/20 transition text-sm sm:text-base"
          >
            <Download size={16} />
            View & Download
          </button>
        </div>

        {/* RIGHT */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4"
          onMouseEnter={stopAutoSlide}
        >
          {visibleSlides.map(({ index, offset }) => {
            const isCenter = offset === 0;

            return (
              <motion.div
                key={index}
                onClick={() => {
                  stopAutoSlide();
                  openForm(slides[index].value, slides[index].pdf);
                }}
                animate={{
                  scale: isCenter ? 1 : 0.85,
                  opacity: isCenter ? 1 : 0.4,
                }}
                transition={{ duration: 0.35 }}
                className={`
                  rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer shadow-lg transform-gpu
                  ${!isCenter ? "hidden sm:block" : ""}
                  ${isCenter ? "col-span-1 sm:col-span-2 md:col-span-1 z-10" : ""}
                `}
              >
                <div className="h-[220px] sm:h-[240px] md:h-[260px] lg:h-[320px]">
                  <img
                    src={`${slides[index].img}?w=800&q=60`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* NAV */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-3 sm:gap-4 z-10">
        <button
          onClick={() => {
            stopAutoSlide();
            prev();
          }}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={() => {
            stopAutoSlide();
            next();
          }}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* MODAL */}
      <UseCaseForm
        useCase={selectedUseCase}
        pdf={selectedPdf}
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </section>
  );
}
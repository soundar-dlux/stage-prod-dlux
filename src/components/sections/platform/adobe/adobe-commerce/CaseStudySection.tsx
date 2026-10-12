"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

const BRAND = {
  primary: "#FF3901",
};

export interface CaseStudyItem {
  title: string;
  slug: string;
  client?: string;
  shortDescription?: string;
  banner?: {
    url?: string;
  };
}

interface CaseStudySectionProps {
  initialCaseStudies?: CaseStudyItem[];
}

export default function CaseStudySection({
  initialCaseStudies = [],
}: CaseStudySectionProps) {
  const [caseStudies, setCaseStudies] =
    useState<CaseStudyItem[]>(initialCaseStudies);
  const [loading, setLoading] = useState(initialCaseStudies.length === 0);

  useEffect(() => {
    if (initialCaseStudies.length > 0) {
      setCaseStudies(initialCaseStudies);
      setLoading(false);
    }
  }, [initialCaseStudies]);

  const list = useMemo(() => caseStudies, [caseStudies]);

  return (
    <section className="py-10 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-3">
            Case Study Spotlights
          </h2>
          <p className="text-white/70">
            Real-world transformations delivering growth.
          </p>
        </div>

        {loading ? (
          <div className="text-center animate-pulse">
            Loading...
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {list.map((item) => {
              const image =
                item.banner?.url ||
                "https://via.placeholder.com/600x400";

              return (
                <div
                  key={item.slug}
                  className="group rounded-xl overflow-hidden border border-white/10 hover:-translate-y-2 transition"
                >
                  <div
                    className="h-52 bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                  />

                  <div className="p-5 flex flex-col gap-3">
                    <h3 className="font-semibold">{item.title}</h3>

                    <p className="text-white/70 text-sm">
                      {item.shortDescription}
                    </p>

                    <Link
                      href={`/case-study/${item.slug}`}
                      className="mt-2 text-sm"
                      style={{ color: BRAND.primary }}
                    >
                      View Case Study →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
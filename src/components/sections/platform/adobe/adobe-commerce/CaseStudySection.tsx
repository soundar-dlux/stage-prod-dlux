"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

const BRAND = {
  primary: "#FF3901",
};

interface CaseStudyItem {
  title: string;
  slug: string;
  client?: string;
  shortDescription?: string;
  banner?: {
    url?: string;
  };
}

export default function CaseStudySection() {
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCaseStudies = async () => {
      try {
        const res = await fetch(
          "https://graphql.contentful.com/content/v1/spaces/pj0maraabon4/environments/production",
          {
            method: "POST",
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer 6t-wgSsZnD80bBuG3_VNcGKE0lF-LAE7EPa5NE286HU",
            },
            body: JSON.stringify({
              query: `
                query {
                  caseStudyCollection(limit: 3) {
                    items {
                      title
                      slug
                      client
                      shortDescription
                      banner { url }
                    }
                  }
                }
              `,
            }),
          }
        );

        const json = await res.json();

        console.log("LIST DATA:", json); // ✅ debug

        const items = json?.data?.caseStudyCollection?.items ?? [];

        setCaseStudies(
          items.filter(
            (item: CaseStudyItem) =>
              item?.slug && item?.title
          )
        );
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Fetch Error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
    return () => controller.abort();
  }, []);

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
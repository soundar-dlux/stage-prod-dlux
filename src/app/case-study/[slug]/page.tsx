import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CaseStudyActions from "@/src/components/ui/CaseStudyActions";

/* ---------------- TYPES ---------------- */

interface CaseStudy {
  title?: string;
  slug?: string;
  client?: string;
  industry?: string | string[];
  location?: string;
  stakes?: string;
  summary?: string;
  challengesBottlenecks?: string;
  turningPoint?: string;
  conclusion?: string;
  banner?: {
    url?: string;
    description?: string;
  };
  caseStudyPdf?: {
    url?: string;
  };
}

/* ---------------- FETCH ---------------- */

async function getCaseStudy(slug?: string): Promise<CaseStudy | null> {
  if (!slug) return null;

  try {
    const res = await fetch(
      "https://graphql.contentful.com/content/v1/spaces/pj0maraabon4/environments/production",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 6t-wgSsZnD80bBuG3_VNcGKE0lF-LAE7EPa5NE286HU",
        },
        body: JSON.stringify({
          query: `
            query GetCaseStudy($slug: String!) {
              caseStudyCollection(where: { slug: $slug }, limit: 1) {
                items {
                  title
                  slug
                  client
                  industry
                  location
                  stakes
                  summary
                  challengesBottlenecks
                  turningPoint
                  conclusion
                  banner {
                    url
                    description
                  }
                  caseStudyPdf {
                    url
                  }
                }
              }
            }
          `,
          variables: { slug: slug.trim() },
        }),
        next: { revalidate: 60 },
      }
    );

    const json = await res.json();
    return json?.data?.caseStudyCollection?.items?.[0] || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/* ---------------- METADATA ---------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCaseStudy(slug);

  return {
    title: data?.title || "Case Study",
    description: data?.summary?.slice(0, 150),
  };
}

/* ---------------- PAGE ---------------- */

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getCaseStudy(slug);

  if (!data) return notFound();

  return (
    <section className="bg-[#0b0c0c] text-white pb-24">

      {/* HERO */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        {data.banner?.url && (
          <img
            src={data.banner.url}
            alt={data.title}
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />
        )}
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col justify-end px-6 pb-16">
          <p className="text-sm text-orange-400 mb-2 uppercase tracking-wider">
            Case Study
          </p>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {data.banner?.description || data.title}
          </h1>

          <p className="text-white/70">
            {data.client}
            {data.location && ` · ${data.location}`}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 mt-16 grid lg:grid-cols-[2fr_1fr] gap-12">

        {/* LEFT */}
        <div className="space-y-12">

          {/* 🔥 ONLY ACTIONS (NO BIG BUTTON) */}
          <CaseStudyActions pdfUrl={data.caseStudyPdf?.url} />

          {data.summary && (
            <Section title="Executive Summary">{data.summary}</Section>
          )}

          {data.stakes && (
            <Section title="Business Stakes">{data.stakes}</Section>
          )}

          {data.challengesBottlenecks && (
            <Section title="Challenges & Bottlenecks">
              {data.challengesBottlenecks}
            </Section>
          )}

          {data.turningPoint && (
            <Section title="Turning Point">{data.turningPoint}</Section>
          )}

          {data.conclusion && (
            <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 p-6 rounded-xl border border-orange-500/20">
              <p className="italic text-lg">“{data.conclusion}”</p>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <aside>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 sticky top-24">
            <h3 className="font-semibold mb-4 border-b border-white/10 pb-2">
              Company Info
            </h3>

            <Info label="Client" value={data.client} />
            <Info
              label="Industry"
              value={
                Array.isArray(data.industry)
                  ? data.industry.join(", ")
                  : data.industry
              }
            />
            <Info label="Location" value={data.location} />
          </div>
        </aside>
      </div>
    </section>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Section({ title, children }: any) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 border-b border-orange-500/30 pb-2">
        {title}
      </h2>
      <p className="text-white/70 leading-relaxed">{children}</p>
    </div>
  );
}

function Info({ label, value }: any) {
  if (!value) return null;

  return (
    <div className="mb-4">
      <p className="text-white/50 text-sm">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
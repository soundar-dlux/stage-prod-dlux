"use client";

import { useEffect, useState, useMemo } from "react";

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

interface FeatureItem {
  title?: string;
  description?: string;
  url?: string;
}

export default function FeatureSection() {
  const [features, setFeatures] = useState<FeatureItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchFeatures = async () => {
      try {
        const res = await fetch(
          "https://graphql.contentful.com/content/v1/spaces/pj0maraabon4/environments/production",
          {
            method: "POST",
            signal: controller.signal,
            cache: "force-cache",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer 6t-wgSsZnD80bBuG3_VNcGKE0lF-LAE7EPa5NE286HU",
            },
            body: JSON.stringify({
              query: `
                query {
                  platformAdobeCommerces(id:"231JBLMJLXr5L3FUHFNGEI") {
                    adobeCommerceFeatutreCollection {
                      items {
                        title
                        description
                        url
                      }
                    }
                  }
                }
              `,
            }),
          }
        );

        const json = await res.json();

        setFeatures(
          json?.data?.platformAdobeCommerces
            ?.adobeCommerceFeatutreCollection?.items ?? []
        );
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Feature Fetch Error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
    return () => controller.abort();
  }, []);

  const featureList = useMemo(() => features, [features]);

  return (
    <section className="relative py-8 lg:py-10 px-6 md:px-12 bg-black text-white overflow-hidden">
      
      {/* Glow */}
      <div
        className="absolute inset-0 opacity-15 -z-10"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, ${BRAND.primary}40, transparent 40%),
            radial-gradient(circle at 80% 70%, ${BRAND.secondary}30, transparent 50%)
          `,
        }}
      />

      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-20 bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`,
          }}
        >
          Adobe Commerce Features
        </h2>

        {/* Content */}
        {loading ? (
          <p className="text-center text-white/70 animate-pulse">
            Loading features...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-stretch">
            
            {featureList.map((feature, index) => (
              <div
                key={feature.title || index}
                className="h-full rounded-2xl p-8 backdrop-blur-xl flex flex-col transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="group flex flex-col h-full">
                  
                  {/* Icon */}
                  {feature.url && (
                    <img
                      src={feature.url}
                      alt={feature.title}
                      loading="lazy"
                      className="w-14 h-14 mb-6 object-contain transition duration-300 group-hover:scale-110"
                    />
                  )}

                  {/* Title */}
                  <h3
                    className="text-lg font-semibold mb-3"
                    style={{ color: BRAND.primary }}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 text-base leading-relaxed flex-grow">
                    {feature.description}
                  </p>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </section>
  );
}
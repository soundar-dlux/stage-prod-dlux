"use client";

import { useEffect, useState } from "react";

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

interface ServiceItem {
  title?: string;
  description?: string;
  url?: string;
}

interface ContentfulResponse {
  data?: {
    platformAdobeCommerces?: {
      adobeServiceCollection?: {
        items?: ServiceItem[];
      };
    };
  };
}

export default function AdobeServiceCards() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
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
                query {
                  platformAdobeCommerces(id:"231JBLMJLXr5L3FUHFNGEI") {
                    adobeServiceCollection {
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

        const result: ContentfulResponse = await response.json();

        const items =
          result?.data?.platformAdobeCommerces
            ?.adobeServiceCollection?.items ?? [];

        setServices(items);
      } catch (error) {
        console.error("Service Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="relative py-8 lg:py-10 px-6 md:px-12 bg-black text-white overflow-hidden">

      {/* Glow */}
      <div
        className="absolute inset-0 opacity-10 -z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 15% 25%, ${BRAND.primary}40, transparent 40%),
            radial-gradient(circle at 85% 75%, ${BRAND.secondary}30, transparent 50%)
          `,
        }}
      />

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`,
            }}
          >
            Our Adobe Commerce Services
          </h2>

          <p className="text-white/70 text-base max-w-2xl mx-auto">
            End-to-end Adobe Commerce solutions engineered to elevate performance,
            scalability, and customer experience.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-white/70">
            Loading services...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {services.map((service, index) => (
              <div
                key={index}
                className="group relative rounded-2xl p-6
                           border border-white/10
                           backdrop-blur-xl
                           transition-all duration-500
                           hover:-translate-y-2"
                style={{
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                {/* Gradient Border */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.secondary})`,
                    padding: "1px",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                  }}
                />

                {/* Icon */}
                {service.url && (
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition group-hover:scale-105"
                    style={{
                      background: `${BRAND.primary}15`,
                      border: `1px solid ${BRAND.primary}30`,
                    }}
                  >
                    <img
                      src={service.url}
                      alt={service.title}
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                )}

                {/* Title */}
                <h3 className="text-base font-semibold mb-3 text-white">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  {service.description}
                </p>

                {/* Bottom Line */}
                <div
                  className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                  style={{
                    background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`,
                  }}
                />
              </div>
            ))}

          </div>
        )}
      </div>
    </section>
  );
}
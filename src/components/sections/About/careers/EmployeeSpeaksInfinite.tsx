import HorizontalCarousel from "@/src/components/ui/Carousel/HorizontalCarousel";
import TestimonialCard from "@/src/components/ui/Cards/TestimonialCard";

/* ================= TYPES ================= */

interface Testimonial {
  name: string;
  position: string;
  testimonials: string;
  avatar?: {
    url: string;
  };
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

interface TestimonialsData {
  resourceTestimonialsCollection?: {
    items?: Testimonial[];
  };
}

/* ================= FETCH ================= */

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/production`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          query: `
            query GetTestimonials {
              resourceTestimonialsCollection {
                items {
                  name
                  position
                  testimonials
                  avatar {
                    url
                  }
                }
              }
            }
          `,
        }),
        next: { revalidate: 120 },
      }
    );

    if (!res.ok) return [];

    const json: GraphQLResponse<TestimonialsData> = await res.json();

    if (json.errors) return [];

    return json.data?.resourceTestimonialsCollection?.items ?? [];
  } catch {
    return [];
  }
}

/* ================= SECTION ================= */

export default async function EmployeeSpeaksInfinite() {
  const testimonials = await getTestimonials();

  if (!testimonials.length) return null;

  return (
    <section className="relative bg-brand-black py-8 lg:py-10 overflow-hidden">

      <div className="relative max-w-6xl mx-auto px-6">
        
        {/* Heading */}
        <div className="mb-10 md:mb-12">
          
          <div className="h-[2px] w-14 bg-brand-primary mb-3 rounded-full" />

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-brand-white">
            Employee{" "}
            <span className="bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo bg-clip-text text-transparent">
              Speaks
            </span>
          </h2>

          <p className="text-gray-400 mt-3 max-w-md text-xs sm:text-sm leading-relaxed">
            Our team loves the culture we’ve built, and we’re proud of the
            environment we share. Here’s what they have to say about their
            journey with us.
          </p>
        </div>

        {/* 🚀 Carousel */}
        <HorizontalCarousel autoScroll autoScrollInterval={3200}>
          {testimonials.map((item, i) => (
            <TestimonialCard
              key={i}
              className="min-w-[280px] sm:min-w-[320px] lg:min-w-[340px]"
              name={item.name}
              position={item.position}
              testimonial={item.testimonials}
              avatarUrl={item.avatar?.url}
            />
          ))}
        </HorizontalCarousel>
      </div>
    </section>
  );
}
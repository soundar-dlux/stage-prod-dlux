interface ProgressItem {
  title: string;
  description: string;
  imageUrl: string;
}

interface ProgressSectionProps {
  heading: string;
  items: ProgressItem[];
}

export default function ProgressSection({
  heading,
  items,
}: ProgressSectionProps) {
  return (
    <section className="bg-gradient-to-br from-neutral-900 to-black px-6 py-24 text-white">
      <h2 className="mb-16 text-center text-3xl md:text-4xl font-bold lg:text-5xl">
        {heading}
      </h2>

      <div className="mx-auto max-w-6xl space-y-16">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center gap-10 md:flex-row ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full max-w-sm rounded-xl"
            />

            <div className="max-w-xl">
              <h3 className="mb-4 text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

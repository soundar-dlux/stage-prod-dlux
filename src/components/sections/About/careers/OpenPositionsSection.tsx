import Link from "next/link";

const OpenPositionsSection = () => {
  return (
    <section className="py-20 text-center">
      <h2 className="text-4xl font-bold mb-10">
        Current Openings
      </h2>

      <Link
        href="https://careers.dluxtech.com/jobs/Careers"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-4 px-10 py-5 rounded-xl
                   bg-gradient-to-r from-gray-800 to-black text-white
                   hover:scale-105 transition-transform duration-300"
      >
        Explore Jobs Here →
      </Link>
    </section>
  );
};

export default OpenPositionsSection;

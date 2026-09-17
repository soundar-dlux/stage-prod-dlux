export default function TrustSection() {
  return (
    <section className="px-6 lg:px-24 py-8 lg:py-10 bg-brand-black text-brand-white text-center">
      
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug tracking-tight">
          Trust &{" "}
          <span className="text-brand-primary">Security</span>
        </h2>

        {/* Divider */}
        <div className="mt-2 w-12 h-[2px] mx-auto bg-brand-primary/70" />

        {/* Sub heading */}
        <h3 className="text-brand-primary text-xl md:text-2xl font-medium mt-4">
          We build with trust, protect with intent, and secure with global standards.
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-base md:text-lg leading-7 mt-3">
          At <span className="text-brand-white font-medium">DLUX</span>, we understand that trust is earned—not assumed...
        </p>

      </div>
    </section>
  );
}
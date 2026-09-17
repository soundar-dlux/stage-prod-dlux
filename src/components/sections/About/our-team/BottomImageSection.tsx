import Image from "next/image";

export default function BottomImageSection() {
  return (
    <section className="relative overflow-hidden bg-black py-16 px-4">
      {/* Soft Brand Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF3901]/12 blur-[140px]" />

      <div className="relative mx-auto max-w-full">
        <div className="relative aspect-[16/4] w-full">
          <Image
            src="https://images.ctfassets.net/pj0maraabon4/2BH6j1KDX1It5wARjzymTC/4aa70b7ee0b765049b22e89c5df3c9ae/Group_771.png"
            alt="Decorative illustration"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}

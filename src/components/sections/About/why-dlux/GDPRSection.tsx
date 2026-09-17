import Image from "next/image";

export default function GDPRSection() {
  return (
    <section className="px-6 lg:px-24 py-16 bg-black text-white">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        
        <Image
          src="https://images.ctfassets.net/pj0maraabon4/7AQEvAldj4DYenn5VvR842/70ce271010ad89b15c7b082421cc3223/f5efed0b-7bd9-47de-9158-15573574a46c.png"
          alt="GDPR"
          width={600}
          height={400}
          className="rounded-2xl"
        />

        <div>
          <h2 className="flex items-center gap-3 text-[#FE780C] text-3xl font-medium mb-6">
            <Image src="https://images.ctfassets.net/pj0maraabon4/2CO1F9rXP1xmrh4cYVjobD/c1677dc6f40ddd6d5672ea12aa106c93/asset_2.png" alt="GDPR" width={32} height={32} />
            GDPR & SOC 2 Alignment
          </h2>

          <p className="text-gray-300 text-lg mb-6">
            Whether you're operating in the EU...
          </p>

          <ul className="space-y-3 text-gray-300">
            <li>✔ Minimising risks</li>
            <li>✔ Transparent data flows</li>
            <li>✔ GDPR rights</li>
            <li>✔ Secure-by-design</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
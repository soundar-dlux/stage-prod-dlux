import Image from "next/image";

export default function ISOSection() {
  return (
    <section className="px-6 lg:px-24 py-16 bg-black text-white">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div>
          <h2 className="flex items-center gap-3 text-[#FE780C] text-3xl font-medium mb-6">
            <Image src="https://images.ctfassets.net/pj0maraabon4/3aTuZsI0bw2tr8yapXvWNE/b5751922b11b5dd7745f3cdf6bb711f4/asset_1.png" alt="ISO" width={32} height={32} />
            ISO/IEC 27001 Certified
          </h2>

          <p className="text-gray-300 text-lg mb-6">
            DLUX is ISO/IEC 27001 certified...
          </p>

          <ul className="space-y-3 text-gray-300">
            <li>✔ End-to-end risk assessment</li>
            <li>✔ Encryption & access control</li>
            <li>✔ Security training</li>
            <li>✔ Internal audits</li>
          </ul>
        </div>

        {/* RIGHT */}
        <Image
          src="https://images.ctfassets.net/pj0maraabon4/oVkKtuff5GEqtiIYqUofZ/6334210fdc648660a1893ebe1b27dc1c/Untitled_design__4_.png"
          alt="ISO"
          width={600}
          height={400}
          className="rounded-2xl"
        />
      </div>
    </section>
  );
}
import Image from "next/image";

export default function BottomBanner() {
  return (
    <div className="relative w-full bg-black">
      <Image
        src="https://images.ctfassets.net/pj0maraabon4/3E3KFK8GYbyKrPr5movUh4/c9eccb56aae3c27dbf6ddfaa759fdeae/black-spy.png"
        alt="DLUX bottom banner"
        width={1920}
        height={400}
        sizes="100vw"
        priority
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
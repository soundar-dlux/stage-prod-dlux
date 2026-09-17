"use client";

interface LogoCardProps {
  logo: string;
}

export default function LogoCard({ logo }: LogoCardProps) {
  return (
    <div
      role="img"
      aria-label="Client company logo representing a trusted partnership with DLUX in artificial intelligence, marketing technology, and digital transformation solutions"
      className="
        flex-shrink-0
        w-[220px]
        h-[220px]
        mx-4
        rounded-2xl
        flex
        items-center
        justify-center
        transition-colors
        duration-300
        cursor-pointer
      "
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 40px rgba(0,0,0,0.35)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background =
          "linear-gradient(145deg, rgba(255,255,255,0.14), rgba(255,255,255,0.05))")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background =
          "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))")
      }
    >
      <img
        src={logo}
        alt="Client company logo associated with DLUX AI and Martech solutions, representing enterprise digital transformation partnerships"
        title="DLUX trusted client and technology partner"
        className="max-h-14 max-w-[130px] object-contain opacity-85"
        loading="lazy"
      />
    </div>
  );
}
interface Props {
  year: string;
  content: string;
  align?: "left" | "right";
}

export default function GrowthItem({ year, content, align = "left" }: Props) {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        align === "right" ? "md:flex-row-reverse" : ""
      } gap-6 items-start`}
    >
      <h3 className="text-[#FE780C] text-2xl font-semibold min-w-[80px]">
        {year}
      </h3>

      <p className="text-white text-sm md:text-base leading-7 max-w-xl">
        {content}
      </p>
    </div>
  );
}

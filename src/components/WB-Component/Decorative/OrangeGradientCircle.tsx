
interface BlurLightProps {
  className?: string;
}

export default function OrangeGradientCircle({
  className = "",
}: BlurLightProps) {
  return (
    <div
      aria-hidden="true"
      className={`
        pointer-events-none absolute
        h-12 w-12 rounded-full
        bg-[radial-gradient(circle,#FE4F00_0%,#FF6B1A_35%,#FE4F00_65%,transparent_100%)]
        blur-lg
        opacity-70
        drop-shadow-[0_0_35px_rgba(254,79,0,0.8)]
        ${className}
      `}
    />
  );
}
    
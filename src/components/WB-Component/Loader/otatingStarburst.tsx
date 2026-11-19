import React from "react";

export interface RotatingStarburstProps {
  /** Size in pixels or CSS string (e.g. 134, "100%"). Defaults to 134 */
  size?: number | string;
  /** Primary stroke color. Defaults to "#FF4F00" */
  color?: string;
  /** Design variant:
   *  - 'spinner': Classic uniform loading spinner GIF design
   *  - 'starburst': 8-point starburst with prominent cardinal rays
   *  Defaults to 'spinner'
   */
  variant?: "spinner" | "starburst";
  /** Number of spokes for spinner variant (8 or 12). Defaults to 8 */
  spokes?: 8 | 12;
  /** Animation duration in seconds. Defaults to 0.8 */
  duration?: number;
  /** Animation style: 'stepped' (classic loading GIF frame-by-frame) or 'smooth'. Defaults to 'stepped' */
  animationStyle?: "stepped" | "smooth";
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

export const RotatingStarburst: React.FC<RotatingStarburstProps> = ({
  size = 134,
  color = "#FF4F00",
  variant = "spinner",
  spokes = 8,
  duration = 0.8,
  animationStyle = "stepped",
  className = "",
  style,
}) => {
  // Generate spoke configuration based on count and variant
  const spokeCount = variant === "starburst" ? 8 : spokes;
  const angleStep = 360 / spokeCount;

  const rays = Array.from({ length: spokeCount }, (_, i) => {
    const angle = i * angleStep;
    // Fading trail: first ray is 1.0 (brightest), trailing down to ~0.12
    const opacity = Math.max(0.12, 1 - i * (0.9 / spokeCount));

    // For starburst, cardinal directions (0, 90, 180, 270) are longer
    const isCardinal = i % 2 === 0;
    const y1 = variant === "starburst" ? (isCardinal ? 8 : 16) : 8;
    const y2 = variant === "starburst" ? (isCardinal ? 32 : 28) : 28;

    return { angle, opacity, y1, y2 };
  });

  const strokeWidth = spokeCount === 12 ? 5.5 : 6.5;

  const animationValue =
    animationStyle === "stepped"
      ? `starburst-spin ${duration}s steps(${spokeCount}, end) infinite`
      : `starburst-spin ${duration}s linear infinite`;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 origin-center motion-reduce:!animate-none ${className}`}
      style={{
        width: size,
        height: size,
        animation: animationValue,
        transformOrigin: "center",
        ...style,
      }}
      role="status"
      aria-label="Loading"
    >
      <style>{`
        @keyframes starburst-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <svg
        viewBox="0 0 100 100"
        className="block w-full h-full pointer-events-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
          {rays.map(({ angle, opacity, y1, y2 }) => (
            <line
              key={angle}
              x1="50"
              y1={y1}
              x2="50"
              y2={y2}
              opacity={opacity}
              transform={`rotate(${angle} 50 50)`}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default RotatingStarburst;

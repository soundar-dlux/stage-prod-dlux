import { CSSProperties, ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

/**
 * Brand Badge — Figma exact spec
 * ─────────────────────────────
 * Size:          318 × 49 px (default; shrinks on mobile)
 * Border-radius: 24.5 px
 * Border:        1 px solid — gradient #FE780C → #FE3908
 * Padding:       15px 28px 14px 29px
 * Font:          HeliosExt 400, 20 px / 20 px
 * Text fill:     gradient #FE780C → #FE3908
 *
 * Gradient border trick:
 *   background = white padding-box + gradient border-box
 *   border: 1px solid transparent  →  shows the gradient
 *
 * Gradient text trick:
 *   background-clip: text; -webkit-text-fill-color: transparent
 */

const GRADIENT = "linear-gradient(90deg, #FE780C 0%, #FE3908 100%)";

const wrapperStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  width: "318px",
  height: "49px",
  borderRadius: "24.5px",
  border: "1px solid transparent",
  background: `linear-gradient(#fff, #fff) padding-box, ${GRADIENT} border-box`,
  paddingTop: "15px",
  paddingRight: "28px",
  paddingBottom: "14px",
  paddingLeft: "29px",
  boxSizing: "border-box",
};

const textStyle: CSSProperties = {
  fontFamily: "Heliosext, sans-serif",
  fontWeight: 400,
  fontSize: "20px",
  lineHeight: "20px",
  letterSpacing: "0%",
  background: GRADIENT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent", // fallback
  whiteSpace: "nowrap",
};

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span style={wrapperStyle} className={className}>
      <span style={textStyle}>{children}</span>
    </span>
  );
}

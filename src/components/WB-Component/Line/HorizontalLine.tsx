
import React from "react";

interface HorizontalLineProps {
  className?: string;
  color?: string;
  thickness?: string;
}

const HorizontalLine: React.FC<HorizontalLineProps> = ({
  className = "",
  color = "#E5E5E5",
  thickness = "1px",
}) => {
  return (
    <div
      className={`w-full ${className}`}
      style={{
        height: thickness,
        backgroundColor: color,
      }}
      aria-hidden="true"
    />
  );
};

export default HorizontalLine;

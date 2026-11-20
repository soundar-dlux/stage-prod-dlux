
"use client";

import React from "react";

interface OrangeGradientCircleProps {
    size?: number;
    className?: string;
}

const OrangeGradientCircle: React.FC<OrangeGradientCircleProps> = ({
    size = 442,
    className = "",
}) => {
    return (
        <div
            className={`relative shrink-0 rounded-full overflow-hidden ${className}`}
            style={{
                width: size,
                height: size,
                background: `
          radial-gradient(
            circle at 50% 46%,
            #FF701F 0%,
            #FF641C 45%,
            #FF501A 78%,
            #FF321B 100%
          )
        `,
                border: "5px solid #F5F000",
            }}
        >
            {/* Mild orange blur */}
            <div
                className="absolute inset-[4%] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(255,155,45,0.22) 0%, rgba(255,110,25,0.12) 60%, transparent 100%)",
                    filter: "blur(8px)",
                }}
            />

            {/* Fine concentric rings */}
            <div
                className="absolute inset-[3%] rounded-full"
                style={{
                    background: `
            repeating-radial-gradient(
              circle,
              transparent 0px,
              transparent 5px,
              rgba(255,170,45,0.22) 6px,
              rgba(255,130,25,0.12) 7px,
              transparent 9px
            )
          `,
                    filter: "blur(1.2px)",
                }}
            />

            {/* Outer orange rings */}
            {[6, 10, 14, 18].map((inset, index) => (
                <div
                    key={inset}
                    className="absolute rounded-full"
                    style={{
                        inset: `${inset}%`,
                        border: `${index === 0 ? 4 : 2}px solid rgba(255,155,35,${0.5 - index * 0.08})`,
                        filter: "blur(1px)",
                    }}
                />
            ))}

            {/* Soft center lighting */}
            <div
                className="absolute inset-[15%] rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(255,175,55,0.12), transparent 75%)",
                    filter: "blur(12px)",
                }}
            />
        </div>
    );
};

export default OrangeGradientCircle;

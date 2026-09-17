"use client";

import { motion } from "framer-motion";

interface DotPaginationProps {
  total: number;
  activeIndex: number;
  onChange: (index: number) => void;
  className?: string;
}

const ACTIVE_COLOR = "#FF3901";
const INACTIVE_COLOR = "#4B4B4B";

export default function DotPagination({
  total,
  activeIndex,
  onChange,
  className = "",
}: DotPaginationProps) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className}`}
      role="tablist"
      aria-label="Pagination"
    >
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;

        return (
          <motion.button
            key={index}
            type="button"
            role="tab"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={isActive}
            aria-selected={isActive}
            onClick={() => onChange(index)}
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.92,
            }}
            animate={{
              width: isActive ? 32 : 10,
              backgroundColor: isActive
                ? ACTIVE_COLOR
                : INACTIVE_COLOR,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              h-[10px]
              rounded-full
              outline-none
              focus-visible:ring-2
              focus-visible:ring-offset-2
              focus-visible:ring-[#FF3901]
            "
          >
            {isActive && (
              <motion.span
                layoutId="active-dot"
                className="absolute inset-0 rounded-full"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
                style={{
                  boxShadow:
                    "0 0 8px rgba(255,57,1,.65), 0 0 20px rgba(255,57,1,.35)",
                }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
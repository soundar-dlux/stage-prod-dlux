function pxToRem(pixels, fontSize = 16) {
  return `${pixels / fontSize}rem`;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#FF3901",
          secondary: "#F07800",

          white: "#FFFFFF",
          black: "#000000",

          // gradient colors
          gradientFrom: "#FF3901",
          gradientTo: "#F07800",
        },
        surface: {
          dark: "#000000",
          light: "#171717",
          white: "#FFFFFF",
          transparent: "transparent",
        },
      },

      fontFamily: {
        sans: ["var(--font-open-sans)", "sans-serif"], // DEFAULT FONT
      },
      fontSize: {
        none: [pxToRem(0)],
        base: pxToRem(16),
        base_dsktp: pxToRem(18),
        display: pxToRem(40),
        h1: pxToRem(36),
        h2: pxToRem(32),
        h3: pxToRem(28),
        h4: pxToRem(24),
        h5: pxToRem(20),
        h6: pxToRem(18),
        eyebrow: pxToRem(12),
        xs: pxToRem(12),
        sm: pxToRem(14),
        md: pxToRem(16),
        lg: pxToRem(18),
        display_dsktp: pxToRem(80),
        h1_dsktp: pxToRem(56),
        h2_dsktp: pxToRem(48),
        h3_dsktp: pxToRem(40),
        h4_dsktp: pxToRem(32),
        h5_dsktp: pxToRem(24),
        h6_dsktp: pxToRem(20),
        eyebrow_dsktp: pxToRem(12),
        xs_dsktp: pxToRem(14),
        sm_dsktp: pxToRem(16),
        md_dsktp: pxToRem(18),
        lg_dsktp: pxToRem(20),
      },
      lineHeight: {
        display: pxToRem(44),
        h1: pxToRem(40),
        h2: pxToRem(40),
        h3: pxToRem(36),
        h4: pxToRem(32),
        h5: pxToRem(28),
        h6: pxToRem(26),
        eyebrow: pxToRem(20),
        base: pxToRem(24),
        xs: pxToRem(20),
        sm: pxToRem(24),
        md: pxToRem(26),
        lg: pxToRem(28),
        display_dsktp: pxToRem(72),
        h1_dsktp: pxToRem(60),
        h2_dsktp: pxToRem(48),
        h3_dsktp: pxToRem(44),
        h4_dsktp: pxToRem(36),
        h5_dsktp: pxToRem(32),
        h6_dsktp: pxToRem(28),
        eyebrow_dsktp: pxToRem(22),
        base_dsktp: pxToRem(26),
        xs_dsktp: pxToRem(22),
        sm_dsktp: pxToRem(24),
        md_dsktp: pxToRem(28),
        lg_dsktp: pxToRem(30),
      },
      screens: {
        "2xl": "2000px", // Custom breakpoint for screen widths >= 2000px
        tablet: { min: "768px", max: "1250px" },
        desktop: { min: "1250px" },
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

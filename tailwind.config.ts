import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2d2d2d", // Sophisticated charcoal
          light: "#4a4a4a",
          dark: "#1a1a1a",
        },
        accent: {
          DEFAULT: "#c17a6f", // Warm terracotta
          light: "#d69b92",
          dark: "#a05d53",
        },
        background: {
          DEFAULT: "#fafaf8", // Off-white
          warm: "#f5f4f0",
        },
        success: "#7c9885",
        error: "#c47a7a",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;

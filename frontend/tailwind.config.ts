import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        softWhite: "#F8F6F2",
        softBeige: "#F1E9DD",
        warmBeige: "#EADDC8",
        champagneGold: "#F4E3C1",
        paleGold: "#D9B68E",
        dustyRose: "#C4A69D",
        mutedTaupe: "#A8907C",
      },
      fontFamily: {
        hindi: ['hind', 'sans-serif']
      }
    },
  },
  plugins: [],
} satisfies Config;

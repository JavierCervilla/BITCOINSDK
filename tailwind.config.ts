/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx,mjs}",
    "./ladle.config.mjs"
  ],
  purge: [],
  safelist: [
    "bg-primary",
    "hover:bg-primary",
    "bg-secondary",
    "hover:bg-secondary",
    "bg-light",
    "hover:bg-light",
    "bg-dark",
    "hover:bg-dark",
    {
      pattern: /data-\[state=active\]/
    }
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        light: "rgb(var(--light) / <alpha-value>)",
        dark: "rgb(var(--dark) / <alpha-value>)",
        hover: "rgb(var(--hover) / <alpha-value>)",
        "text-hover": "rgb(var(--text-hover) / <alpha-value>)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in-from-top-2": {
          "0%": { transform: "translateY(-2%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-from-bottom-2": {
          "0%": { transform: "translateY(2%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in": "slide-in 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

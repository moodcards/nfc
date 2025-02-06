import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: {
          DEFAULT: "#0A0A0F",
          card: "rgba(26, 26, 35, 0.8)",
        },
        primary: {
          DEFAULT: "#4F46E5",
          hover: "#6366F1",
          light: "#818CF8",
        },
        secondary: {
          DEFAULT: "#64748B",
          hover: "#94A3B8",
        },
        accent: {
          DEFAULT: "#F43F5E",
          hover: "#FB7185",
        },
      },
      backgroundImage: {
        "gradient-dark":
          "linear-gradient(to bottom, rgba(10, 10, 15, 0) 0%, rgba(10, 10, 15, 0.9) 50%, rgba(10, 10, 15, 1) 100%)",
        "gradient-light":
          "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 1) 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "fade-down": "fadeDown 0.5s ease-out forwards",
        "slide-in": "slideIn 0.5s ease-out forwards",
        "spin-slow": "spin 3s linear infinite",
        orbit: "orbit 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(32px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(32px) rotate(-360deg)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config


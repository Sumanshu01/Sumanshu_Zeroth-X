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
        background: "#0a0a0f",
        foreground: "#f8fafc",
        card: "rgba(17, 17, 24, 0.7)",
        primary: "#00d4ff",
        success: "#39ff14",
        border: "rgba(255, 255, 255, 0.1)",
        secondaryBg: "#111118",
        secondaryText: "#94a3b8",
        darkbase: "#0a0a0f",
        darkcard: "#111118",
        darkborder: "#1a1a2e",
        accent: {
          cyan: "#00d4ff",
          green: "#39ff14",
          purple: "#8b5cf6"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        aurora: {
          "0%": { backgroundPosition: "50% 50%, 50% 50%" },
          "100%": { backgroundPosition: "350% 50%, 350% 50%" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" }
        }
      },
      animation: {
        shimmer: "shimmer 8s infinite linear",
        aurora: "aurora 60s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite"
      }
    },
  },
  plugins: [],
};
export default config;

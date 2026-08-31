import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "brand-navy": "rgb(var(--brand-navy) / <alpha-value>)",
        "brand-navy-soft": "rgb(var(--brand-navy-soft) / <alpha-value>)",
        "brand-blue": "rgb(var(--brand-blue) / <alpha-value>)",
        "brand-blue-soft": "rgb(var(--brand-blue-soft) / <alpha-value>)",
        "brand-ivory": "rgb(var(--brand-ivory) / <alpha-value>)",
        "brand-surface": "rgb(var(--brand-surface) / <alpha-value>)",
        "brand-muted": "rgb(var(--brand-muted) / <alpha-value>)",
        "brand-border": "rgb(var(--brand-border) / <alpha-value>)",
        primary: "rgb(var(--brand-blue) / <alpha-value>)",
        "primary-light": "#4774C3",
        "primary-dark": "rgb(var(--brand-navy-soft) / <alpha-value>)",
        "primary-xdark": "rgb(var(--brand-navy) / <alpha-value>)",
        "app-bg": "rgb(var(--brand-ivory) / <alpha-value>)",
        "app-border": "rgb(var(--brand-border) / <alpha-value>)",
        "text-primary": "rgb(var(--brand-navy) / <alpha-value>)",
        "text-secondary": "rgb(var(--brand-navy-soft) / <alpha-value>)",
        "text-muted": "rgb(var(--brand-muted) / <alpha-value>)",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        info: "#3B82F6",
      },
      fontFamily: {
        display: ["var(--font-pt-serif)", "Georgia", "serif"],
        sans: ["var(--font-lato)", "Arial", "sans-serif"],
      },
      boxShadow: {
        modal: "0 20px 60px rgba(20, 29, 82, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;

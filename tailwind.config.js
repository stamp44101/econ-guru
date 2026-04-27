/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Cormorant Garamond'", "'Sarabun'", "ui-serif", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "Menlo", "monospace"],
        thai: ["'Sarabun'", "sans-serif"],
      },
      colors: {
        bg: { 0: "#0f0c0a", 1: "#1a1410", 2: "#2a1f17" },
        ink: "#fce8b0",
        amber: "#d4a85a",
      },
    },
  },
  plugins: [],
};

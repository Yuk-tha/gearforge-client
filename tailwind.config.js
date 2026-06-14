/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",      // Purple
        neon: "#00D4FF",         // Neon Blue
        dark: "#0A0A0A",         // Deep Black
        surface: "#111111",      // Card bg
        surfaceLight: "#1A1A1A", // Lighter surface
        border: "#2A2A2A",       // Border color
      },
      fontFamily: {
        gaming: ["Rajdhani", "sans-serif"],
      }
    },
  },
  plugins: [],
}
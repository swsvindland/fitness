import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        background: "#0D3140",
        card: "#2E586A",
        "primary-dark": "#154255",
        primary: "#28827A",
        "primary-light": "#6FB6B0",
        secondary: "#F7C619",
        "secondary-light": "#FFF496",
        "ternary-dark": "#86AE21",
        ternary: "#AFD257",
        "ternary-light": "#CEEE80",
        error: "#ba1a1a",
      },
      fontFamily: {
        sans: ["Oswald", "sans-serif"],
      },
    },
  },
  plugins: [],
} as Config;

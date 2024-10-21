import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            100: "#dae6f0",
            200: "#b5cee2",
            300: "#8fb5d3",
            400: "#6a9dc5",
            500: "#4584b6",
            600: "#376a92",
            700: "#294f6d",
            800: "#1c3549",
            900: "#0e1a24",
            DEFAULT: "#4584b6"
          },
          secondary: {
            100: "#fff9df",
            200: "#fff3be",
            300: "#ffec9e",
            400: "#ffe67d",
            500: "#ffe05d",
            600: "#ccb34a",
            700: "#998638",
            800: "#665a25",
            900: "#332d13",
            DEFAULT: "#ffe05d"
          },
        }
      },
      dark: {
        colors: {
          primary: {
            100: "#dae6f0",
            200: "#b5cee2",
            300: "#8fb5d3",
            400: "#6a9dc5",
            500: "#4584b6",
            600: "#376a92",
            700: "#294f6d",
            800: "#1c3549",
            900: "#0e1a24",
            DEFAULT: "#4584b6"
          },
          secondary: {
            100: "#fff9df",
            200: "#fff3be",
            300: "#ffec9e",
            400: "#ffe67d",
            500: "#ffe05d",
            600: "#ccb34a",
            700: "#998638",
            800: "#665a25",
            900: "#332d13",
            DEFAULT: "#ffe05d"
          },
        }
      }
    }
  })],
};

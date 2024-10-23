import { colors, nextui } from "@nextui-org/theme";

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
                        100: "#e6d9ef",
                        200: "#cdb4e0",
                        300: "#b58ed0",
                        400: "#9c69c1",
                        500: "#8343b1",
                        600: "#69368e",
                        700: "#4f286a",
                        800: "#341b47",
                        900: "#1a0d23",
                        DEFAULT: "#8343b1",
                    }, success: {
                        100: "#EAFBD6",
                        200: "#D1F7AE",
                        300: "#ACE882",
                        400: "#85D25E",
                        500: "#54B530",
                        600: "#3B9B23",
                        700: "#268218",
                        800: "#14680F",
                        900: "#095609",
                        DEFAULT: "#54B530",
                    }, warning: {
                        100: "#FFFBD3",
                        200: "#FFF5A8",
                        300: "#FFEF7C",
                        400: "#FFE85C",
                        500: "#FFDE26",
                        600: "#DBBB1B",
                        700: "#B79913",
                        800: "#93780C",
                        900: "#7A6107",
                        DEFAULT: "#FFDE26",
                    }, danger: {
                        100: "#FFDEDA",
                        200: "#FFB7B6",
                        300: "#FF9199",
                        400: "#FF768D",
                        500: "#FF497A",
                        600: "#DB3572",
                        700: "#B72468",
                        800: "#93175D",
                        900: "#7A0E55",
                        DEFAULT: "#FF497A",
                    },
                },
            },
            dark: {
                colors: {
                    background: "#0d1117",
                    primary: {
                        100: "#e6d9ef",
                        200: "#cdb4e0",
                        300: "#b58ed0",
                        400: "#9c69c1",
                        500: "#8343b1",
                        600: "#69368e",
                        700: "#4f286a",
                        800: "#341b47",
                        900: "#1a0d23",
                        DEFAULT: "#8343b1",
                    }, success: {
                        100: "#EAFBD6",
                        200: "#D1F7AE",
                        300: "#ACE882",
                        400: "#85D25E",
                        500: "#54B530",
                        600: "#3B9B23",
                        700: "#268218",
                        800: "#14680F",
                        900: "#095609",
                        DEFAULT: "#54B530",
                    }, warning: {
                        100: "#FFFBD3",
                        200: "#FFF5A8",
                        300: "#FFEF7C",
                        400: "#FFE85C",
                        500: "#FFDE26",
                        600: "#DBBB1B",
                        700: "#B79913",
                        800: "#93780C",
                        900: "#7A6107",
                        DEFAULT: "#FFDE26",
                    }, danger: {
                        100: "#FFDEDA",
                        200: "#FFB7B6",
                        300: "#FF9199",
                        400: "#FF768D",
                        500: "#FF497A",
                        600: "#DB3572",
                        700: "#B72468",
                        800: "#93175D",
                        900: "#7A0E55",
                        DEFAULT: "#FF497A",
                    },
                },
            },
        },
    }
    )],
};


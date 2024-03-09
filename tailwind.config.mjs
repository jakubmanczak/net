/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["quicksand", ...defaultTheme.fontFamily.sans],
        lexend: ["lexend", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        fadein: "fadein .5s ease-in-out",
      },
      keyframes: {
        fadein: {
          "0%": {
            transform: "translatey(4rem)",
            opacity: 0,
          },
          "50%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [],
};

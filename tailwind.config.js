/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        halfvw: "50vw",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeOut: "fadeOut 8s ease-out",
        loader: "loader 0.6s infinite alternate",
        slideUp: "slideUp 1s ease-in-out",
        slideDown: "slideDown 1s ease-in-out",
        slideRight: "slideRight 1s ease-in-out",
        slideLeft: "slideLeft 1s ease-in-out",
      },
      keyframes: {
        slideRight: {
          "0%": { opacity: 0, transform: "translateX(-10%)", visibility: "hidden" },
          "100%": { opacity: 1, transform: "translateY(0)", visibility: "visible" },
        },
        slideLeft: {
          "0%": { opacity: 0, transform: "translateX(10%)", visibility: "hidden" },
          "100%": { opacity: 1, transform: "translateY(0)", visibility: "visible" },
        },
        slideDown: {
          "0%": { opacity: 0, transform: "translateY(-100%)", visibility: "hidden" },
          "50%": { opacity: 1, transform: "translateY(0)", visibility: "visible" },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(100%)", visibility: "hidden" },
          "100%": { opacity: 1, transform: "translateY(0)", visibility: "visible" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "50%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        loader: {
          to: {
            opacity: 0.1,
            transform: "translate3d(0, -1rem, 0)",
          },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};

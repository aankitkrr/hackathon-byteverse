import flowbiteReact from "flowbite-react/plugin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./src/**/*.{html,js}", ".flowbite-react\\class-list.json",
    "./index.html",

  ],
  theme: {
    extend: {
      colors: {
        deepDark: '#0f0f1b',
        cardDark: '#1a1a2e',
        glowBlue: '#38bdf8',
        glowPurple: '#c084fc',
      },
      boxShadow: {
        glow: '0 0 10px #38bdf8, 0 0 20px #38bdf8',
      },
    },
    },
  plugins: [flowbiteReact],
}
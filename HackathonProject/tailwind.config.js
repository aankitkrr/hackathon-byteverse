import flowbiteReact from "flowbite-react/plugin/tailwindcss";
import forms from "@tailwindcss/forms";
import aspectRatio from "@tailwindcss/aspect-ratio";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",    
    "./node_modules/flowbite-react/**/*.js"
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
  plugins: [flowbiteReact, forms, aspectRatio],
};

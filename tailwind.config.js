/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  themes: ["night"],
  daisyui: {
    darkTheme: "night",
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

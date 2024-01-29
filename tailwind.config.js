/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  themes: [],
  daisyui: {
    darkTheme: "halloween"
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

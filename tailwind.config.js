/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      "black": "#000000",
      "smoky-black": "#171611",
      "eerie-black": "#20201D",
      "jet-black": "#292929",
      "dark-pastel-green": "#53B04E",
      "pistachio-green": "#99D665",
      "mindaro-green": "#DDFFAB",
      "steel-pink": "#C13DDA",
      "muave-pink": "#D47BD9",
      "lavender-pink": "#E6B9D7",
      "gray": "#808080",
      "silver": "#C0C0C0",
      "white": "#FFFFFF",
    },
    extend: {},
  },
  plugins: [],
}
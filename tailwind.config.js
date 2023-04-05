/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "primary": {
        "50": "#e2f2ff",
        "100": "#b9dfff",
        "200": "#87cbff",
        "300": "#49b6ff",
        "400": "#00a5ff",
        "500": "#0095ff",
        "600": "#0085ff",
        "700": "#0072ff",
        "800": "#025fee",
        "900": "#1e3bce"
      },
      "secondary": {
        "50": "#f9f9f9",
        "100": "#f1f1f1",
        "200": "#e8e8e8",
        "300": "#d8d8d8",
        "400": "#b4b4b4",
        "500": "#949494",
        "600": "#6b6b6b",
        "700": "#585858",
        "800": "#3a3a3a",
        "900": "#191919"
      }
      
    },
    extend: {
        
    },
  },
  plugins: [],
}
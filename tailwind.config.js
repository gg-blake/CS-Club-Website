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
    extend: {
      colors: {
        "primary": {
          "50": 'hsl(var(--color-primary-50))',
          "100": "hsl(var(--color-primary-100))",
          "200": "hsl(var(--color-primary-200))",
          "300": "hsl(var(--color-primary-300))",
          "400": "hsl(var(--color-primary-400))",
          "500": "hsl(var(--color-primary-500))",
          "600": "hsl(var(--color-primary-600))",
          "700": "hsl(var(--color-primary-700))",
          "800": "hsl(var(--color-primary-800))",
          "900": "hsl(var(--color-primary-900))"
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
        },
        
      },
    },
  },
  plugins: [
    require("tailwindcss-inner-border"),
  ],
}
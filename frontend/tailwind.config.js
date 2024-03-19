/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      colors: {
        'bg-dark': '#050505',
        'panel-dark': '#131417',
        'sub-dark':'#1c1e21',
        'border-dark':'#292c34',
        'text-gray':'#aeb3b7',
      }},
  },
  plugins: [],
}


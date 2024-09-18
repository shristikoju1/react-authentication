/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    screens: {
      'sm': '335px', 
    },
    fontFamily: {
      'source-sans': ['"Source Sans 3"', 'sans-serif'],
    },
    extend: {
      colors: {
        primaryColor: 'rgba(0,128,0)',
      },
    },
  },
  plugins: [],
}

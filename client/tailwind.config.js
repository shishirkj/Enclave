/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': [],
      'roboto': ['Roboto', 'sans-serif'],
      'fijila': ['Fijila', 'sans-serif'],
    },
    extend: {},
    container: { 
      center: true
    },
  },
  plugins: [],
}

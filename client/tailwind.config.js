/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F8F4F4',
        secondary: '#52598F',
        tertiary: '#D9D9D9',
      },
    },
  },
  plugins: [],
};

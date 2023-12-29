/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#9faeab',
        secondary: '#8b958d',
        tertiary: '#848486',
        light: '#F2F2EF',
        dark: "#2a425d",
        extraDark: '#1c2938'
      },
    },
  },
  plugins: [],
};

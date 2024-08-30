import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['custom', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        edo: {
          50: '#DADFFB',
          100: '#C8CFF9',
          200: '#A3AFF5',
          300: '#7E90F1',
          400: '#5A70ED',
          500: '#3550E9',
          600: '#1836DC',
          700: '#142DB8',
          800: '#102493',
          900: '#0C1B6E',
          950: '#0A165A'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}

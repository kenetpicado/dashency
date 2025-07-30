import defaultTheme from 'tailwindcss/defaultTheme'
import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['light']
  }
}

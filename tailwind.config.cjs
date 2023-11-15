/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge: [
  //   './src/**/*.html',
  //   './src/**/*.vue',
  //   './src/**/*.jsx',
  // ],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      lineHeight: {
        '16': '4rem',
      }
    },

    backgroundColor: theme => ({
      ...theme('colors'),
      'HeaderBlue': '#246cff'
    })
  },
  plugins: [],
}

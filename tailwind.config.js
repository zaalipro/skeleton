/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,ts}',
    './dist/index.html',
    './**/*.{html,js,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'emerald', // vibrant green
      'dracula', // modern dark
      'cupcake', // pastel
      'bumblebee', // yellow
      'synthwave', // neon
      'valentine', // pink
      'aqua', // blue
      'luxury', // gold/black
      'garden', // green
      'lofi', // minimal
      'pastel', // soft
      'fantasy', // playful
      'wireframe', // wireframe
      'cmyk', // print
      'autumn', // orange
      'business', // professional
      'acid', // bright
      'lemonade', // yellow/green
      'night', // dark
      'coffee', // brown
      'winter', // cool
    ],
    darkTheme: 'dracula',
    base: true,
    styled: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: '',
  },
}

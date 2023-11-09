/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html, js}"],
  theme: {
    extend: {
      fontFamily: {
        'pixelify': ['Pixelify Sans', 'sans-serif'],
        'spacegrotesk': ['Space Grotesk', 'sans-serif'],
        'gillsans': ['Gill Sans', 'sans-serif']
      },
    },
  },
  plugins: [],
}


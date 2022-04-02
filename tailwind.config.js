module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'), require('tailwindcss-animate')],
  themes: ['winter'],
  daisyui: {
    themes: ['winter'],
    darkTheme: 'winter',
  },
}

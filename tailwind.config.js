module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'ds-400': '#9D9CAF',
        'ds-600': '#4C4B63',
        'ds-700': '#383751',
        'ds-900': '#121127',
        'ds-content': '#E6EBFF',
        'chart-primary': '#FF98D3',
        'chart-secondary': '#FFD66B',
        'chart-accent': '#5B93FF',
        'chart-neutral': '#AE8FF7',
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
  themes: ['winter'],
  daisyui: {
    themes: ['winter'],
    darkTheme: 'winter',
  },
}

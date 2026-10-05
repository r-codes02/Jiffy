/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jiffy: {
          50: '#FFF5F2',
          100: '#FFE8E1',
          200: '#FFD3C4',
          300: '#FFAA8E',
          400: '#FF7B54',
          500: '#FF5722', // Primary Brand Coral/Orange
          600: '#EA4411',
          700: '#C4340A',
          800: '#9E2C0C',
          900: '#7E260F',
          dark: '#0B1120', // Midnight Navy Base
          navy: '#131D38', // Deep Navy Card/Section
          surface: '#1E293B',
          accent: '#10B981', // Emerald Verified & Payouts
          mango: '#F59E0B', // Creator Gold
          sand: '#FDFBF7', // Clean Warm Cream
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(255, 87, 34, 0.25)',
        'glow-green': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'card-soft': '0 2px 15px -3px rgba(0, 0, 0, 0.05), 0 10px 20px -2px rgba(0, 0, 0, 0.02)',
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      }
    },
  },
  plugins: [],
}

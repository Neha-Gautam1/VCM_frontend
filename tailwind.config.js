
/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff8f0',
          100: '#ffedd9',
          200: '#ffd8ab',
          300: '#ffbd73',
          400: '#ff9838',
          500: '#ff7a12',
          600: '#f05e08',
          700: '#c74609',
          800: '#9e380f',
          900: '#7f2f10',
        },
        maroon: {
          50: '#fdf2f3',
          100: '#fce4e6',
          200: '#f9cdd2',
          300: '#f3a4ad',
          400: '#ea7080',
          500: '#dc4257',
          600: '#c22641',
          700: '#941b32',
          800: '#6b1424',
          900: '#4a0f1a',
        },
        gold: {
          400: '#f2c94c',
          500: '#e0ac1f',
          600: '#b8860b',
        },
      },
      fontFamily: {
        display: ['"Poppins"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0,0,0,0.06)',
        card: '0 2px 10px rgba(0,0,0,0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-in-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(10px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}










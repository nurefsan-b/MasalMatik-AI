/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#FFD54F', // Warm Duck Yellow
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#FF9800', // Soft Orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        magic: {
          green: '#2E5A43', // Magical Forest Green
          lightGreen: '#4ade80',
          yellow: '#FFD54F',
          orange: '#FF9800',
        },
        dark: {
          900: '#1a1a1a',
          800: '#2d2d2d',
          700: '#404040',
          600: '#525252',
        },
        cream: '#FFFDF7', // Soft Cream Background
      },
      backgroundImage: {
        'gradient-magic': 'linear-gradient(135deg, #FFD54F 0%, #FF9800 100%)',
        'gradient-hero': 'linear-gradient(135deg, #FFFDF7 0%, #fef3c7 50%, #fde68a 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(255, 213, 79, 0.1) 0%, rgba(46, 90, 67, 0.05) 100%)',
        'gradient-cta': 'linear-gradient(135deg, #2E5A43 0%, #1E3D2D 100%)',
        'gradient-feature': 'linear-gradient(180deg, rgba(255, 213, 79, 0.05) 0%, rgba(46, 90, 67, 0.05) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 0, transform: 'scale(0)' },
          '50%': { opacity: 1, transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 1 },
        },
      },
      boxShadow: {
        'magic': '0 0 30px rgba(139, 92, 246, 0.3)',
        'magic-lg': '0 0 60px rgba(139, 92, 246, 0.4)',
        'glow-pink': '0 0 30px rgba(244, 63, 94, 0.3)',
        'card': '0 4px 30px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 40px rgba(139, 92, 246, 0.4)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}

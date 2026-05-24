/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        'deep-blue': '#1e1b4b',
        'deep-blue-light': '#312e81',
        'purple-accent': '#7c3aed',
        'purple-dark': '#6d28d9',
        'frosted': '#f8fafc',
        'glass': 'rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        'xl': '40px',
      },
      backgroundColor: {
        'glass': 'rgba(255, 255, 255, 0.05)',
        'glass-light': 'rgba(255, 255, 255, 0.1)',
      },
      borderColor: {
        'glass': 'rgba(255, 255, 255, 0.2)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-lg': '0 8px 32px rgba(0, 0, 0, 0.2)',
        'neon-purple': '0 0 20px rgba(124, 58, 237, 0.3)',
        'neon-blue': '0 0 20px rgba(30, 27, 75, 0.3)',
      },
      backgroundImage: {
        'gradient-mesh': 'linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #7c3aed 50%, #6d28d9 75%, #1e1b4b 100%)',
        'gradient-mesh-alt': 'linear-gradient(180deg, rgba(30, 27, 75, 0.8) 0%, rgba(124, 58, 237, 0.6) 50%, rgba(30, 27, 75, 0.8) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
    },
  },
  plugins: [],
}

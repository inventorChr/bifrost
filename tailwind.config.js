/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/pages/**/*.{js,jsx}",
    "./src/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'deep-nordic-blue': '#1a2333',
        'asgard-gold': '#ffd700',
        'bifrost-teal': '#40E0D0',
        'mystic-purple': '#9370DB',
        'ice-blue': '#A5D8FF',
        'rune-stone': '#2a3142',
        'frost-white': '#e6f1ff',
      },
      keyframes: {
        float1: {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, -20px)' },
          '100%': { transform: 'translate(0, 0)' }
        },
        float2: {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-20px, -15px)' },
          '100%': { transform: 'translate(0, 0)' }
        },
        float3: {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(15px, -25px)' },
          '100%': { transform: 'translate(0, 0)' }
        },
        glow: {
          '0%, 100%': {
            opacity: '0.8',
            filter: 'brightness(1.2) drop-shadow(0 0 8px var(--asgard-gold))',
            transform: 'scale(1)'
          },
          '50%': {
            opacity: '0.6',
            filter: 'brightness(0.8) drop-shadow(0 0 3px var(--asgard-gold))',
            transform: 'scale(0.95)'
          }
        },
        'glow-layer-1': {
          '0%, 100%': {
            opacity: '0.4',
            filter: 'brightness(1.2) blur(1px)',
            transform: 'scale(1.05)'
          },
          '50%': {
            opacity: '0.2',
            filter: 'brightness(0.8) blur(2px)',
            transform: 'scale(1)'
          }
        },
        'glow-layer-2': {
          '0%, 100%': {
            opacity: '0.2',
            filter: 'brightness(1.3) blur(2px)',
            transform: 'scale(1.1)'
          },
          '50%': {
            opacity: '0.1',
            filter: 'brightness(0.7) blur(3px)',
            transform: 'scale(1.05)'
          }
        }
      },
      animation: {
        'float-1': 'float1 6s ease-in-out infinite',
        'float-2': 'float2 8s ease-in-out infinite',
        'float-3': 'float3 7s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'glow-layer-1': 'glow-layer-1 2.5s ease-in-out infinite',
        'glow-layer-2': 'glow-layer-2 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
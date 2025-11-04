/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
      colors: {
        // Revolutionary Red - Symbol of the Party and revolution
        revolutionary: {
          50: '#fee2e2',
          100: '#fecaca',
          200: '#fca5a5',
          300: '#f87171',
          400: '#ef4444',
          500: '#B22222',
          600: '#8B0000',
          700: '#7f0000',
          800: '#6b0000',
          900: '#5a0000',
        },
        // Antique Gold - Victory and honor
        gold: {
          50: '#fffef5',
          100: '#fffaeb',
          200: '#fff2c7',
          300: '#ffe8a3',
          400: '#ffd75f',
          500: '#D4AF37',
          600: '#c79f2b',
          700: '#b88a0e',
          800: '#936f0d',
          900: '#78590c',
        },
        // Parchment - Aged paper tones
        parchment: {
          50: '#FAF3E0',
          100: '#F5E6CC',
          200: '#EDD9B0',
          300: '#E4CC94',
          400: '#D9BD78',
          500: '#CBB994',
          600: '#C2B280',
          700: '#B09A6F',
          800: '#9E825D',
          900: '#8C6A4B',
        },
        // Revolutionary Brown - Paper and stability
        brown: {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#e8ddd0',
          300: '#d4c3af',
          400: '#b8a189',
          500: '#9d826a',
          600: '#7a6350',
          700: '#5d4a3c',
          800: '#4B3B31',
          900: '#3C2F2F',
        },
        // Deep Text - High contrast brown-black
        deeptext: {
          50: '#faf8f7',
          100: '#f2ede9',
          200: '#e0d5cc',
          300: '#c8b5a3',
          400: '#a88d75',
          500: '#8a6f55',
          600: '#6d5542',
          700: '#564332',
          800: '#4B3B31',
          900: '#2B1B17',
        },
        // Success Green - Growth and progress
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#4E9258',
          600: '#3d7745',
          700: '#2f5d36',
          800: '#23482a',
          900: '#1a3620',
        },
        // Error Red - Burnt brick
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#A52A2A',
          600: '#8b2222',
          700: '#7f1d1d',
          800: '#6b1717',
          900: '#5a1414',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(-5px)' },
          '50%': { transform: 'translateY(0px)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#0f172a', // slate-900
            '--tw-prose-bullets': '#D4AF37',
            '--tw-prose-quotes': '#5a0000',
            a: {
              color: '#7f0000', // revolutionary-700
              textDecoration: 'underline',
              textDecorationColor: '#ffd75f', // gold-400
              '&:hover': {
                color: '#8B0000', // revolutionary-600
                textDecorationColor: '#ffd75f', // gold-400
              },
            },
            h1: {
              color: '#7f0000', // revolutionary-700
              fontWeight: '700',
            },
            h2: {
              color: '#8B0000', // revolutionary-600
              fontWeight: '600',
            },
            h3: {
              color: '#B22222', // revolutionary-500
              fontWeight: '600',
            },
            strong: {
              color: '#ffe8a3', // gold-300 (light gold)
              fontWeight: '600',
            },
            blockquote: {
              borderLeftColor: '#D4AF37', // gold-500
              color: '#3C2F2F', // deep brown text
            },
            'ul > li::marker': { color: '#D4AF37' },
            'ol > li::marker': { color: '#D4AF37' },
          },
        },
        invert: {
          css: {
            strong: {
              color: '#ffe8a3', // light gold in dark mode too
              fontWeight: '600',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function({ addUtilities }) {
      const newUtilities = {
        '.line-clamp-2': {
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
        '.line-clamp-3': {
          display: '-webkit-box',
          '-webkit-line-clamp': '3',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
        '.bg-gradient-radial': {
          'background-image': 'radial-gradient(circle, var(--tw-gradient-stops))',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};

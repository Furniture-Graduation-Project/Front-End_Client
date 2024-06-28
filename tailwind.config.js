/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      colors: {
        blue: '#377DFF',
        green: '#38CB89',
        yellow: '#FFAB00',
        red: '#FF5630',
        'neutral-1': {
          DEFAULT: '#FEFEFE',
          100: '#FEFEFE',
          95: 'rgba(254, 254, 254, 0.95)',
          20: 'rgba(254, 254, 254, 0.2)',
          10: 'rgba(254, 254, 254, 0.1)'
        },
        'neutral-2': {
          DEFAULT: '#F3F5F7',
          100: '#F3F5F7',
          50: 'rgba(243, 245, 247, 0.5)'
        },
        'neutral-3': {
          DEFAULT: '#E8ECEF',
          100: '#E8ECEF',
          75: 'rgba(232, 236, 239, 0.75)',
          50: 'rgba(232, 236, 239, 0.5)'
        },
        'neutral-4': {
          DEFAULT: '#6C7275',
          100: '#6C7275',
          75: 'rgba(108, 114, 117, 0.75)',
          50: 'rgba(108, 114, 117, 0.5)',
          25: 'rgba(108, 114, 117, 0.25)',
          15: 'rgba(108, 114, 117, 0.15)'
        },
        'neutral-5': {
          DEFAULT: '#343839',
          100: '#343839',
          50: 'rgba(52, 56, 57, 0.5)'
        },
        'neutral-6': {
          DEFAULT: '#232627',
          100: '#232627',
          95: 'rgba(35, 38, 39, 0.95)',
          90: 'rgba(35, 38, 39, 0.9)',
          50: 'rgba(35, 38, 39, 0.5)'
        },
        'neutral-7': {
          DEFAULT: '#141718',
          100: '#141718',
          95: 'rgba(20, 23, 24, 0.95)',
          50: 'rgba(20, 23, 24, 0.5)'
        }
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}

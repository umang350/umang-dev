/** @type {import('tailwindcss').Config} */
const { spacing, fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  safelist: [
    'text-dash-acc', 'text-dash-acc2', 'text-dash-green', 'text-dash-pink',
    'bg-dash-acc/10', 'bg-dash-acc2/10', 'bg-dash-green/10', 'bg-dash-pink/10',
    'border-dash-acc/20', 'border-dash-acc2/20', 'border-dash-green/20', 'border-dash-pink/20',
    'from-dash-acc/[0.12]', 'from-dash-green/[0.1]', 'from-dash-pink/[0.1]',
    'to-dash-acc2/[0.04]', 'to-dash-acc/[0.04]',
    'from-yellow-400/[0.1]',
  ],
  theme: {
    fontFamily: {
      sans: ["Be Vietnam Pro", "Inter", "system-ui", "sans"],
      monospace: ["DM Mono", "monospace"],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.yellow,
      blue: colors.blue,
      green: colors.green,
      orange: colors.orange,
      purple: colors.purple,
      pink: colors.pink,
    },
    extend: {
      colors: {
        // Dashboard design system
        "dash-bg": "#0B0F19",
        "dash-sidebar": "#111827",
        "dash-card": "#1A1F2E",
        "dash-card-hover": "#1E2436",
        "dash-border": "#262D3D",
        "dash-text": "#E8ECF4",
        "dash-muted": "#8892A4",
        "dash-acc": "#818CF8",
        "dash-acc2": "#A78BFA",
        "dash-green": "#34D399",
        "dash-pink": "#F472B6",
        // Legacy aliases for backwards compat
        bg: "#0B0F19",
        "fun-gray-light": "#b2bbcf",
        "fun-gray": "#8892A4",
        "fun-gray-medium": "#767c85",
        "fun-gray-darker": "#262D3D",
        "fun-gray-dark": "#1A1F2E",
        "fun-gray-darkest": "#111827",
        "fun-pink": "#818CF8",
        "fun-pink-darker": "#0B0F19",
        "fun-pink-darkest": "#0B0F19",
        "fun-pink-dark": "#262D3D",
        "fun-pink-light": "#A78BFA",
        'blue-opaque': 'rgb(13 42 148 / 18%)',
        gray: {
          0: '#fff',
          100: '#E8ECF4',
          200: '#C0C8D8',
          300: '#8892A4',
          400: '#6B7280',
          500: '#4B5563',
          600: '#374151',
          700: '#262D3D',
          800: '#1A1F2E',
          900: '#111827'
        }
      },
      rotate: {
        '360': '360deg'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulse2: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(129,140,248,0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(129,140,248,0.25)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out',
        'fadeUp': 'fadeUp 0.6s ease-out both',
        'fadeUp1': 'fadeUp 0.6s ease-out 0.1s both',
        'fadeUp2': 'fadeUp 0.6s ease-out 0.2s both',
        'fadeUp3': 'fadeUp 0.6s ease-out 0.3s both',
        'fadeUp4': 'fadeUp 0.6s ease-out 0.4s both',
        'float': 'float 4s ease-in-out infinite',
        'pulse2': 'pulse2 2s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      willChange: {
        'projectCard': 'border-color, opacity, transform',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.indigo.400'),
              '&:hover': {
                color: theme('colors.indigo.300')
              },
              code: { color: theme('colors.indigo.400') }
            },
            'h2,h3,h4': {
              color: theme('colors.gray.100'),
              'scroll-margin-top': spacing[32]
            },
            thead: {
              borderBottomColor: theme('colors.gray.700')
            },
            code: { color: theme('colors.pink.400') },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false
          }
        },
        dark: {
          css: {
            color: theme('colors.gray.200'),
            a: {
              color: theme('colors.indigo.400'),
              '&:hover': {
                color: theme('colors.indigo.300')
              },
              code: { color: theme('colors.indigo.400') }
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.700'),
              color: theme('colors.gray.300')
            },
            'h2,h3,h4': {
              color: theme('colors.gray.100'),
              'scroll-margin-top': spacing[32]
            },
            hr: { borderColor: theme('colors.gray.700') },
            ol: {
              li: {
                '&:before': { color: theme('colors.gray.500') }
              }
            },
            ul: {
              li: {
                '&:before': { backgroundColor: theme('colors.gray.500') }
              }
            },
            strong: { color: theme('colors.gray.100') },
            thead: {
              th: {
                color: theme('colors.gray.100')
              },
              borderBottomColor: theme('colors.gray.600')
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700')
              }
            }
          }
        }
      })
    }
  },
  variants: {
    typography: ['dark']
  },
  plugins: [],
}

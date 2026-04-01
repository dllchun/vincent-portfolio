import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // New cosmic design system
        background: '#06060f',
        surface: '#0b0920',
        'surface-2': '#110e25',
        border: 'rgba(139, 92, 246, 0.15)',
        accent: '#8b5cf6',       // violet — primary
        'accent-dim': '#7c3aed',
        'accent-secondary': '#ec4899',  // pink
        'accent-tertiary': '#f59e0b',   // amber
        'text-primary': '#faf5ff',
        'text-secondary': '#9f91c0',
        // Legacy aliases so existing components still compile
        'bg-primary': '#06060f',
        'bg-secondary': '#0b0920',
        'bg-card': '#110e25',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        syne: ['var(--font-syne)', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradientShift 5s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 12px rgba(139, 92, 246, 0.3)' },
          '50%':       { boxShadow: '0 0 30px rgba(139, 92, 246, 0.6), 0 0 60px rgba(139, 92, 246, 0.15)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(-10px)' },
        },
        gradientShift: {
          '0%':   { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '300% center' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config

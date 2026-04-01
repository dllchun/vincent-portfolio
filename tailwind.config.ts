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
        // Premium dark navy/indigo base
        background: '#050816',
        surface: '#0a0d1a',
        'surface-2': '#0f1020',
        border: 'rgba(124, 58, 237, 0.18)',

        // Vivid violet-to-pink + electric blue
        accent: '#7c3aed',           // violet primary
        'accent-mid': '#a855f7',     // purple
        'accent-dim': '#6d28d9',
        'accent-secondary': '#ec4899',  // pink
        'accent-blue': '#3b82f6',    // electric blue
        'accent-cyan': '#06b6d4',    // cyan
        'accent-tertiary': '#f59e0b', // amber

        'text-primary': '#f1f0ff',
        'text-secondary': '#8b87b8',

        // Legacy aliases so existing components compile unchanged
        'bg-primary': '#050816',
        'bg-secondary': '#0a0d1a',
        'bg-card': '#0f1020',
      },
      fontFamily: {
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono:  ['var(--font-mono)', 'monospace'],
        syne:  ['var(--font-syne)', 'sans-serif'],  // now resolves to Space Grotesk
      },
      animation: {
        'fade-up':       'fadeUp 0.6s ease-out forwards',
        'fade-in':       'fadeIn 0.8s ease-out forwards',
        'pulse-slow':    'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow':    'pulseGlow 2.5s ease-in-out infinite',
        float:           'float 6s ease-in-out infinite',
        'gradient-shift':'gradientShift 5s linear infinite',
        'spin-slow':     'spin 12s linear infinite',
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
          '0%, 100%': { boxShadow: '0 0 12px rgba(124, 58, 237, 0.3)' },
          '50%':      { boxShadow: '0 0 30px rgba(124, 58, 237, 0.6), 0 0 60px rgba(59, 130, 246, 0.15)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
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

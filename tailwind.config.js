/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
        script: ['"Dancing Script"', 'cursive'],
        mono: ['"Space Mono"', 'monospace'],
      },
      colors: {
        brand: {
          bg: '#FFF8F3',
          card: '#FFFFFF',
          text: '#2B1B2D',
          muted: '#6B5E6E',
          coral: '#E6496C',
          pink: '#FF8DA1',
          rose: '#FDA4AF',
          blue: '#38BDF8',
          royal: '#2563EB',
          gold: '#F59E0B',
          amber: '#FBBF24',
          lavender: '#E8DEF8',
          mint: '#B7E4C7',
          parchment: '#FDF5EE',
        }
      },
      boxShadow: {
        '2luv': '0 20px 45px -10px rgba(43, 27, 45, 0.12), 0 8px 16px -4px rgba(43, 27, 45, 0.06)',
        'float': '0 12px 30px -4px rgba(230, 73, 108, 0.25)',
        'polaroid': '0 10px 25px -4px rgba(43, 27, 45, 0.15)',
        'arcade': '0 16px 36px -6px rgba(15, 23, 42, 0.35)',
      }
    },
  },
  plugins: [],
}

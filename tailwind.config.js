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
          bg: '#F0F7FF',
          card: '#FFFFFF',
          text: '#0F172A',
          muted: '#475569',
          primary: '#2563EB', // Royal Sapphire
          secondary: '#38BDF8', // Cyan Sky
          accent: '#1D4ED8',
          ice: '#E0F2FE',
          pale: '#F8FAFC',
          gold: '#F59E0B',
          amber: '#FBBF24',
          navy: '#1E3A8A',
        }
      },
      boxShadow: {
        '2luv': '0 20px 45px -10px rgba(30, 58, 138, 0.12), 0 8px 16px -4px rgba(30, 58, 138, 0.06)',
        'float': '0 12px 30px -4px rgba(37, 99, 235, 0.35)',
        'polaroid': '0 10px 25px -4px rgba(15, 23, 42, 0.12)',
        'arcade': '0 20px 45px -8px rgba(30, 58, 138, 0.25)',
      }
    },
  },
  plugins: [],
}

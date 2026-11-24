/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
        diary: ['Caveat', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        gingham: {
          light: '#F0F6FC',
          base: '#E1EDFB',
          border: '#BFDBFE',
          dark: '#1E3A8A',
        },
        scrapbook: {
          paper: '#FFFDF9',
          cream: '#FAF7F0',
          tape: '#93C5FD',
          pin: '#F59E0B',
          accent: '#2563EB',
        }
      },
      boxShadow: {
        'scrapbook': '0 12px 36px -4px rgba(37, 99, 235, 0.12), 0 4px 12px -2px rgba(37, 99, 235, 0.08)',
        'polaroid': '0 8px 24px -2px rgba(15, 23, 42, 0.12), 0 2px 6px rgba(15, 23, 42, 0.06)',
        'strip': '0 14px 30px -4px rgba(15, 23, 42, 0.18)',
      }
    },
  },
  plugins: [],
}

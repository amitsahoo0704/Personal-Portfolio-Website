/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Space Mono', 'Consolas', 'monospace'],
        code: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}


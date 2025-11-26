/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#111111',
        accent: '#FFFFFF',
        'text-primary': '#FFFFFF',
        'text-secondary': '#888888',
        'text-dark': '#000000',
        'text-muted': '#666666',
        'border-color': '#333333',
        'border-light': '#E0E0E0',
        'bg-white': '#FFFFFF',
        'bg-light': '#F5F5F5',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

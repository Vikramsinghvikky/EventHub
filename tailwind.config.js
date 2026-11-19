/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#FF6B00",
          orangeHover: "#EA5E00",
          orangeLight: "#FFF7ED",
          orangeBorder: "#FED7AA",
          charcoal: "#111827",
          muted: "#6B7280",
          bg: "#F5F5F7",
          border: "#E5E7EB",
          cardBg: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
        '5xl': '40px',
      },
      boxShadow: {
        'card': '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.04)',
        'float': '0 10px 30px -10px rgba(255, 107, 0, 0.35)',
      },
    },
  },
  plugins: [],
}

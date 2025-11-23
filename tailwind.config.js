module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      // tailwind.config.js - REEMPLAZÁ todo el extend.colors
      colors: {
        braidot: {
          'primary-bordo': '#5B0F0F',
          'primary-bordo-light': '#8B1A1A',
          'negro': '#0b0b0b',
          'gris': '#374151',
          'gris2': '#6B7280',
          'blanco2': '#D1D5DB',
          'blanco1': '#F3F4F6',
          'neutral-50': '#FAFAFA',
          'neutral-100': '#F5F5F5',
          'neutral-200': '#E5E5E5',
          'neutral-300': '#D4D4D4',
          'neutral-500': '#737373',
          'neutral-700': '#404040',
          'neutral-900': '#171717',
        }
      }
    }
  }
}

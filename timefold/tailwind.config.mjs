export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#6366f1',
          600: '#4f46e5'
        }
      },
      borderRadius: {
        xl: '0.75rem'
      }
    }
  },
  plugins: []
};
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'ul > li::marker': {
              color: '#4900f8',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

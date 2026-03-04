const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {
      screens: {
        'vp5': '35.5em',    // 568px
        'vp7': '48em',      // 768px  
        'vp9': '60em',      // 960px
        'vp12': '80em',     // 1280px
        'max-vp7': { 'max': '47.9375em' }, // max-width: 767px
        'max-vp9': { 'max': '59.9375em' }, // max-width: 959px
      },
      typography: {
        DEFAULT: {
          css: {
            'ul > li::marker': {
              color: 'var(--primary)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(({ addUtilities, theme, matchUtilities }) => {
      // Layout content containers
      addUtilities({
        '.layout-content-1575': {
          marginInline: 'auto',
          maxWidth: '1575px',
          paddingInline: '1rem',
        },
        '.layout-content-1180': {
          marginInline: 'auto',
          maxWidth: '1180px',
          paddingInline: '1rem',
        },
        '.layout-content-2xl': {
          marginInline: 'auto',
          maxWidth: '42rem',
        },
        '.layout-section-y': {
          width: '100%',
          paddingTop: '4rem',
          paddingBottom: '4rem',
        },
        '.layout-footer-shell': {
          marginInline: 'auto',
          maxWidth: '1575px',
          paddingInline: '1rem',
          paddingTop: '3rem',
          paddingBottom: '3rem',
        },
      });

      // vp12 viewport utilities (min-width: 80em / 1280px)
      addUtilities({
        '@media (min-width: 80em)': {
          '.vp12\\:px-14': {
            paddingLeft: '56px',
            paddingLeft: 'var(--space-14)',
            paddingRight: '56px',
            paddingRight: 'var(--space-14)',
          },
          '.vp12\\:layout': {
            '--layout-columns': '12',
            '--layout-column-width': '6.875rem',
            '--layout-bound-l': '0rem',
            '--layout-bound-r': '0rem',
            '--layout-bound': 'var(--space-4)',
            '--layout-gutter': '0rem',
            '--layout-aside-l': '0rem',
            '--layout-aside-r': '0rem',
            '--layout-aside-bound-l': '0rem',
            '--layout-aside-bound-r': '0rem',
            '--layout-start': '[bound-start] var(--layout-bound-l) [fill-start] minmax(0rem,1fr)',
            '--layout-container': '[container-start] min(var(--layout-column-width) * var(--layout-columns), 100% - var(--layout-bound-l) - var(--layout-bound-r) - var(--layout-aside-l) - var(--layout-aside-r) - var(--layout-aside-bound-l) - var(--layout-aside-bound-r)) [container-end]',
            '--layout-end': 'minmax(0rem,1fr) [fill-end] var(--layout-bound-r) [bound-end]',
            display: 'grid',
            gridTemplateColumns: 'var(--layout-start) [burst-start] minmax(0,0) [pop-start] minmax(0,0) var(--layout-container) minmax(0,0) [pop-end] minmax(0,0) [burst-end] var(--layout-end)',
          },
          '.vp12\\:layout > *': {
            gridColumn: 'container',
          },
          '.vp12\\:bound-x': {
            '--layout-bound-l': 'var(--layout-bound)',
            '--layout-bound-r': 'var(--layout-bound)',
          },
        },
        '@media (min-width: 80em) and (min-width: 60em)': {
          '.vp12\\:layout': {
            '--layout-bound': 'var(--space-9)',
          },
        },
      });

      // vp9 utilities with CSS variables (min-width: 60em)
      addUtilities({
        '@media (min-width: 60em)': {
          '.vp9\\:mb-30': { marginBottom: '120px', marginBottom: 'var(--space-30)' },
          '.vp9\\:mb-45': { marginBottom: '180px', marginBottom: 'var(--space-45)' },
          '.vp9\\:mb-8': { marginBottom: '32px', marginBottom: 'var(--space-8)' },
          '.vp9\\:mt-0': { marginTop: '0', marginTop: 'var(--space-0)' },
          '.vp9\\:mt-10': { marginTop: '40px', marginTop: 'var(--space-10)' },
          '.vp9\\:mt-30': { marginTop: '120px', marginTop: 'var(--space-30)' },
          '.vp9\\:mt-45': { marginTop: '180px', marginTop: 'var(--space-45)' },
          '.vp9\\:mt-8': { marginTop: '32px', marginTop: 'var(--space-8)' },
          '.vp9\\:h-3': { height: '12px', height: 'var(--space-3)' },
          '.vp9\\:w-3': { width: '12px', width: 'var(--space-3)' },
          '.vp9\\:gap-10': { gap: '40px', gap: 'var(--space-10)' },
          '.vp9\\:gap-12': { gap: '48px', gap: 'var(--space-12)' },
          '.vp9\\:gap-20': { gap: '80px', gap: 'var(--space-20)' },
          '.vp9\\:gap-x-17': { columnGap: '68px', columnGap: 'var(--space-17)' },
          '.vp9\\:gap-x-8': { columnGap: '32px', columnGap: 'var(--space-8)' },
          '.vp9\\:gap-y-20': { rowGap: '80px', rowGap: 'var(--space-20)' },
          '.vp9\\:gap-y-4': { rowGap: '16px', rowGap: 'var(--space-4)' },
          '.vp9\\:p-14': { padding: '56px', padding: 'var(--space-14)' },
          '.vp9\\:py-10': { paddingTop: '40px', paddingTop: 'var(--space-10)', paddingBottom: '40px', paddingBottom: 'var(--space-10)' },
          '.vp9\\:py-15': { paddingTop: '60px', paddingTop: 'var(--space-15)', paddingBottom: '60px', paddingBottom: 'var(--space-15)' },
          '.vp9\\:pr-14': { paddingRight: '56px', paddingRight: 'var(--space-14)' },
        },
      });

      // vp7 utilities with CSS variables (min-width: 48em)
      addUtilities({
        '@media (min-width: 48em)': {
          '.vp7\\:right-0': { right: '0', right: 'var(--space-0)' },
          '.vp7\\:-mx-4': { 
            marginLeft: '-16px', marginLeft: 'calc(var(--space-4)*-1)',
            marginRight: '-16px', marginRight: 'calc(var(--space-4)*-1)'
          },
          '.vp7\\:-my-10': {
            marginTop: '-40px', marginTop: 'calc(var(--space-10)*-1)',
            marginBottom: '-40px', marginBottom: 'calc(var(--space-10)*-1)'
          },
          '.vp7\\:mb-8': { marginBottom: '32px', marginBottom: 'var(--space-8)' },
          '.vp7\\:gap-10': { gap: '40px', gap: 'var(--space-10)' },
          '.vp7\\:gap-4': { gap: '16px', gap: 'var(--space-4)' },
          '.vp7\\:gap-6': { gap: '24px', gap: 'var(--space-6)' },
          '.vp7\\:gap-8': { gap: '32px', gap: 'var(--space-8)' },
          '.vp7\\:space-y-8 > :not([hidden]) ~ :not([hidden])': {
            '--tw-space-y-reverse': '0',
            marginBottom: '0',
            marginBottom: 'calc(var(--space-8) * var(--tw-space-y-reverse))',
            marginTop: '32px',
            marginTop: 'calc(var(--space-8) * (1 - var(--tw-space-y-reverse)))'
          },
          '.vp7\\:px-4': { paddingLeft: '16px', paddingLeft: 'var(--space-4)', paddingRight: '16px', paddingRight: 'var(--space-4)' },
          '.vp7\\:py-10': { paddingTop: '40px', paddingTop: 'var(--space-10)', paddingBottom: '40px', paddingBottom: 'var(--space-10)' },
        },
      });

      // max-vp9 utilities (max-width: 60em)
      addUtilities({
        '@media not all and (min-width: 60em)': {
          '.max-vp9\\:my-5': {
            marginTop: '20px', marginTop: 'var(--space-5)',
            marginBottom: '20px', marginBottom: 'var(--space-5)'
          },
          '.max-vp9\\:pt-8': { paddingTop: '32px', paddingTop: 'var(--space-8)' },
        },
      });

      // Dynamic responsive padding for other spacing values
      matchUtilities(
        { 
          'vp12\\:px': (value) => ({ 
            '@media (min-width: 80em)': {
              paddingLeft: value, 
              paddingRight: value,
            }
          }) 
        },
        { values: theme('spacing'), type: 'spacing' }
      );
    })
  ],
};

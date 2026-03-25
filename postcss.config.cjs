module.exports = {
  plugins: {
    cssnano: {
      preset: ['default', {
        discardDuplicates: true,
        reduceIdents: false,
      }],
    },
  },
};

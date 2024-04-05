module.exports = {
  plugins: {
    'postcss-import': {}, // postcss-import needs to be first
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {},
    autoprefixer: {},
  },
};

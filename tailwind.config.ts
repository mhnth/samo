import type { Config } from 'tailwindcss';
const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: colors.teal,
        accent: colors.blue,
        grey: colors.neutral,
        danger: colors.red,
        warm: colors.yellow,
        hotPink: '#FF1966',
        dark: '#111111',
        light: '#FAFAFA',
        violetDark: '#4c2889',
      },
    },
  },
  plugins: [],
};
export default config;

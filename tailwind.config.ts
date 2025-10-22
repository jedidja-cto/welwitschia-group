import type { Config } from 'tailwindcss';

const config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'wg-green': '#1A8452',
        'wg-orange': '#E67E22',
        'wg-dark': '#114C32',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'lilac-bush': {
          '50': '#fbf7fd',
          '100': '#f5edfa',
          '200': '#ecdef6',
          '300': '#dec4ee',
          '400': '#c99ee2',
          '500': '#b174d2',
          '600': '#9f5bc2',
          '700': '#8848a8',
          '800': '#723f8a',
          '900': '#5d3370',
          '950': '#401b50',
      },      
      }
    },
  },
  plugins: [],
}
export default config

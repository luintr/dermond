import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{html,js,ts,tsx,jsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
    },
    screens: {
      xs: '0px',
      sm: '768px',
      md: '1024px',
      lg: '1200px',
      xl: '1600px',
      xxl: '1920px',
    },
  },
  plugins: [],
}
export default config

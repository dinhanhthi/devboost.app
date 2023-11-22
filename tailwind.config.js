export const content = [
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  './src/icons/**/*.{js,ts,jsx,tsx,mdx}',
  './src/libs/**/*.{js,ts,jsx,tsx,mdx}',
  './src/tools/**/*.{js,ts,jsx,tsx,mdx}'
]
export const theme = {
  extend: {
    colors: {
      light: '#4c5268',
      dark: '#2f3240',
      darker: '#282a36',
      darkest: '#1c1e27',
      border: '#3b3e54',
      tnormal: '#e9ebef',
      tlight: '#e0e2ea',
      tdark: '#a9adc4',
      thighlight: '#7beca4'
    },
    typography: ({ theme }) => ({
      DEFAULT: {
        css: {
          color: theme('colors.gray.100')
        }
      }
    })
  }
}

export const darkMode = 'class'

export const plugins = [require('@tailwindcss/typography')]

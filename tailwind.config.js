/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        '9/10': '90%',
        '9.6/10': '96%'
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem'
      },
      spacing: {
        '1/50': '2%',
        '1/25': '4%',
        46: '11.5rem'
      },
      fontSize: {
        logo: '2.125rem'
      }
    }
    // colors: {
    //   primary: '#ffffff'
    // }
  },
  plugins: []
}

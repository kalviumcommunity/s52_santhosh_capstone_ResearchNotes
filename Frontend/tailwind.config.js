/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '96': '34rem', 
        },
      colors: {
        primary: '#00bbff',
        secondary : '#cee6f2'
      }
    },
    screens: {
      'xs': '340px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      },
      fontFamily:{
        island:['Island Moments','sans-serif'],
        inika:['Inika','sans-serif'],
        itim: ['Itim', 'sans-serif'],
        serif : ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman'],
      },
      
  },
  plugins: [],
}


module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sun: '#FFA800',
        marsred: '#FF2525'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        alata: ['Alata', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif']
      },
      keyframes: {
        container: {
          '0%': { top: '-800px', opacity: '0' },
          '100%': { top: '0px', opacity: '1' }
        },
        cabecalho: {
          '0%': { left: '-800px', opacity: '0' },
          '100%': { left: '0px', opacity: '1' }
        },
        yellowTxt: {
          '0%': { left: '-800px', opacity: '0' },
          '100%': { left: '0px', opacity: '1' }
        },
        gradiente: {
          '0%': { background: '#FFA800' },
          '25%': { background: '#ff8800' },
          '50%': { background: '#ff6600' },
          '75%': { background: '#ffa600' },
          '100%': { background: '#FFA800' }
        },
        sol: {
          '0%': { left: '1500px', transform: 'rotate(2000deg) scale(0)' },
          '50%': { transform: 'rotate(1000deg) scale(2)' },
          '100%': { left: '-300px', transform: 'rotate(0deg) scale(0)' }
        },
        particulas: {
          '0%': { top: '0px' },
          '25%': { top: '30px' },
          '50%': { top: '50px' },
          '75%': { top: '30px' },
          '100%': { top: '0px' }
        }
      },
      animation: {
        container: 'container 3s ease-out',
        cabecalho: 'cabecalho 3s ease-out',
        yellowTxt: 'yellowTxt 3s ease-out',
        gradiente: 'gradiente 7s infinite',
        sol: 'sol 15s linear',
        particulas: 'particulas 7s infinite'
      }
    }
  },
  plugins: []
}

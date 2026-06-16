import React from 'react'

/**
 * Página inicial da loja que apresenta a marca e direciona o usuário para a área de compra.
 * @param {{onNavigate:function}} props
 */
export default function Inicio({ onNavigate }){
  return (
    <section className="container mx-auto flex flex-col md:flex-row items-center pt-2 relative gap-6 md:gap-0 px-4 min-h-screen">
      <div className="container-img w-full md:w-1/3 flex flex-col items-center justify-center md:ml-5">
        <img src="/imgs/heineken.webp" alt="logo" className="Inicio-img h-50 w-50 md:h-50 md:w-30 md:ml-5 justify-center" />
      </div>
      <div className="ml-0 md:ml-0 h-auto w-full md:w-1/3 flex flex-col items-center justify-center gap-10">
        <h1 className="inicio-txt h-auto w-auto text-white text-2xl md:text-4xl font-semibold text-center md:text-left">A CADA<br/>GOLE<br/>UMA SENSAÇÃO<br/>ÚNICA</h1>
        <button
          onClick={() => onNavigate && onNavigate('adquira')}
          className="mt-6 bg-white text-green-800 font-semibold px-6 py-3 rounded-full hover:bg-green-100 transition"
          aria-label="Ir para página Adquira"
        >
          Quero Adquirir
        </button>
      </div>
      <img src="/imgs/garrafasHeineken.png" alt="cervejasmars" className="cervejas block md:absolute md:top-1/2 md:-translate-y-1/2 md:right-10 w-50 md:w-1/3 transform transition-transform duration-500 hover:scale-110" />
    </section>
  )
}

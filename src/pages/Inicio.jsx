import React from 'react'

export default function Inicio(){
  return (
    <section className="container mx-auto flex flex-row pt-20 relative">
      <div className="container-img w-1/3 flex flex-col items-center justify-center ml-5">
        <img src="/imgs/heineken.webp" alt="logo" className="Inicio-img h-50 w-30 ml-5 justify-center" />
      </div>
      <div className="ml-20 h-auto w-auto flex flex-col items-start justify-center gap-6">
        <h1 className="inicio-txt h-auto w-auto text-white text-4xl font-semibold">A CADA<br/>GOLE<br/>UMA SENSAÇÃO<br/>ÚNICA</h1>
      </div>
      <img src="/imgs/3 MARS BEER.png" alt="cervejasmars" className="cervejas absolute right-10 w-1/5 transition-transform duration-500 hover:scale-110" />
    </section>
  )
}

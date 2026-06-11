import React from 'react'

export default function Sobre(){
  return (
    <section className="space-y-10">
      <div className="relative overflow-hidden rounded-3xl bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <img src="/imgs/sol.png" alt="sol" className="absolute -left-16 top-10 w-40 opacity-70" />
        <div className="max-w-3xl">
          <p className="text-4xl font-semibold text-white">PILSEN (SOL DA TARDE)</p>
          <p className="mt-6 text-white/90 leading-8">
            O estilo de cerveja artesanal Pilsen ou Pilsner surgiu na República Tcheca. 
            Como características marcantes, a bebida apresenta aroma e sabor acentuados pelo lúpulo, 
            além da cor dourada. Seu teor alcoólico varia entre 4,6% e 5% em média.
          </p>
        </div>
        <img className="yellow-img absolute right-0 top-10 w-80 rotate-12" src="/imgs/MARS BEER SOL DA TARDE.png" alt="soldatarde" />
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_240px]">
          <div>
            <p className="text-4xl font-semibold text-white">TRIPEL (FLOREST)</p>
            <p className="mt-6 text-white/90 leading-8">
              Criada na Bélgica, no Mosteiro Trapista de Westmalle, a cerveja Tripel apresenta cor clara, 
              sabor amargo cítrico e aroma frutado. Esse estilo de cerveja artesanal é bem carbonatado, 
              o que lhe confere uma espuma bastante cremosa.
            </p>
          </div>
          <div className="relative">
            <img className="green-img absolute -right-10 top-0 w-96" src="/imgs/2 GREEN.png" alt="florest" />
            <img className="mt-64 w-full rounded-3xl" src="/imgs/fundo verde.png" alt="fundo verde" />
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_240px]">
          <div>
            <p className="text-4xl font-semibold text-white">WEIZENBIER (BLUE DARK)</p>
            <p className="mt-6 text-white/90 leading-8">
              O estilo de cerveja Weizenbier, Weissbier ou Weiss surgiu no sul da Alemanha, mais especificamente na Baviera. 
              O estilo apresenta 50% de malte de trigo (no mínimo). Sua cor é clara e opaca, com sabor e aroma frutados.
            </p>
          </div>
          <div className="relative">
            <img className="blue-img absolute -right-10 top-0 w-96" src="/imgs/2 DARKBLUE.png" alt="blue DARK" />
            <img className="mt-64 w-full rounded-3xl" src="/imgs/fundo azul.png" alt="fundo azul" />
          </div>
        </div>
      </div>
    </section>
  )
}

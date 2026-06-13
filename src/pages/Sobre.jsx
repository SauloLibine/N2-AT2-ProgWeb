import React from 'react'

export default function Sobre(){
  return (
    <section className="space-y-10">
      <div className="relative overflow-hidden rounded-3xl bg-black/30 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="max-w-3xl">
          <p className="text-4xl font-semibold text-white">História</p>
          <p className="mt-6 text-white/90 leading-8">
           Heineken International é uma cervejaria holandesa, 
           fundada em 1863 por Gerard Adriaan Heineken na cidade de Amsterdã.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-black/30 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_240px]">
          <div>
            <p className="text-4xl font-semibold text-white">Características</p>
            <p className="mt-6 text-white/90 leading-8">
              Heineken é uma cerveja do estilo Premium Lager, 
              originário da Europa. 
              Esse estilo se caracteriza pelo sabor equilibrado, 
              leve amargor do lúpulo, aroma suave e alta refrescância. 
              Produzida com ingredientes selecionados e fermentação de baixa temperatura, 
              a Heineken apresenta notas maltadas discretas e um final limpo, 
              sendo apreciada por quem busca uma cerveja leve, porém com personalidade marcante.
            </p>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-black/30 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_240px]">
          <div>
            <p className="text-4xl font-semibold text-white">Nosso Compromisso com a Felicidade</p>
            <p className="mt-6 text-white/90 leading-8">
              Acreditamos que a felicidade é essencial para construir um ambiente de trabalho excepcional. 
              É uma filosofia que permeia cada aspecto de nossa cultura organizacional. 
              Em nosso compromisso com o bem-estar dos colaboradores, reconhecemos que a felicidade impulsiona não apenas o sucesso individual, 
              mas também a força coletiva de nossa equipe.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

import React from 'react'

export default function Nao({ onBack }){
  return (
    <section className="relative rounded-3xl bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl text-white">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-4xl font-semibold">Infelizmente você não pode acessar esse site</h2>
          <p className="mt-4 text-white/80 leading-7">
            Nosso conteúdo é destinado a maiores de 18 anos. Retorne quando estiver preparado e com responsabilidade.
          </p>
        </div>
        <img src="/imgs/logos/cara triste.svg" alt="caratriste" className="w-64" />
      </div>
      <button onClick={onBack} className="mt-10 rounded-3xl bg-gradient-to-r from-[#FFA800] to-[#FF2525] px-6 py-4 font-bold text-black transition hover:scale-105">
        VOLTAR
      </button>
    </section>
  )
}

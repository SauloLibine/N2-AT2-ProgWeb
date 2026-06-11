import React from 'react'

export default function SimOuNao({ onChoice }){
  return (
    <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] rounded-3xl bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl text-white">
      <div>
        <h2 className="text-4xl font-semibold">Consumo consciente</h2>
        <p className="mt-4 text-white/80 leading-7">
          A MARS se preocupa com o consumo responsável. Você tem mais de 18 anos?
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <button type="button" onClick={() => onChoice('home')} className="rounded-3xl bg-gradient-to-r from-[#FFA800] to-[#FF2525] px-6 py-4 font-bold text-black transition hover:scale-105">
          SIM
        </button>
        <button type="button" onClick={() => onChoice('nao')} className="rounded-3xl border border-white/30 px-6 py-4 font-bold text-white transition hover:border-white hover:scale-105">
          NÃO
        </button>
      </div>
    </section>
  )
}

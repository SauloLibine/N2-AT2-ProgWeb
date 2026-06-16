import React from 'react'

/**
 * Página de contatos que apresenta canais de atendimento e localização da empresa.
 */
export default function Contatos(){
  return (
    <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-3xl bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl text-white">
        <h2 className="text-4xl font-semibold">Vamos nos conectar</h2>
        <p className="mt-4 text-white/80 leading-7">
          Fale conosco pela página oficial ou envie sua mensagem direta no Instagram ou YouTube.
        </p>
        <div className="mt-8 space-y-5">
          <a className="inline-flex items-center gap-4 rounded-3xl bg-white/10 px-5 py-4 transition hover:bg-white/20" href="https://www.instagram.com/grupoheinekenbr/" target="_blank" rel="noreferrer">
            <img src="/imgs/logos/INSTA.svg" alt="Instagram" className="h-10" />
            <span className="text-lg text-white">@grupoheinekenbr</span>
          </a>
          <a className="inline-flex items-center gap-4 rounded-3xl bg-white/10 px-5 py-4 transition hover:bg-white/20" href="https://www.youtube.com/GrupoHEINEKENBr" target="_blank" rel="noreferrer">
            <img src="/imgs/logos/youtube.webp" alt="YouTube" className="h-10" />
            <span className="text-lg text-white">@GrupoHEINEKENBr</span>
          </a>
        </div>
      </div>
      <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/20">
        <iframe className="h-full min-h-[420px] w-full border-0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3837.829359039018!2d-48.0337319914749!3d-15.865563437371133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a2d97a15b0507%3A0x3c3e4472ee75d834!2sUniversidade%20Cat%C3%B3lica%20de%20Bras%C3%ADlia%20-%20C%C3%A2mpus%20Taguatinga!5e0!3m2!1spt-BR!2sbr!4v1781371702723!5m2!1spt-BR!2sbr" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mapa de localização"></iframe>
      </div>
    </section>
  )
}

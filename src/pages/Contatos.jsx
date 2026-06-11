import React from 'react'

export default function Contatos(){
  return (
    <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-3xl bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl text-white">
        <h2 className="text-4xl font-semibold">Vamos nos conectar</h2>
        <p className="mt-4 text-white/80 leading-7">
          Fale conosco pela página oficial ou envie sua mensagem direta no Instagram e WhatsApp.
        </p>
        <div className="mt-8 space-y-5">
          <a className="inline-flex items-center gap-4 rounded-3xl bg-white/10 px-5 py-4 transition hover:bg-white/20" href="https://www.instagram.com/_marsdesigner/" target="_blank" rel="noreferrer">
            <img src="/imgs/logos/INSTA.svg" alt="Instagram" className="h-10" />
            <span className="text-lg text-white">@_marsdesigner</span>
          </a>
          <a className="inline-flex items-center gap-4 rounded-3xl bg-white/10 px-5 py-4 transition hover:bg-white/20" href="https://whatsa.me/5561983731359" target="_blank" rel="noreferrer">
            <img src="/imgs/logos/WHATSAPP.svg" alt="WhatsApp" className="h-10" />
            <span className="text-lg text-white">WhatsApp</span>
          </a>
        </div>
      </div>
      <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/20">
        <iframe className="h-full min-h-[420px] w-full border-0" src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d61415.35107865831!2d-48.10150281774389!3d-15.832431940589649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e2!4m0!4m5!1s0x935a3321354999e9%3A0x881fa531a22a3f88!2sSt.%20B%20Norte%20Centro%20Universit%C3%A1rio%20Proje%C3%A7%C3%A3o%20-%20Taguatinga%20-%20Taguatinga%2C%20Bras%C3%ADlia%20-%20DF%2C%2070297-400!3m2!1d-15.8193551!2d-48.0652797!5e0!3m2!1spt-BR!2sbr!4v1667759768794!5m2!1spt-BR!2sbr" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mapa de localização"></iframe>
      </div>
    </section>
  )
}

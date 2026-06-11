import React, { useState } from 'react'

export default function Adquira(){
  const [pedidos, setPedidos] = useState([])
  const [form, setForm] = useState({ nome: '', email: '', cerveja: '' })

  const handleChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.nome.trim() || !form.email.trim() || !form.cerveja.trim()) {
      window.alert('Preencha todos os campos!')
      return
    }

    setPedidos([...pedidos, { ...form }])
    setForm({ nome: '', email: '', cerveja: '' })
  }

  const handleEdit = (index) => {
    const pedido = pedidos[index]
    const novoNome = window.prompt('Novo nome:', pedido.nome)
    const novoEmail = window.prompt('Novo email:', pedido.email)
    const novaCerveja = window.prompt('Nova cerveja:', pedido.cerveja)

    if (novoNome && novoEmail && novaCerveja) {
      const updated = [...pedidos]
      updated[index] = { nome: novoNome, email: novoEmail, cerveja: novaCerveja }
      setPedidos(updated)
    }
  }

  const handleDelete = (index) => {
    setPedidos(pedidos.filter((_, i) => i !== index))
  }

  return (
    <section className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-3xl bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <h2 className="text-4xl font-semibold text-white">Peça sua cerveja</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <label className="block text-white/80">
            Nome
            <input value={form.nome} onChange={handleChange('nome')} className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 p-4 text-white outline-none focus:border-sun" placeholder="insira seu nome" />
          </label>
          <label className="block text-white/80">
            Email
            <input value={form.email} onChange={handleChange('email')} className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 p-4 text-white outline-none focus:border-sun" placeholder="insira seu email" />
          </label>
          <label className="block text-white/80">
            Cerveja
            <input value={form.cerveja} onChange={handleChange('cerveja')} className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 p-4 text-white outline-none focus:border-sun" placeholder="Escolha sua cerveja" />
          </label>
          <button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-[#FFA800] to-[#FF2525] px-6 py-4 text-black font-bold transition hover:scale-105">
            Enviar
          </button>
        </form>
      </div>
      <div className="rounded-3xl bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <h3 className="text-3xl font-semibold text-white">Pedidos</h3>
        <div className="mt-6 space-y-4">
          {pedidos.length === 0 ? (
            <p className="text-white/70">Nenhum pedido cadastrado ainda.</p>
          ) : (
            pedidos.map((pedido, index) => (
              <div key={index} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-white font-semibold">{pedido.nome}</p>
                <p className="text-white/70">{pedido.email}</p>
                <p className="mt-2 text-white/80">🍺 {pedido.cerveja}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button type="button" onClick={() => handleEdit(index)} className="rounded-2xl bg-[#ffb300] px-4 py-2 text-white transition hover:bg-[#ff9b00]">
                    Editar
                  </button>
                  <button type="button" onClick={() => handleDelete(index)} className="rounded-2xl bg-[#d32f2f] px-4 py-2 text-white transition hover:bg-[#b02828]">
                    Excluir
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

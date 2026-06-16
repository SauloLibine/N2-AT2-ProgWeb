import React, { useState } from 'react'

/**
 * Página de login que captura credenciais do usuário e aciona o fluxo de autenticação.
 * @param {{onLogin:function,onSwitchToRegister:function}} props
 */
export default function Login({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  /**
   * Trata o envio do formulário de login, evitando o comportamento padrão
   * do navegador e exibindo possíveis erros de autenticação.
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    onLogin({ email, password }).catch((err) => {
      setError(err.message || 'Erro ao fazer login')
    })
  }

  return (
    <section className="mx-auto my-10 max-w-xl rounded-3xl bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl text-white">
      <h2 className="text-4xl font-semibold">Entrar</h2>
      <p className="mt-4 text-white/70">Acesse sua conta para fazer pedidos de cerveja e acompanhar seus dados.</p>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
        <label className="flex flex-col gap-2 text-sm text-white/80">
          E-mail
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-white outline-none focus:border-green-500"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-white/80">
          Senha
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-white outline-none focus:border-green-500"
          />
        </label>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button type="submit" className="rounded-full bg-gradient-to-r from-[#FFA800] to-[#FF2525] px-6 py-3 font-bold text-black transition hover:scale-105">
          Entrar
        </button>
        <button type="button" onClick={onSwitchToRegister} className="rounded-full border border-white/30 bg-transparent px-6 py-3 font-semibold text-white transition hover:border-white hover:scale-105">
          Criar nova conta
        </button>
      </form>
    </section>
  )
}

import React, { useEffect, useState } from 'react'
import { getUserProfile, updateUser } from '../services/authService'

const products = [
  { id: 'heineken', name: 'Heineken', price: 12.5 },
  { id: 'sol', name: 'Sol', price: 10.0 },
  { id: 'budweiser', name: 'Budweiser', price: 13.0 },
]

/**
 * Página de dashboard do usuário que exibe perfil, permite edição e logout.
 * @param {{user:Object,onLogout:function,onUpdateUser:function}} props
 */
export default function UserDashboard({ user, onLogout, onUpdateUser }) {
  const [profile, setProfile] = useState(null)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: '', email: '' })
  const [saving, setSaving] = useState(false)

  /**
   * Carrega os dados do perfil do usuário autenticado sempre que o usuário mudar.
   * Buscamos o perfil remoto para manter o estado sincronizado com a API.
   */
  useEffect(() => {
    if (!user) return

    async function loadProfile() {
      const profileData = await getUserProfile(user.uid)
      setProfile(profileData)
      setForm({ name: profileData?.name || '', email: profileData?.email || '' })
    }

    loadProfile()
  }, [user])

  /**
   * Envia as alterações do perfil para a API e atualiza o estado local.
   */
  const handleSave = async () => {
    setSaving(true)
    try {
      const updated = await updateUser(user.uid, { name: form.name, email: form.email })
      setProfile(updated)
      if (onUpdateUser) onUpdateUser(updated)
      setEditing(false)
    } catch (e) {
      alert('Erro ao atualizar perfil')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="mx-auto my-10 max-w-5xl rounded-3xl bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl text-white">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-4xl font-semibold">Bem-vindo, {profile?.name || user.email}</h2>
          <p className="mt-2 text-white/70">Aqui você pode editar seus dados de perfil e gerenciar sua conta.</p>
        </div>
        <button onClick={onLogout} className="rounded-full bg-gradient-to-r from-[#FFA800] to-[#FF2525] px-6 py-3 font-bold text-black transition hover:scale-105">
          Sair
        </button>
      </div>

      <div className="mt-10 rounded-3xl bg-black/30 p-6">
        <h3 className="text-2xl font-semibold">Perfil</h3>
        {!editing ? (
          <div className="mt-4">
            <p className="text-white/80">Nome: {profile?.name}</p>
            <p className="mt-2 text-white/80">Email: {profile?.email}</p>
            <button onClick={() => setEditing(true)} className="mt-4 rounded-2xl bg-[#ffb300] px-4 py-2 text-white">Editar perfil</button>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <label className="block text-white/80">
              Nome
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 p-4 text-white outline-none" />
            </label>
            <label className="block text-white/80">
              Email
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 p-4 text-white outline-none" />
            </label>
            <div className="flex gap-3">
              <button onClick={handleSave} disabled={saving} className="rounded-2xl bg-[#ffb300] px-4 py-2 text-white">{saving ? 'Salvando...' : 'Salvar'}</button>
              <button onClick={() => setEditing(false)} className="rounded-2xl bg-[#b0b0b0] px-4 py-2 text-black">Cancelar</button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

import React, { useEffect, useState } from 'react'
import { createOrder, fetchUserOrders } from '../services/authService'

const beers = [
  { id: 'heineken', name: 'Heineken', price: 12.5, image: 'garrafaHeineken.webp' },
  { id: 'eisenbahn', name: 'Eisenbahn', price: 14.0, image: 'garrafaEisenbahn.webp' },
  { id: 'amstel', name: 'Amstel', price: 11.5, image: 'garrafAmstel.webp' },
  { id: 'devassa', name: 'Devassa', price: 10.5, image: 'garrafaDevassa.webp' },
  { id: 'tiger', name: 'Tiger', price: 13.0, image: 'garrafaTiger.webp' },
  { id: 'sol', name: 'Sol', price: 10.0, image: 'garrafaSol.webp' }
]

/**
 * Página de compras que exibe o catálogo de bebidas, gerencia o carrinho
 * e registra novos pedidos para o usuário autenticado.
 */
export default function Adquira() {
  const [user, setUser] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  /**
   * Carrega o usuário autenticado do armazenamento local e busca pedidos existentes.
   */
  useEffect(() => {
    const raw = localStorage.getItem('mock_current_user')
    const current = raw ? JSON.parse(raw) : null
    setUser(current)
    if (current) {
      fetchUserOrders(current.uid).then(setOrders)
    }
  }, [])

  /**
   * Adiciona uma cerveja ao carrinho, incrementando a quantidade se já existir.
   * @param {Object} beer - Produto selecionado.
   */
  const addToCart = (beer) => {
    setCartItems((current) => {
      const found = current.find((item) => item.id === beer.id)
      if (found) {
        return current.map((item) => item.id === beer.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...current, { ...beer, quantity: 1 }]
    })
  }

  /**
   * Atualiza a quantidade de um item no carrinho e remove se estoque chegar a zero.
   * @param {string} beerId - Identificador do item.
   * @param {number} delta - Variação da quantidade (+1 ou -1).
   */
  const updateQuantity = (beerId, delta) => {
    setCartItems((current) =>
      current
        .map((item) => item.id === beerId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)
        .filter((item) => item.quantity > 0)
    )
  }

  /**
   * Remove um item do carrinho pelo seu identificador.
   * @param {string} beerId - Identificador do item a remover.
   */
  const removeFromCart = (beerId) => {
    setCartItems((current) => current.filter((item) => item.id !== beerId))
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  /**
   * Finaliza o pedido do usuário e persiste os dados na API de pedidos.
   * Valida estado do carrinho e exige login antes de enviar a solicitação.
   * @param {React.FormEvent} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (cartItems.length === 0) {
      window.alert('Adicione ao menos um item ao carrinho antes de finalizar o pedido.')
      return
    }

    if (!user) {
      window.alert('Faça login para fazer pedidos.')
      return
    }

    setLoading(true)
    try {
      await createOrder(user.uid, {
        items: cartItems.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
        total: parseFloat(totalPrice.toFixed(2)),
      })
      const updated = await fetchUserOrders(user.uid)
      setOrders(updated)
      setCartItems([])
      window.alert('Pedido registrado com sucesso!')
    } catch (err) {
      window.alert('Erro ao criar pedido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="grid gap-10 xl:grid-cols-[1.4fr_1fr]">
      <div className="rounded-3xl bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-4xl font-semibold text-white">Catálogo de Bebidas</h2>
            <p className="mt-2 text-white/70">Escolha sua cerveja e adicione ao pedido. Controle quantidade ou remova itens antes de finalizar.</p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {beers.map((beer) => (
            <div key={beer.id} className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-white/30 hover:bg-white/10">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-white/90 shadow-inner">
                  <img src={`/imgs/${beer.image}`} alt={beer.name} className="h-20 w-20 rounded-3xl object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{beer.name}</h3>
                  <p className="mt-2 text-white/70">R$ {beer.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <span className="rounded-full bg-white/5 px-3 py-2 text-sm text-white/80">Bebida popular</span>
                <button
                  type="button"
                  onClick={() => addToCart(beer)}
                  className="rounded-full bg-gradient-to-r from-[#FFA800] to-[#FF2525] px-4 py-2 text-sm font-bold text-black transition hover:scale-105"
                >
                  Adicionar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-black/30 p-6">
          <h3 className="text-2xl font-semibold text-white">Carrinho</h3>
          {cartItems.length === 0 ? (
            <p className="mt-4 text-white/70">Nenhum item adicionado ainda.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-white">{item.name}</p>
                    <p className="text-white/70">R$ {item.price.toFixed(2)} cada</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => updateQuantity(item.id, -1)} className="rounded-full bg-white/10 px-3 py-2 text-white transition hover:bg-white/20">-</button>
                    <span className="min-w-[2rem] text-center text-white">{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, 1)} className="rounded-full bg-white/10 px-3 py-2 text-white transition hover:bg-white/20">+</button>
                    <button type="button" onClick={() => removeFromCart(item.id)} className="rounded-3xl bg-red-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-600">Remover</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-white/80">Total do carrinho: <span className="font-semibold text-white">R$ {totalPrice.toFixed(2)}</span></p>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-3xl bg-gradient-to-r from-[#FFA800] to-[#FF2525] px-6 py-4 text-black font-bold transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {loading ? 'Finalizando...' : 'Finalizar pedido'}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <h3 className="text-3xl font-semibold text-white">Pedidos feitos</h3>
        <div className="mt-6 space-y-4">
          {orders.length === 0 ? (
            <p className="text-white/70">Nenhum pedido cadastrado ainda.</p>
          ) : (
            orders.map((pedido) => (
              <div key={pedido.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-white font-semibold">Pedido {pedido.id}</p>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/70">{pedido.status}</span>
                </div>
                <div className="mt-3 text-white/70">
                  <p>Total: R$ {pedido.total?.toFixed(2) ?? '0.00'}</p>
                  <p className="mt-2">Itens: {pedido.items.map((it) => `${it.name}${it.quantity ? ` x${it.quantity}` : ''}`).join(', ')}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

import React, { useEffect, useState } from 'react'
import { completeOrder, createOrder, deleteOrder, fetchUserOrders, updateOrder } from '../services/authService'

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
  const [editingOrderId, setEditingOrderId] = useState(null)
  const [editOrderItems, setEditOrderItems] = useState([])
  const [actionOrderId, setActionOrderId] = useState(null)

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
   * Recarrega os pedidos do usuário autenticado.
   * @param {string} uid - Identificador do usuário.
   */
  const refreshOrders = async (uid) => {
    const updated = await fetchUserOrders(uid)
    setOrders(updated)
    return updated
  }

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

  const calculateItemsTotal = (items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalPrice = calculateItemsTotal(cartItems)
  const editTotalPrice = calculateItemsTotal(editOrderItems)

  /**
   * Cancela a edição de um pedido.
   */
  const cancelOrderEdit = () => {
    setEditingOrderId(null)
    setEditOrderItems([])
  }

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
      const orderPayload = {
        items: cartItems.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
        total: parseFloat(totalPrice.toFixed(2)),
      }

      await createOrder(user.uid, orderPayload)
      await refreshOrders(user.uid)
      setCartItems([])
      window.alert('Pedido registrado com sucesso!')
    } catch (err) {
      window.alert('Erro ao criar pedido')
    } finally {
      setLoading(false)
    }
  }

  /**
   * Carrega um pedido existente no modo de edição.
   * @param {Object} order - Pedido selecionado.
   */
  const handleEditOrder = (order) => {
    const editableItems = order.items.map((item) => {
      const beer = beers.find((option) => option.id === item.id)
      return { ...item, image: beer?.image }
    })
    setEditOrderItems(editableItems)
    setEditingOrderId(order.id)
  }

  /**
   * Adiciona uma cerveja ao pedido em edição.
   * @param {Object} beer - Produto selecionado.
   */
  const addToEditingOrder = (beer) => {
    setEditOrderItems((current) => {
      const found = current.find((item) => item.id === beer.id)
      if (found) {
        return current.map((item) => item.id === beer.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...current, { ...beer, quantity: 1 }]
    })
  }

  /**
   * Atualiza a quantidade de um item do pedido em edição.
   * @param {string} beerId - Identificador do item.
   * @param {number} delta - Variação da quantidade.
   */
  const updateEditingOrderQuantity = (beerId, delta) => {
    setEditOrderItems((current) =>
      current.map((item) => item.id === beerId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)
    )
  }

  /**
   * Remove um item do pedido em edição.
   * @param {string} beerId - Identificador do item.
   */
  const removeFromEditingOrder = (beerId) => {
    setEditOrderItems((current) => current.filter((item) => item.id !== beerId))
  }

  /**
   * Salva as alterações feitas no pedido.
   */
  const handleSaveEditedOrder = async () => {
    if (!user || !editingOrderId) return

    if (editOrderItems.length === 0) {
      window.alert('O pedido precisa ter ao menos um item.')
      return
    }

    setActionOrderId(editingOrderId)
    try {
      await updateOrder(editingOrderId, user.uid, {
        items: editOrderItems.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
        total: parseFloat(editTotalPrice.toFixed(2)),
      })
      await refreshOrders(user.uid)
      cancelOrderEdit()
      window.alert('Pedido atualizado com sucesso!')
    } catch (err) {
      window.alert('Erro ao atualizar pedido')
    } finally {
      setActionOrderId(null)
    }
  }

  /**
   * Exclui um pedido após confirmação do usuário.
   * @param {string} orderId - Identificador do pedido.
   */
  const handleDeleteOrder = async (orderId) => {
    if (!user) return
    const confirmed = window.confirm('Tem certeza que deseja excluir este pedido?')
    if (!confirmed) return

    setActionOrderId(orderId)
    try {
      await deleteOrder(orderId, user.uid)
      await refreshOrders(user.uid)
      if (editingOrderId === orderId) cancelOrderEdit()
      window.alert('Pedido excluído com sucesso!')
    } catch (err) {
      window.alert('Erro ao excluir pedido')
    } finally {
      setActionOrderId(null)
    }
  }

  /**
   * Marca um pedido como concluído.
   * @param {string} orderId - Identificador do pedido.
   */
  const handleCompleteOrder = async (orderId) => {
    if (!user) return

    setActionOrderId(orderId)
    try {
      await completeOrder(orderId, user.uid)
      await refreshOrders(user.uid)
      if (editingOrderId === orderId) cancelOrderEdit()
      window.alert('Pedido concluído com sucesso!')
    } catch (err) {
      window.alert('Erro ao concluir pedido')
    } finally {
      setActionOrderId(null)
    }
  }

  /**
   * Retorna o texto exibido para cada status de pedido.
   * @param {string} status - Status persistido no pedido.
   */
  const getStatusLabel = (status) => {
    if (status === 'completed') return 'Concluído'
    return 'Pendente'
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
                  <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/70">{getStatusLabel(pedido.status)}</span>
                </div>
                {editingOrderId === pedido.id ? (
                  <div className="mt-5 space-y-5">
                    <div className="space-y-3">
                      {editOrderItems.length === 0 ? (
                        <p className="rounded-2xl border border-red-400/30 bg-red-950/20 p-4 text-sm text-red-100">Adicione ao menos uma bebida ao pedido.</p>
                      ) : (
                        editOrderItems.map((item) => (
                          <div key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <p className="font-semibold text-white">{item.name}</p>
                                <p className="text-sm text-white/70">R$ {item.price.toFixed(2)} cada</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <button type="button" onClick={() => updateEditingOrderQuantity(item.id, -1)} className="rounded-full bg-white/10 px-3 py-2 text-white transition hover:bg-white/20">-</button>
                                <span className="min-w-[2rem] text-center text-white">{item.quantity}</span>
                                <button type="button" onClick={() => updateEditingOrderQuantity(item.id, 1)} className="rounded-full bg-white/10 px-3 py-2 text-white transition hover:bg-white/20">+</button>
                                <button type="button" onClick={() => removeFromEditingOrder(item.id)} className="rounded-2xl bg-red-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-600">Remover</button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white/80">Adicionar bebida ao pedido</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {beers.map((beer) => (
                          <button
                            key={beer.id}
                            type="button"
                            onClick={() => addToEditingOrder(beer)}
                            className="rounded-2xl bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                          >
                            {beer.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-white/80">Novo total: <span className="font-semibold text-white">R$ {editTotalPrice.toFixed(2)}</span></p>
                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={handleSaveEditedOrder}
                          disabled={actionOrderId === pedido.id}
                          className="rounded-2xl bg-[#ffb300] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#e6a100] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {actionOrderId === pedido.id ? 'Salvando...' : 'Salvar alterações'}
                        </button>
                        <button type="button" onClick={cancelOrderEdit} className="rounded-2xl bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20">
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mt-3 text-white/70">
                      <p>Total: R$ {pedido.total?.toFixed(2) ?? '0.00'}</p>
                      <p className="mt-2">Itens: {pedido.items.map((it) => `${it.name}${it.quantity ? ` x${it.quantity}` : ''}`).join(', ')}</p>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => handleEditOrder(pedido)}
                        disabled={pedido.status === 'completed' || actionOrderId === pedido.id}
                        className="rounded-2xl bg-[#ffb300] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#e6a100] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCompleteOrder(pedido.id)}
                        disabled={pedido.status === 'completed' || actionOrderId === pedido.id}
                        className="rounded-2xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {actionOrderId === pedido.id ? 'Processando...' : 'Concluir'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteOrder(pedido.id)}
                        disabled={actionOrderId === pedido.id}
                        className="rounded-2xl bg-red-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Excluir
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

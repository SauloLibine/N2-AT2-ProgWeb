const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001/api'

/**
 * Executa uma chamada fetch para o serviço de API e trata erros de forma centralizada.
 * @param {string} path - Caminho relativo do endpoint.
 * @param {RequestInit} [options={}] - Opções adicionais para a requisição HTTP.
 * @returns {Promise<any>} Dados retornados pela API.
 */
async function request(path, options = {}) {
  const rawCurrent = typeof window !== 'undefined' ? localStorage.getItem('mock_current_user') : null
  const token = rawCurrent ? JSON.parse(rawCurrent)?.uid : null
  const headers = { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }
  const res = await fetch(`${API_BASE}${path}`, {
    headers,
    ...options,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Erro na requisição')
  return data
}

/**
 * Registra um novo usuário na API e salva o usuário autenticado no localStorage.
 * @param {{email:string,password:string,name:string}} param0 - Dados do usuário.
 * @returns {Promise<any>} Objeto do usuário cadastrado.
 */
export async function registerUser({ email, password, name }) {
  const user = await request('/users', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  })
  localStorage.setItem('mock_current_user', JSON.stringify(user))
  return user
}

/**
 * Autentica um usuário com a API e mantém os dados de sessão em localStorage.
 * @param {{email:string,password:string}} param0 - Credenciais do usuário.
 * @returns {Promise<any>} Objeto do usuário autenticado.
 */
export async function loginUser({ email, password }) {
  const user = await request('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  localStorage.setItem('mock_current_user', JSON.stringify(user))
  return user
}

/**
 * Remove os dados do usuário autenticado do armazenamento local.
 * @returns {Promise<boolean>} Indicador de sucesso da operação.
 */
export async function logoutUser() {
  localStorage.removeItem('mock_current_user')
  return true
}

/**
 * Recupera o perfil de um usuário pelo seu UID.
 * @param {string} uid - Identificador único do usuário.
 * @returns {Promise<any>} Dados do perfil retornados pela API.
 */
export async function getUserProfile(uid) {
  return await request(`/users/${uid}`)
}

/**
 * Atualiza os dados do perfil do usuário na API e sincroniza localStorage se for o usuário atual.
 * @param {string} uid - Identificador único do usuário.
 * @param {{name?:string,email?:string}} param1 - Dados de perfil a atualizar.
 * @returns {Promise<any>} Objeto do usuário atualizado.
 */
export async function updateUser(uid, { name, email }) {
  const user = await request(`/users/${uid}`, {
    method: 'PUT',
    body: JSON.stringify({ name, email }),
  })
  const current = JSON.parse(localStorage.getItem('mock_current_user') || 'null')
  if (current && current.uid === uid) {
    localStorage.setItem('mock_current_user', JSON.stringify(user))
  }
  return user
}

/**
 * Exclui a conta do usuário autenticado na API e limpa a sessão local.
 * @param {string} uid - Identificador único do usuário.
 * @returns {Promise<any>} Confirmação retornada pela API.
 */
export async function deleteUser(uid) {
  const result = await request(`/users/${uid}`, {
    method: 'DELETE',
  })
  const current = JSON.parse(localStorage.getItem('mock_current_user') || 'null')
  if (current && current.uid === uid) {
    localStorage.removeItem('mock_current_user')
  }
  return result
}

/**
 * Envia um pedido de compra para a API, associando-o ao usuário autenticado.
 * @param {string} uid - Identificador do usuário que realiza o pedido.
 * @param {Object} order - Dados do pedido, incluindo itens e total.
 * @returns {Promise<any>} Pedido recém-criado.
 */
export async function createOrder(uid, order) {
  return await request('/orders', {
    method: 'POST',
    body: JSON.stringify({ userId: uid, ...order }),
  })
}

/**
 * Recupera os pedidos de um usuário autenticado.
 * @param {string} uid - Identificador do usuário.
 * @returns {Promise<any[]>} Lista de pedidos associados ao usuário.
 */
export async function fetchUserOrders(uid) {
  return await request(`/orders?userId=${encodeURIComponent(uid)}`)
}

/**
 * Atualiza um pedido existente do usuário autenticado.
 * @param {string} orderId - Identificador do pedido.
 * @param {string} uid - Identificador do usuário dono do pedido.
 * @param {Object} order - Dados atualizados do pedido.
 * @returns {Promise<any>} Pedido atualizado.
 */
export async function updateOrder(orderId, uid, order) {
  return await request(`/orders/${orderId}`, {
    method: 'PUT',
    body: JSON.stringify({ userId: uid, ...order }),
  })
}

/**
 * Marca um pedido como concluído.
 * @param {string} orderId - Identificador do pedido.
 * @param {string} uid - Identificador do usuário dono do pedido.
 * @returns {Promise<any>} Pedido atualizado.
 */
export async function completeOrder(orderId, uid) {
  return await updateOrder(orderId, uid, { status: 'completed' })
}

/**
 * Exclui um pedido do usuário autenticado.
 * @param {string} orderId - Identificador do pedido.
 * @param {string} uid - Identificador do usuário dono do pedido.
 * @returns {Promise<any>} Confirmação da exclusão.
 */
export async function deleteOrder(orderId, uid) {
  return await request(`/orders/${orderId}`, {
    method: 'DELETE',
    body: JSON.stringify({ userId: uid }),
  })
}

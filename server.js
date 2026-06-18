import http from 'node:http'
import { promises as fs } from 'node:fs'
import path from 'node:path'

const PORT = process.env.PORT || 3001
const dataDir = path.resolve('data')
const seedDir = path.resolve('public', 'data')
const usersPath = path.join(dataDir, 'users.json')
const ordersPath = path.join(dataDir, 'orders.json')

/**
 * Envia uma resposta JSON padronizada ao cliente, incluindo cabeçalhos CORS.
 * @param {import('http').ServerResponse} res - Objeto de resposta HTTP.
 * @param {Object} data - Payload de dados que será serializado em JSON.
 * @param {number} [status=200] - Código de status HTTP a ser retornado.
 */
function sendJson(res, data, status = 200) {
  const payload = JSON.stringify(data, null, 2)
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  })
  res.end(payload)
}

/**
 * Verifica se um caminho de arquivo existe no sistema de arquivos.
 * @param {string} filePath - Caminho do arquivo a ser verificado.
 * @returns {Promise<boolean>} true se o arquivo existir, false caso contrário.
 */
async function pathExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

/**
 * Lê um arquivo JSON e converte seu conteúdo em objeto JavaScript.
 * @param {string} filePath - Caminho do arquivo JSON.
 * @returns {Promise<any>} Conteúdo do arquivo convertido em objeto.
 */
async function readJson(filePath) {
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw)
}

/**
 * Persiste um objeto em um arquivo JSON formatado.
 * @param {string} filePath - Caminho do arquivo de destino.
 * @param {any} data - Dados a serem serializados e gravados.
 * @returns {Promise<void>}
 */
async function writeJson(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

/**
 * Garante que os arquivos de dados persistidos existam, criando-os a partir de seeds se necessário.
 * Esse método inicializa os arquivos de usuário e pedido quando o servidor é iniciado.
 * @returns {Promise<void>}
 */
async function ensureSeedFiles() {
  await fs.mkdir(dataDir, { recursive: true })

  if (!(await pathExists(usersPath))) {
    const seedUsers = await readJson(path.join(seedDir, 'users.json')).catch(() => [])
    await writeJson(usersPath, seedUsers)
  }

  if (!(await pathExists(ordersPath))) {
    const seedOrders = await readJson(path.join(seedDir, 'orders.json')).catch(() => [])
    await writeJson(ordersPath, seedOrders)
  }
}

/**
 * Processa o corpo de uma requisição HTTP e converte JSON em objeto.
 * Essa função trata o stream de entrada e retorna um objeto vazio se não houver payload.
 * @param {import('http').IncomingMessage} req - Requisição HTTP recebida.
 * @returns {Promise<any>} Objeto de corpo convertido.
 */
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => { body += chunk })
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch (err) {
        reject(err)
      }
    })
    req.on('error', reject)
  })
}

/**
 * Gera um identificador único simples usando timestamp e parte de um hash aleatório.
 * @param {string} [prefix='id'] - Prefixo para o identificador gerado.
 * @returns {string} Identificador único.
 */
function generateId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

/**
 * Cria o servidor HTTP e roteia as requisições para endpoints REST básicos.
 * Essa função também aplica CORS e trata erros internos de servidor.
 */
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)
  const pathname = url.pathname
  const method = req.method

  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    })
    return res.end()
  }

  try {
    if (pathname === '/api/login' && method === 'POST') {
      const body = await parseBody(req)
      const users = await readJson(usersPath)
      const user = users.find((u) => u.email === body.email && u.password === body.password)
      if (!user) return sendJson(res, { message: 'Credenciais inválidas' }, 401)
      return sendJson(res, { ...user })
    }

    if (pathname === '/api/users' && method === 'POST') {
      const body = await parseBody(req)
      const users = await readJson(usersPath)
      if (users.some((u) => u.email === body.email)) {
        return sendJson(res, { message: 'Email já cadastrado' }, 409)
      }
      const user = { uid: generateId('user'), name: body.name || '', email: body.email, password: body.password, createdAt: new Date().toISOString() }
      users.push(user)
      await writeJson(usersPath, users)
      return sendJson(res, { ...user })
    }

    if (pathname.startsWith('/api/users/') && method === 'GET') {
      const uid = pathname.replace('/api/users/', '')
      const auth = req.headers['authorization'] || ''
      if (!auth.startsWith('Bearer ')) return sendJson(res, { message: 'Não autorizado' }, 401)
      const token = auth.replace('Bearer ', '')
      if (token !== uid) return sendJson(res, { message: 'Acesso proibido' }, 403)
      const users = await readJson(usersPath)
      const user = users.find((u) => u.uid === uid)
      if (!user) return sendJson(res, { message: 'Usuário não encontrado' }, 404)
      return sendJson(res, { ...user })
    }

    if (pathname.startsWith('/api/users/') && (method === 'PUT' || method === 'PATCH')) {
      const uid = pathname.replace('/api/users/', '')
      const auth = req.headers['authorization'] || ''
      if (!auth.startsWith('Bearer ')) return sendJson(res, { message: 'Não autorizado' }, 401)
      const token = auth.replace('Bearer ', '')
      if (token !== uid) return sendJson(res, { message: 'Acesso proibido' }, 403)
      const body = await parseBody(req)
      const users = await readJson(usersPath)
      const idx = users.findIndex((u) => u.uid === uid)
      if (idx === -1) return sendJson(res, { message: 'Usuário não encontrado' }, 404)
      users[idx] = { ...users[idx], name: body.name ?? users[idx].name, email: body.email ?? users[idx].email }
      await writeJson(usersPath, users)
      return sendJson(res, { ...users[idx] })
    }

    if (pathname.startsWith('/api/users/') && method === 'DELETE') {
      const uid = pathname.replace('/api/users/', '')
      const auth = req.headers['authorization'] || ''
      if (!auth.startsWith('Bearer ')) return sendJson(res, { message: 'Não autorizado' }, 401)
      const token = auth.replace('Bearer ', '')
      if (token !== uid) return sendJson(res, { message: 'Acesso proibido' }, 403)
      const users = await readJson(usersPath)
      const userExists = users.some((u) => u.uid === uid)
      if (!userExists) return sendJson(res, { message: 'Usuário não encontrado' }, 404)
      await writeJson(usersPath, users.filter((u) => u.uid !== uid))

      const orders = await readJson(ordersPath)
      await writeJson(ordersPath, orders.filter((order) => order.userId !== uid))

      return sendJson(res, { message: 'Conta excluída com sucesso' })
    }

    if (pathname === '/api/orders' && method === 'GET') {
      const userId = url.searchParams.get('userId')
      const auth = req.headers['authorization'] || ''
      if (userId) {
        if (!auth.startsWith('Bearer ')) return sendJson(res, { message: 'Não autorizado' }, 401)
        const token = auth.replace('Bearer ', '')
        if (token !== userId) return sendJson(res, { message: 'Acesso proibido' }, 403)
      }
      const orders = await readJson(ordersPath)
      const result = userId ? orders.filter((order) => order.userId === userId) : orders
      return sendJson(res, result)
    }

    if (pathname === '/api/orders' && method === 'POST') {
      const body = await parseBody(req)
      if (!body.userId) return sendJson(res, { message: 'userId obrigatório' }, 400)
      const auth = req.headers['authorization'] || ''
      if (!auth.startsWith('Bearer ')) return sendJson(res, { message: 'Não autorizado' }, 401)
      const token = auth.replace('Bearer ', '')
      if (token !== body.userId) return sendJson(res, { message: 'Acesso proibido' }, 403)
      const orders = await readJson(ordersPath)
      const order = {
        id: generateId('order'),
        userId: body.userId,
        items: body.items || [],
        total: body.total || 0,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }
      orders.push(order)
      await writeJson(ordersPath, orders)
      return sendJson(res, order, 201)
    }

    sendJson(res, { message: 'Rota não encontrada' }, 404)
  } catch (err) {
    console.error(err)
    sendJson(res, { message: 'Erro interno do servidor' }, 500)
  }
})

ensureSeedFiles().then(() => {
  server.listen(PORT, () => {
    console.log(`JSON persistence server running at http://localhost:${PORT}`)
  })
}).catch((err) => {
  console.error('Falha ao inicializar o servidor:', err)
  process.exit(1)
})

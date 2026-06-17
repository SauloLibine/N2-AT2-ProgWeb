import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Inicio from './pages/Inicio'
import Sobre from './pages/Sobre'
import Contatos from './pages/Contatos'
import Adquira from './pages/Adquira'
import Nao from './pages/Nao'
import Login from './pages/Login'
import Register from './pages/Register'
import UserDashboard from './pages/UserDashboard'
import AgeVerificationModal from './components/AgeVerificationModal'
import { loginUser, logoutUser, registerUser } from './services/authService'
import Relatorio from './pages/Relatorio.jsx'

/**
 * Componente raiz da aplicação responsável por gerenciar rotas internas,
 * autenticação simulada e verificação de idade para acesso ao conteúdo.
 */
export default function App() {
  const [route, setRoute] = useState('home')
  const [ageVerified, setAgeVerified] = useState(false)
  const [user, setUser] = useState(null)

  /**
   * Carrega o usuário do armazenamento local na montagem e evita acesso
   * ao dashboard quando não há usuário autenticado.
   */
  useEffect(() => {
    const raw = localStorage.getItem('mock_current_user')
    const currentUser = raw ? JSON.parse(raw) : null
    setUser(currentUser)
    if (!currentUser && route === 'dashboard') setRoute('login')
  }, [route])

  /**
   * Confirma que o usuário é maior de idade e libera a navegação principal.
   */
  const handleAgeConfirm = () => {
    setAgeVerified(true)
  }

  /**
   * Registra a negativa de idade, direcionando o usuário para a tela de aviso.
   */
  const handleAgeDeny = () => {
    setRoute('nao')
    setAgeVerified(true)
  }

  /**
   * Realiza o login do usuário usando o serviço de autenticação e navega para o dashboard.
   * @param {{email:string,password:string}} param0 - Credenciais informadas pelo usuário.
   */
  const handleLogin = async ({ email, password }) => {
    const u = await loginUser({ email, password })
    setUser(u)
    setRoute('dashboard')
  }

  /**
   * Registra um novo usuário e atualiza o estado para refletir a sessão autenticada.
   * @param {{name:string,email:string,password:string}} param0 - Dados de registro do usuário.
   */
  const handleRegister = async ({ name, email, password }) => {
    const u = await registerUser({ name, email, password })
    setUser(u)
    setRoute('dashboard')
  }

  /**
   * Faz logout do usuário, limpa a sessão local e volta à página inicial.
   */
  const handleLogout = async () => {
    await logoutUser()
    setUser(null)
    setRoute('home')
  }

  return (
    <div className="min-h-screen font-poppins animate-gradiente transition-all text-white">
      <Header onNavigate={setRoute} user={user} onLogout={handleLogout} />
      {!ageVerified && <AgeVerificationModal onConfirm={handleAgeConfirm} onDeny={handleAgeDeny} />}
      <main className="p-6">
        {route === 'home' && <Inicio onNavigate={setRoute} />}
        {route === 'sobre' && <Sobre />}
        {route === 'contatos' && <Contatos />}
        {route === 'adquira' && <Adquira />}
        {route === 'login' && <Login onLogin={handleLogin} onSwitchToRegister={() => setRoute('register')} />}
        {route === 'register' && <Register onRegister={handleRegister} onSwitchToLogin={() => setRoute('login')} />}
        {route === 'dashboard' && user && <UserDashboard user={user} onLogout={handleLogout} onUpdateUser={setUser} />}
        {route === 'nao' && <Nao onBack={() => setRoute('home')} />}
        {route === 'relatorio' && <Relatorio />}
      </main>
    </div>
  )
}

import React, { useState } from 'react'
import Header from './components/Header'
import Inicio from './pages/Inicio'
import Sobre from './pages/Sobre'
import Contatos from './pages/Contatos'
import Adquira from './pages/Adquira'
import Nao from './pages/Nao'
import AgeVerificationModal from './components/AgeVerificationModal'

export default function App(){
  const [route, setRoute] = useState('home')
  const [ageVerified, setAgeVerified] = useState(false)

  const handleAgeConfirm = () => {
    setAgeVerified(true)
  }

  const handleAgeDeny = () => {
    setRoute('nao')
    setAgeVerified(true)
  }
  return (
    <div className="min-h-screen font-poppins animate-gradiente transition-all text-white">
      <Header onNavigate={setRoute} />
      {!ageVerified && <AgeVerificationModal onConfirm={handleAgeConfirm} onDeny={handleAgeDeny} />}
      <main className="p-6">
        {route === 'home' && <Inicio onNavigate={setRoute} />}
        {route === 'sobre' && <Sobre />}
        {route === 'contatos' && <Contatos />}
        {route === 'adquira' && <Adquira />}
        {route === 'nao' && <Nao onBack={() => setRoute('home')} />}
      </main>
    </div>
  )
}

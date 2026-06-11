import React, { useState } from 'react'
import Header from './components/Header'
import Inicio from './pages/Inicio'
import Sobre from './pages/Sobre'
import Contatos from './pages/Contatos'
import Adquira from './pages/Adquira'
import SimOuNao from './pages/SimOuNao'
import Nao from './pages/Nao'

export default function App(){
  const [route, setRoute] = useState('home')
  return (
    <div className="min-h-screen font-poppins animate-gradiente transition-all text-white">
      <Header onNavigate={setRoute} />
      <main className="p-6">
        {route === 'home' && <Inicio />}
        {route === 'sobre' && <Sobre />}
        {route === 'contatos' && <Contatos />}
        {route === 'adquira' && <Adquira />}
        {route === 'simounao' && <SimOuNao onChoice={setRoute} />}
        {route === 'nao' && <Nao onBack={() => setRoute('simounao')} />}
      </main>
    </div>
  )
}

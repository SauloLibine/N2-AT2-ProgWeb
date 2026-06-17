import React from 'react'

/**
 * Componente de cabeçalho que exibe navegação principal e controles de sessão.
 * @param {{onNavigate:function,user:Object,onLogout:function}} props
 */
export default function Header({ onNavigate, user, onLogout }){
  return (
      <header className="bg-green-950 h-auto w-full flex flex-col items-center justify-between gap-6 px-6 py-5 lg:flex-row lg:gap-0 animate-cabecalho">
        <img src="/imgs/heineken.webp" alt="logo" className="h-32 w-auto" />
        <nav className="flex flex-wrap justify-center gap-6 text-xl">
          <button className="cabecalho-txt-it" onClick={()=>onNavigate('home')}>INÍCIO</button>
          <button className="cabecalho-txt-it" onClick={()=>onNavigate('sobre')}>SOBRE</button>
          <button className="cabecalho-txt-it" onClick={()=>onNavigate('relatorio')}>RELATÓRIO</button>
          <button className="cabecalho-txt-it" onClick={()=>onNavigate('contatos')}>CONTATOS</button>
          <button className="cabecalho-txt-it" onClick={()=>onNavigate('adquira')}>ADQUIRA A SUA</button>
          {user ? (
            <>
              <button className="cabecalho-txt-it" onClick={()=>onNavigate('dashboard')}>MINHA CONTA</button>
              <button className="cabecalho-txt-it" onClick={onLogout}>SAIR</button>
            </>
          ) : (
            <button className="cabecalho-txt-it" onClick={()=>onNavigate('login')}>LOGIN</button>
          )}
        </nav>
      </header>
  )
}

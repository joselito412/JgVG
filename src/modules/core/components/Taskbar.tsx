"use client"

import { useState, useEffect, useTransition } from "react"
import { ChevronRight, Zap } from "lucide-react"
import { SOCIAL_LINKS } from "@/modules/core/constants/social"

export default function Taskbar({ 
  isAuthenticated, 
  userRole,
  activeWindow,
  setActiveWindow,
  onMenuClick,
  onSignOut
}: { 
  isAuthenticated: boolean; 
  userRole?: string | null;
  activeWindow: 'proyectos' | 'skills' | 'ia' | 'servicios' | 'clases' | null;
  setActiveWindow: (w: 'proyectos' | 'skills' | 'ia' | 'servicios' | 'clases' | null) => void;
  onMenuClick?: (windowName: 'proyectos' | 'skills' | 'ia' | 'servicios' | 'clases') => void;
  onSignOut?: () => void;
}) {
  const [time, setTime] = useState("")
  const [isStartOpen, setIsStartOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  // Cerrar menú con ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsStartOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const profileHref = isAuthenticated ? (userRole === 'admin' ? '/admin/terminal' : '/profile') : '/login'

  return (
    <div className="fixed bottom-0 left-0 right-0 h-auto bg-[#c0c0c0] border-t-2 border-[#dfdfdf] flex flex-col z-[50] win95-raised p-1">
      {/* === MENÚ DE INICIO WIN95 === */}
      {isStartOpen && (
        <div className="absolute bottom-full left-0 mb-1 w-64 bg-[#c0c0c0] win95-raised flex flex-row z-[100] animate-in slide-in-from-bottom-2 shadow-2xl">
          {/* Banda lateral azul */}
          <div className="w-8 bg-gradient-to-b from-[#000080] to-[#1084d0] flex flex-col justify-end pb-2 overflow-hidden">
            <span className="text-[#c0c0c0] font-bold text-xl -rotate-90 transform origin-bottom-left whitespace-nowrap mb-2 ml-1 tracking-widest font-sans">
              Proyectos <span className="text-white">95</span>
            </span>
          </div>
          
          {/* Opciones del menú (Estructura de Índice Win95) */}
          <div className="flex-1 p-1 flex flex-col pt-2 text-black">
            
            {/* Categoría: Programas */}
            <div className="group relative">
              <button className="flex items-center justify-between w-full px-2 py-2 hover:bg-[#000080] hover:text-white transition-colors cursor-default">
                <div className="flex items-center gap-3">
                  <span className="text-xl -mt-1">📁</span>
                  <span className="font-[family-name:var(--font-pixel)] text-lg underline">Portafolio</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
              
              {/* Sub-índice Programas */}
              <div className="flex flex-col w-full bg-[#dfdfdf] border-l-2 border-[#000080]/20 hidden group-hover:flex">
                <button 
                  onClick={() => { setIsStartOpen(false); onMenuClick?.('skills'); }}
                  className="flex items-center gap-3 w-full px-4 py-2 hover:bg-[#000080] hover:text-white transition-colors"
                >
                  <span className="text-xl ml-0.5">💻</span>
                  <span className="font-[family-name:var(--font-pixel)] text-base">Habilidades (Skills)</span>
                </button>
                <button 
                  onClick={() => { setIsStartOpen(false); onMenuClick?.('servicios'); }}
                  className="flex items-center gap-3 w-full px-4 py-2 hover:bg-[#000080] hover:text-white transition-colors"
                >
                  <span className="text-xl ml-0.5">📘</span>
                  <span className="font-[family-name:var(--font-pixel)] text-base">Catálogo de Servicios</span>
                </button>
                <button 
                  onClick={() => { setIsStartOpen(false); onMenuClick?.('proyectos'); }}
                  className="flex items-center gap-3 w-full px-4 py-2 hover:bg-[#000080] hover:text-white transition-colors"
                >
                  <span className="text-xl ml-0.5">🗂️</span>
                  <span className="font-[family-name:var(--font-pixel)] text-base">Proyectos Destacados</span>
                </button>
                <button 
                  onClick={() => { setIsStartOpen(false); onMenuClick?.('clases'); }}
                  className="flex items-center gap-3 w-full px-4 py-2 hover:bg-[#000080] hover:text-white transition-colors"
                >
                  <span className="text-xl ml-0.5">🎓</span>
                  <span className="font-[family-name:var(--font-pixel)] text-base">Mis Clases</span>
                </button>
                <button 
                  onClick={() => { setIsStartOpen(false); onMenuClick?.('ia'); }}
                  className="flex items-center gap-3 w-full px-4 py-2 hover:bg-[#000080] hover:text-white transition-colors"
                >
                  <span className="text-xl ml-0.5">🤖</span>
                  <span className="font-[family-name:var(--font-pixel)] text-base">Agente AI</span>
                </button>
              </div>
            </div>

            <div className="h-[1px] w-[90%] mx-auto bg-gray-400 border-b border-white my-1"></div>
            
            {/* Categoría: Configuración / Stats */}
            <button 
               onClick={() => { setIsStartOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-3 w-full px-2 py-2.5 hover:bg-[#000080] hover:text-white transition-colors text-left"
            >
              <Zap className="w-5 h-5 text-[#f5a623]" />
              <span className="font-[family-name:var(--font-pixel)] text-lg">Habilidades y Perfil...</span>
            </button>
            <a 
               onClick={() => { setIsStartOpen(false); }}
               href={profileHref}
              className="flex items-center gap-3 w-full px-2 py-2.5 hover:bg-[#000080] hover:text-white transition-colors text-left"
            >
              <span className="text-xl ml-0.5">👤</span>
              <span className="font-[family-name:var(--font-pixel)] text-lg">{isAuthenticated ? (userRole === 'admin' ? "Terminal Admin..." : "Mi Perfil...") : "Acceso Cuenta..."}</span>
            </a>
            
            <div className="h-0.5 w-full bg-gray-400 border-b border-white my-1 mt-auto"></div>

            {/* Sistema */}
            {isAuthenticated && (
              <button 
                onClick={() => { 
                  setIsStartOpen(false); 
                  if (onSignOut) {
                    startTransition(() => {
                      onSignOut();
                    });
                  }
                }}
                disabled={isPending}
                className="flex items-center gap-3 w-full px-2 py-2 hover:bg-[#000080] hover:text-white transition-colors text-left disabled:opacity-50"
              >
                <span className="text-2xl ml-0.5">🚪</span>
                <span className="font-[family-name:var(--font-pixel)] text-lg">Cerrar Sesión</span>
              </button>
            )}
            <button 
              onClick={() => setIsStartOpen(false)}
              className="flex items-center gap-3 w-full px-2 py-2 hover:bg-[#000080] hover:text-white transition-colors text-left"
            >
              <span className="text-2xl ml-0.5">⚠️</span>
              <span className="font-[family-name:var(--font-pixel)] text-lg">Apagar equipo...</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Renglón 1: Principal (Start, Reloj, Redes Sociales) */}
      <div className="flex items-center justify-between px-1 md:px-2 py-1 h-10 w-full mb-1 relative">
        <div className="flex items-center">
          <button 
            onClick={() => setIsStartOpen(!isStartOpen)}
            className={`win95-btn flex items-center gap-2 px-2 md:px-4 py-1 font-bold text-sm h-full group ${isStartOpen ? 'win95-sunken bg-[#dfdfdf]' : ''}`}
          >
            <span className="text-xl group-active:scale-95">🥑</span>
            <span className="font-[family-name:var(--font-pixel)] hidden sm:inline text-black">Start</span>
          </button>
          
          {/* Timestamp movido a la izquierda */}
          <div className="win95-sunken px-2 md:px-3 py-1 bg-white ml-2 md:ml-3">
            <span className="font-[family-name:var(--font-pixel)] text-xs text-black whitespace-nowrap">{time}</span>
          </div>

          {/* Separator */}
          <div className="h-4 md:h-8 w-0.5 bg-gray-400 border-r border-white mx-2 md:mx-3"></div>

          {/* Active Window Tab */}
          <div className="flex items-center gap-1">
             {activeWindow && activeWindow !== 'ia' && (
                <button 
                  onClick={() => setActiveWindow(null)}
                  className="win95-sunken bg-[#dfdfdf] px-2 md:px-3 py-1 flex items-center gap-2 max-w-[120px] md:max-w-[200px] truncate group hover:bg-[#c0c0c0]"
                  title="Minimizar ventana"
                >
                  <span className="text-xs md:text-sm">
                    {activeWindow === 'skills' ? '💻' :
                     activeWindow === 'servicios' ? '📘' :
                     activeWindow === 'proyectos' ? '🗂️' :
                     activeWindow === 'clases' ? '🎓' : ''}
                  </span>
                  <span className="text-[10px] md:text-xs font-[family-name:var(--font-pixel)] text-black truncate">
                    {activeWindow === 'skills' ? 'Skills.exe' :
                     activeWindow === 'servicios' ? 'Catálogo.exe' :
                     activeWindow === 'proyectos' ? 'Proyectos.exe' :
                     activeWindow === 'clases' ? 'Mis_Clases.exe' : 
                     `${activeWindow}.exe`}
                  </span>
                </button>
             )}
          </div>
        </div>

        {/* Social Links - PERFECTAMENTE CENTRADOS */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 md:gap-2">
          {SOCIAL_LINKS.map(link => {
            const Icon = link.icon;
            return (
              <a 
                key={link.name} 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="win95-sunken px-2 md:px-3 py-1 flex items-center gap-2 bg-white hover:bg-[#e0e0e0] active:scale-95 transition-all outline-none"
                title={link.name}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:scale-110" style={{ color: link.color !== '#ffffff' ? link.color : '#000000' }} />
                <span className="font-[family-name:var(--font-pixel)] text-xs text-black hidden lg:inline">{link.name}</span>
              </a>
            )
          })}
        </div>
        
        {/* Espacio invisible para mantener Flex justificado y dejar aire al Chatbot */}
        <div className="ml-auto w-10 md:w-20"></div>
      </div>
      
      {/* Renglón 2: Footer Legal y Copyright */}
      <div className="flex flex-col md:flex-row items-center justify-between px-2 pt-1 border-t border-gray-400 mt-1 mb-0.5">
        <div className="flex items-center gap-3 text-black font-[family-name:var(--font-pixel)] text-[10px] md:text-xs">
          <a href="/aviso-legal" className="hover:underline hover:text-[#000080]">Aviso Legal</a>
          <span>|</span>
          <a href="/privacidad" className="hover:underline hover:text-[#000080]">Política de Privacidad</a>
          <span>|</span>
          <a href="/cookies" className="hover:underline hover:text-[#000080]">Uso de Cookies</a>
        </div>
        
        <div className="text-gray-600 font-[family-name:var(--font-pixel)] text-[10px] md:text-xs mt-1 md:mt-0 text-center md:text-right">
          © 2026. Protegido por derechos de autor. <br className="md:hidden" />
          Desarrollado por <strong>Jose Guillermo Vasquez Guzman</strong>.
        </div>
      </div>

    </div>
  )
}

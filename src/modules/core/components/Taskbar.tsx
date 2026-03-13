"use client"

import { useState, useEffect, useTransition } from "react"
import Image from "next/image"
import { ChevronRight } from "pixelarticons/react"
import { SOCIAL_LINKS } from "@/modules/core/constants/social"
import { 
  WindowsXPHelp, 
  WindowsExplorer, 
  WindowsXPMyNetworkPlaces, 
  WindowsAddressBook, 
  Windows95MainCpl,
  Windows95Access,
  WindowsShutDown
} from "react-old-icons"

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
  const [isHearttOpen, setIsHearttOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  // Cerrar menú con ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsHearttOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const profileHref = isAuthenticated ? (userRole === 'admin' ? '/admin/terminal' : '/profile') : '/login'

  return (
    <div className="fixed bottom-0 left-0 right-0 h-auto bg-[#c0c0c0] border-t-2 border-[#dfdfdf] flex flex-col z-[50] win95-raised p-1">
      {/* === MENÚ DE INICIO WIN95 === */}
      {isHearttOpen && (
        <div className="absolute bottom-full mb-1 left-0 w-64 md:w-72 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-r-2 border-b-2 border-black shadow-[4px_4px_0_rgba(0,0,0,0.5)] z-50 flex flex-col p-1 animate-in fade-in slide-in-from-bottom-2 duration-100">
          {/* Banda lateral azul */}
          <div className="w-8 bg-gradient-to-b from-[#000080] to-[#1084d0] flex flex-col justify-end pb-2 overflow-hidden">
            <span className="text-[#c0c0c0] font-bold text-xl -rotate-90 transform origin-bottom-left whitespace-nowrap mb-2 ml-1 tracking-widest font-sans">
              Proyectos <span className="text-white">95</span>
            </span>
          </div>
          
          {/* Opciones del menú (Estructura de Índice Win95) */}
          <div className="flex-1 p-1 flex flex-col pt-2 text-black">
            
            {/* Secciones de Navegación */}
            <button 
              onClick={() => { 
                setIsHearttOpen(false); 
                onMenuClick?.('skills'); 
                setTimeout(() => {
                  const el = document.getElementById('skills-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }}
              className="flex items-center gap-3 w-full px-3 py-2 hover:bg-[#000080] hover:text-white transition-colors"
            >
              <WindowsXPHelp size={24} />
              <span className="font-[family-name:var(--font-pixel)] text-base">Habilidades (Skills)</span>
            </button>
            <button 
              onClick={() => { 
                setIsHearttOpen(false); 
                onMenuClick?.('servicios'); 
                setTimeout(() => {
                  const el = document.getElementById('servicios-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }}
              className="flex items-center gap-3 w-full px-3 py-2 hover:bg-[#000080] hover:text-white transition-colors"
            >
              <WindowsExplorer size={24} />
              <span className="font-[family-name:var(--font-pixel)] text-base">Catálogo de Servicios</span>
            </button>
            <button 
              onClick={() => { 
                setIsHearttOpen(false); 
                onMenuClick?.('proyectos'); 
                setTimeout(() => {
                  const el = document.getElementById('proyectos-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }}
              className="flex items-center gap-3 w-full px-3 py-2 hover:bg-[#000080] hover:text-white transition-colors"
            >
              <WindowsXPMyNetworkPlaces size={24} />
              <span className="font-[family-name:var(--font-pixel)] text-base">Proyectos Destacados</span>
            </button>
            <button 
              onClick={() => { 
                setIsHearttOpen(false); 
                onMenuClick?.('clases'); 
                setTimeout(() => {
                  const el = document.getElementById('clases-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }}
              className="flex items-center gap-3 w-full px-3 py-2 hover:bg-[#000080] hover:text-white transition-colors"
            >
              <WindowsAddressBook size={24} />
              <span className="font-[family-name:var(--font-pixel)] text-base">Mis Clases</span>
            </button>
            <button 
              onClick={() => { setIsHearttOpen(false); onMenuClick?.('ia'); }}
              className="flex items-center gap-3 w-full px-3 py-2 hover:bg-[#000080] hover:text-white transition-colors"
            >
              <span className="text-2xl drop-shadow-sm">🧙🏽‍♂️</span>
              <span className="font-[family-name:var(--font-pixel)] text-base">Agente AI</span>
            </button>

            <div className="h-[1px] w-[90%] mx-auto bg-gray-400 border-b border-white my-1"></div>
            
            {/* Opciones de Perfil */}
            <a 
               onClick={() => { setIsHearttOpen(false); }}
               href={profileHref}
              className="flex items-center gap-3 w-full px-2 py-2.5 hover:bg-[#000080] hover:text-white transition-colors text-left mt-auto"
            >
              <Windows95Access size={24} />
              <span className="font-[family-name:var(--font-pixel)] text-lg">{isAuthenticated ? (userRole === 'admin' ? "Terminal Admin..." : "Mi Perfil...") : "Acceso Cuenta..."}</span>
            </a>

            <div className="h-0.5 w-full bg-gray-400 border-b border-white my-1"></div>

            {/* Sistema */}
            {isAuthenticated && (
              <button 
                onClick={() => { 
                  setIsHearttOpen(false); 
                  if (onSignOut) {
                    startTransition(() => {
                      onSignOut();
                    });
                  }
                }}
                disabled={isPending}
                className="flex items-center gap-3 w-full px-2 py-2 hover:bg-[#000080] hover:text-white transition-colors text-left disabled:opacity-50"
              >
                <WindowsShutDown size={24} />
                <span className="font-[family-name:var(--font-pixel)] text-lg">Cerrar Sesión</span>
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Renglón 1: Principal (Heartt, Reloj, Redes Sociales) */}
      <div className="flex items-center justify-between px-1 md:px-2 py-1 h-12 md:h-14 w-full mb-1 relative">
        <div className="flex items-center">
          <button 
            onClick={() => setIsHearttOpen(!isHearttOpen)}
            className={`win95-btn flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 font-bold text-sm h-full group ${isHearttOpen ? 'win95-sunken bg-[#dfdfdf]' : ''}`}
          >
            <Image src="/logo/Cafe_logo.svg" alt="TuAvocado Logo" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10 group-active:scale-95" />
            <span className="font-[family-name:var(--font-pixel)] hidden sm:inline text-black text-xl md:text-2xl pt-0.5">Menu</span>
          </button>
          
          {/* Separator */}
          <div className="h-6 md:h-8 w-0.5 bg-gray-400 border-r border-white mx-2 md:mx-3"></div>

          {/* Active Window Tab */}
          <div className="flex items-center gap-1">
             {activeWindow && activeWindow !== 'ia' && (
                <button 
                  onClick={() => setActiveWindow(null)}
                  className="win95-sunken bg-[#dfdfdf] px-2 md:px-3 py-1 flex items-center gap-2 max-w-[120px] md:max-w-[200px] truncate group hover:bg-[#c0c0c0]"
                  title="Minimizar ventana"
                >
                  <span className="flex items-center justify-center">
                    {activeWindow === 'skills' ? <WindowsXPHelp size={16} /> :
                     activeWindow === 'servicios' ? <WindowsExplorer size={16} /> :
                     activeWindow === 'proyectos' ? <WindowsXPMyNetworkPlaces size={16} /> :
                     activeWindow === 'clases' ? <WindowsAddressBook size={16} /> : null}
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

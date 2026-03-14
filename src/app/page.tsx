"use client"
import Image from "next/image"

import { useState, useEffect, useRef } from 'react'
import { ChevronRight, Shield, Zap, BookOpen, Heart, ExternalLink } from "pixelarticons/react"
import ChatBotItem from "@/modules/ai/components/ChatBotItem"
import Scene3D from "@/components/three/Scene3D"

import { DEVELOPER_SKILLS, LAWYER_SKILLS } from "@/modules/identity/data/skills"
import { FEATURED_PROJECTS } from "@/modules/identity/data/projects"
import Win95Window from "@/modules/core/components/Win95Window"
import RPGStatBar from "@/modules/identity/components/RPGStatBar"
import Taskbar from "@/modules/core/components/Taskbar"
import ScanlinesOverlay from "@/modules/core/components/ScanlinesOverlay"
import DesktopIcon from "@/modules/core/components/DesktopIcon"
import CatalogoServiciosPanel from "@/modules/catalog/components/CatalogoServiciosPanel"
import MisClasesPanel from "@/modules/education/components/MisClasesPanel"
import { GlobalAudio } from "@/modules/shared/components/GlobalAudio"
import {
  WindowsXPHelp,
  WindowsExplorer,
  WindowsXPMyNetworkPlaces,
  WindowsAddressBook
} from "react-old-icons"

// ===========================================
// ===========================================
// RPG COMPONENTS
// ===========================================

// Dual Skills Panel - Shows BOTH Tech and Legal skills side by side
function DualSkillsPanel() {
  const [selectedDevIndex, setSelectedDevIndex] = useState(0)
  const [selectedLegalIndex, setSelectedLegalIndex] = useState(0)
  
  return (
    <div className="rpg-panel p-0 overflow-hidden">
{/* Header Removido por Minimalismo del Layout Superior */}
      
      {/* Two Column Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Tech Skills Column */}
        <div className="border-r border-[#4a4a6a]">
          <div className="flex items-center gap-2 px-3 lg:px-5 py-3 bg-[#1a1a2e] border-b border-[#4a4a6a]">
            <Zap className="pixelated w-5 h-5 text-[#00d9ff]" />
            <span className="text-[#00d9ff] font-[family-name:var(--font-pixel)] text-base md:text-lg tracking-wide">
              TECH SKILLS
            </span>
          </div>
          <div className="max-h-[340px] overflow-y-auto">
            {DEVELOPER_SKILLS.map((skill, index) => (
              <div
                key={skill.name}
                className={`rpg-menu-item px-3 py-3 ${selectedDevIndex === index ? 'selected bg-[#00d9ff]/10' : ''}`}
                onMouseEnter={() => setSelectedDevIndex(index)}
              >
                <div className="flex items-center gap-2 mb-1">
                  {selectedDevIndex === index && (
                    <ChevronRight className="pixelated w-4 h-4 text-[#00d9ff] rpg-arrow" />
                  )}
                  <span className={`font-[family-name:var(--font-pixel)] text-sm md:text-base ${selectedDevIndex === index ? 'text-[#00d9ff] font-bold' : 'text-[#f0f0f0]'}`}>
                    {skill.name}
                  </span>
                  <span className="text-[#a8ffa8] font-[family-name:var(--font-pixel)] text-sm ml-auto">
                    Lv.{skill.level}
                  </span>
                </div>
{/* Barra Removida */}
              </div>
            ))}
          </div>
        </div>
        
        {/* Legal Skills Column */}
        <div>
          <div className="flex items-center gap-2 px-3 lg:px-5 py-3 bg-[#1a1a2e] border-b border-[#4a4a6a]">
            <BookOpen className="pixelated w-5 h-5 text-[#f5a623]" />
            <span className="text-[#f5a623] font-[family-name:var(--font-pixel)] text-base md:text-lg tracking-wide">
              LEGAL SKILLS
            </span>
          </div>
          <div className="max-h-[340px] overflow-y-auto">
            {LAWYER_SKILLS.map((skill, index) => (
              <div
                key={skill.name}
                className={`rpg-menu-item px-3 py-3 ${selectedLegalIndex === index ? 'selected bg-[#f5a623]/10' : ''}`}
                onMouseEnter={() => setSelectedLegalIndex(index)}
              >
                <div className="flex items-center gap-2 mb-1">
                  {selectedLegalIndex === index && (
                    <ChevronRight className="pixelated w-4 h-4 text-[#f5a623] rpg-arrow" />
                  )}
                  <span className={`font-[family-name:var(--font-pixel)] text-sm md:text-base ${selectedLegalIndex === index ? 'text-[#f5a623] font-bold' : 'text-[#f0f0f0]'}`}>
                    {skill.name}
                  </span>
                  <span className="text-[#a8ffa8] font-[family-name:var(--font-pixel)] text-sm ml-auto">
                    Lv.{skill.level}
                  </span>
                </div>
{/* Barra Removida */}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer Removido */}
    </div>
  )
}

// Nuevo panel de Stats aislado (que irá en la sección Skills)
export function RPGStatsPanel() {
  return (
    <div className="space-y-4">
      <RPGStatBar label="HP" current={999} max={999} color="skill-strength" showNumbers size="normal" />
      <RPGStatBar label="MP" current={850} max={999} color="skill-tech" showNumbers size="normal" />
      <RPGStatBar label="EXP" current={75} max={100} color="skill-legal" showNumbers size="small" />
    </div>
  )
}

// Tarjeta de Presentación Principal (Fase 1: Info Integrada AIO-Optimized)
function CharacterStatsPanel() {
  return (
    <article className="rpg-panel p-6 md:p-8 flex flex-col items-center text-center">
      {/* Avatar Central */}
      <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 md:border-[6px] border-[#60b080] mb-6 shadow-[0_0_25px_rgba(96,176,128,0.6)] bg-[#6CBA89] relative transition-transform hover:scale-105 duration-300">
        <Image 
          src="/profile.png" 
          alt="Jose Guillermo Vasquez" 
          width={400}
          height={400}
          quality={100}
          priority
          unoptimized={true}
          sizes="(max-width: 768px) 160px, 224px"
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Nombres y Titulos (H1 para SEO y AIO) */}
      <h1 className="text-white font-[family-name:var(--font-pixel)] text-3xl md:text-6xl mb-4 tracking-wide shadow-black drop-shadow-md">
        Jose Guillermo Vasquez Guzman
      </h1>
      
      <h2 className="text-white font-[family-name:var(--font-pixel)] text-2xl md:text-3xl mb-5 leading-tight max-w-3xl mx-auto">
        Diseño soluciones legales con <span className="bg-[#f5f5dc] text-black px-3 py-1 rounded inline-block mt-2 md:mt-0 font-bold shadow-lg">Inteligencia Artificial</span>
      </h2>
      
      {/* Sobre Mi Integrado y Optimizado para Agentes IA (Listas semánticas legibles) */}
      <section className="bg-[#0a0a14] border-2 border-[#4a4a6a] p-5 md:p-8 w-full max-w-4xl text-left mt-2 mb-2 shadow-inner hover:border-[#f5a623] transition-colors">
        <h3 className="text-[#f5a623] font-[family-name:var(--font-pixel)] text-xl md:text-2xl mb-4 flex items-center gap-3 border-b border-[#4a4a6a] pb-3">
          <span className="text-2xl md:text-3xl">⚔️</span> Perfil Bi-Clase: Abogado & Fullstack
        </h3>
        
        <p className="sr-only">
          José Guillermo Vásquez es un Abogado Corporativo y Desarrollador Fullstack especializado en LegalTech. Domina la intersección entre ingeniería de software (Next.js, LangChain, Supabase) y derecho digital (Compliance, IP, Contratos SaaS), forjando soluciones legales escalables potenciadas por Inteligencia Artificial.
        </p>

        <ul role="list" className="space-y-4 font-mono text-sm md:text-base text-[#dfdfdf] leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-[#f5a623] mt-1">▸</span>
            <span>
              <strong>Rama Legal Corporativa:</strong> Especialista en la intersección entre derecho y tecnología. Ofrezco consultoría oficial en <strong className="text-[#00d9ff]">propiedad intelectual</strong>, <strong className="text-[#00d9ff]">SaaS Compliance normativo</strong>, privacidad de datos y redacción de contratos de software complejos.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#f5a623] mt-1">▸</span>
            <span>
              <strong>Rama de Ingeniería Tech:</strong> Desarrollador Fullstack activo construyendo infraestructura digital y automatizaciones. Experto integrando agentes autónomos y LLMs para optimizar procesos comerciales mediante <strong className="text-[#f5a623]">Next.js, Python, Supabase y LangChain</strong>.
            </span>
          </li>
        </ul>
      </section>
    </article>
  )
}

// Removed old RPGFooter

// Removed old RPGFooter

// Panel de Proyectos Destacados
function FeaturedProjectsPanel() {
  const projects = FEATURED_PROJECTS;
  return (
    <div className="space-y-4">
      {projects.map((proj, idx) => (
        <div key={idx} className="bg-[#1a1a2e] border-2 border-[#4a4a6a] p-4 group hover:border-[#f5a623] transition-colors">
          <div className="flex flex-col items-center mb-6">
            {/* Contenedor Superior: Logo Ampliado al 80% */}
            <div className="w-[80%] shrink-0 bg-[#0a0a14] border-2 border-[#4a4a6a] flex items-center justify-center p-4 sm:p-6 rounded-md overflow-hidden group-hover:border-[#f5a623] transition-colors mb-6 min-h-[140px] md:min-h-[200px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={proj.logo} 
                alt={`Logo de ${proj.name}`}
                className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `<span class="font-[family-name:var(--font-pixel)] text-sm text-[#4a4a6a] text-center leading-tight">Missing<br/>img</span>`;
                }}
              />
            </div>

            <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                 <h3 className="font-[family-name:var(--font-pixel)] text-xl sm:text-2xl lg:text-3xl text-[#f5a623] group-hover:text-white transition-colors drop-shadow-md leading-tight">
                   {proj.name}
                 </h3>
                 <p className="font-[family-name:var(--font-pixel)] text-sm sm:text-base text-[#88ff88] mt-2 shadow-black drop-shadow-sm">
                   {proj.role}
                 </p>
              </div>

              <a 
                href={proj.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="win95-btn px-4 py-2 bg-[#c0c0c0] hover:bg-[#d0d0d0] text-black font-[family-name:var(--font-pixel)] text-sm flex items-center justify-center gap-2 w-full md:w-auto shrink-0 transition-colors"
              >
                VISITAR <ExternalLink className="pixelated w-4 h-4" />
              </a>
            </div>
          </div>
          <p className="font-mono text-sm md:text-base text-[#c0c0c0] leading-relaxed mb-4">
            {proj.desc}
          </p>
          <div className="flex flex-wrap gap-2">
            {proj.tech.map((t, i) => (
              <span key={i} className="px-2 py-1 border border-[#4a4a6a] bg-[#0a0a14] font-[family-name:var(--font-pixel)] text-xs md:text-sm text-[#00d9ff]">
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Special Abilities Panel - Class Skills & Upgrades
function SpecialAbilitiesPanel({ type }: { type: 'legal' | 'tech' }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  const abilities = type === 'legal' ? [
    { 
      name: "Escudo de Propiedad Intelectual", 
      level: 5,
      maxLevel: 5,
      description: "Protege marcas, patentes y derechos de autor con maestria absoluta",
      cooldown: "Pasiva",
      type: "Defensa",
      icon: Shield
    },
    { 
      name: "Firewall de Datos", 
      level: 4,
      maxLevel: 5,
      description: "Implementa GDPR, LGPD y normativas de privacidad",
      cooldown: "Instantaneo",
      type: "Defensa",
      icon: Shield
    },
    { 
      name: "Invocacion de Contratos", 
      level: 5,
      maxLevel: 5,
      description: "Crea y revisa contratos tech, SaaS, NDA y licencias",
      cooldown: "2 dias",
      type: "Hechizo",
      icon: BookOpen
    },
    { 
      name: "Due Diligence Total", 
      level: 4,
      maxLevel: 5,
      description: "Analiza riesgos legales en startups y adquisiciones",
      cooldown: "1 semana",
      type: "Analisis",
      icon: BookOpen
    },
  ] : [
    { 
      name: "Invocacion de Agentes IA", 
      level: 5,
      maxLevel: 5,
      description: "Crea agentes autonomos con LangGraph y LangChain",
      cooldown: "Variable",
      type: "Hechizo",
      icon: Zap
    },
    { 
      name: "Fullstack Deployment", 
      level: 4,
      maxLevel: 5,
      description: "Despliega apps con Next.js, Vercel AI SDK y Edge Functions",
      cooldown: "1 dia",
      type: "Construccion",
      icon: Zap
    },
    { 
      name: "Data Alchemy", 
      level: 4,
      maxLevel: 5,
      description: "Transforma datos con Python, Jupyter y pipelines ML",
      cooldown: "Variable",
      type: "Transformacion",
      icon: Heart
    },
    { 
      name: "Cloud Summoning", 
      level: 4,
      maxLevel: 5,
      description: "Invoca servidores vLLM, Azure AI y Linux admin",
      cooldown: "Instantaneo",
      type: "Infraestructura",
      icon: Zap
    },
  ]
  
  const typeColor = type === 'legal' ? '#f5a623' : '#00d9ff'
  const title = type === 'legal' ? 'HABILIDADES DE CLASE: ABOGADO' : 'HABILIDADES DE CLASE: DESARROLLADOR'
  
  return (
    <div className="rpg-panel p-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#2a2a4a] border-b-2 border-[#4a4a6a]">
        {type === 'legal' ? (
          <Shield className="pixelated w-4 h-4" style={{ color: typeColor }} />
        ) : (
          <Zap className="pixelated w-4 h-4" style={{ color: typeColor }} />
        )}
        <span className="font-[family-name:var(--font-pixel)] text-xs" style={{ color: typeColor }}>
          {title}
        </span>
      </div>
      
      {/* Abilities List */}
      <div className="p-2 space-y-2">
        {abilities.map((ability, index) => {
          const IconComponent = ability.icon
          const isHovered = hoveredIndex === index
          const levelHearts = Array.from({ length: ability.maxLevel }, (_, i) => i < ability.level)
          
          return (
            <div
              key={ability.name}
              className={`bg-[#0f0f1f] border-2 p-3 transition-all cursor-pointer ${
                isHovered 
                  ? 'border-[#f5a623] shadow-[0_0_10px_rgba(245,166,35,0.3)]' 
                  : 'border-[#4a4a6a]'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Ability Header */}
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`w-10 h-10 flex items-center justify-center shrink-0 border-2 ${
                  isHovered ? 'border-[#f5a623] bg-[#1a1a2e]' : 'border-[#4a4a6a] bg-[#1a1a2e]'
                }`}>
                  <IconComponent className="w-5 h-5" style={{ color: typeColor }} />
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-white font-[family-name:var(--font-pixel)] text-sm truncate">
                      {ability.name}
                    </span>
                  </div>
                  
                  {/* Level Hearts */}
                  <div className="flex items-center gap-0.5 mb-1">
                    {levelHearts.map((filled, i) => (
                      <Heart 
                        key={i} 
                        className={`w-3 h-3 ${filled ? 'text-[#f5a623] fill-[#f5a623]' : 'text-[#4a4a6a]'}`}
                      />
                    ))}
                    <span className="text-[#808080] font-[family-name:var(--font-pixel)] text-xs ml-2">
                      [{ability.type}]
                    </span>
                  </div>
                  
                  {/* Description - shows on hover */}
                  {isHovered && (
                    <div className="mt-2 pt-2 border-t border-[#4a4a6a] animate-in fade-in duration-150">
                      <p className="text-[#c0c0c0] font-mono text-[11px] md:text-xs leading-relaxed tracking-tight">
                        {ability.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[#808080] font-[family-name:var(--font-pixel)] text-xs">
                          Cooldown:
                        </span>
                        <span className="text-[#88ff88] font-[family-name:var(--font-pixel)] text-xs">
                          {ability.cooldown}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Footer */}
      <div className="border-t-2 border-[#4a4a6a] px-3 py-2 bg-[#0f0f1f]">
        <p className="text-[#808080] font-[family-name:var(--font-pixel)] text-xs text-center">
          [HOVER] Ver descripcion de habilidad
        </p>
      </div>
    </div>
  )
}
// ===========================================
// FASE 4: CATÁLOGO DE SERVICIOS
// ===========================================

// CatalogoServiciosPanel extraído a src/modules/catalog/components/CatalogoServiciosPanel.tsx

// ===========================================
// FASE 4: MIS CLASES Y RECURSOS (BLOG STYLE)
// ===========================================

// MisClasesPanel extraído a src/modules/education/components/MisClasesPanel.tsx

// ===========================================
// MAIN PAGE
// ===========================================

export default function AvocadoCenter() {
  const [activeWindow, setActiveWindow] = useState<'proyectos' | 'skills' | 'ia' | 'servicios' | 'clases' | null>('skills')
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const checkSession = async () => {
      // Import dynamically to avoid SSR issues with some client hooks if needed, 
      // but standard import is fine since we are in a use client file.
      const { createClient } = await import('@/modules/database/client')
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      setIsAuthenticated(!!session)

      if (session?.user) {
        // Fetch extended user data
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single()
          
        if (data && !error) {
           setUserRole(data.role)
        }
      }

      // Listen for auth changes to update the menu in real-time
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setIsAuthenticated(!!session)
        if (session?.user) {
           const { data } = await supabase.from('users').select('role').eq('id', session.user.id).single()
           setUserRole(data?.role || null)
        } else {
           setUserRole(null)
        }
      })

      return () => subscription.unsubscribe()
    }
    checkSession()
  }, [])

  // Chat interactions removed, now isolated in ChatBotItem

  const handleIconClick = (windowName: 'proyectos' | 'skills' | 'ia' | 'servicios' | 'clases') => {
    if (windowName === 'ia') {
      setIsChatOpen(true)
    } else {
      setActiveWindow(windowName)
      setTimeout(() => {
        const el = document.getElementById(`${windowName}-section`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }

  return (
    <main className="min-h-screen pb-24 relative overflow-clip">
      <GlobalAudio />
      
      {/* Capa 1: Imagen de la Colina Windows Bliss (Fondo retro) */}
      <div className="absolute inset-0 bg-[url('/bg-bliss.png')] bg-cover bg-fixed bg-center bg-no-repeat pointer-events-none z-0"></div>
      
      {/* Capa 2: Filtro de Sombra para preservar contraste del texto (Oscuridad Suave) */}
      <div className="absolute inset-0 bg-[#0a0a14]/30 pointer-events-none z-0"></div>
      
      {/* Capa 3: Grilla de Batalla clásica (Transparente para mirar al cielo) */}
      <div className="absolute inset-0 battle-grid !bg-transparent opacity-60 pointer-events-none z-0"></div>
      
      <ScanlinesOverlay />

      {/* Main Content - Mobile First Container */}
      <div className="w-full max-w-xl mx-auto px-4 py-8 relative z-10">
        
        {/* Header - Brand Logo */}
        <div className="flex justify-center mb-8 mt-6 relative">
          {/* Difuminado trasero (Capa de resalte profesional) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[500px] h-[80px] md:h-[120px] bg-[#c0c0c0]/15 blur-2xl rounded-[100%] z-0 pointer-events-none"></div>
          
          <Image 
            src="/logo/JoseGuillermoVG_Legal-Tech_Dev.svg" 
            alt="Jose Guillermo VG Logo" 
            width={800} 
            height={220} 
            className="w-[95%] sm:w-[85%] md:w-[70%] lg:w-[600px] h-auto drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] relative z-10"
            priority
          />
        </div>

        {/* Character Profile (FIRST) */}
        <div className="mb-10 w-full animate-in slide-in-from-bottom-4 duration-500">
          <CharacterStatsPanel />
        </div>
      </div> {/* <-- FIN DEL CONTENEDOR ESTRECHO (Header & Perfil) */}

      {/* CONTENEDOR DE BLOQUES AMPLIOS (Misión, Navegación y Ventanas) */}
      <div className="w-full max-w-[1200px] mx-auto px-2 sm:px-4 pb-16 relative z-10">
        
        {/* Desktop Navigation Menu (Win95 Icons) */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-10 mb-16 w-full animate-in slide-in-from-bottom-8 duration-700 max-w-6xl mx-auto px-4 mt-8">
           <div className="w-[100px] sm:w-[130px] md:w-[180px]"><DesktopIcon icon={<WindowsXPHelp size={64} className="drop-shadow-md" />} label="Skills" onClick={() => handleIconClick('skills')} isActive={activeWindow === 'skills'} /></div>
           <div className="w-[100px] sm:w-[130px] md:w-[180px]"><DesktopIcon icon={<WindowsExplorer size={64} className="drop-shadow-md" />} label="Catálogo" onClick={() => handleIconClick('servicios')} isActive={activeWindow === 'servicios'} /></div>
           <div className="w-[100px] sm:w-[130px] md:w-[180px]"><DesktopIcon icon={<WindowsXPMyNetworkPlaces size={64} className="drop-shadow-md" />} label="Proyectos" onClick={() => handleIconClick('proyectos')} isActive={activeWindow === 'proyectos'} /></div>
           <div className="w-[100px] sm:w-[130px] md:w-[180px]"><DesktopIcon icon={<WindowsAddressBook size={64} className="drop-shadow-md" />} label="Mis Clases" onClick={() => handleIconClick('clases')} isActive={activeWindow === 'clases'} /></div>
           <div className="w-[100px] sm:w-[130px] md:w-[180px]"><DesktopIcon icon={<span className="text-[64px] leading-none drop-shadow-md">🧙🏽‍♂️</span>} label="Agente AI" onClick={() => handleIconClick('ia')} isActive={isChatOpen} /></div>
        </div>

        {/* Active Window Render Area */}
        {activeWindow === 'proyectos' && (
          <div id="proyectos-section" className="mb-10 max-w-3xl mx-auto animate-in slide-in-from-bottom-4">
            <Win95Window title="Proyectos_Destacados.exe" onClose={() => setActiveWindow(null)}>
              <div className="p-2 sm:p-4 bg-[#0a0a14]">
                 <FeaturedProjectsPanel />
              </div>
            </Win95Window>
          </div>
        )}

        {/* ===== NUEVO LAYOUT RPG: SPLIT SCREEN STICKY (Personaje Te Acompaña / Stats Limpios Der) ===== */}
        {activeWindow === 'skills' && (
          <div id="skills-section" className="mb-10 w-[95vw] lg:w-[1100px] max-w-full mx-auto animate-in slide-in-from-bottom-4 relative bg-transparent border-2 border-[#4a4a6a]">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
              
              {/* LADO IZQUIERDO: Pantalla del Personaje STICKY (Con un 95% de transparencia -> bg-color/5) */}
              <div className="relative h-[300px] sm:h-[400px] lg:h-[calc(100vh-80px)] lg:sticky lg:top-10 border-b-2 lg:border-b-0 lg:border-r-2 border-[#4a4a6a] bg-[#0a0a14]/5">
                
                {/* Etiqueta de Nombre Clásica arriba del personaje */}
                <div className="absolute top-4 left-4 z-10 bg-[#000080] border-2 border-white px-3 py-1 text-white font-[family-name:var(--font-pixel)] text-sm shadow-md">
                  Lv.99 Abogado-Dev
                </div>

                <div className="w-full h-full">
                  <Scene3D />
                </div>
              </div>

              {/* LADO DERECHO: Menú de Estadísticas (Fluye Naturalmente) */}
              <div className="relative p-4 lg:p-8 bg-[#05050a]">
                
                <h2 className="font-[family-name:var(--font-pixel)] text-2xl text-[#88ff88] mb-4 border-b-2 border-[#4a4a6a] pb-2">
                  PERFIL DE CLASE
                </h2>
                
                <p className="font-[family-name:var(--font-pixel)] text-lg md:text-xl text-[#f5a623] tracking-widest mb-8 text-shadow animate-pulse">
                  ~ Un héroe legal-tech aparece ~
                </p>

                <div className="flex flex-col gap-8">
                  {/* Panel 1: Stats Principales (Limpios) */}
                  <div>
                    <h3 className="font-[family-name:var(--font-pixel)] text-sm text-[gray] mb-3 uppercase tracking-widest">Estadísticas Vitales</h3>
                    <div className="bg-[#0a0a14] border-2 border-gray-600 p-4 rounded-sm">
                      <RPGStatsPanel />
                    </div>
                  </div>

                  {/* Panel 2: Clase Desarrollador */}
                  <div>
                    <h3 className="font-[family-name:var(--font-pixel)] text-sm text-[#00d9ff] mb-3 uppercase tracking-widest">Rama: Engineer</h3>
                    <div className="bg-[#0a0a14] border border-[#00d9ff]/30 p-2 lg:p-4 rounded-sm">
                      <SpecialAbilitiesPanel type="tech" />
                    </div>
                  </div>

                  {/* Panel 3: Clase Abogado */}
                  <div className="pb-8 lg:pb-0">
                    <h3 className="font-[family-name:var(--font-pixel)] text-sm text-[#ffd700] mb-3 uppercase tracking-widest">Rama: Legal</h3>
                    <div className="bg-[#0a0a14] border border-[#ffd700]/30 p-2 lg:p-4 rounded-sm">
                      <SpecialAbilitiesPanel type="legal" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECCIÓN INFERIOR DE ANCHO COMPLETO: Sinergia */}
            <div className="p-4 lg:p-8 border-t-2 border-[#4a4a6a] bg-[#05050a]">
               <h3 className="font-[family-name:var(--font-pixel)] text-lg text-purple-400 mb-6 uppercase tracking-widest text-center border-b border-[#4a4a6a] pb-2">
                 <i className="w-2 h-4 inline-block bg-purple-400 animate-pulse mr-2"></i> 
                 Sinergia Completa (Tech + Legal)
               </h3>
               <div className="bg-[#0a0a14] p-4 lg:p-8 rounded-sm">
                 <DualSkillsPanel />
               </div>
            </div>

          </div>
        )}

        {activeWindow === 'servicios' && (
          <div id="servicios-section" className="mb-10 w-[95vw] lg:w-[1000px] max-w-full mx-auto animate-in slide-in-from-bottom-4 relative">
            <Win95Window title="Catalogo_de_Servicios.exe" onClose={() => setActiveWindow(null)}>
               <div className="bg-[#0a0a14] p-1 h-full">
                 <CatalogoServiciosPanel />
               </div>
            </Win95Window>
          </div>
        )}

        {activeWindow === 'clases' && (
          <div id="clases-section" className="fixed inset-0 z-[40] flex items-start sm:items-center justify-center p-2 sm:p-4 pt-4 pb-[14rem] sm:pb-[16rem] overflow-y-auto bg-black/60 animate-in fade-in duration-200">
            <div className="w-full max-w-5xl my-auto mt-4 md:mt-12 mb-[6rem]">
              <Win95Window 
                title="Mis_Clases_y_Recursos.exe" 
                onClose={() => setActiveWindow(null)}
                className="w-full shadow-2xl"
              >
                <MisClasesPanel isAuthenticated={isAuthenticated} />
              </Win95Window>
            </div>
          </div>
        )}

        {/* Fin del render Area */}
      </div>

      <ChatBotItem isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      <Taskbar 
        isAuthenticated={isAuthenticated} 
        userRole={userRole} 
        activeWindow={activeWindow}
        setActiveWindow={setActiveWindow}
        onMenuClick={handleIconClick} 
      />
    </main>
  )
}


"use client"

import { useState, useEffect, useCallback } from "react"
import { Linkedin, Mail, Github, X, Minus, Square, ChevronRight, Sword, Shield, Zap, BookOpen, Heart, Star, Instagram, BookMarked, ExternalLink, MessageCircle, FileCode } from "lucide-react"
import Scene3D from "@/components/three/Scene3D"

// ===========================================
// SKILL DATA - Tu perfil de habilidades
// ===========================================

const DEVELOPER_SKILLS = [
  { name: "LangGraph / LangChain", level: 95, maxLevel: 100, icon: "skill-tech" },
  { name: "Vercel AI SDK", level: 92, maxLevel: 100, icon: "skill-tech" },
  { name: "Python / Jupyter", level: 90, maxLevel: 100, icon: "skill-tech" },
  { name: "JavaScript / TypeScript", level: 88, maxLevel: 100, icon: "skill-tech" },
  { name: "Next.js / React", level: 85, maxLevel: 100, icon: "skill-tech" },
  { name: "Express.js / Node.js", level: 82, maxLevel: 100, icon: "skill-tech" },
  { name: "Linux Server Admin", level: 78, maxLevel: 100, icon: "skill-tech" },
  { name: "vLLM / Azure AI", level: 88, maxLevel: 100, icon: "skill-tech" },
]

const LAWYER_SKILLS = [
  { name: "Oratoria", level: 94, maxLevel: 100, icon: "skill-charisma" },
  { name: "Redacción Legal", level: 96, maxLevel: 100, icon: "skill-wisdom" },
  { name: "Propiedad Intelectual", level: 92, maxLevel: 100, icon: "skill-legal" },
  { name: "Protección de Datos", level: 90, maxLevel: 100, icon: "skill-legal" },
  { name: "Contratos Tech", level: 95, maxLevel: 100, icon: "skill-legal" },
  { name: "Due Diligence", level: 88, maxLevel: 100, icon: "skill-wisdom" },
  { name: "Negociación", level: 91, maxLevel: 100, icon: "skill-charisma" },
  { name: "LegalTech", level: 97, maxLevel: 100, icon: "skill-legal" },
]

const CHARACTER_STATS = {
  hp: { current: 999, max: 999, label: "HP", color: "bg-red-500" },
  mp: { current: 850, max: 999, label: "MP", color: "bg-blue-500" },
  exp: { current: 87500, max: 100000, label: "EXP", color: "bg-yellow-500" },
}

const BASE_STATS = [
  { name: "FUE", value: 78, description: "Fuerza de argumentación" },
  { name: "INT", value: 96, description: "Inteligencia analítica" },
  { name: "SAB", value: 94, description: "Sabiduría jurídica" },
  { name: "DES", value: 85, description: "Destreza técnica" },
  { name: "CAR", value: 92, description: "Carisma" },
  { name: "SUE", value: 89, description: "Suerte procesal" },
]

// ===========================================
// WIN95 COMPONENTS (Campo de batalla)
// ===========================================

function Win95Window({ 
  title, 
  children, 
  className = "",
  onClose
}: { 
  title: string
  children: React.ReactNode
  className?: string
  onClose?: () => void
}) {
  return (
    <div className={`bg-[#c0c0c0] win95-raised ${className}`}>
      <div className="bg-[#000080] px-2 py-1 flex items-center justify-between select-none cursor-move">
        <span className="text-white font-[family-name:var(--font-pixel)] text-lg tracking-wide truncate">
          {title}
        </span>
        <div className="flex gap-1 shrink-0">
          <button className="win95-btn w-5 h-5 flex items-center justify-center p-0">
            <Minus className="w-3 h-3 text-black" />
          </button>
          <button className="win95-btn w-5 h-5 flex items-center justify-center p-0">
            <Square className="w-2.5 h-2.5 text-black" />
          </button>
          <button 
            className="win95-btn w-5 h-5 flex items-center justify-center p-0"
            onClick={onClose}
          >
            <X className="w-3 h-3 text-black" />
          </button>
        </div>
      </div>
      <div className="p-2">
        {children}
      </div>
    </div>
  )
}

// ===========================================
// RPG COMPONENTS
// ===========================================

// Barra de stat con animacion
function RPGStatBar({ 
  label, 
  current, 
  max, 
  color,
  showNumbers = true,
  size = "normal"
}: { 
  label: string
  current: number
  max: number
  color: string
  showNumbers?: boolean
  size?: "small" | "normal"
}) {
  const percentage = (current / max) * 100
  const height = size === "small" ? "h-3" : "h-4"
  
  return (
    <div className="flex items-center gap-3">
      <span className="text-[#f5a623] font-[family-name:var(--font-pixel)] text-lg md:text-xl w-12 drop-shadow-sm">{label}</span>
      <div className={`flex-1 rpg-stat-bar ${height} shadow-inner`}>
        <div 
          className={`rpg-stat-bar-fill ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showNumbers && (
        <span className="text-[#88ff88] font-[family-name:var(--font-pixel)] text-base md:text-lg w-24 text-right drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">
          {current}/{max}
        </span>
      )}
    </div>
  )
}

// Skill con barra de nivel estilo RPG
function SkillBar({ 
  name, 
  level, 
  maxLevel, 
  colorClass,
  isSelected
}: { 
  name: string
  level: number
  maxLevel: number
  colorClass: string
  isSelected?: boolean
}) {
  return (
    <div className={`rpg-menu-item px-3 py-3 ${isSelected ? 'selected' : ''}`}>
      <div className="flex items-center gap-2 mb-2">
        {isSelected && (
          <ChevronRight className="w-4 h-4 text-[#f5a623] rpg-arrow drop-shadow-md" />
        )}
        <span className={`text-white font-[family-name:var(--font-pixel)] text-base md:text-lg tracking-wide ${isSelected ? 'text-[#f5a623]' : ''}`}>
          {name}
        </span>
        <span className="text-[#a8ffa8] font-[family-name:var(--font-pixel)] text-sm md:text-base ml-auto">
          Lv.{level}
        </span>
      </div>
      <div className="rpg-stat-bar h-3 ml-6 shadow-sm">
        <div 
          className={`rpg-stat-bar-fill ${colorClass}`}
          style={{ width: `${(level / maxLevel) * 100}%` }}
        />
      </div>
    </div>
  )
}

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
            <Zap className="w-5 h-5 text-[#00d9ff]" />
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
                    <ChevronRight className="w-4 h-4 text-[#00d9ff] rpg-arrow" />
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
            <BookOpen className="w-5 h-5 text-[#f5a623]" />
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
                    <ChevronRight className="w-4 h-4 text-[#f5a623] rpg-arrow" />
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

// Tarjeta de Presentación Principal (Nueva Iteración 4)
function CharacterStatsPanel() {
  return (
    <div className="rpg-panel p-6 md:p-8 flex flex-col items-center text-center">
      {/* Avatar Central */}
      <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 md:border-[6px] border-[#60b080] mb-6 shadow-[0_0_25px_rgba(96,176,128,0.6)] bg-[#6CBA89] relative transition-transform hover:scale-105 duration-300">
        <img 
          src="/profile.png" 
          alt="Jose Guillermo Vasquez" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Nombres y Titulos */}
      <h1 className="text-white font-[family-name:var(--font-pixel)] text-3xl md:text-6xl mb-4 tracking-wide shadow-black drop-shadow-md">
        Jose Guillermo Vasquez Guzman
      </h1>
      
      <h2 className="text-white font-[family-name:var(--font-pixel)] text-2xl md:text-3xl mb-5 leading-tight max-w-3xl mx-auto">
        Diseño soluciones legales con <span className="bg-[#f5f5dc] text-black px-3 py-1 rounded inline-block mt-2 md:mt-0 font-bold shadow-lg">Inteligencia Artificial</span>
      </h2>
      
      <p className="text-[#dfdfdf] font-[family-name:var(--font-pixel)] text-base md:text-xl mb-8 max-w-2xl drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">
        Ingeniero Legal • Abogado de la Universidad de los Andes | Consultor en PI, datos, cumplimiento y Legal-Tech
      </p>
      
      {/* Action Buttons / Main CTAs (Tarjetas Grandes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl mx-auto mb-10">
        <a href="/servicios" className="group win95-btn bg-[#f5d060] hover:bg-[#e0b040] text-black p-4 flex flex-col items-center justify-center gap-3 rounded-xl border-b-4 border-r-4 border-[#b09040] transition-transform hover:-translate-y-1">
          <span className="text-4xl md:text-5xl group-hover:scale-110 transition-transform">📘</span>
          <span className="font-[family-name:var(--font-pixel)] text-xl md:text-2xl font-bold">Consulta mis servicios</span>
          <span className="font-[family-name:var(--font-pixel)] text-sm md:text-base font-semibold opacity-90 text-center">Explora el catálogo de soluciones legales y tecnológicas</span>
        </a>
        
        <a href="https://api.whatsapp.com/message/F5WCMM3W67FLH1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="group win95-btn bg-white hover:bg-[#f0f0f0] p-4 flex flex-col items-center justify-center gap-3 rounded-xl border-b-4 border-r-4 border-gray-400 transition-transform hover:-translate-y-1 text-black">
          <svg className="w-12 h-12 md:w-16 md:h-16 group-hover:scale-110 transition-transform drop-shadow-sm" viewBox="0 0 24 24" fill="#25D366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          <span className="font-[family-name:var(--font-pixel)] text-xl md:text-2xl font-bold group-hover:text-[#25D366] transition-colors">Hablemos por WhatsApp</span>
        </a>
      </div>
      
    </div>
  )
}

// Sub-componente extraído de Misión y Visión convertido a Cuadro de Diálogo RPG compacto
export function MissionVisionPanel() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="rpg-dialog p-4 md:p-6 font-[family-name:var(--font-pixel)] shadow-2xl transition-all hover:shadow-[0_0_15px_rgba(255,203,5,0.3)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Misión */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-3 mb-3 border-b border-[#f5a623]/30 pb-2">
              <Sword className="w-5 h-5 text-[#f5a623]" />
              <h3 className="text-lg md:text-xl font-bold text-[#f5a623] tracking-wide">Misión</h3>
            </div>
            <p className="text-sm md:text-[0.95rem] leading-relaxed text-[#dfdfdf]">
              Combino derecho, tecnología e innovación para diseñar <span className="text-[#f5a623] font-bold">soluciones legales creativas</span> impulsadas por inteligencia artificial y legal design.
            </p>
          </div>

          {/* Visión */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-3 mb-3 border-b border-[#00d9ff]/30 pb-2">
              <Zap className="w-5 h-5 text-[#00d9ff]" />
              <h3 className="text-lg md:text-xl font-bold text-[#00d9ff] tracking-wide">Visión</h3>
            </div>
            <p className="text-sm md:text-[0.95rem] leading-relaxed text-[#dfdfdf]">
              Me apasiona aplicar nuevas tecnologías al derecho, <span className="text-[#00d9ff] font-bold">optimizando servicios legales</span> y conectando a las personas con la justicia de forma eficiente.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

// RPG Chat Bubble - Botón flotante interactivo
function FloatingChatBubble({ onSendMessage }: { onSendMessage: (message: string) => void }) {
  const initialMessage = "¡Ji, ji, ji! Saludos, viajero. Soy ChunGPT, el duende inmortal y familiar tecno-arcano de este reino. Mi maestro, José Guillermo, está en las profundidades de las mazmorras corporativas, luchando contra temibles Project Bosses y forjando Smart Contracts en la fragua digital. ¿Deseas que lo invoque para una nueva misión, o prefieres que husmee en su inventario para contarte sobre él?"
  
  const [isOpen, setIsOpen] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const [currentMessage, setCurrentMessage] = useState(initialMessage)
  const [messageIndex, setMessageIndex] = useState(0)
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([])
  const [hasGreeted, setHasGreeted] = useState(false)

  const typeText = useCallback((text: string) => {
    setDisplayedText("")
    setIsTyping(true)
    setMessageIndex(0)
    setCurrentMessage(text)
  }, [])

  // Auto-greet on load (show bubble after 5s)
  useEffect(() => {
    if (!hasGreeted) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        setHasGreeted(true)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [hasGreeted])

  useEffect(() => {
    if (!isTyping || !isOpen) return

    if (messageIndex < currentMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + currentMessage[messageIndex])
        setMessageIndex(prev => prev + 1)
      }, 25)

      return () => clearTimeout(timeout)
    } else {
      setTimeout(() => setIsTyping(false), 0)
    }
  }, [messageIndex, currentMessage, isTyping, isOpen])

  useEffect(() => {
    if (messages.length === 0 && isOpen && displayedText === "") {
      setTimeout(() => typeText(initialMessage), 0)
    }
  }, [typeText, messages.length, isOpen, displayedText])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    
    setMessages(prev => [...prev, { text: inputValue, isUser: true }])
    onSendMessage(inputValue)
    setInputValue("")
    
    setTimeout(() => {
      const response = "* Procesando en los servidores arcanos... *"
      setMessages(prev => [...prev, { text: response, isUser: false }])
      typeText(response)
    }, 500)
  }

  return (
    <div className="fixed bottom-16 md:bottom-[4.5rem] lg:bottom-20 right-4 md:right-6 z-[60] flex flex-col items-end">
      {/* Botón flotante (Avatar Icono) */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative bg-[#1a1a2e] border-2 border-[#f5a623] w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex flex-col items-center justify-center shadow-[0_0_15px_rgba(245,166,35,0.4)] hover:scale-110 transition-transform cursor-pointer animate-in zoom-in"
        >
          <span className="text-xl md:text-2xl lg:text-3xl drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">🤖</span>
          <span className="w-3 h-3 bg-[#88ff88] rounded-full absolute bottom-0 right-0 border-2 border-[#1a1a2e] animate-pulse"></span>
          
          {/* Tooltip pequeño para invitar al click */}
          {hasGreeted && (
             <div className="absolute -top-10 right-0 bg-[#f5f5dc] text-black font-[family-name:var(--font-pixel)] text-xs md:text-sm font-bold px-3 py-1.5 border-2 border-black whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
               Hablar con ChunGPT
             </div>
          )}
        </button>
      )}

      {/* Ventana de chat desplegada */}
      {isOpen && (
        <div className="rpg-panel overflow-hidden w-[95vw] sm:w-[450px] shadow-[0_10px_30px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom-8 duration-300 mb-2">
          {/* Header */}
          <div className="flex items-center justify-between px-3 md:px-4 py-3 bg-[#2a2a4a] border-b-2 border-[#4a4a6a]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#006060] to-[#003030] rounded-full flex items-center justify-center border-2 border-[#f5a623]">
                <span className="font-[family-name:var(--font-pixel)] text-xs md:text-sm font-bold text-[#f5a623]">CGPT</span>
              </div>
              <span className="text-[#f5a623] font-[family-name:var(--font-pixel)] text-base md:text-lg font-bold tracking-widest text-shadow">
                CHUNGPT.exe
              </span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[#c0c0c0] hover:text-white hover:bg-[#ff0000] px-3 py-1 rounded transition-colors font-[family-name:var(--font-pixel)] text-lg"
            >
              X
            </button>
          </div>
          
          {/* Messages Area */}
          <div className="h-[50vh] max-h-[400px] overflow-y-auto p-4 space-y-4 bg-[#0a0a14]">
            {/* Initial AI Message */}
            <div className="flex gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#1a1a2e] rounded-full flex items-center justify-center shrink-0 border-2 border-[#4a4a6a]">
                <Sword className="w-4 h-4 md:w-5 md:h-5 text-[#f5a623]" />
              </div>
              <div className="bg-[#1a1a2e] border-2 border-[#4a4a6a] px-4 py-3 max-w-[85%] rounded-md shadow-md">
                <p className="text-[#e0e0e0] font-[family-name:var(--font-pixel)] text-base md:text-lg leading-relaxed">
                  {messages.length === 0 ? (
                    <>
                      {displayedText}
                      {isTyping && <span className="typewriter-cursor" />}
                    </>
                  ) : (
                    initialMessage
                  )}
                </p>
              </div>
            </div>

            {/* Conversation Messages */}
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-3 ${msg.isUser ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${
                  msg.isUser 
                    ? 'bg-[#006060] border-[#00d9ff]' 
                    : 'bg-[#1a1a2e] border-[#4a4a6a]'
                }`}>
                  {msg.isUser ? (
                    <span className="font-[family-name:var(--font-pixel)] text-xs md:text-sm font-bold text-[#00d9ff]">TU</span>
                  ) : (
                    <Sword className="w-4 h-4 md:w-5 md:h-5 text-[#f5a623]" />
                  )}
                </div>
                <div className={`px-4 py-3 max-w-[85%] rounded-md shadow-md ${
                  msg.isUser 
                    ? 'bg-[#003030] border-2 border-[#00d9ff]' 
                    : 'bg-[#1a1a2e] border-2 border-[#4a4a6a]'
                }`}>
                  <p className={`font-[family-name:var(--font-pixel)] text-base md:text-lg leading-relaxed break-words ${
                    msg.isUser ? 'text-[#00d9ff] font-bold' : 'text-[#e0e0e0]'
                  }`}>
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 bg-[#1a1a2e] border-t-4 border-[#4a4a6a]">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <ChevronRight className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f5a623] rpg-arrow" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="w-full bg-[#0f0f1f] border-2 border-[#4a4a6a] text-white pl-9 pr-4 py-3 md:py-4 font-[family-name:var(--font-pixel)] text-sm md:text-lg placeholder:text-[#4a4a6a] focus:outline-none focus:border-[#f5a623]"
                />
              </div>
              <button 
                type="submit"
                className="bg-[#f5a623] hover:bg-[#d4830a] text-black px-4 py-3 md:py-4 font-[family-name:var(--font-pixel)] border-2 border-[#fff] flex items-center justify-center gap-1 transition-colors shrink-0"
              >
                <Sword className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

// Exported Social Links to use in Taskbar
const SOCIAL_LINKS = [
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/joseguillermovasquez", color: "#0077b5" },
  { name: "GitHub", icon: Github, href: "https://github.com/joselito412", color: "#ffffff" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/avocado.center", color: "#e4405f" },
  { name: "WhatsApp", icon: MessageCircle, href: "https://wa.me/message/M72SDBBNYNDDJ1", color: "#25D366" }
]

// Removed old RPGFooter

// Panel de Proyectos Destacados
function FeaturedProjectsPanel() {
  const projects = [
    {
      name: "AVOCADO.AI",
      role: "Founder & CEO, Lead Developer",
      desc: "Plataforma Legal-Tech que democratiza el acceso a servicios legales combinando agentes IA autónomos y abogados expertos via WhatsApp.",
      tech: ["Python", "React", "Vector DBs", "LLM APIs"],
      link: "https://avocado.center/",
      logo: "/projects/avocado-logo.png" // Sube aquí tu imagen
    },
    {
      name: "Aldana Hernandez Legal",
      role: "Legal & Tech Consultant",
      desc: "Implementación tecnológica y automatización de procesos para el prestigioso despacho legal corporativo.",
      tech: ["AI Agents", "Legal Engineering", "Automation"],
      link: "https://aldanahernandezlegal.com/",
      logo: "/projects/aldana-logo.png"  // Sube aquí tu imagen
    }
  ]
  return (
    <div className="space-y-4">
      {projects.map((proj, idx) => (
        <div key={idx} className="bg-[#1a1a2e] border-2 border-[#4a4a6a] p-4 group hover:border-[#f5a623] transition-colors">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            
            {/* Contenedor Izquierdo: Logo + Titulos */}
            <div className="flex items-center gap-4">
              {/* Espacio reservado para el Logo */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-[#0a0a14] border-2 border-[#4a4a6a] flex items-center justify-center p-1 rounded-sm overflow-hidden group-hover:border-[#f5a623] transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={proj.logo} 
                  alt={`Logo de ${proj.name}`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback visual si la imagen no existe aún
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `<span class="font-[family-name:var(--font-pixel)] text-[10px] text-[#4a4a6a] text-center leading-tight">Mising<br/>img</span>`;
                  }}
                />
              </div>

              <div>
                 <h3 className="font-[family-name:var(--font-pixel)] text-lg sm:text-xl lg:text-2xl text-[#f5a623] group-hover:text-white transition-colors drop-shadow-md leading-tight max-w-[180px] sm:max-w-none">
                   {proj.name}
                 </h3>
                 <p className="font-[family-name:var(--font-pixel)] text-xs sm:text-sm text-[#88ff88] mt-1 shadow-black drop-shadow-sm">
                   {proj.role}
                 </p>
              </div>
            </div>

            <a 
              href={proj.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="win95-btn px-3 py-1 bg-[#c0c0c0] text-black font-[family-name:var(--font-pixel)] text-xs flex items-center justify-center gap-1 w-fit md:shrink-0 mt-2 md:mt-0"
            >
              VISITAR <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="font-[family-name:var(--font-pixel)] text-sm text-[#c0c0c0] leading-relaxed mb-3">
            {proj.desc}
          </p>
          <div className="flex flex-wrap gap-2">
            {proj.tech.map((t, i) => (
              <span key={i} className="px-2 py-0.5 border border-[#4a4a6a] bg-[#0a0a14] font-[family-name:var(--font-pixel)] text-[10px] text-[#00d9ff]">
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
      icon: Star
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
          <Shield className="w-4 h-4" style={{ color: typeColor }} />
        ) : (
          <Zap className="w-4 h-4" style={{ color: typeColor }} />
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
          const levelStars = Array.from({ length: ability.maxLevel }, (_, i) => i < ability.level)
          
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
                  
                  {/* Level Stars */}
                  <div className="flex items-center gap-0.5 mb-1">
                    {levelStars.map((filled, i) => (
                      <Star 
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
                      <p className="text-[#c0c0c0] font-[family-name:var(--font-pixel)] text-xs leading-relaxed">
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

// Taskbar (Win95 Footer Modificado)
function Taskbar({ onMenuClick, isAuthenticated, userRole }: { onMenuClick?: (section: string) => void, isAuthenticated?: boolean, userRole?: string | null }) {
  const [time, setTime] = useState("")
  const [isStartOpen, setIsStartOpen] = useState(false)

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
                  onClick={() => { setIsStartOpen(false); onMenuClick?.('projects'); }}
                  className="flex items-center gap-3 w-full px-4 py-2 hover:bg-[#000080] hover:text-white transition-colors"
                >
                  <FileCode className="w-5 h-5" />
                  <span className="font-[family-name:var(--font-pixel)] text-base">Proyectos Destacados</span>
                </button>
                <a 
                  onClick={() => setIsStartOpen(false)}
                  href="/servicios"
                  className="flex items-center gap-3 w-full px-4 py-2 hover:bg-[#000080] hover:text-white transition-colors text-left"
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="font-[family-name:var(--font-pixel)] text-base">Catálogo de Servicios</span>
                </a>
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
            
            {/* Categoría: Red */}
            <button 
              onClick={() => { setIsStartOpen(false); onMenuClick?.('network'); }}
              className="flex items-center gap-3 w-full px-2 py-2.5 hover:bg-[#000080] hover:text-white transition-colors text-left"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <span className="font-[family-name:var(--font-pixel)] text-lg">Conexiones a Red...</span>
            </button>

            <div className="h-0.5 w-full bg-gray-400 border-b border-white my-1 mt-auto"></div>

            {/* Sistema */}
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
          <div className="h-8 w-0.5 bg-gray-400 border-r border-white mx-2 md:mx-3"></div>
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

// Scanlines
function ScanlinesOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[100] scanlines opacity-30"
      aria-hidden="true"
    />
  )
}

// Desktop Icon Nav
function DesktopIcon({ icon, label, onClick }: { icon: string; label: string; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-start gap-2 p-2 hover:bg-[#000080]/30 group transition-colors"
    >
      <span className="text-4xl md:text-5xl drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)] transition-transform group-hover:scale-110">
        {icon}
      </span>
      <span className="font-[family-name:var(--font-pixel)] text-base md:text-lg text-white drop-shadow-[1px_1px_0_#000] group-hover:bg-[#000080] px-2 py-0.5 text-center leading-tight">
        {label}
      </span>
    </button>
  )
}

// ===========================================
// MAIN PAGE
// ===========================================

export default function AvocadoCenter() {
  const [activeWindow, setActiveWindow] = useState<'proyectos' | 'skills' | 'network' | 'ia' | null>('proyectos')
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

  const handleSendMessage = (message: string) => {
    console.log("Message sent:", message)
  }

  const handleIconClick = (windowName: 'proyectos' | 'skills' | 'network' | 'ia') => {
    setActiveWindow(windowName === activeWindow ? null : windowName)
  }

  return (
    <main className="min-h-screen pb-24 relative overflow-clip">
      
      {/* Capa 1: Imagen de la Colina Windows Bliss (Fondo retro) */}
      <div className="absolute inset-0 bg-[url('/bg-bliss.png')] bg-cover bg-fixed bg-center bg-no-repeat pointer-events-none z-0"></div>
      
      {/* Capa 2: Filtro de Sombra para preservar contraste del texto (Oscuridad Suave) */}
      <div className="absolute inset-0 bg-[#0a0a14]/30 pointer-events-none z-0"></div>
      
      {/* Capa 3: Grilla de Batalla clásica (Transparente para mirar al cielo) */}
      <div className="absolute inset-0 battle-grid !bg-transparent opacity-60 pointer-events-none z-0"></div>
      
      <ScanlinesOverlay />

      {/* Main Content - Mobile First Container */}
      <div className="w-full max-w-xl mx-auto px-4 py-8 relative z-10">
        
        {/* Header - Battle Title */}
        <div className="text-center mb-8">
          <h1 className="font-[family-name:var(--font-pixel)] text-2xl md:text-4xl text-[#f5a623] rpg-glow tracking-wider">
            ~ Un héroe legal-tech aparece ~
          </h1>
        </div>

        {/* Character Profile (FIRST) */}
        <div className="mb-10 w-full animate-in slide-in-from-bottom-4 duration-500">
          <CharacterStatsPanel />
        </div>
      </div> {/* <-- FIN DEL CONTENEDOR ESTRECHO (Header & Perfil) */}

      {/* CONTENEDOR DE BLOQUES AMPLIOS (Misión, Navegación y Ventanas) */}
      <div className="w-full max-w-[1200px] mx-auto px-2 sm:px-4 pb-16 relative z-10">
        
        {/* Misión y Visión (Aprovecha todo el ancho del nuevo contenedor 1200px) */}
        <div className="mb-10 w-full animate-in slide-in-from-bottom-6">
          <MissionVisionPanel />
        </div>

        {/* Desktop Navigation Menu (Win95 Icons) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-10 w-full animate-in slide-in-from-bottom-8 duration-700 max-w-sm mx-auto">
           <DesktopIcon icon="🗂️" label="Proyectos" onClick={() => handleIconClick('proyectos')} />
           <DesktopIcon icon="💻" label="Skills" onClick={() => handleIconClick('skills')} />
           <DesktopIcon icon="🌐" label="Network" onClick={() => handleIconClick('network')} />
        </div>

        {/* Active Window Render Area */}
        {activeWindow === 'proyectos' && (
          <div className="mb-10 max-w-3xl mx-auto animate-in slide-in-from-bottom-4">
            <Win95Window title="Proyectos_Destacados.exe" onClose={() => setActiveWindow(null)}>
              <div className="p-2 sm:p-4 bg-[#0a0a14]">
                 <FeaturedProjectsPanel />
              </div>
            </Win95Window>
          </div>
        )}

        {/* ===== NUEVO LAYOUT RPG: SPLIT SCREEN STICKY (Personaje Te Acompaña / Stats Limpios Der) ===== */}
        {activeWindow === 'skills' && (
          <div className="mb-10 w-[95vw] lg:w-[1100px] max-w-full mx-auto animate-in slide-in-from-bottom-4 relative bg-transparent border-2 border-[#4a4a6a]">
            
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
                
                <h2 className="font-[family-name:var(--font-pixel)] text-2xl text-[#88ff88] mb-8 border-b-2 border-[#4a4a6a] pb-2">
                  PERFIL DE CLASE
                </h2>

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

        {activeWindow === 'network' && (
          <div className="mb-10 max-w-xl mx-auto animate-in slide-in-from-bottom-4">
            <Win95Window title="Network_Contacto.exe" onClose={() => setActiveWindow(null)}>
              <div className="p-4 bg-[#1a1a2e] border-2 border-[#4a4a6a] text-center space-y-4">
                 <h3 className="font-[family-name:var(--font-pixel)] text-xl text-[#88ff88] mb-2">🤝 Invitación al Guild Formada</h3>
                 <p className="font-[family-name:var(--font-pixel)] text-base text-[#ffffff] leading-relaxed drop-shadow-sm">
                   ¿Buscas colaborar en proyectos Legal-Tech, discutir sobre IA aplicada al derecho, o necesitas consultoría en compliance?
                 </p>
                 <div className="flex flex-col gap-2 max-w-sm mx-auto mt-4">
                    <a href="mailto:jguillervg@avocado.center" className="win95-btn px-4 py-3 font-[family-name:var(--font-pixel)] text-sm md:text-base text-black flex items-center justify-center gap-2">
                      <Mail className="w-5 h-5" /> Enviar Correo (Email)
                    </a>
                    <a href="https://linkedin.com/in/joseguillermovasquez" target="_blank" rel="noopener noreferrer" className="win95-btn px-4 py-3 font-[family-name:var(--font-pixel)] text-sm md:text-base text-black flex items-center justify-center gap-2">
                       <Linkedin className="w-5 h-5" /> Conectar en LinkedIn
                    </a>
                 </div>
              </div>
            </Win95Window>
          </div>
        )}

        {/* Fin del render Area */}
      </div>

      <FloatingChatBubble onSendMessage={handleSendMessage} />
      <Taskbar isAuthenticated={isAuthenticated} userRole={userRole} />
    </main>
  )
}


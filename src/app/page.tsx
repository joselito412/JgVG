"use client"

import { useState, useEffect, useCallback } from "react"
import { MessageSquare, Phone, Linkedin, Mail, Github, X, Minus, Square, ChevronRight, Sword, Shield, Zap, BookOpen, Heart, Star, Instagram, BookMarked, ExternalLink } from "lucide-react"

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
  const height = size === "small" ? "h-2" : "h-3"
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-[#f5a623] font-[family-name:var(--font-pixel)] text-sm w-8">{label}</span>
      <div className={`flex-1 rpg-stat-bar ${height}`}>
        <div 
          className={`rpg-stat-bar-fill ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showNumbers && (
        <span className="text-[#88ff88] font-[family-name:var(--font-pixel)] text-xs w-20 text-right">
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
    <div className={`rpg-menu-item px-3 py-2 ${isSelected ? 'selected' : ''}`}>
      <div className="flex items-center gap-2 mb-1">
        {isSelected && (
          <ChevronRight className="w-3 h-3 text-[#f5a623] rpg-arrow" />
        )}
        <span className={`text-white font-[family-name:var(--font-pixel)] text-sm ${isSelected ? 'text-[#f5a623]' : ''}`}>
          {name}
        </span>
        <span className="text-[#88ff88] font-[family-name:var(--font-pixel)] text-xs ml-auto">
          Lv.{level}
        </span>
      </div>
      <div className="rpg-stat-bar h-2 ml-5">
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
      {/* Header */}
      <div className="flex items-center justify-center gap-3 px-4 py-2 bg-[#2a2a4a] border-b-2 border-[#4a4a6a]">
        <Sword className="w-4 h-4 text-[#f5a623]" />
        <span className="text-[#f5a623] font-[family-name:var(--font-pixel)] text-lg">
          SKILL TREE
        </span>
        <Shield className="w-4 h-4 text-[#f5a623]" />
      </div>
      
      {/* Two Column Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Tech Skills Column */}
        <div className="border-r border-[#4a4a6a]">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#1a1a2e] border-b border-[#4a4a6a]">
            <Zap className="w-4 h-4 text-[#00d9ff]" />
            <span className="text-[#00d9ff] font-[family-name:var(--font-pixel)] text-sm">
              TECH SKILLS
            </span>
          </div>
          <div className="max-h-[280px] overflow-y-auto">
            {DEVELOPER_SKILLS.map((skill, index) => (
              <div
                key={skill.name}
                className={`rpg-menu-item px-3 py-2 ${selectedDevIndex === index ? 'selected' : ''}`}
                onMouseEnter={() => setSelectedDevIndex(index)}
              >
                <div className="flex items-center gap-2 mb-1">
                  {selectedDevIndex === index && (
                    <ChevronRight className="w-3 h-3 text-[#00d9ff] rpg-arrow" />
                  )}
                  <span className={`font-[family-name:var(--font-pixel)] text-xs ${selectedDevIndex === index ? 'text-[#00d9ff]' : 'text-white'}`}>
                    {skill.name}
                  </span>
                  <span className="text-[#88ff88] font-[family-name:var(--font-pixel)] text-xs ml-auto">
                    Lv.{skill.level}
                  </span>
                </div>
                <div className="rpg-stat-bar h-2 ml-0">
                  <div 
                    className="rpg-stat-bar-fill skill-tech"
                    style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Legal Skills Column */}
        <div>
          <div className="flex items-center gap-2 px-3 py-2 bg-[#1a1a2e] border-b border-[#4a4a6a]">
            <BookOpen className="w-4 h-4 text-[#f5a623]" />
            <span className="text-[#f5a623] font-[family-name:var(--font-pixel)] text-sm">
              LEGAL SKILLS
            </span>
          </div>
          <div className="max-h-[280px] overflow-y-auto">
            {LAWYER_SKILLS.map((skill, index) => (
              <div
                key={skill.name}
                className={`rpg-menu-item px-3 py-2 ${selectedLegalIndex === index ? 'selected' : ''}`}
                onMouseEnter={() => setSelectedLegalIndex(index)}
              >
                <div className="flex items-center gap-2 mb-1">
                  {selectedLegalIndex === index && (
                    <ChevronRight className="w-3 h-3 text-[#f5a623] rpg-arrow" />
                  )}
                  <span className={`font-[family-name:var(--font-pixel)] text-xs ${selectedLegalIndex === index ? 'text-[#f5a623]' : 'text-white'}`}>
                    {skill.name}
                  </span>
                  <span className="text-[#88ff88] font-[family-name:var(--font-pixel)] text-xs ml-auto">
                    Lv.{skill.level}
                  </span>
                </div>
                <div className="rpg-stat-bar h-2 ml-0">
                  <div 
                    className={`rpg-stat-bar-fill ${skill.icon}`}
                    style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="border-t-2 border-[#4a4a6a] px-3 py-2 bg-[#0f0f1f]">
        <p className="text-[#808080] font-[family-name:var(--font-pixel)] text-xs text-center">
          [HOVER] Ver nivel de habilidad
        </p>
      </div>
    </div>
  )
}

// Panel de Stats base del personaje
function CharacterStatsPanel() {
  return (
    <div className="rpg-panel p-4">
      {/* Character Header */}
      <div className="flex items-center gap-4 mb-4 pb-3 border-b border-[#4a4a6a]">
        {/* Avatar Frame */}
        <div className="relative">
          <div className="w-20 h-20 bg-[#1a1a2e] border-2 border-[#4a4a6a] flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-[#006060] to-[#003030] flex items-center justify-center">
              <span className="font-[family-name:var(--font-pixel)] text-3xl text-[#f5a623]">JV</span>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 level-badge px-2 py-0.5">
            <span className="font-[family-name:var(--font-pixel)] text-xs text-black font-bold">Lv.99</span>
          </div>
        </div>
        
        {/* Character Info */}
        <div className="flex-1">
          <h2 className="text-[#f5a623] font-[family-name:var(--font-pixel)] text-2xl mb-1">
            JOSE G. VASQUEZ
          </h2>
          <p className="text-[#88ff88] font-[family-name:var(--font-pixel)] text-sm">
            Clase: Abogado-Desarrollador IA
          </p>
          <p className="text-[#808080] font-[family-name:var(--font-pixel)] text-xs mt-1">
            Guild: AVOCADO.AI | Colombia
          </p>
        </div>
      </div>
      
      {/* HP/MP/EXP Bars */}
      <div className="space-y-2 mb-4">
        <RPGStatBar 
          label="HP" 
          current={CHARACTER_STATS.hp.current} 
          max={CHARACTER_STATS.hp.max}
          color="skill-strength"
        />
        <RPGStatBar 
          label="MP" 
          current={CHARACTER_STATS.mp.current} 
          max={CHARACTER_STATS.mp.max}
          color="skill-tech"
        />
        <RPGStatBar 
          label="EXP" 
          current={CHARACTER_STATS.exp.current} 
          max={CHARACTER_STATS.exp.max}
          color="skill-legal"
        />
      </div>
      
      {/* Base Stats Grid */}
      <div className="grid grid-cols-3 gap-2">
        {BASE_STATS.map((stat) => (
          <div 
            key={stat.name} 
            className="bg-[#0f0f1f] border border-[#4a4a6a] p-2 text-center group relative"
          >
            <div className="text-[#f5a623] font-[family-name:var(--font-pixel)] text-xs mb-1">
              {stat.name}
            </div>
            <div className="text-white font-[family-name:var(--font-pixel)] text-xl">
              {stat.value}
            </div>
            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-[#f5a623] text-[#f5a623] text-xs font-[family-name:var(--font-pixel)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              {stat.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// RPG Chat Bubble - Floating Sticky
function RPGChatBubble({ onSendMessage }: { onSendMessage: (message: string) => void }) {
  const initialMessage = "Saludos, viajero. Soy el Agente IA de Jose. En que puedo ayudarte?"
  
  const [isOpen, setIsOpen] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const [currentMessage, setCurrentMessage] = useState(initialMessage)
  const [messageIndex, setMessageIndex] = useState(0)
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([])

  const typeText = useCallback((text: string) => {
    setDisplayedText("")
    setIsTyping(true)
    setMessageIndex(0)
    setCurrentMessage(text)
  }, [])

  useEffect(() => {
    if (!isTyping) return

    if (messageIndex < currentMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + currentMessage[messageIndex])
        setMessageIndex(prev => prev + 1)
      }, 25)

      return () => clearTimeout(timeout)
    } else {
      setIsTyping(false)
    }
  }, [messageIndex, currentMessage, isTyping])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      typeText(initialMessage)
    }
  }, [isOpen, typeText, messages.length])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    
    setMessages(prev => [...prev, { text: inputValue, isUser: true }])
    onSendMessage(inputValue)
    setInputValue("")
    
    setTimeout(() => {
      const response = "* Invocando hechizo de conexion... * Procesando en los servidores arcanos de AVOCADO..."
      setMessages(prev => [...prev, { text: response, isUser: false }])
      typeText(response)
    }, 500)
  }

  return (
    <>
      {/* Floating Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-16 right-4 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'bg-[#4a4a6a] rotate-0' 
            : 'bg-gradient-to-br from-[#f5a623] to-[#d4830a] hover:scale-110 animate-pulse'
        }`}
        style={{
          boxShadow: isOpen 
            ? '0 4px 20px rgba(74, 74, 106, 0.5)' 
            : '0 4px 20px rgba(245, 166, 35, 0.5), 0 0 40px rgba(245, 166, 35, 0.3)'
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageSquare className="w-6 h-6 text-black" />
        )}
      </button>

      {/* Chat Bubble Panel */}
      {isOpen && (
        <div 
          className="fixed bottom-32 right-4 z-50 w-80 sm:w-96 animate-in slide-in-from-bottom-4 fade-in duration-300"
          style={{
            filter: 'drop-shadow(0 10px 40px rgba(0,0,0,0.5))'
          }}
        >
          {/* Bubble shape with RPG styling */}
          <div className="rpg-panel overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2 px-3 py-2 bg-[#2a2a4a] border-b-2 border-[#4a4a6a]">
              <div className="w-8 h-8 bg-gradient-to-br from-[#006060] to-[#003030] rounded-full flex items-center justify-center border-2 border-[#f5a623]">
                <span className="font-[family-name:var(--font-pixel)] text-xs text-[#f5a623]">IA</span>
              </div>
              <div className="flex-1">
                <span className="text-[#f5a623] font-[family-name:var(--font-pixel)] text-sm">
                  AGENTE_IA.exe
                </span>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#88ff88] rounded-full animate-pulse" />
                  <span className="text-[#88ff88] font-[family-name:var(--font-pixel)] text-xs">
                    Online
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[#808080] hover:text-white transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
            
            {/* Messages Area */}
            <div className="h-64 overflow-y-auto p-3 space-y-3 bg-[#0a0a14]">
              {/* Initial AI Message */}
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-[#1a1a2e] rounded-full flex items-center justify-center shrink-0 border border-[#4a4a6a]">
                  <Sword className="w-3 h-3 text-[#f5a623]" />
                </div>
                <div className="bg-[#1a1a2e] border border-[#4a4a6a] px-3 py-2 max-w-[85%]">
                  <p className="text-white font-[family-name:var(--font-pixel)] text-sm leading-relaxed">
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
                <div key={index} className={`flex gap-2 ${msg.isUser ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                    msg.isUser 
                      ? 'bg-[#006060] border-[#00d9ff]' 
                      : 'bg-[#1a1a2e] border-[#4a4a6a]'
                  }`}>
                    {msg.isUser ? (
                      <span className="font-[family-name:var(--font-pixel)] text-xs text-[#00d9ff]">TU</span>
                    ) : (
                      <Sword className="w-3 h-3 text-[#f5a623]" />
                    )}
                  </div>
                  <div className={`px-3 py-2 max-w-[85%] ${
                    msg.isUser 
                      ? 'bg-[#003030] border border-[#00d9ff]' 
                      : 'bg-[#1a1a2e] border border-[#4a4a6a]'
                  }`}>
                    <p className={`font-[family-name:var(--font-pixel)] text-sm leading-relaxed ${
                      msg.isUser ? 'text-[#00d9ff]' : 'text-white'
                    }`}>
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-2 bg-[#1a1a2e] border-t-2 border-[#4a4a6a]">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <ChevronRight className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#f5a623] rpg-arrow" />
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe aqui..."
                    className="w-full bg-[#0f0f1f] border-2 border-[#4a4a6a] text-white pl-7 pr-3 py-2 font-[family-name:var(--font-pixel)] text-xs placeholder:text-[#4a4a6a] focus:outline-none focus:border-[#f5a623]"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-[#f5a623] hover:bg-[#d4830a] text-black px-3 py-2 font-[family-name:var(--font-pixel)] text-xs border-2 border-[#fff] flex items-center gap-1 transition-colors shrink-0"
                >
                  <Sword className="w-3 h-3" />
                </button>
              </div>
            </form>
          </div>
          
          {/* Bubble tail/pointer */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-[#1a1a2e] border-r-2 border-b-2 border-[#4a4a6a] transform rotate-45" />
        </div>
      )}
    </>
  )
}

// Social Links Cards - Horizontal Layout
function SocialLinksCards() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  
  const items = [
    { 
      name: "LinkedIn", 
      description: "Red profesional",
      effect: "+50 Networking",
      icon: Linkedin,
      color: "#0077b5",
      href: "https://linkedin.com/in/joseguillermovasquez",
      rarity: "Epico"
    },
    { 
      name: "GitHub", 
      description: "15 repositorios",
      effect: "+40 Open Source",
      icon: Github,
      color: "#ffffff",
      href: "https://github.com/joselito412",
      rarity: "Legendario"
    },
    { 
      name: "Instagram", 
      description: "Contenido visual",
      effect: "+30 Social",
      icon: Instagram,
      color: "#e4405f",
      href: "https://instagram.com/avocado.center",
      rarity: "Raro"
    },
    { 
      name: "Blog", 
      description: "LegalTech articles",
      effect: "+60 Sabiduria",
      icon: BookMarked,
      color: "#f5a623",
      href: "https://avocado.center/",
      rarity: "Mitico"
    },
  ]

  const rarityBorders: Record<string, string> = {
    "Raro": "border-[#0070dd] hover:shadow-[0_0_20px_rgba(0,112,221,0.4)]",
    "Epico": "border-[#a335ee] hover:shadow-[0_0_20px_rgba(163,53,238,0.4)]",
    "Legendario": "border-[#ff8000] hover:shadow-[0_0_20px_rgba(255,128,0,0.4)]",
    "Mitico": "border-[#e6cc80] hover:shadow-[0_0_20px_rgba(230,204,128,0.4)]"
  }

  const rarityGlow: Record<string, string> = {
    "Raro": "text-[#0070dd]",
    "Epico": "text-[#a335ee]",
    "Legendario": "text-[#ff8000]",
    "Mitico": "text-[#e6cc80]"
  }
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, index) => {
        const IconComponent = item.icon
        const isHovered = hoveredItem === index
        
        return (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative bg-[#1a1a2e] border-2 p-4 transition-all duration-300 ${rarityBorders[item.rarity]} ${isHovered ? 'scale-105 -translate-y-1' : ''}`}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Rarity glow effect */}
            {isHovered && (
              <div className="absolute inset-0 opacity-20 animate-pulse" 
                style={{ background: `radial-gradient(circle at center, ${item.color} 0%, transparent 70%)` }} 
              />
            )}
            
            {/* Icon */}
            <div className="flex justify-center mb-3">
              <div 
                className={`w-14 h-14 flex items-center justify-center border-2 transition-all duration-300 ${
                  isHovered ? 'border-[#f5a623] bg-[#2a2a4a]' : 'border-[#4a4a6a] bg-[#0f0f1f]'
                }`}
              >
                <IconComponent 
                  className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" 
                  style={{ color: item.color }} 
                />
              </div>
            </div>
            
            {/* Name */}
            <h3 className={`font-[family-name:var(--font-pixel)] text-center text-lg mb-1 transition-colors ${
              isHovered ? 'text-white' : 'text-[#c0c0c0]'
            }`}>
              {item.name}
            </h3>
            
            {/* Rarity Badge */}
            <div className="text-center mb-2">
              <span className={`font-[family-name:var(--font-pixel)] text-xs ${rarityGlow[item.rarity]}`}>
                [{item.rarity}]
              </span>
            </div>
            
            {/* Stats on hover */}
            <div className={`text-center transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-[#88ff88] font-[family-name:var(--font-pixel)] text-xs">
                {item.effect}
              </p>
            </div>
            
            {/* External link indicator */}
            <ExternalLink className={`absolute top-2 right-2 w-3 h-3 transition-opacity ${
              isHovered ? 'opacity-100 text-[#f5a623]' : 'opacity-30 text-[#808080]'
            }`} />
          </a>
        )
      })}
    </div>
  )
}

// RPG Footer
function RPGFooter() {
  return (
    <footer className="mt-8 border-t-4 border-double border-[#4a4a6a] bg-gradient-to-b from-[#0a0a14] to-[#050508]">
      {/* Social Cards Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h2 className="font-[family-name:var(--font-pixel)] text-2xl text-[#f5a623] mb-2">
            INVENTARIO DE CONEXIONES
          </h2>
          <p className="font-[family-name:var(--font-pixel)] text-sm text-[#808080]">
            ~ Selecciona un item para conectar ~
          </p>
        </div>
        
        <SocialLinksCards />
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t-2 border-[#4a4a6a] bg-[#0f0f1f]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left - Logo/Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#006060] to-[#003030] flex items-center justify-center border-2 border-[#f5a623]">
                <span className="font-[family-name:var(--font-pixel)] text-sm text-[#f5a623]">JV</span>
              </div>
              <div>
                <p className="font-[family-name:var(--font-pixel)] text-sm text-[#f5a623]">
                  AVOCADO.AI
                </p>
                <p className="font-[family-name:var(--font-pixel)] text-xs text-[#808080]">
                  Legal-Tech Guild
                </p>
              </div>
            </div>
            
            {/* Center - Stats */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="font-[family-name:var(--font-pixel)] text-xs text-[#808080]">QUESTS</p>
                <p className="font-[family-name:var(--font-pixel)] text-lg text-[#88ff88]">150+</p>
              </div>
              <div className="text-center">
                <p className="font-[family-name:var(--font-pixel)] text-xs text-[#808080]">REPOS</p>
                <p className="font-[family-name:var(--font-pixel)] text-lg text-[#00d9ff]">15</p>
              </div>
              <div className="text-center">
                <p className="font-[family-name:var(--font-pixel)] text-xs text-[#808080]">LEVEL</p>
                <p className="font-[family-name:var(--font-pixel)] text-lg text-[#f5a623]">99</p>
              </div>
            </div>
            
            {/* Right - Copyright */}
            <div className="text-center md:text-right">
              <p className="font-[family-name:var(--font-pixel)] text-xs text-[#808080]">
                Colombia
              </p>
              <p className="font-[family-name:var(--font-pixel)] text-xs text-[#4a4a6a]">
                SAVE DATA: 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
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

// Win95 Taskbar
function Taskbar() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 bg-[#c0c0c0] win95-raised flex items-center justify-between px-2 z-50">
      <button className="win95-btn px-3 py-1 flex items-center gap-2 font-[family-name:var(--font-pixel)] text-sm font-bold">
        <Heart className="w-4 h-4 text-red-500" />
        Inicio
      </button>
      
      <div className="flex items-center gap-2">
        <span className="font-[family-name:var(--font-pixel)] text-xs text-black hidden sm:inline">
          AVOCADO_CENTER.exe
        </span>
        <div className="win95-sunken px-3 py-1">
          <span className="font-[family-name:var(--font-pixel)] text-xs text-black">{time}</span>
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

// Desktop Icon
function DesktopIcon({ icon, label, onClick }: { icon: string; label: string; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center gap-1 p-2 hover:bg-[#000080]/30 group w-20"
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-[family-name:var(--font-pixel)] text-xs text-white drop-shadow-[1px_1px_0_#000] group-hover:bg-[#000080] px-1 text-center leading-tight">
        {label}
      </span>
    </button>
  )
}

// ===========================================
// MAIN PAGE
// ===========================================

export default function AvocadoCenter() {
  const handleSendMessage = (message: string) => {
    // TODO: Connect to real AI backend
    console.log("Message sent:", message)
  }

  return (
    <main className="min-h-screen bg-[#008080] pb-14 relative battle-grid">
      <ScanlinesOverlay />
      
      {/* Desktop Icons - Left side */}
      <div className="fixed top-4 left-4 space-y-2 hidden lg:flex flex-col z-40">
        <DesktopIcon icon="📁" label="Proyectos" />
        <DesktopIcon icon="📄" label="CV.pdf" />
        <DesktopIcon icon="💾" label="Portfolio" />
        <DesktopIcon icon="🗑️" label="Papelera" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4 lg:pl-28">
        {/* Header - Battle Title */}
        <div className="text-center mb-4">
          <h1 className="font-[family-name:var(--font-pixel)] text-3xl md:text-5xl text-[#f5a623] rpg-glow tracking-wider">
            AVOCADO CENTER
          </h1>
          <p className="font-[family-name:var(--font-pixel)] text-sm md:text-lg text-[#88ff88] mt-1">
            ~ Un héroe legal-tech aparece ~
          </p>
        </div>

        {/* Battle Layout - RPG Style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Left Column - Character Profile (FIRST) */}
          <div className="lg:col-span-4 space-y-4 order-1">
            <CharacterStatsPanel />
          </div>

          {/* Center Column - Skills (Both visible) */}
          <div className="lg:col-span-8 space-y-4 order-2">
            <DualSkillsPanel />
          </div>
        </div>

        {/* Special Abilities Section - Full Width */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <Win95Window title="Habilidades_Legal.exe" className="h-fit">
            <SpecialAbilitiesPanel type="legal" />
          </Win95Window>
          <Win95Window title="Habilidades_Tech.exe" className="h-fit">
            <SpecialAbilitiesPanel type="tech" />
          </Win95Window>
        </div>

      </div>

      {/* RPG Footer with Social Cards */}
      <RPGFooter />

      {/* Floating Chat Bubble */}
      <RPGChatBubble onSendMessage={handleSendMessage} />

      <Taskbar />
    </main>
  )
}

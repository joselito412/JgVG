import Link from "next/link"
import { ArrowLeft, BookOpen, Shield, Zap, Code } from "lucide-react"

// Estilos globales de globals.css que ya están disponibles
export default function ServiciosPage() {
  const servicios = [
    {
      title: "Consultoría Legal-Tech",
      description: "Auditoría e implementación de soluciones tecnológicas para optimizar operaciones en despachos y departamentos legales.",
      icon: BookOpen,
      color: "#f5a623"
    },
    {
      title: "Desarrollo de Agentes IA",
      description: "Creación de asistentes autónomos usando LLMs (LangChain/LangGraph) para automatizar revisión de documentos y atención.",
      icon: Zap,
      color: "#00d9ff"
    },
    {
      title: "Fintech & Data Compliance",
      description: "Alineación regulatoria para startups Fintech, protección de datos personales y estructuración de modelos de negocio digitales.",
      icon: Shield,
      color: "#60b080"
    },
    {
      title: "Smart Contracts & Web3",
      description: "Diseño y auditoría de contratos inteligentes, tokenización y asesoría legal en estructuras jurídicas para proyectos Blockchain.",
      icon: Code,
      color: "#a335ee"
    }
  ]

  return (
    <main className="min-h-screen bg-[#008080] pb-24 relative battle-grid overflow-x-hidden pt-8">
      <div className="w-full max-w-4xl mx-auto px-4 relative z-10">
        
        {/* Header Options */}
        <div className="mb-6">
          <Link href="/" className="win95-btn bg-[#c0c0c0] text-black px-4 py-2 font-[family-name:var(--font-pixel)] text-sm font-bold flex items-center gap-2 w-fit">
            <ArrowLeft className="w-4 h-4" />
            Volver al Inicio
          </Link>
        </div>

        {/* Title Panel */}
        <div className="rpg-panel p-6 mb-8 text-center bg-[#0a0a14]">
          <h1 className="text-[#f5a623] font-[family-name:var(--font-pixel)] text-4xl md:text-5xl mb-3 tracking-wide drop-shadow-md">
            CATÁLOGO DE SERVICIOS
          </h1>
          <p className="text-[#c0c0c0] font-[family-name:var(--font-pixel)] text-base md:text-lg">
            ~ Selecciona el módulo de servicio que deseas invocar ~
          </p>
        </div>

        {/* Services Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {servicios.map((srv, idx) => {
            const Icon = srv.icon
            return (
              <div key={idx} className="win95-window bg-[#c0c0c0] win95-raised p-1 flex flex-col h-full hover:-translate-y-1 transition-transform">
                {/* Title Bar like Win95 */}
                <div className="bg-[#000080] px-2 py-1 flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-white" style={{color: srv.color}}/>
                  <span className="font-[family-name:var(--font-pixel)] text-white text-sm md:text-base truncate">
                    {srv.title}.exe
                  </span>
                </div>
                {/* Content */}
                <div className="bg-white p-4 border-2 border-gray-400 border-t-black border-l-black border-b-white border-r-white flex-1 flex flex-col">
                  <p className="font-[family-name:var(--font-pixel)] text-black text-sm md:text-base leading-relaxed mb-4 flex-1">
                    {srv.description}
                  </p>
                  <a href="https://api.whatsapp.com/message/F5WCMM3W67FLH1" target="_blank" rel="noopener noreferrer" className="win95-btn bg-[#25D366] text-black px-3 py-2 font-[family-name:var(--font-pixel)] text-sm font-bold text-center border-t-white border-l-white border-b-[#075E54] border-r-[#075E54]">
                    Solicitar Cotización {/* 💬 */}
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-[#f5f5dc] border-4 border-black p-4 md:p-6 shadow-[-4px_4px_0_0_rgba(0,0,0,1)]">
          <p className="font-[family-name:var(--font-pixel)] text-black text-center text-sm md:text-base font-bold">
            INFO: Este catálogo está en construcción. Los servicios pueden adaptarse a las necesidades de tu Guild o corporación.
          </p>
        </div>

      </div>
    </main>
  )
}

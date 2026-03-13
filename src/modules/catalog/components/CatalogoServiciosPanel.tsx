"use client"

import { useState } from "react"
import { BookOpen, Search, ChevronRight } from "lucide-react"
import { SERVICIOS_CATALOGO } from "@/modules/catalog/data"

export default function CatalogoServiciosPanel() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<'Todo' | 'Legal-Tech' | 'Legal' | 'Tech'>('Todo');

  const filteredServicios = SERVICIOS_CATALOGO.filter(servicio => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = servicio.title.toLowerCase().includes(term) || 
                          servicio.desc.toLowerCase().includes(term);
    const matchesType = filterType === 'Todo' || servicio.tipo === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-[#1a1a2e] text-white p-4 min-h-[500px]">
      <div className="text-center mb-6 border-b-2 border-[#4a4a6a] pb-6">
        <h2 className="font-[family-name:var(--font-pixel)] text-2xl md:text-3xl text-white drop-shadow-[2px_2px_0_#f5a623] mb-3 tracking-wide flex items-center justify-center gap-3">
          <BookOpen className="w-6 h-6 text-[#f5a623]" /> Catálogo Profesional
        </h2>
        <p className="text-[#a0a0c0] font-sans text-sm md:text-base max-w-2xl mx-auto">
          Explora mis servicios especializados. Usa el buscador o los filtros para encontrar rápidamente la solución a tu medida.
        </p>
      </div>
      
      {/* Buscador y Filtros */}
      <div className="mb-8 space-y-4">
        {/* Barra de Búsqueda */}
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Buscar por palabras clave (ej. contratos, LLMs, supabase)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border-2 border-[#4a4a6a] rounded-sm bg-[#0a0a14] text-white placeholder-gray-500 focus:outline-none focus:border-[#f5a623] focus:ring-1 focus:ring-[#f5a623] font-sans text-sm transition-colors shadow-inner"
          />
        </div>

        {/* Botones de Filtro */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {(['Todo', 'Legal-Tech', 'Legal', 'Tech'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-1.5 font-[family-name:var(--font-pixel)] text-xs md:text-sm border-2 rounded-sm transition-colors ${
                filterType === type 
                ? 'bg-[#000080] border-[#00d9ff] text-white shadow-[0_0_8px_rgba(0,217,255,0.4)]' 
                : 'bg-[#0a0a14] border-[#4a4a6a] text-gray-400 hover:border-gray-300 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grilla de Resultados */}
      {filteredServicios.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-[#4a4a6a] rounded-sm bg-[#0a0a14]/50">
          <p className="font-[family-name:var(--font-pixel)] text-[#f5a623] text-lg mb-2">0 Resultados Encontrados</p>
          <p className="font-sans text-gray-400 text-sm">Intenta con otros términos de búsqueda o cambia el filtro de categoría.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServicios.map((servicio, idx) => {
            const badgeColors = {
              'Legal': 'bg-amber-900 border-amber-500 text-amber-300',
              'Tech': 'bg-blue-900 border-blue-500 text-blue-300',
              'Legal-Tech': 'bg-purple-900 border-purple-500 text-purple-300'
            }[servicio.tipo as 'Legal' | 'Tech' | 'Legal-Tech'] || 'bg-gray-900 border-gray-500 text-gray-300'

            return (
              <div key={idx} className="bg-[#0a0a14] border-2 border-[#4a4a6a] hover:border-[#f5a623] group transition-all duration-300 rounded-sm flex flex-col h-full hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(245,166,35,0.15)] p-1 animate-in fade-in zoom-in-95 duration-200">
                 <div className="bg-[#1a1a2e] w-full flex-1 flex flex-col p-5 relative overflow-hidden">
                    
                    {/* Badge Tipo */}
                    <span className={`absolute top-3 right-3 border px-2 py-0.5 text-[9px] font-[family-name:var(--font-pixel)] uppercase tracking-widest rounded-sm ${badgeColors}`}>
                      {servicio.tipo}
                    </span>

                    <div className="text-4xl mb-4 drop-shadow-md group-hover:scale-110 group-hover:-rotate-3 transition-transform origin-bottom-left">
                      {servicio.icon}
                    </div>
                    
                    <h3 className="font-[family-name:var(--font-pixel)] text-base md:text-lg mb-3 text-white group-hover:text-[#f5a623] transition-colors leading-tight min-h-[44px]">
                      {servicio.title}
                    </h3>
                    
                    <p className="text-[#b0b0d0] font-sans text-sm leading-relaxed flex-1">
                      {servicio.desc}
                    </p>
                    
                    <div className="mt-5 pt-4 border-t border-[#4a4a6a]/60">
                      <a href={`https://api.whatsapp.com/message/F5WCMM3W67FLH1?text=Hola,%20me%20interesa%20más%20información%20sobre%20tus%20servicios%20de%20*${encodeURIComponent(servicio.title)}*.`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full py-2 bg-[#0a0a14] border border-[#f5a623]/30 text-[#f5a623] font-[family-name:var(--font-pixel)] text-xs uppercase tracking-wider hover:bg-[#f5a623] hover:text-black hover:font-bold transition-all group/btn rounded-sm">
                         Solicitar info <ChevronRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </div>
                 </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

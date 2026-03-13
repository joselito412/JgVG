"use client"

import { useState, useEffect } from "react"
import { BookOpen, Search, ChevronRight } from "pixelarticons/react"
import { getCatalogoServicios } from "@/modules/database/content-actions"

// Define un tipo basico a partir del esquema esperado
export interface Servicio {
  id: string;
  icon: string;
  title: string;
  description: string;
  category: string;
  color: string;
}

export default function CatalogoServiciosPanel() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<'Todo' | 'Legal-Tech' | 'Legal' | 'Tech'>('Todo');
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getCatalogoServicios();
      setServicios(data);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const filteredServicios = servicios.filter(servicio => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = servicio.title.toLowerCase().includes(term) || 
                          servicio.description.toLowerCase().includes(term);
    const matchesType = filterType === 'Todo' || servicio.category === filterType;
    return matchesSearch && matchesType;
  }).sort((a, b) => {
    if (a.category === 'Legal-Tech' && b.category !== 'Legal-Tech') return -1;
    if (a.category !== 'Legal-Tech' && b.category === 'Legal-Tech') return 1;
    return 0;
  });

  return (
    <div className="bg-[#1a1a2e] text-white p-4 min-h-[500px]">
      <div className="text-center mb-6 border-b-2 border-[#4a4a6a] pb-6">
        <h2 className="font-[family-name:var(--font-pixel)] text-2xl md:text-3xl text-white drop-shadow-[2px_2px_0_#f5a623] mb-3 tracking-wide flex items-center justify-center gap-3">
          <BookOpen className="pixelated w-6 h-6 text-[#f5a623]" /> Catálogo Profesional
        </h2>
        <p className="text-[#a0a0c0] font-mono text-sm md:text-base max-w-2xl mx-auto">
          Explora mis servicios especializados. Usa el buscador o los filtros para encontrar rápidamente la solución a tu medida.
        </p>
      </div>
      
      {/* Buscador y Filtros */}
      <div className="mb-8 space-y-5">
        {/* Barra de Búsqueda */}
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="pixelated h-5 w-5 text-gray-500" />
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
        <div className="flex flex-wrap justify-center gap-3 relative z-10 pb-2">
          {[
            { id: 'Todo', label: 'Todo', colorActive: 'bg-[#dfdfdf] text-black border-white', colorInactive: 'bg-[#a0a0a0] text-gray-800 border-gray-500' },
            { id: 'Legal-Tech', label: 'Legal-Tech', colorActive: 'bg-purple-800 text-purple-100 border-purple-400', colorInactive: 'bg-purple-950 text-purple-300 border-purple-800' },
            { id: 'Legal', label: 'Legal', colorActive: 'bg-amber-700 text-amber-100 border-amber-400', colorInactive: 'bg-amber-950 text-amber-300 border-amber-800' },
            { id: 'Tech', label: 'Tech', colorActive: 'bg-blue-800 text-blue-100 border-blue-400', colorInactive: 'bg-blue-950 text-blue-300 border-blue-800' },
          ].map((cat) => {
            const isActive = filterType === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilterType(cat.id as 'Todo' | 'Legal-Tech' | 'Legal' | 'Tech')}
                className={`px-5 py-2 font-[family-name:var(--font-pixel)] text-xs md:text-sm border-2 rounded-sm transition-all focus:outline-none ${
                  isActive 
                  ? `${cat.colorActive} win95-sunken transform scale-105 shadow-[0_0_10px_rgba(255,255,255,0.15)]` 
                  : `${cat.colorInactive} win95-raised hover:brightness-125 hover:-translate-y-0.5`
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grilla de Resultados (Contenedor Beveled Tab) */}
      <div className="bg-[#c0c0c0] win95-raised p-1 relative z-0">
        <div className="bg-[#1a1a2e] win95-sunken p-4 md:p-6 min-h-[300px]">
          {isLoading ? (
            <div className="text-center py-16">
              <p className="animate-pulse font-[family-name:var(--font-pixel)] text-[#f5a623] text-lg mb-2">Cargando catálogo desde Supabase...</p>
            </div>
          ) : filteredServicios.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-[#4a4a6a] rounded-sm bg-[#0a0a14]/50">
              <p className="font-[family-name:var(--font-pixel)] text-[#f5a623] text-lg mb-2">0 Resultados Encontrados</p>
              <p className="font-mono text-gray-400 text-sm">Intenta con otros términos de búsqueda o cambia el filtro de categoría.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredServicios.map((servicio, idx) => {
                const badgeColors = {
                  'Legal': 'bg-amber-900 border-amber-500 text-amber-300',
                  'Tech': 'bg-blue-900 border-blue-500 text-blue-300',
                  'Legal-Tech': 'bg-purple-900 border-purple-500 text-purple-300'
                }[servicio.category as 'Legal' | 'Tech' | 'Legal-Tech'] || 'bg-gray-900 border-gray-500 text-gray-300'

                return (
                  <div key={idx} className="bg-[#c0c0c0] win95-raised group transition-all duration-300 flex flex-col h-full hover:-translate-y-1 hover:shadow-[4px_4px_0_rgba(0,0,0,0.5)] p-0.5 animate-in fade-in zoom-in-95 duration-200">
                     <div className="bg-[#1a1a2e] win95-sunken w-full flex-1 flex flex-col p-4 relative overflow-hidden">
                        
                        {/* Badge Tipo */}
                        <span className={`absolute top-2 right-2 border px-2 py-0.5 text-[9px] font-[family-name:var(--font-pixel)] uppercase tracking-widest rounded-sm ${badgeColors}`}>
                          {servicio.category}
                        </span>

                        <div className="text-4xl mb-4 drop-shadow-md group-hover:scale-110 group-hover:-rotate-3 transition-transform origin-bottom-left pt-2">
                          {servicio.icon}
                        </div>
                        
                        <h3 className="font-[family-name:var(--font-pixel)] text-base md:text-lg mb-3 text-white group-hover:text-[#f5a623] transition-colors leading-tight min-h-[44px]">
                          {servicio.title}
                        </h3>
                        
                        <p className="text-[#b0b0d0] font-mono text-sm leading-relaxed flex-1">
                          {servicio.description}
                        </p>
                        
                        <div className="mt-5 pt-4 border-t border-[#4a4a6a]/60">
                          <a href={`https://api.whatsapp.com/message/F5WCMM3W67FLH1?text=Hola,%20me%20interesa%20más%20información%20sobre%20tus%20servicios%20de%20*${encodeURIComponent(servicio.title)}*.`} target="_blank" rel="noopener noreferrer" className="win95-btn flex items-center justify-center w-full py-2 bg-[#c0c0c0] text-black font-[family-name:var(--font-pixel)] text-xs uppercase tracking-wider hover:bg-[#dfdfdf] hover:font-bold transition-all group/btn">
                             Solicitar info <ChevronRight className="pixelated w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                          </a>
                        </div>
                     </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { BookOpen, Lock, Shield, ChevronRight, PlayCircle, FileText, CheckCircle2, Sword, Zap } from "lucide-react"
import { getEducationContent, getPromptsLibrary } from "@/modules/database/content-actions"

export interface ClaseData {
  titulo: string;
  duracion: string;
  recursos: string[];
}

export interface ModuleData {
  modulo: string;
  clases: ClaseData[];
}

export interface PromptData {
  topic: string;
  tool: string;
  purpose: string;
  promptText: string;
  tips: string | null;
}

export default function MisClasesPanel({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [activeTab, setActiveTab] = useState<'legal' | 'tech' | 'recursos'>('legal');
  const [expandedModuloIndex, setExpandedModuloIndex] = useState<number | null>(null);
  
  const [selectedClase, setSelectedClase] = useState<{ moduloName: string, clase: ClaseData } | null>(null);
  const [showAuthwall, setShowAuthwall] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [educationData, setEducationData] = useState<{ legal: ModuleData[], tech: ModuleData[] }>({ legal: [], tech: [] });
  const [promptsData, setPromptsData] = useState<PromptData[]>([]);

  useEffect(() => {
    async function fetchAll() {
      setIsLoading(true);
      const [edu, prompts] = await Promise.all([
        getEducationContent(),
        getPromptsLibrary()
      ]);
      setEducationData(edu);
      setPromptsData(prompts);
      setIsLoading(false);
    }
    fetchAll();
  }, []);

  const activeData = activeTab === 'legal' ? educationData.legal : educationData.tech;

  // Manejar el clic en una clase (Autenticación Requerida)
  const handleClaseClick = (moduloName: string, clase: ClaseData) => {
    if (isAuthenticated) {
      setSelectedClase({ moduloName, clase });
    } else {
      setShowAuthwall(true);
    }
  };

  return (
    <div className="bg-[#c0c0c0] w-full min-h-[500px] flex flex-col md:flex-row text-black">
      {/* Authwall Modal */}
      {showAuthwall && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black p-1 max-w-sm w-full shadow-[2px_2px_10px_rgba(0,0,0,0.5)]">
            <div className="bg-[#000080] text-white px-2 py-1 font-[family-name:var(--font-pixel)] text-sm flex justify-between items-center">
              <span>Acceso_Denegado.exe</span>
              <button onClick={() => setShowAuthwall(false)} className="bg-[#c0c0c0] text-black w-5 h-5 flex items-center justify-center border-t border-l border-white border-b border-r border-[#808080] font-bold">X</button>
            </div>
            <div className="p-4 bg-white m-1 text-center font-sans space-y-4">
               <Lock className="w-12 h-12 text-[#f5a623] mx-auto drop-shadow-sm" />
               <h3 className="font-[family-name:var(--font-pixel)] text-lg text-[#000080]">Contenido Exclusivo</h3>
               <p className="text-sm text-gray-700 font-mono">Para acceder a las videoclases, material de estudio y templates, debes identificarte en el sistema.</p>
               
               <div className="pt-2">
                 <button 
                   onClick={() => setShowAuthwall(false)}
                   className="w-full bg-[#0aa05a] hover:bg-[#088048] text-white font-[family-name:var(--font-pixel)] py-2 px-4 shadow-[inset_1px_1px_0_rgba(255,255,255,0.4),2px_2px_0_rgba(0,0,0,0.8)] transition-all active:translate-y-[2px] active:shadow-[0_0_0_rgba(0,0,0,0)] flex items-center justify-center gap-2 text-sm"
                 >
                   <Shield className="w-4 h-4" /> Crear Perfil / Login
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar de Exploración Win95 */}
      <div className="w-full md:w-64 bg-white border-r-2 border-b-2 md:border-b-0 border-[#808080] shadow-[inset_-1px_-1px_0_#dfdfdf] flex flex-col z-10">
        <div className="bg-[#000080] text-white px-2 py-1 font-[family-name:var(--font-pixel)] text-sm tracking-wide flex items-center gap-2">
          <BookOpen className="w-4 h-4" /> Explorador de Áreas
        </div>
        
        <div className="p-2 flex-1 font-[family-name:var(--font-pixel)] text-base space-y-3">
          <button 
             onClick={() => { setActiveTab('legal'); setSelectedClase(null); setExpandedModuloIndex(null); }}
             className={`w-full text-left px-3 py-3 flex items-center gap-3 border-2 transition-all ${activeTab === 'legal' ? 'bg-[#ffd700] border-white text-black shadow-[2px_2px_0_#000]' : 'bg-[#e0e0e0] border-transparent hover:border-[#808080] hover:bg-[#d0d0d0] text-gray-800'}`}
          >
            <span className="text-3xl -mt-1 drop-shadow-sm">⚖️</span>
            <span className="font-bold tracking-wide">Derecho</span>
          </button>
          
          <button 
             onClick={() => { setActiveTab('tech'); setSelectedClase(null); setExpandedModuloIndex(null); }}
             className={`w-full text-left px-3 py-3 flex items-center gap-3 border-2 transition-all ${activeTab === 'tech' ? 'bg-[#00d9ff] border-white text-black shadow-[2px_2px_0_#000]' : 'bg-[#e0e0e0] border-transparent hover:border-[#808080] hover:bg-[#d0d0d0] text-gray-800'}`}
          >
            <span className="text-3xl -mt-1 drop-shadow-sm">💻</span>
            <span className="font-bold tracking-wide">Tech & Dev</span>
          </button>
          
          <div className="py-2"><div className="h-0.5 bg-gray-400 border-b border-white mx-2"></div></div>
          
          <button 
             onClick={() => { setActiveTab('recursos'); setSelectedClase(null); }}
             className={`w-full text-left px-3 py-3 flex items-center gap-3 border-2 transition-all ${activeTab === 'recursos' ? 'bg-[#000080] border-white text-white shadow-[2px_2px_0_#000]' : 'bg-[#c0c0c0] border border-[#808080] hover:bg-[#a0a0a0] text-black'}`}
          >
            <span className="text-2xl -mt-1 drop-shadow-sm">📚</span>
            <span>Librería de Recursos</span>
          </button>
        </div>
      </div>

      {/* Contenedor Principal */}
      <div className="flex-1 bg-[#ffffff] p-4 md:p-8 pb-12 overflow-visible shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)] relative border-t-2 md:border-t-0 md:border-l-2 border-[#808080]">
        
        {/* VISTA DE UNA CLASE SELECCIONADA */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-16 animate-pulse">
            <span className="font-[family-name:var(--font-pixel)] text-lg text-[#000080]">Cargando base de datos...</span>
          </div>
        ) : selectedClase ? (
          <div className="animate-in slide-in-from-right-4 duration-300">
             <button 
               onClick={() => setSelectedClase(null)}
               className="mb-4 text-sm font-sans text-gray-600 hover:text-black hover:underline flex items-center gap-1"
             >
               &larr; Volver al Área
             </button>

             <div className="mb-2">
               <span className="bg-[#000080] text-white font-[family-name:var(--font-pixel)] text-[10px] px-2 py-1 rounded-sm tracking-wider uppercase">
                 {selectedClase.moduloName}
               </span>
             </div>
             
             <h2 className="font-[family-name:var(--font-pixel)] text-xl md:text-2xl text-black mb-4 leading-tight">
               {selectedClase.clase.titulo}
             </h2>

             {/* Video Placeholder */}
             <div className="w-full aspect-video bg-[#0a0a14] flex flex-col items-center justify-center border-4 border-[#808080] mb-6 shadow-md relative overflow-hidden group">
               <PlayCircle className="w-16 h-16 text-white/50 group-hover:text-white group-hover:scale-110 transition-all cursor-pointer" />
               <p className="font-[family-name:var(--font-pixel)] text-gray-400 text-sm mt-4 tracking-widest text-center px-4">
                 VIDEO REPRODUCTOR <br/> <span className="text-xs text-[#88ff88]">(Próximamente Integrado)</span>
               </p>
               <div className="absolute top-2 left-2 bg-black/60 text-white font-sans font-bold text-xs px-2 py-1 rounded">
                 {selectedClase.clase.duracion}
               </div>
             </div>

             {/* Materiales y Recursos */}
             <div className="bg-[#f8f8fa] border border-gray-300 p-4">
                <h3 className="font-[family-name:var(--font-pixel)] text-lg text-black mb-3 border-b border-gray-300 pb-2">Materiales de la Clase</h3>
                <ul className="space-y-2">
                  {selectedClase.clase.recursos.map((rec: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 font-sans text-sm text-[#000080] hover:underline cursor-pointer">
                      <FileText className="w-4 h-4 text-gray-500" /> {rec}
                    </li>
                  ))}
                </ul>

                <button className="mt-6 font-[family-name:var(--font-pixel)] text-sm bg-white border-2 border-gray-400 px-4 py-2 hover:bg-[#e0e0e0] flex items-center gap-2 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-green-600" /> Marcar como Completada
                </button>
             </div>
          </div>
        ) : (
          /* VISTAS DE LISTA (Legal, Tech o Recursos) */
          <>
            {activeTab === 'legal' && (
              <div className="animate-in fade-in duration-300">
                <h1 className="font-[family-name:var(--font-pixel)] text-2xl md:text-3xl text-black border-b-2 border-black pb-2 mb-6 flex items-center gap-3">
                  <span className="text-4xl">⚖️</span> Derecho
                </h1>
                <p className="mb-6 bg-[#f0f0f5] p-3 border-l-4 border-[#000080] text-sm font-mono text-gray-800">
                  Exploraremos cómo la regulación alcanza las nuevas fronteras de la tecnología, dotando de seguridad jurídica al despliegue de software. Selecciona un Módulo para ver las clases:
                </p>
                <div className="space-y-4">
                  {activeData.map((modulo, idx) => (
                    <div key={idx} className="border border-gray-300 bg-[#fbfbfb] shadow-sm">
                      <button 
                        onClick={() => setExpandedModuloIndex(expandedModuloIndex === idx ? null : idx)}
                        className="w-full text-left p-3 flex items-center justify-between hover:bg-[#f0f0f5] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                           <div className="bg-[#000080] text-white font-[family-name:var(--font-pixel)] px-2 py-0.5 rounded text-[10px] min-w-6 text-center">
                             MOD {idx + 1}
                           </div>
                           <span className="font-[family-name:var(--font-pixel)] text-sm text-black">{modulo.modulo}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${expandedModuloIndex === idx ? 'rotate-90' : ''}`} />
                      </button>
                      
                      {expandedModuloIndex === idx && (
                        <div className="bg-white border-t border-gray-200 p-3 pl-12 space-y-2 animate-in slide-in-from-top-2 duration-200">
                          {modulo.clases.map((clase: ClaseData, cIdx: number) => (
                            <div 
                              key={cIdx} 
                              onClick={() => handleClaseClick(modulo.modulo, clase)}
                              className="flex items-center justify-between p-2 hover:bg-[#f5f5f5] rounded cursor-pointer group border border-transparent hover:border-gray-200"
                            >
                               <div className="flex items-center gap-2">
                                 {isAuthenticated ? (
                                   <PlayCircle className="w-4 h-4 text-gray-400 group-hover:text-[#f5a623]" />
                                 ) : (
                                   <Lock className="w-4 h-4 text-red-500/70" />
                                 )}
                                 <span className="font-sans text-sm text-gray-800 group-hover:text-black font-medium">{clase.titulo}</span>
                               </div>
                               <span className="font-sans text-xs text-gray-500 font-mono bg-gray-100 px-1 rounded">{clase.duracion}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tech' && (
              <div className="animate-in fade-in duration-300">
                <h1 className="font-[family-name:var(--font-pixel)] text-2xl md:text-3xl text-black border-b-2 border-black pb-2 mb-6 flex items-center gap-3">
                  <span className="text-4xl">💻</span> Tech & Dev
                </h1>
                <p className="mb-6 bg-[#f0f0f5] p-3 border-l-4 border-[#000080] text-sm font-mono text-gray-800">
                  Ingresando a la terminal de desarrollo. Este módulo cubre desde los fundamentos teóricos de los LLMs hasta arquitecturas de agentes autónomos en producción.
                </p>
                <div className="space-y-4">
                  {activeData.map((modulo, idx) => (
                    <div key={idx} className="border border-gray-300 bg-[#fbfbfb] shadow-sm">
                      <button 
                        onClick={() => setExpandedModuloIndex(expandedModuloIndex === idx ? null : idx)}
                        className="w-full text-left p-3 flex items-center justify-between hover:bg-[#f0f0f5] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                           <div className="bg-[#000080] text-white font-[family-name:var(--font-pixel)] px-2 py-0.5 rounded text-[10px] min-w-6 text-center">
                             MOD {idx + 1}
                           </div>
                           <span className="font-[family-name:var(--font-pixel)] text-sm text-black">{modulo.modulo}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${expandedModuloIndex === idx ? 'rotate-90' : ''}`} />
                      </button>
                      
                      {expandedModuloIndex === idx && (
                        <div className="bg-white border-t border-gray-200 p-3 pl-12 space-y-2 animate-in slide-in-from-top-2 duration-200">
                          {modulo.clases.map((clase: ClaseData, cIdx: number) => (
                            <div 
                              key={cIdx} 
                              onClick={() => handleClaseClick(modulo.modulo, clase)}
                              className="flex items-center justify-between p-2 hover:bg-[#f5f5f5] rounded cursor-pointer group border border-transparent hover:border-gray-200"
                            >
                               <div className="flex items-center gap-2">
                                 {isAuthenticated ? (
                                   <PlayCircle className="w-4 h-4 text-gray-400 group-hover:text-[#f5a623]" />
                                 ) : (
                                   <Lock className="w-4 h-4 text-red-500/70" />
                                 )}
                                 <span className="font-sans text-sm text-gray-800 group-hover:text-black font-medium">{clase.titulo}</span>
                               </div>
                               <span className="font-sans text-xs text-gray-500 font-mono bg-gray-100 px-1 rounded">{clase.duracion}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'recursos' && (
              <div className="animate-in fade-in duration-300">
                <h1 className="font-[family-name:var(--font-pixel)] text-2xl md:text-3xl text-black border-b-2 border-black pb-2 mb-6 flex items-center gap-3">
                  <span className="text-4xl">📚</span> Recursos Destacados
                </h1>
                
                <div className="mb-8">
                  <h2 className="font-[family-name:var(--font-pixel)] text-xl text-[#000080] mb-4 flex items-center gap-2">
                    <Sword className="w-5 h-5" /> Librería de Prompts Profesionales (Legal)
                  </h2>
                  <p className="font-mono text-sm md:text-base text-gray-700 mb-4 bg-gray-100 p-2 border border-gray-300 leading-relaxed tracking-tight">
                    La ingeniería de prompts es una extensión de la argumentación lógica. Aquí comparto arquitecturas de prompts testeados para automatización legal.
                  </p>

                  <div className="space-y-6 mt-6">
                    {promptsData.map((recurso, idx) => (
                      <div key={idx} className="border-2 border-gray-400 bg-white">
                         <div className="bg-[#dfdfdf] px-3 py-2 flex items-center justify-between border-b-2 border-gray-400">
                            <span className="font-[family-name:var(--font-pixel)] text-sm font-bold text-black">{recurso.topic}</span>
                            <span className="font-sans text-[10px] bg-[#000080] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">{recurso.tool}</span>
                         </div>
                         
                         <div className="p-3 sm:p-4 space-y-4">
                            <div>
                              <span className="font-[family-name:var(--font-pixel)] text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Propósito Estratégico</span>
                              <p className="font-mono text-sm text-gray-800">{recurso.purpose}</p>
                            </div>
                            
                            <div>
                              <span className="font-[family-name:var(--font-pixel)] text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Prompt Block</span>
                              <div className="bg-[#0a0a14] rounded-sm p-3 font-mono text-xs text-[#88ff88] leading-relaxed overflow-x-auto whitespace-pre-wrap border-l-4 border-[#00d9ff]">
                                {recurso.promptText}
                              </div>
                            </div>

                            <div className="bg-[#fff3cd] border border-[#ffeeba] p-3 rounded-sm">
                               <span className="font-[family-name:var(--font-pixel)] text-[10px] text-amber-800 uppercase tracking-wider block mb-1 flex items-center gap-1">
                                 <Zap className="w-3 h-3" /> Tips de Completado
                               </span>
                               <p className="font-mono text-xs text-amber-900 leading-relaxed">{recurso.tips}</p>
                            </div>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-300">
                   <h2 className="font-[family-name:var(--font-pixel)] text-lg text-[#000080] mb-2">Bibliografía Dev</h2>
                   <p className="font-mono text-xs text-gray-600 italic">Los protocolos MLOps y documentación de arquitecturas LangGraph están en proceso de desclasificación. Estarán disponibles pronto.</p>
                </div>

              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

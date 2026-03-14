"use client"

import { useChat } from "@ai-sdk/react"
import { useState, useEffect, useRef } from 'react'
import { ChevronRight, Sword } from "pixelarticons/react"

interface ChatBotItemProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export default function ChatBotItem({ isOpen, setIsOpen }: ChatBotItemProps) {
  // Configuración del Vercel AI SDK local
  // Nota: restauramos el bypass manual del user para TypeScript (Vercel SDK V3 drift)
  const { messages, setMessages } = useChat();

  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [hasGreeted, setHasGreeted] = useState(false);
  const [uxMode, setUxMode] = useState<'menu' | 'chat'>('menu');

  // Auto-greet on load (show tooltip after 5s)
  useEffect(() => {
    if (!hasGreeted) {
      const timer = setTimeout(() => {
        setHasGreeted(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hasGreeted]);

  // Si el usuario borra todos los mensajes, volvemos al menú base
  useEffect(() => {
    if (messages.length === 0 && uxMode === 'chat') {
       setUxMode('menu'); // Ignoramos el warning de linting para este caso intencional temporalmente
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length, uxMode]);

  // Auto-scroll logic
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current && uxMode === 'chat') {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, uxMode]);

  const onCustomSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    setUxMode('chat');
    setIsProcessing(true);
    
    // We send the user message to the chat API manually using TS Coercion to fix V3 drift
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nextMessages = [...messages, { id: crypto.randomUUID(), role: 'user', content: input } as any]
    setMessages(nextMessages);
    
    fetch('/api/chat', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ messages: nextMessages }),
    }).then(async (res) => {
       const reader = res.body?.getReader()
       if (!reader) {
         setIsProcessing(false);
         return;
       }

       while (true) {
         const { done, value } = await reader.read()
         if (done) break
         
         const text = new TextDecoder().decode(value)
         let accumulatedContent = '';

         // Verificamos si es un Data Stream de Vercel AI SDK (0:"...") o texto plano (toTextStreamResponse)
         if (text.includes('0:"')) {
            const chunkRegex = /0:"([^"]*)"/g
            let match;
            while ((match = chunkRegex.exec(text)) !== null) {
                 const snippet = match[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
                 accumulatedContent += snippet;
            }
         } else {
            // Si el backend responde con toTextStreamResponse(), los chunks son texto plano
            accumulatedContent = text;
         }

         if (accumulatedContent) {
            setMessages((current) => {
              const lastMsg = current[current.length - 1];
              if (lastMsg && lastMsg.role === 'assistant' && lastMsg.id !== 'initial-msg-1') {
                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
                 return [...current.slice(0, -1), { ...lastMsg, content: (lastMsg as any).content + accumulatedContent } as any];
              }
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              return [...current, { id: crypto.randomUUID(), role: 'assistant', content: accumulatedContent } as any];
            });
         }
       }
       setIsProcessing(false);
    }).catch(err => {
       console.error("Chat error:", err);
       setIsProcessing(false);
    });
    setInput(""); // clear input
  };

  const handleQuickAction = (text: string) => {
    if (isProcessing) return;
    setUxMode('chat');
    setIsProcessing(true);
    // Invocamos manualmente el mismo ciclo que onCustomSubmit pero con el texto predefinido
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nextMessages = [...messages, { id: crypto.randomUUID(), role: 'user', content: text } as any]
    setMessages(nextMessages);
    
    fetch('/api/chat', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ messages: nextMessages }),
    }).then(async (res) => {
       const reader = res.body?.getReader()
       if (!reader) {
         setIsProcessing(false);
         return;
       }

       while (true) {
         const { done, value } = await reader.read()
         if (done) break
         
         const textStream = new TextDecoder().decode(value)
         let accumulatedContent = '';

         // Verificamos si es un Data Stream de Vercel AI SDK (0:"...") o texto plano (toTextStreamResponse)
         if (textStream.includes('0:"')) {
            const chunkRegex = /0:"([^"]*)"/g
            let match;
            while ((match = chunkRegex.exec(textStream)) !== null) {
                 const snippet = match[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
                 accumulatedContent += snippet;
            }
         } else {
            // Si el backend responde con toTextStreamResponse(), los chunks son texto plano
            accumulatedContent = textStream;
         }

         if (accumulatedContent) {
            setMessages((current) => {
              const lastMsg = current[current.length - 1];
              if (lastMsg && lastMsg.role === 'assistant' && lastMsg.id !== 'initial-msg-1') {
                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
                 return [...current.slice(0, -1), { ...lastMsg, content: (lastMsg as any).content + accumulatedContent } as any];
              }
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              return [...current, { id: crypto.randomUUID(), role: 'assistant', content: accumulatedContent } as any];
            });
         }
       }
       setIsProcessing(false);
    }).catch(err => {
       console.error("Chat error:", err);
       setIsProcessing(false);
    });
  };

  const QUICK_ACTIONS = [
    "¿Qué servicios legales ofreces?",
    "Quiero agendar una revisión",
    "Mostrar proyectos de código",
    "¿Quién eres tú?"
  ];

  return (
    <div className="fixed bottom-40 sm:bottom-32 md:bottom-28 lg:bottom-32 right-4 md:right-8 z-60 flex flex-col items-end">
      
      {/* Botón flotante (Avatar Icono) */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative bg-[#1a1a2e] border-[3px] border-[#f5a623] w-20 h-20 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center shadow-[0_0_25px_rgba(245,166,35,0.6)] hover:scale-110 transition-transform cursor-pointer animate-in zoom-in"
        >
          <span className="text-4xl sm:text-5xl drop-shadow-[3px_3px_0_rgba(0,0,0,0.5)]">🧙🏽‍♂️</span>
          <span className="w-3 h-3 md:w-4 md:h-4 bg-[#88ff88] rounded-full absolute bottom-0 right-1 md:bottom-1 md:right-1 border-2 border-[#1a1a2e] animate-pulse"></span>
          
          {/* Tooltip táctico flotante después de 3s */}
          {hasGreeted && (
             <div className="absolute -top-14 right-0 bg-[#f5f5dc] text-black font-pixel text-xs md:text-sm font-bold px-3 py-2 border-2 border-black whitespace-nowrap shadow-md animate-in fade-in slide-in-from-bottom-2 duration-500 flex items-center gap-2">
               Habla con mi asistente, ChunGPT <span className="text-base">💬</span>
               <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-8 border-t-black"></div>
             </div>
          )}
        </button>
      )}

      {/* Ventana de chat desplegada */}
      {isOpen && (
        <div className="rpg-panel overflow-hidden w-[95vw] sm:w-[450px] shadow-[0_10px_30px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom-8 duration-300 mb-2 border-[#f5a623] border-[3px]">
          
          {/* Header */}
          <div className="flex items-center justify-between px-3 md:px-4 py-3 bg-[#2a2a4a] border-b-[3px] border-[#f5a623] shadow-md">
             <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1a1a2e] rounded-full flex items-center justify-center border-2 border-[#f5a623] shadow-inner">
                <span className="text-2xl md:text-3xl drop-shadow-sm">🧙🏽‍♂️</span>
              </div>
              <div className="flex flex-col">
                 <span className="text-[#f5a623] font-pixel text-base md:text-lg font-bold tracking-widest text-shadow">
                   CHUNGPT.exe
                 </span>
                 <span className="text-[#88ff88] text-[10px] font-mono tracking-tighter">● Online</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[#c0c0c0] hover:text-white hover:bg-[#ff0000] px-3 py-1 rounded transition-colors font-pixel text-lg border-2 border-transparent hover:border-white"
            >
              X
            </button>
          </div>
          
          {/* Área Dinámica: Menú (Acciones Rápidas) o Conversación (ChatTradicional) */}
          <div className="h-[50vh] max-h-[400px] overflow-y-auto p-4 bg-[#0a0a14] custom-scrollbar">
            
            {/* RUTA A: Menú Acciones Rápidas (Solo Visible al inicio sin input) */}
            {uxMode === 'menu' && (
               <div className="flex flex-col gap-4 animate-in fade-in duration-500">
                  {/* Greeting Fijo Permanente en el Menú Inicial */}
                  <div className="flex flex-col gap-2">
                    <div className={`flex gap-3`}>
                      <div className={`w-8 h-8 md:w-10 md:h-10 bg-[#1a1a2e] border-[#f5a623] rounded-full flex items-center justify-center shrink-0 border-2`}>
                        <span className="text-xl md:text-2xl">🧙🏽‍♂️</span>
                      </div>
                      <div className={`px-4 py-3 max-w-[85%] rounded-md shadow-md bg-[#1a1a2e] border-2 border-[#4a4a6a]`}>
                        <div className={`font-mono text-sm md:text-base leading-relaxed tracking-tight wrap-break-word whitespace-pre-wrap text-[#e0e0e0]`}>
                          ¡Saludos Viajero! Soy ChunGPT, custodio de este mundo virtual. ¿En qué puedo servirte?
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                     <span className="text-[#88ff88] font-pixel text-xs mb-1">ACCIONES RÁPIDAS:</span>
                     {QUICK_ACTIONS.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickAction(action)}
                          className="text-left w-full bg-[#3d2005]/60 hover:bg-[#f5a623] border border-[#f5a623] text-[#f5a623] hover:text-black px-4 py-2.5 text-[13px] md:text-sm font-mono rounded-md shadow-sm cursor-pointer transition-all duration-200 flex items-center justify-between group"
                        >
                          {action}
                          <ChevronRight className="w-4 h-4 text-[#f5a623] group-hover:text-black transition-colors" />
                        </button>
                     ))}
                  </div>
               </div>
            )}

            {/* RUTA B: Interfaz Conversacional de Chat (Activa tras acción) */}
            {uxMode === 'chat' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                  {/* Greeting Fijo Permanente en la cima del historial */}
                  <div className="flex flex-col gap-2">
                    <div className={`flex gap-3`}>
                      <div className={`w-8 h-8 md:w-10 md:h-10 bg-[#1a1a2e] border-[#f5a623] rounded-full flex items-center justify-center shrink-0 border-2`}>
                        <span className="text-xl md:text-2xl">🧙🏽‍♂️</span>
                      </div>
                      <div className={`px-4 py-3 max-w-[85%] rounded-md shadow-md bg-[#1a1a2e] border-2 border-[#4a4a6a]`}>
                        <div className={`font-mono text-sm md:text-base leading-relaxed tracking-tight wrap-break-word whitespace-pre-wrap text-[#e0e0e0]`}>
                          ¡Saludos Viajero! Soy ChunGPT, custodio de este mundo virtual. ¿En qué puedo servirte?
                        </div>
                      </div>
                    </div>
                  </div>

                  {messages.map((msg) => {
                    const isUser = msg.role === 'user';
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const rawContent = (msg as any).content || "";
                    
                    // Regex para extraer el bloque :::quick_replies [...] :::
                    // Extraemos el JSON y dejamos limpio el content principal
                    let displayContent = rawContent;
                    let quickReplies: string[] = [];
                    
                    const qrMatch = rawContent.match(/:::quick_replies\s*([\s\S]*?)\s*:::/);
                    if (qrMatch && qrMatch[1]) {
                      try {
                        quickReplies = JSON.parse(qrMatch[1]);
                        displayContent = rawContent.replace(/:::quick_replies\s*[\s\S]*?\s*:::/, '').trim();
                      } catch (e) {
                        console.error("Error parsing LLM quick replies:", e);
                      }
                    }

                    return (
                      <div key={msg.id} className="flex flex-col gap-2">
                        <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
                          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${
                            isUser 
                              ? 'bg-[#006060] border-[#00d9ff]' 
                              : 'bg-[#1a1a2e] border-[#f5a623]'
                          }`}>
                            {isUser ? (
                              <span className="font-pixel text-xs md:text-sm font-bold text-[#00d9ff]">TU</span>
                            ) : (
                              <span className="text-xl md:text-2xl">🧙🏽‍♂️</span>
                            )}
                          </div>
                          <div className={`px-4 py-3 max-w-[85%] rounded-md shadow-md ${
                            isUser 
                              ? 'bg-[#003030]/80 border-2 border-[#00d9ff]' 
                              : 'bg-[#1a1a2e] border-2 border-[#4a4a6a]'
                          }`}>
                            <div className={`font-mono text-sm md:text-base leading-relaxed tracking-tight wrap-break-word whitespace-pre-wrap ${
                              isUser ? 'text-[#00d9ff] font-bold' : 'text-[#e0e0e0]'
                            }`}>
                              {displayContent}
                            </div>
                          </div>
                        </div>
                        
                        {/* Renderizar Quick Replies Sugeridas Si las hay y es el ÚLTIMO mensaje */}
                        {!isUser && quickReplies.length > 0 && msg.id === messages[messages.length - 1].id && !isProcessing && (
                          <div className="flex flex-wrap gap-2 pl-[3.5rem] md:pl-[4.5rem] mt-1 animate-in slide-in-from-top-2">
                            {quickReplies.map((reply, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleQuickAction(reply)}
                                className="bg-[#1a1a2e]/50 border border-[#f5a623]/50 text-[#f5a623] hover:bg-[#f5a623]/20 hover:border-[#f5a623] px-3 py-1.5 rounded-full text-xs font-pixel transition-colors flex items-center gap-1"
                              >
                                <span>▶</span> {reply}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* Loading Indicator Streaming LLM */}
                  {isProcessing && messages[messages.length - 1]?.role === 'user' && (
                    <div className="flex gap-3 animate-in fade-in">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-[#1a1a2e] rounded-full flex items-center justify-center shrink-0 border-2 border-[#4a4a6a]">
                        <span className="text-xl md:text-2xl">🧙🏽‍♂️</span>
                      </div>
                      <div className="bg-[#1a1a2e] border-2 border-[#4a4a6a] px-4 py-3 max-w-[85%] rounded-md shadow-md">
                        <p className="text-[#e0e0e0] font-mono text-sm md:text-base leading-relaxed tracking-tight flex items-center gap-2">
                          * Procesando petición *
                          <span className="flex gap-1">
                            <span className="w-2 h-2 rounded-full bg-[#f5a623] animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 rounded-full bg-[#f5a623] animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 rounded-full bg-[#f5a623] animate-bounce" style={{ animationDelay: '300ms' }} />
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
              </div>
            )}
            
          </div>
          
          {/* Input Area (Texto libre) */}
          <div className="p-3 bg-[#1a1a2e] border-t-4 border-[#4a4a6a]">
            {uxMode === 'chat' && messages.length > 0 && (
               <div className="mb-2 flex justify-start">
                  <button type="button" onClick={() => setMessages([])} className="text-[#f5a623] text-xs font-mono hover:underline flex items-center gap-1">
                    ← Limpiar y Volver al Menú
                  </button>
               </div>
            )}
            <form onSubmit={onCustomSubmit} className="flex gap-2">
              <div className="flex-1 relative">
                <ChevronRight className="pixelated absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f5a623] rpg-arrow" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isProcessing}
                  placeholder={isProcessing ? "Invocando conjuro..." : "Escribe tu mensaje libre..."}
                  className="w-full bg-[#0f0f1f] border-2 border-[#4a4a6a] text-white pl-9 pr-4 py-3 md:py-4 font-mono text-sm md:text-base placeholder:text-[#4a4a6a] focus:outline-none focus:border-[#f5a623] disabled:opacity-50"
                />
              </div>
              <button 
                type="submit"
                disabled={isProcessing || !input.trim()}
                className="bg-[#f5a623] hover:bg-[#d4830a] text-black px-4 py-3 md:py-4 font-pixel border-2 border-white flex items-center justify-center gap-1 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sword className="pixelated w-5 h-5 md:w-6 md:h-6" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

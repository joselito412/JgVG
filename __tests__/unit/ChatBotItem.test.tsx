import React, { useState } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ChatBotItem from '@/modules/ai/components/ChatBotItem'

// Mock de Vercel AI SDK
vi.mock('@ai-sdk/react', () => ({
  useChat: () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [messages, setMessages] = useState<any[]>([])
    return {
      messages,
      status: 'idle',
      setMessages,
      input: '',
      handleInputChange: vi.fn(),
      handleSubmit: vi.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      append: (msg: any) => setMessages(prev => [...prev, { id: 'mock', ...msg }]),
    }
  }
}))

describe('ChatBotItem UX States', () => {
  it('Debe renderizar inicialmente solo el ícono flotante si isOpen=false', () => {
    render(<ChatBotItem isOpen={false} setIsOpen={vi.fn()} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('🧙🏽‍♂️')).toBeInTheDocument()
  })

  it('Debe mostrar la Ruta A (Acciones Rápidas) cuando se abre por primera vez', () => {
    render(<ChatBotItem isOpen={true} setIsOpen={vi.fn()} />)
    // El texto del Menú de Bienvenida y las Quick Actions deben existir
    expect(screen.getByText(/Acciones Rápidas/i)).toBeInTheDocument()
    // Buscar los botones específicos de acción
    expect(screen.getByText('¿Qué servicios legales ofreces?')).toBeInTheDocument()
  })

  it('Debe transicionar a la Ruta B (Chat Tradicional) al presionar una Acción Rápida', () => {
    render(<ChatBotItem isOpen={true} setIsOpen={vi.fn()} />)
    
    // Ruta A activa
    expect(screen.getByText(/Acciones Rápidas/i)).toBeInTheDocument()
    
    const actionButton = screen.getByText('¿Quién eres tú?')
    fireEvent.click(actionButton)
    
    // Una vez clicked (que dispara uxMode='chat'), el menu de acciones rápidas desaparece
    expect(screen.queryByText(/Acciones Rápidas/i)).not.toBeInTheDocument()
    // Y el ChatBox se muestra (placeholder)
    const input = screen.getByPlaceholderText(/Invocando conjuro/i)
    expect(input).toBeInTheDocument()
  })
})

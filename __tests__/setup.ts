import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock de scrollIntoView para JSDOM (no lo implementa nativamente)
window.HTMLElement.prototype.scrollIntoView = function() {};

// Mock Global para llamadas Fetch (Vercel AI SDK manual workaround)
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    body: {
      getReader: () => {
        return { read: () => Promise.resolve({ done: true, value: new Uint8Array() }) }
      }
    }
  })
) as unknown as typeof fetch;

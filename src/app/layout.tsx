import type { Metadata } from 'next'
import { VT323, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const vt323 = VT323({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--next-font-pixel'
})

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--next-font-mono'
})

export const metadata: Metadata = {
  title: 'AVOCADO Center | José - Abogado & Desarrollador IA',
  description: 'Portafolio interactivo de José - Abogado corporativo especializado en LegalTech, Propiedad Intelectual y Datos, además de Desarrollador Fullstack y creador de Agentes de IA.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${vt323.variable} ${spaceMono.variable}`}>
      <body className="font-[family-name:var(--font-pixel)] antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

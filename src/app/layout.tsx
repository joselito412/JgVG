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
  keywords: [
    'Abogado Corporativo', 'LegalTech', 'Desarrollador Fullstack', 
    'Inteligencia Artificial', 'Next.js', 'React', 'Python', 
    'Propiedad Intelectual', 'Contratos SaaS', 'Compliance', 'Colombia'
  ],
  authors: [{ name: 'José Guillermo Vásquez', url: 'https://avocadocenter.co' }],
  creator: 'José Guillermo Vásquez',
  publisher: 'AVOCADO Center',
  alternates: {
    canonical: 'https://avocadocenter.co',
  },
  openGraph: {
    type: 'profile',
    title: 'AVOCADO Center | José - Abogado & Desarrollador IA',
    description: 'Abogado Corporativo y Desarrollador Fullstack especializado en LegalTech e Inteligencia Artificial.',
    url: 'https://avocadocenter.co',
    siteName: 'AVOCADO Center',
    images: [
      {
        url: '/profile.png',
        width: 800,
        height: 800,
        alt: 'Foto de perfil de José Guillermo Vásquez',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AVOCADO Center | José - Abogado & Desarrollador IA',
    description: 'Abogado Corporativo y Desarrollador Fullstack especializado en LegalTech e Inteligencia Artificial.',
    images: ['/profile.png'],
  },
  generator: 'v0.app',
  icons: {
    icon: '/logo/Cafe_logo.svg',
    apple: '/logo/Cafe_logo.svg',
  },
}

import { Toaster } from "@/components/ui/toaster"
import SchemaMarkup from "@/modules/core/components/SchemaMarkup"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${vt323.variable} ${spaceMono.variable}`}>
      <body className="font-[family-name:var(--font-pixel)] antialiased">
        <SchemaMarkup />
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

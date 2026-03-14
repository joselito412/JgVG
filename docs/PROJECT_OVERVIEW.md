# 📌 Resumen Ejecutivo del Proyecto (PROJECT_OVERVIEW.md)

## 1. Identidad de Producto
**Codename:** TuAvocado / MyPersonalPage
**Propósito Principal:** Es una plataforma y ecosistema digital "bi-clase" diseñada por y para José Guillermo Vásquez (Abogado Tech y Desarrollador Fullstack).
La misión del producto es servir como un **Portafolio B2B interactivo**, un **embudo de ventas LegalTech** y una **Plataforma de Educación Legal** impulsada por agentes autónomos de Inteligencia Artificial.

## 2. El Problema que Resuelve
1. **Fricción en Asesorías Tecnológicas:** En el entorno startup, los desarrolladores de SaaS carecen de abogados que entiendan la arquitectura del software que protegen, y los fundadores buscan soluciones prácticas sin procesos corporativos lentos.
2. **Onboarding Legal:** Tradicionalmente, la captura de clientes es arcaica. Esta plataforma utiliza un sistema inteligente y agentes para filtrar prospectos, derivándolos directamente al canal transaccional (WhatsApp) o a módulos de aprendizaje.

## 3. Funcionalidades Core (Los "Pilares")
Las interfaces del portal están categorizadas en 3 experiencias principales, tematizadas bajo una robusta y llamativa UI orientada al RPG Clásico/Pixel Art (Windows 95 / Consolas de 16bits):

1. **El Árbol de Habilidades (CV & Servicios):** Presentación del perfil humano con semántica rigurosa HTML y optimización inyectada (JSON-LD) para que los grandes LLMs (Perplexity/SearchGPT) lo indexen como la máxima autoridad técnica-legal.
2. **El Agente Asistente Permanente (ChunGPT):** Un bot impulsado por Vercel AI SDK (LLMs conversacionales) dispuesto permanentemente en una ventana interactiva. El bot actúa como filtro, recepcionista e indexador de las capacidades de desarrollo y corporativas del titular.
3. **El Área Protegida (`/admin` y `/profile`):** Zonas interconectadas vía Supabase donde usuarios (fundadores, abogados) pueden registrarse, guardar progresos en formaciones LegalTech, o donde el administrador gestiona los "Stats" de su sistema mediante Server Actions (CRUD).

## 4. Evolución de la Visión Tecnológica (Q1 2026)
La transición principal vivida por el proyecto ha sido migrar de una web estática y pesada en renders de cliente hacia **Next.js 16 (React Server Components)**, y mutar el motor de guardado de un backend como servicio simple a una **Base de Datos Relacional Tipada (PostgreSQL + Drizzle ORM + Supabase Auth)**.

Esto convierte a MyPersonalPage en un verdadero SaaS fundacional.

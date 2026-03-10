# 🕹️ Ficha Técnica del Proyecto: Portafolio Web Retro + AI Chatbot

Este documento describe la arquitectura, el stack tecnológico y las dependencias necesarias para inicializar y desplegar el portafolio web con estética retro (8-bit/GUI 90s). El proyecto opera bajo una topología full-stack serverless en **Vercel**, persistencia de datos en **Supabase** y un chatbot impulsado por **Vercel AI SDK**.

## 🏗️ Arquitectura del Framework (Full-Stack)

El proyecto utiliza **Next.js (App Router)** como meta-framework full-stack, desplegado nativamente en Vercel. 

* **Frontend (Cliente):** Componentes de React estilizados con Tailwind CSS y frameworks retro (`NES.css`).
* **Backend (Servidor/Vercel Functions):** Rutas de API en Next.js (`/api/*`) que actúan de puente seguro para procesar las peticiones del chatbot hacia proveedores de LLM.
* **Base de Datos:** Inicializado con **Supabase** (PostgreSQL + Auth) como Backend-as-a-Service.

## 📦 Instalación y Desarrollo Local (Frontend)

Para configurar el entorno de trabajo exacto, ejecuta los siguientes comandos en la raíz del proyecto:

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) con tu navegador para ver el resultado.

## 🐳 Desarrollo del Backend (Docker + Supabase Local)

Para garantizar un entorno de pruebas destructivo sin afectar los datos de producción, este proyecto utiliza el **Supabase CLI** junto con **Docker Desktop** para emular la base de datos (PostgreSQL), la autenticación y el almacenamiento de forma local:

### Prerrequisitos
1. Tener [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y ejecutándose en tu PC en Windows.

### Arrancar la Base de Datos Local
1. Inicia el servidor local de Supabase (una vez tengas Docker abierto):
   ```bash
   npx supabase start
   ```
2. Las credenciales generadas localmente ya están referenciadas en tu `.env.local` y servirán para conectar el frontend al backend local:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
   ```
3. Accede a **Supabase Studio** localmente en [http://127.0.0.1:54323](http://127.0.0.1:54323) para gestionar tablas y datos visualmente sin tocar la nube central.

## 🤖 Integración del Chatbot (Vercel AI SDK)
El SDK de Vercel simplifica la creación de experiencias conversacionales sin tener que gestionar websockets o estados complejos manualmente. El flujo utilizará `streamText` desde el servidor en `app/api/chat/route.ts` hacia el hook `useChat` reactivo en el frontend.

Aquí tienes una ficha técnica estructurada en formato Markdown, ideal para copiar y pegar directamente en tu archivo `README.md`.

Esta ficha define una arquitectura **Full-Stack basada en Next.js (App Router)** para aprovechar al máximo el ecosistema de Vercel, manteniendo la estética retro e incorporando el chatbot interactivo con Vercel AI SDK.

---

# 🕹️ Ficha Técnica del Proyecto: Portafolio Web Retro + AI Chatbot

Este documento describe la arquitectura, el stack tecnológico y las dependencias necesarias para inicializar y desplegar el portafolio web con estética retro (8-bit/GUI 90s). El proyecto opera bajo una topología full-stack serverless en **Vercel**, persistencia de datos en **Cloudflare D1** y un chatbot impulsado por **Vercel AI SDK**.

## 🏗️ Arquitectura del Framework (Full-Stack)

El proyecto utiliza **Next.js (App Router)** como meta-framework full-stack, desplegado nativamente en Vercel. Esta decisión permite manejar tanto el frontend reactivo como las funciones de backend (Route Handlers) en un solo repositorio.

* **Frontend (Cliente):** Componentes de React estilizados con Tailwind CSS y frameworks retro (`NES.css` o `98.css`). Maneja el renderizado de la UI de 8-bits y el estado local del chatbot interactivo.
* **Backend (Servidor/Vercel Functions):** Rutas de API en Next.js (`/api/*`) que actúan de puente seguro para procesar las peticiones del chatbot hacia proveedores de LLM (como OpenAI) y para enviar consultas proxy hacia la base de datos Cloudflare D1.
* **Base de Datos (Edge):** Cloudflare D1 (SQLite serverless) estructurado y consultado preferiblemente mediante **Drizzle ORM** para garantizar seguridad de tipos (Type-safety).

## 📦 Dependencias NPM (Instalación Inicial)

Para configurar el entorno de trabajo exacto, ejecuta los siguientes comandos en la raíz del proyecto inicializado con Next.js:

### 1. Núcleo y Meta-Frameworkbash

npx create-next-app@latest mi-portafolio-retro

# (Seleccionar: TypeScript, Tailwind CSS, App Router)

```

### 2. Motor de Estilos Retro (Frontend)
Instalación de las dependencias estéticas base y tipografías autoalojadas para evitar parpadeos de carga y mantener la ilusión de 8-bits:
```bash
npm install nes.css @fontsource/press-start-2p

```

*(Nota: Tailwind CSS ya viene incluido con el comando de Next.js. El archivo `tailwind.config.ts` deberá configurarse para inyectar los bordes de `box-shadow` duro y utilidades como `image-rendering: pixelated`).*

### 3. Vercel AI SDK (Chatbot)

Paquetes oficiales de Vercel para integrar flujos de texto en tiempo real (streaming) desde el LLM hacia la interfaz del portafolio:

```bash
npm install ai @ai-sdk/react @ai-sdk/openai

```

### 4. Capa de Base de Datos (Conexión a Cloudflare D1)

Herramientas para modelar la base de datos de manera declarativa y abstraer las consultas SQL:

```bash
npm install drizzle-orm
npm install -D drizzle-kit

```

## 🤖 Integración del Chatbot (Vercel AI SDK)

El SDK de Vercel simplifica la creación de experiencias conversacionales sin tener que gestionar websockets o estados complejos manualmente. El flujo del chatbot se divide en dos archivos clave dentro de Next.js:

**1. El Backend (Ruta de API - `app/api/chat/route.ts`):**
Utiliza la función `streamText` del SDK para conectar con el modelo (ej. OpenAI `gpt-4o-mini`) y devolver una respuesta en flujo de datos continua al cliente.

**2. El Frontend (Componente React - `app/components/RetroChatbot.tsx`):**
Utiliza el hook de React `useChat` proporcionado por `@ai-sdk/react`. Este hook maneja automáticamente el array de mensajes, el estado de carga y el envío del formulario.

*Tip de Diseño Retro:* Puedes envolver la salida de los mensajes del hook `useChat` dentro de componentes contenedores de `NES.css` (como `<div className="nes-container with-title">`) para que el bot parezca un NPC de un clásico juego de rol RPG.

## 🚀 Variables de Entorno Requeridas (`.env.local`)

Para que la arquitectura inter-nube y el chatbot funcionen de forma segura tras el despliegue en Vercel, se deben configurar los siguientes secretos en el panel de Vercel:

* `OPENAI_API_KEY`: Llave para el proveedor del LLM del chatbot.
* `CLOUDFLARE_ACCOUNT_ID`: ID de tu cuenta de Cloudflare.
* `CLOUDFLARE_DATABASE_ID`: Identificador único de tu volumen D1.
* `CLOUDFLARE_API_TOKEN`: Token con permisos restringidos de lectura/escritura exclusiva para D1.

```

```
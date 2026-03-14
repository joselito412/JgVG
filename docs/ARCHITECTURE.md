# 🏗 Arquitectura Base (ARCHITECTURE.md)

El proyecto adopta un robusto **enfoque Server-First** gracias al App Router de Next.js, lo que permite minimizar el JavaScript enviado al cliente y delegar cálculos pesados, caché dinámica y búsquedas en la base de datos (Supabase) directamente al Edge/Backend.

Dada su dualidad, usa un estilo inspirando en **Feature-Sliced Design (FSD)** y **Módulos Lógicos** para evitar directorios infinitamente planos.

---

## 🗺 Directorio (Tree)

```bash
📦 TuAvocado / MyPersonalPage
 ┣ 📂 .antigravity/        # Contexto privado y directrices de Inteligencia Artificial locales (Regla de Aislamiento).
 ┣ 📂 docs/                # [ESTE DIRECTORIO] Repositorio de la única y verdadera documentación técnica e índice.
 ┣ 📂 public/              # Archivos estáticos inyectables, SVG, y rutas para exposición MCP/LLM (llms.txt).
 ┣ 📂 src/
 ┃ ┣ 📂 app/               # 🚦 Next.js App Router: Contratos de enrutamiento, Layouts, APIs y Páginas (Server Components).
 ┃ ┣ 📂 components/        # 🧩 UI Pura: Directorio base estricto de Shadcn/Radix, fragmentos de código, e iconos compartibles.
 ┃ ┣ 📂 hooks/             # 🎣 Custom Hooks (Estado cliente, listeners de ratón o teclado).
 ┃ ┣ 📂 lib/               # 🛠️ Utilidades Globales: Funciones helper, formateadores y uniones de clases (Tailwind merge).
 ┃ ┗ 📂 modules/           # 📦 Dominios de Negocio: La verdadera alma de la app particionada por "Features".
 ┃   ┣ 📂 core/            # (Ej. Layouts globales, menús, Taskbars).
 ┃   ┣ 📂 database/        # (Instancias de db, migraciones Drizzle y Server Actions base).
 ┃   ┣ 📂 identity/        # (Lógica de portafolio, RPG Stats, Skills, Experiencia).
 ┃   ┗ 📂 ai/              # (Configuración de LangChain/Verel SDK, Prompts, LLM Orchestration).
 ┣ 📂 supabase/            # 🐘 Configuración Drizzle/Postgres: Archivos locales `config.toml`, migraciones, seed.
 ┣ 📜 next.config.mjs      # Enrutamiento especial HTTP.
 ┣ 📜 package.json         # Master manifest de dependencias y scripts CLI.
 ┗ 📜 tailwind.config.js   # Master visual de paletas y variables de diseño.
```

---

## 🏛 Patrones de Diseño Arquitectónico

### 1. Colocación Dominio-Dependiente (`/modules`)
El código que pertenece exclusivamente a una funcionalidad grande o área de negocio (ej. Componentes biográficos, Actions del Agente IA) vive dentro de su propia carpeta en `src/modules/{feature}`. **Nunca** debe contaminar la carpeta global `src/components/`, la cual está estrictamente reservada para botones, tarjetas abstractas, o elementos de interfaz genéricos.

### 2. Server Components vs Client Boundary (`"use client"`)
- De forma predeterminada, todo en `src/app` es un servidor. 
- Los componentes interactivos (ej. formularios de auth, chats de burbuja, ventanas flotantes `Win95`) usan tempranamente directivas `"use client"` dentro de sus árboles modulares, garantizando que todo el layout circundante asiduo (SEO/AIO metadata) se renderice e indexe en origen sin fallos de hidratación.

### 3. Server Actions como API RPC
En lugar de depender cien por cien de rutas tontas `/api/rest`, las escrituras directas a la base de datos (PostgreSQL) son ejecutadas en el mismo árbol del servidor invadiendo el ORM (`Drizzle`) a través del uso de funciones asíncronas marcadas como **Server Actions**, con inyección inmediata en el formulario del lado cliente.

# Fases Pendientes & Roadmap de Producción

Este documento sirve como registro (backlog) de las funcionalidades estructurales, backend y de IA que han sido documentadas y preparadas, pero que se han pausado intencionalmente para iterar y pulir la experiencia de usuario (UX) y la interfaz gráfica (UI) de la aplicación.

## 1. Sistema de Autenticación Real (Authwall)
- **Estado Actual:** Contamos con un estado simulado en `MisClasesPanel.tsx` (`showAuthwall`).
- **Objetivo:** 
  - Integrar Supabase Auth.
  - Proteger las rutas de contenido exclusivo (`/clases`, `/recursos`).
  - Lógica de Sign-In / Sign-Up.
  - Conectar el ID de usuario autenticado con la base de datos `users`.

## 2. Panel de Administrador (CMS Dashboard)
- **Estado Actual:** Los *Server Actions* (CRUD) requeridos en el backend ya están construidos en `src/modules/database/admin-actions.ts`.
- **Objetivo:**
  - Construir la interfaz de usuario en la ruta `/admin/terminal`.
  - Crear formularios para agregar, editar y eliminar Servicios, Módulos de Clases, Clases individuales y Prompts.
  - Validar que únicamente cuentas con el rol `admin` puedan acceder a esta vista y modificar la BD.

## 3. Integración del Agente de IA (ChunGPT / LangGraph)
- **Estado Actual:** La interfaz del chat flotante interactivo existe visualmente pero usa un placeholder.
- **Objetivo:**
  - Conectar el frontend con el backend del agente (LangChain/LangGraph/vLLM).
  - Asegurar la persistencia de los hilos conversacionales.
  - Desplegar la lógica de las "Skills" (Laboral, Familia) y el enrutador inteligente.

## 4. Configuración de Dominio y Despliegue en Producción (Vercel)
- **Estado Actual:** El proyecto corre en local y la base de datos en Supabase CLI.
- **Objetivo:**
  - Adquirir/Asignar dominio personalizado (ej. `tuavocado.com` o el portafolio).
  - Configurar las variables de entorno de Supabase Production (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, etc.) en Vercel.
  - Configurar los DNS (A, CNAME) en el proveedor de dominio apuntando a Vercel.
  - Ejecutar la migración inicial de la base de datos en el entorno de Supabase remoto (`npx supabase db push --linked`).

---
*Nota: Este documento asegura que no perdamos de vista estos requerimientos críticos del proyecto mientras enfocamos los siguientes sprints netamente en la excelencia visual, tipográfica e interactiva de la identidad web.*

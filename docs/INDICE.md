# 📚 Documentación Técnica (TuAvocado / MyPersonalPage)

Bienvenido al índice central de la documentación del proyecto. Este repositorio actúa como la fuente única de verdad para la arquitectura, infraestructura, diseño y operaciones del sistema.

Para asegurar un desarrollo escalable e integraciones precisas (especialmente guiadas por Agentes IA), la documentación está separada por áreas modulares de responsabilidad.

---

## 🗺 Directorio de Manuales

### 1. Guía Central (Core)
*Punto de partida y arquitectura de alto nivel.*
- [📌 Resumen Ejecutivo del Proyecto (PROJECT_OVERVIEW.md)](./PROJECT_OVERVIEW.md)

### 2. Arquitectura y Frontend (UI/UX)
*Estructura del ecosistema React e interfaces gráficas.*
- [🏗 Arquitectura Base (ARCHITECTURE.md)](./ARCHITECTURE.md)
- [🎨 Stack Tecnológico y Frameworks (TECH_STACK_AND_FRAMEWORKS.md)](./TECH_STACK_AND_FRAMEWORKS.md)

### 3. Backend, Datos y Autenticación (Supabase)
*Capa de infraestructura de base de datos y control de accesos.*
- [🗄 Modelado de Datos y ORM (DATABASE_AND_ORM.md)](./DATABASE_AND_ORM.md)
- [☁️ Entornos Supabase: Local vs Cloud (SUPABASE_ENVIRONMENTS.md)](./SUPABASE_ENVIRONMENTS.md)
- [🔐 Sistema de Autenticación y Onboarding (AUTH_SYSTEM.md)](./AUTH_SYSTEM.md)

### 4. Inteligencia Artificial y Agentes
*Cerebro lógico, RAG y automatización legal.*
- [🤖 Arquitectura del Agente IA y ChunGPT (AI_AGENT_ARCHITECTURE.md)](./AI_AGENT_ARCHITECTURE.md)
- [🌐 Optimización AI-First (AIO) y Búsqueda (AIO_AND_SEARCH_STRATEGY.md)](./AIO_AND_SEARCH_STRATEGY.md)

### 5. Operaciones y Mantenimiento (DevOps)
*Flujos de trabajo para ingenieros de software e integradores.*
- [⚙️ Control de Versiones Git y Seguridad (GIT_WORKFLOW_AND_SECURITY.md)](./GIT_WORKFLOW_AND_SECURITY.md)
- [🚀 Despliegue en Producción (DEPLOYMENT.md)](./DEPLOYMENT.md)

---

## 🚦 Reglas para Escribir Documentación
Si eres un humano o un agente de Inteligencia Artificial colaborando en este proyecto, **debes seguir el siguiente estándar:**

1. **Modularidad:** Nunca agrupes conceptos de Frontend en archivos de Backend. Si un nuevo módulo abarca ambos mundos, actualiza las guías correspondientes mediante referencias cruzadas.
2. **Claridad sobre los Supuestos:** Si documentas un script local, debes aclarar qué variables de entorno explícitas requiere.
3. **Identidad del Ecosistema:** Cualquier código propuesto debe respetar la arquitectura Server-First (NextJS App Router) usando Drizzle ORM y la SDK de Vercel AI en su capa lógica.

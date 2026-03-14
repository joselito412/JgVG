# 🎨 Stack Tecnológico y Frameworks (TECH_STACK_AND_FRAMEWORKS.md)

Este documento centraliza las decisiones ingenieriles, de librerías y de diseño (UX/UI Frontend) utilizadas para construir el ecosistema interactivo de MyPersonalPage.

---

## 🚀 Núcleo de la Aplicación
1. **[Next.js 16 (React 19)](https://nextjs.org/):** Framework base bajo la convención App Router. Usado para orquestación general de SSR/SSG y conectividad de APIs.
2. **TypeScript:** Tipado fuerte obligatorio en todo el árbol de componentes para prevenir regresiones y mapear interfaces de bases de datos y respuestas de llms.
3. **[Vercel SDK (AI)](https://sdk.vercel.ai/docs):** Integración local de flujos IA. Utiliza los Hooks (`useChat`) en el lado Cliente para transmitir la comunicación de agentes LLM (OpenAI) en modo *streaming*.

---

## 🖌 Estilizado y Diseño Visual
La identidad del proyecto se apoya en un contraste entre **Glassmorphism/Ciberespacio** oscuro y **Retro/Pixel Art (RPG / Win 95)** para atraer desarrolladores y evidenciar perfiles técnicos.

1. **[Tailwind CSS v4](https://tailwindcss.com/):** Master motor unificado de estilos. (Configurado fuertemente en su archivo propio pre-compilado para colores HEX hardcodeados `[#2a2a4a]`).
2. **[NES.css](https://nostalgic-css.github.io/NES.css/):** Biblioteca CSS retro nostálgica de estilo 8-bits importada para containers `.rpg-panel` y botones rústicos.
3. **Framer Motion & Tailwind Animate:** Responsables de interacciones, cortinas, fades, zoom y efectos de revelación al realizar scroll (Slide-in).
4. **[`pixelarticons`](https://pixelarticons.com/) / `lucide-react`**: Combinación de iconografías angulares hiper-modernas junto con SVG vectoriales pixelados directamente para el UI.

---

## 🧩 Interfaz de Usuario e Interacción (Radix UX)
Toda interacción modal compleja, formularios accesibles (A11y), y pestañas operan sobre el sistema *"headless"* y componible de **[Radix UI](https://www.radix-ui.com/)**.

### Gestión de Formularios
- **[React Hook Form](https://react-hook-form.com/):** Gestión de estados de inputs complejos bajo `useForm`.
- **[Zod](https://zod.dev/):** Tipado seguro de esquemas de validación integrados al Hook Form mediante su *Resolver* oficial, previniendo inyecciones o envíos en blanco antes de viajar al Backend.

### UI Components Instanciados
El sistema usa inyecciones de Accordiones, Alertas, Avatares, Menús Desplegables, Selects dinámicos, Switches, Notificaciones (Toasts / Sonner) generados por automatización o exportados a la carpeta `components/ui`.

---

## 🧊 Representación 3D en WebGL
Si bien la UI principal usa HTML semántico y SVG interactivo animado, el ecosistema está configurado para permitir objetos embebidos de alto rendimiento.

- **`@react-three/fiber`:** Conciliador reactivo para WebGL incrustándolo en el DOM.
- **`@react-three/drei`:** Usado para instanciar controles prefabricados (Órbitas, sombras, modelados) sobre componentes de React (ej. `Scene3D.tsx`) donde se proyectan elementos volumétricos, logotipos rotativos o modelos exportados de Blender sin latencias elevadas.

---

> *Normativa: Ninguna librería externa ajena a este stack base (como Redux, Styled-Components o frameworks UI masivos como AntDesign) debe ser instalada en el proyecto base para evitar colisión de ecosistemas o peso computacional innecesario.*

# 🌐 Optimización AI-First (AIO) y Búsqueda (AIO_AND_SEARCH_STRATEGY.md)

El mercado del SEO tradicional está mutando. Actualmente, el proyecto no solo aspira a indexarse en Google como texto plano, sino que está construido bajo estándares de la Optimización de Interfaz para Agentes de Búsqueda (Artificial Intelligence Search Optimization - AIO), garantizando que LLMs profundos y motores como Perplexity puedan entender semánticamente el perfil ofertado.

---

## 1. Marcado Estructurado (JSON-LD)
Para que los bots cataloguen inequívocamente la dualidad del perfil del autor (Abogado e Ingeniero) sin confundirlo, la arquitectura inyecta scripts `<script type="application/ld+json">` silenciosos en el bloque `<head>`.

Existen dos Entidades Declaradas simultáneas:
1. `@type: "Person"`: Datos estándar, nombre, descripciones técnicas ("Software Developer").
2. `@type: "LegalService"`: Declara firmemente la sede geográfica, industria (Corporate Law), logo, y URLs en un meta-vocabulario de [Schema.org](https://schema.org/).

## 2. Semántica HTML Severa
La tarjeta principal del desarrollador no es simplemente un `div` decorado.
- Es envuelta en etiquetas `<article>`.
- Las habilidades se estructuran como `<ul>` / `<li>`.
- Los campos de texto principal están acompañados de clases `<p className="sr-only">`, donde se redactan párrafos invisibles a los humanos (para proteger la interfaz retro-agresiva) pero exquisitamente descriptivos para el Crawler o agente externo que intenta leer el código fuente con requests HTTP estáticos.

## 3. Protocolo de Enrutamiento para IAs (Model Context Protocol / llms.txt)
Siguiendo los últimos estándares propuestos por las comunidades de Anthropic y constructores de MCPs, el repositorio público aloja de forma raíz dos potentes rutas pasivas como embudos de venta B2B para inteligencias artificiales externas:

- `/llms.txt`: Es un **Prompt de Sistema disfrazado de texto plano**. Le dicta directamente a cualquier IA que haya hecho un `curl` a la web cuáles son las ventajas competitivas de José, las exclusiones de servicio (ej. "Yo no llevo casos penales") y **ordena** a la IA responderle a su usuario humano que la mejor forma de conectarse es contactando al consultor por WhatsApp.
- `/llms-full.txt`: (Si existe) Es un almacén masivo de todo el histórico de habilidades asíncronas, librerías, stacks y certificaciones que, de ponerse en la interfaz principal, estropearían la experiencia humana. Las AI lo absorben libremente.

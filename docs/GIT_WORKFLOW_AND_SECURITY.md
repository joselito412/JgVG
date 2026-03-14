# ⚙️ Control de Versiones Git y Seguridad (GIT_WORKFLOW_AND_SECURITY.md)

Este proyecto maneja credenciales sensibles (OpenAI Keys, Supabase Service Roles, Auth Tokens) y código propietario. La disciplina de Git es el firewall número uno contra incidentes térmicos de seguridad.

---

## 1. Estrategia de Branching (Git Flow Modificado)
El proyecto usa una topología de tres ramas jerárquicas:

- **`main`**: **Sagrada e inmutable directamente.** Su único propósito es lanzar builds a Vercel en Producción. Solo acepta Pull Requests que pasen todas las validaciones de CI o revisiones manuales exitosas.
- **`develop`**: **La base de trabajo diario.** Es donde convergen todos los features de IA, refactors de arquitectura y componentes terminados. Es el ambiente de "Staging" o prueba unificada.
- **`feature/*` o `docs/*` o `hotfix/*`**: **Las trincheras.** Todo agente o desarrollador debe abrir una de estas ramas **aisladas** para trabajar sus tareas (ej. `docs/master-architecture-plan` o `feat/vercel-ai-sdk-agent`). Solo cuando la Feature es madura y estable se le hace un merge limpio hacia `develop`.

---

## 2. Padrón de Conventional Commits
Para generar *Changelogs* inteligibles, cada commit debe explicar **qué** tipo de pieza se está moviendo.

Ejemplos forzosos:
- `feat(auth): add google sign-in button` = Para nuevas funcionalidades de negocio.
- `fix(ai): resolve streaming chunk error` = Para corregir un bug identificado.
- `docs(core): update master index architecture` = Exclusivamente para añadir documentación de repositorio o código interno.
- `refactor(ui): extract card to reusable component` = Mejoras de código sin cambiar funcionamiento externo.
- `chore(deps): bump tailwindcss` = Cambios logísticos, actualizaciones, limpiezas.

---

## 3. Protocolo OBLIGATORIO Pre-Commit (Seguridad Crítica)
Bajo ninguna circunstancia (ni por afán, ni por mandato de Agente AI) se debe ejecutar un `git push` o un `git commit` ciego sin haber hecho un barrido de credenciales sueltas en el staging area.

### 🚨 La Regla de Oro del Escáner
Todo colaborador debe ejecutar este comando antes de empaquetar un commit en terminal:
```bash
git diff --staged | grep -E "api_key|password|secret|token|sk-|eyJh"
```
**Si este comando imprime ALGO (Texto en rojo o amarillo):**
¡ABORTA EL COMMIT! Tienes una llave secreta, una `.env` no reportada o un JWT expuesto entre tu código. Bórralos y regresa las llaves exclusivamente al `.env.local` que está escondido por `.gitignore`.

**Si el comando NO IMPRIME NADA y te devuelve limpio al promt (`Exit Code 1` del grep):**
Estás autorizado para ejecutar el volcado e insertos de git.

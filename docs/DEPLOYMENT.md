# 🚀 Despliegue en Producción (DEPLOYMENT.md)

Cuando una iteración en `develop` está probada, aprobada, y fue fusionada (`Merged`) con éxito hacia la rama sagrada `main`, inicia el proceso de despliegue en arquitectura serverless.

---

## 1. El Frontend (Plataforma Vercel)
**Vercel** es la casa de *Next.js*. Absorbe tu repositorio Git e intercepta todas las funciones `app/api/*` para empaquetarlas como funciones Lambda asíncronas globales (Serverless).

### Configuraciones Primordiales (Vercel Dashboard)
- **Node Version:** El framework de este proyecto exige que Vercel esté corriendo Node.js >= `18.x` (Preferiblemente `20.x`).
- **Build Command:** De preferencia dejar el nativo por defecto de next (`npm run build`), quien avisará si algún tipo en el Tree tiene errores TypeScript antes de subir.
- **Root Directory:** Apuntar al directorio base (`/`).

---

## 2. El Backend as a Service (Supabase Cloud API)
La Base de Datos PostgreSQL del local *no se transfiere automágicamente*.
La infraestructura (Postgres Server) de Producción es una isla separada en la web app de Supabase.

### Pasos obligatorios del Pipeline de Subida
1. **La Migración de Tablas y Seguridad (RLS):**
   ```bash
   npx supabase link --project-ref [PROD_PROJECT_ID]
   npx supabase db push
   ```
   *Esto aplica todas las creaciones de tablas que tengas mapeadas localmente a la Nube.*
2. **El Puente de Variables (Inyectar Cloud Env Vars):**
   El código en Vercel morirá si busca la base de datos en `127.0.0.1`.
   Debes pegar las URIs oficiales proporcionadas por Supabase Cloud (**URL** y **Anon Key**) en las Entorno Variables del Vercel Dashboard.

---

## 3. Post-Despliegue: Proveedor de Auth
Supabase Local usa contenedores tontos para simular el inicio de sesión.
El Supabase de la nube necesita un **Client ID** y un **Client Secret** oficial expedido por Google Cloud Console (O el proveedor OAuth que estés utilizando).

Si un usuario en `tuavocado.com` da clic en Iniciar Sesión con Google y falla, es altamente probable que el redirect en el Dashboard de GCP no se haya apuntado correctamente al dominio *`.supabase.co/auth/v1/callback`* de tu proyecto de producción.

---

### Diagnóstico de Despliegue Fallido (`ECONNREFUSED` vs Tiempo de Espera)
- Si Vercel se queda congelado pensando y lanzando Internal Server Error, revisa si algún Server Action se atascó esperando respuesta indefinida de una API externa no configurada (Ej. Vercel AI SDK sin el `OPENAI_API_KEY` inyectado en producción).

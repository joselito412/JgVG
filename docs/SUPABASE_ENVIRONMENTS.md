# ☁️ Entornos Supabase: Local vs Cloud (SUPABASE_ENVIRONMENTS.md)

Este es un entorno Híbrido. Usamos la API de un BaaS (Backend as a Service) pero controlamos la ingeniería con infraestructura separada.

---

## 1. Supabase Local CLI (Entorno de Desarrollo)
El código en las ramas locales `develop` y sub-ramas asume que tienes un contenedor de Docker ejecutando Supabase enteramente dentro de tu máquina.

- **URL de Conexión Local Fija:** `http://127.0.0.1:54321` o `127.0.0.1:54322`
- **Llaves Públicas:** Para uso en desarrollo están hardcodeadas en una pseudo-generación, el archivo `.env.local` debe apuntar localmente así:
  `NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321`

### Inicializar y Detener:
```bash
npx supabase start    # Lanza todos los contenedores Docker detrás de escena
npx supabase stop     # Libera memoria de la PC
```
*(Nota: El Dashboard de este puerto está en `http://127.0.0.1:54323` donde puedes simular Autenticación, enviar correos falsos Inbucket y ver los registros de logs).*

---

## 2. Supabase Cloud (Entorno Producción Vercel)
Cuando la rama hace el salto a `main` y despliega en Vercel, Supabase funciona remotamente. A diferencia del Docker, el puerto de la nube cobra costo computacional.

**Las llaves en tu Dashboard de Vercel (Producción) son totalmente distintas al archivo localhost.** Nunca mezcles el `NEXT_PUBLIC_SUPABASE_ANON_KEY` de la nube con tu entorno de depuración.

### The Linked Bridge (`supabase link`)
Tu terminal Git local tiene la memoria de conexión con el proyecto central (usando el Reference ID en `.supabase/project-ref`).
Antes de subir migraciones a producción, debes inyectarlas vía terminal:
```bash
npx supabase db push
```

**ATENCIÓN a la Falla Frecuente (ECONNREFUSED):** Si en terminal obtienes errores masivos de Next.js, 90% del tiempo es porque corriste `npm run dev` sin haber puesto a rodar `npx supabase start` primero. El Server de React intenta recuperar la sesión en un puerto bloqueado y falla el Build.

# Guía de Despliegue a Producción (Backend Supabase)

Actualmente, el proyecto está usando un contenedor de Docker local (`127.0.0.1:54322`) para la Base de Datos y la Autenticación. Cuando hagas `git push` a la rama `main` y Vercel despliegue el frontend, la web de producción se romperá si no conectas un backend real en la nube.

Esta guía documenta los pasos para hacer la transición hacia Producción.

## Paso 1: Crear el Proyecto en Supabase
1. Ingresa a [Supabase.com](https://supabase.com/) e inicia sesión.
2. Crea un nuevo proyecto llamado `JvGV Portfolio` (o similar).
3. Guarda bajo llave la contraseña de la Base de Datos que asignes en este momento.

## Paso 2: Vincular tu código local con el proyecto en la Nube
Para que el CLI sepa a dónde mandar tu arquitectura local, debes vincularlos:
1. En la configuración de tu proyecto en Supabase (Settings > General), busca el **Reference ID** (un código como `abcdefghijklmno`).
2. En tu terminal (en VSCode/Cursor), ejecuta: 
   ```bash
   npx supabase link --project-ref [TU_REFERENCE_ID]
   ```
   Te pedirá inicio de sesión o un Access Token de Supabase.

## Paso 3: Empujar la Base de Datos y las Políticas (RLS)
Tu base de datos en la nube está vacía. Para copiar las tablas (`users`), los tipos y las reglas de seguridad (RLS) que ya programamos, corre en la terminal:
```bash
npx supabase db push
```
Esto aplicará todas las migraciones en la carpeta `supabase/migrations/` a tu base de producción.

## Paso 4: Configurar Variables de Entorno en Vercel
Vercel necesita saber a dónde conectarse.
1. En Supabase, ve a **Project Settings > API**.
2. Copia el **Project URL** y el **anon `public` key**.
3. En el dashboard de Vercel de tu proyecto, ve a **Settings > Environment Variables**.
4. Agrega estas dos variables (exactamente iguales que en tu `.env.local`):
   - `NEXT_PUBLIC_SUPABASE_URL` = [Pegar Project URL]
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = [Pegar Anon Key]

## Paso 5: Configurar Google Auth en la Nube (Crucial)
En modo local de desarrollo, Google Auth a veces falla o está simulado porque no hay llaves reales. En producción, **DEBES** suministrar claves reales:
1. Ve a [Google Cloud Console](https://console.cloud.google.com).
2. Crea un proyecto y ve a **APIs & Services > Credentials**.
3. Crea un "OAuth client ID" (Aplicación Web).
4. Como "Authorized redirect URIs" debes colocar: `https://[TU_PROYECTO_SUPABASE_REFERENCE_ID].supabase.co/auth/v1/callback`
5. Google te dará un **Client ID** y un **Client Secret**.
6. Vuelve a Supabase > **Authentication > Providers > Google**.
7. Enciende el switch, y pega el Client ID y el Client Secret. Guarda.

## Finalización
Tu Backend ya es de producción, está seguro y Vercel está conectado. Ya puedes hacer un re-deploy en Vercel para probar el flujo online.

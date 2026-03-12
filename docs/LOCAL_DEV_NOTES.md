# Notas de Desarrollo Local

## Autenticación de Pruebas (Bypass Local)
Para evitar los problemas de redirección y configuración de Google OAuth en el entorno de desarrollo local (`localhost:3000`), hemos habilitado un formulario de "Acceso Local Directo" en la parte inferior de la página de Login (`/login`).

### Credenciales de Admin (Provisionales)
- **Correo:** `jguiller412@gmail.com`
- **Contraseña Provisionada (Hardcoded bypass):** `AMIG0S:fELICES`

Al autenticarte con este correo mediante el formulario de Bypass Local:
1. El sistema creará o accederá a la cuenta de Supabase de forma nativa (Email/Password).
2. Automáticamente se te asignará el rol de `admin` en la base de datos `users`.
3. Pasarás por la pantalla de Onboarding la primera vez para recolectar tus intereses/rol profesional.
4. Serás redirigido a `/profile` con los datos cargados desde la DB.

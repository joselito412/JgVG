# Re-evaluación Product & UX: Flujo de Autenticación y Roles

*Perspectiva: Product Owner & UX UI Designer*

## 1. Diagnóstico de la Experiencia Actual (UX Audit)
Actualmente, nuestra pantalla de acceso (LOGIN.EXE) presenta un problema severo de **Cognitive Overload** (Sobrecarga Cognitiva) y **Ambigüedad de Intención**.

### Puntos de Fricción (Friction Points):
- **Botones Cruzados (UI):** Tener un botón de "Registrarse" y otro de "Iniciar Sesión" apelotonados bajo los mismos campos de texto confunde al usuario. No queda claro si están llenando un formulario de creación o ingresando a una cuenta existente.
- **Errores Ciegos (UX):** Cuando un usuario intenta "Registrarse" con un correo que ya existe, o "Iniciar Sesión" con datos erróneos, el sistema actual choca silenciosamente contra el Middleware, dejándolo en un "limbo" de carga visual sin feedback claro.
- **Redirección Agresiva:** El Middleware verificando agresivamente el campo `onboarded` en cada interacción genera bloqueos (crashes de hidratación) porque compite con la visualización reactiva de Next.js.

## 2. Rediseño del User Journey (Flujo Propuesto)

Para resolver esto, debemos aplicar heurísticas de diseño limpias: **Separación de Intenciones**.

### Journey A: "El Nuevo Usuario" (Sign Up / Crear Cuenta)
1. **Intención:** El usuario aterriza en `/login`. El diseño debe mostrar claramente dos Pestañas (Tabs) estilo "Carpeta de Windows 95": `[ INICIAR SESIÓN ]` y `[ CREAR CUENTA ]`. 
2. **Acción:** Selecciona `Crear Cuenta`. Ingresa su Correo y Contraseña. 
3. **Recompensa (Feedback):** Supabase inscribe el correo. El código _backend_ (invisible) crea un registro base en nuestra tabla `users` marcándolo con su Rol (Visitor o Admin).
4. **Onboarding Obligatorio:** Es llevado fluidamente a `/onboarding` para completar su Ocupación e Interés. De esta forma, no hay perfiles "a medias" en nuestro sistema.
5. **Victoria:** Aterriza en `/profile` con todos sus datos.

### Journey B: "El Usuario Recurrente" (Log In)
1. **Intención:** El usuario aterriza en `/login` y permanece en la pestaña por defecto: `[ INICIAR SESIÓN ]`.
2. **Acción:** Ingresa sus datos.
3. **Validación Segura:** El código valida la contraseña.
4. **Verificación de Completitud (El "Bouncer"):** En lugar de que un "Middleware" inestable intente leer la Base de Datos a la fuerza e interrumpa el renderizado visual, el usuario entra directamente al Layout protegido `(protected)`. Es **ese componente visual** el que dice: *"Un momento ¿terminaste tu Onboarding? Sí. Pasa al Profile"*. Si no lo terminó, renderiza sin errores el formulario `/onboarding`.

## 3. Hoja de Ruta Técnica (Actionable Items)

Como Product Owner, apruebo este plan pero exijo las siguientes implementaciones técnicas al área de desarrollo:

1. **Refactor de Interfaz (UI):** Construir un componente `Tabs` (Pestañas) en Tailwind CSS que encaje con el tema Retro, dividiendo estrictamente el formulario de Email/Password en dos estados: Modo Login y Modo Registro.
2. **Simplificar Middleware:** Reducir el `middleware.ts` para que **solo** verifique si existe una "sesión/cookie" (estrictamente técnico y liviano). 
3. **Nuevo "Guardia de Seguridad" (HOC):** Crear un componente "Wrapper" alrededor de las páginas `/profile` y `/onboarding` que lea la tabla de `users` desde el lado seguro y fuerte del Servidor (Server Component), asegurando que los Redireccionamientos ocurran sin crashear el navegador local del usuario.
4. **Consistencia de Google Auth:** Asegurar que, cuando el proyecto pase a producción, el gran botón de "Entrar con Google" se beneficie de esta misma segregación limpiamente (con un solo clic el usuario pasará por la creación silente en DB y llegará al Onboarding).

---
*Conclusión de Diseño: Este plan elimina la fricción técnica, asegura que no hayan "Registros a medias" (perfiles vacíos) y le da al visitante una ruta clara a seguir desde el primer vistazo.*

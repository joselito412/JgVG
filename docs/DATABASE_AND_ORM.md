# 🗄 Modelado de Datos y ORM (DATABASE_AND_ORM.md)

Aunque Supabase incluye potentes wrappers nativos para operaciones CRUD (`@supabase/supabase-js`), en este proyecto la capa de datos está estrictamente delegada a **[Drizzle ORM](https://orm.drizzle.team/)**.

## 1. El Porqué (Drizzle vs Supabase Client)
1. **Tipado Fuente de Verdad:** Drizzle infiere los tipos de TypeScript directamente desde la definición de la tabla en código, evitando generar tipos abstractos desde la nube (no necesitas hacer `supabase gen types` frecuentemente).
2. **Consultas Complejas:** Las relaciones (JOINs) pesadas y agrupaciones se leen y estructuran más parecido a SQL nativo pero con sintaxis JSX reactiva.
3. **Migraciones Versionadas:** Mantenemos la estructura de la base de datos en control de versiones Git en carpetas dedicadas.

---

## 2. Esquemas (Estructura de Tablas)
Los esquemas viven dispersos según la arquitectura de negocio (*Domain Driven*).
Por ejemplo, la tabla central de perfiles es gestionada por el módulo de identidad, pero a nivel base de datos se consolida en:
`src/lib/database/schema.ts` o en los sub-módulos `modules/database/schema/*`.

### Tablas Principales Actuales
1. **`users`**: Extiende la seguridad de la tabla interna `auth.users` de Supabase. Almacena el `id` original, el email, roles y perfiles booleanizados (`onboarded`, `role: admin|visitor`).
*(Nota: Para la escritura del Agente, existen tablas accesorias para Skills y Tareas, dependientes del diseño del momento).*

---

## 3. Server Actions (Patrón Mutacional)
No se usan APIs `/api/rest` para guardar datos normales. 
Cuando un formulario interactivo necesita hacer INSERTS o UPDATES, lo hace a través de módulos asíncronos en Next.js conocidos como **Server Actions**.

### Flujo Estándar de una Acción (Ej. Crear Prompt)
1. El Cliente lanza `onSubmit`.
2. Zod Server-Side valida que los datos no estén maliciosamente modificados.
3. La acción llama a Drizzle: `await db.insert(table).values(data)`.
4. Devuelve un Status. Si fue exitoso, el frontend usa `revalidatePath('/admin')` para refrescar los datos automáticamente desde caché.

---

## 4. Workflows de Consolidación (Clonado BD)
El `drizzle-kit` es la herramienta de la CLI usada para leer tus variables de entorno y mapear los cambios a SQL puro.

```bash
# Sincroniza el código en local contra tu Docker de Supabase
npm run db:push 

# Abre una interfaz gráfica (CMS) para ver tus tablas si no quieres abrir el puerto 54323 de Supabase local
npm run db:studio
```

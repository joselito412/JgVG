import { db } from '../src/modules/database/db-client';
import { users } from '../src/modules/database/schema';
import { eq } from 'drizzle-orm';

async function main() {
  const email = 'jguiller412@gmail.com';
  console.log("Fixing onboarded state for:", email);
  
  await db.update(users).set({ onboarded: true }).where(eq(users.email, email));
  
  const result = await db.query.users.findFirst({
    where: eq(users.email, email)
  });
  console.log("Final User State:", result);
}
main();

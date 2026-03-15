import { client } from './src/modules/database/db-client';

async function run() {
  try {
    await client`ALTER TABLE "chat_sessions" ALTER COLUMN "user_id" DROP NOT NULL;`;
    console.log("Migration executed successfully.");
  } catch (error) {
    console.error("Error executing migration", error);
  } finally {
    process.exit(0);
  }
}

run();

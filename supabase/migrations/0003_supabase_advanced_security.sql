-- =========================================================================================
-- SUPABASE ADVANCED FEATURES (PRE-DEPLOYMENT)
-- This migration activates Row Level Security (RLS), User Sync Triggers & Realtime.
-- =========================================================================================

-- 1. ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
-- -----------------------------------------------------------------------------------------
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "projects" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "services" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "class_modules" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "classes" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "prompts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "chat_sessions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "chat_messages" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "document_embeddings" ENABLE ROW LEVEL SECURITY;


-- 2. CREATE RLS POLICIES FOR 'users'
-- -----------------------------------------------------------------------------------------
-- Authenticated users can view and update ONLY their own profile.
CREATE POLICY "Users can view own profile" 
ON "users" 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON "users" 
FOR UPDATE 
USING (auth.uid() = id);


-- 3. CREATE RLS POLICIES FOR CMS CONTENT (projects, services, classes, prompts)
-- -----------------------------------------------------------------------------------------
-- Everyone (even anonymous visitors) can view CMS content
CREATE POLICY "Public CMS View (projects)" ON "projects" FOR SELECT USING (true);
CREATE POLICY "Public CMS View (services)" ON "services" FOR SELECT USING (true);
CREATE POLICY "Public CMS View (class_modules)" ON "class_modules" FOR SELECT USING (true);
CREATE POLICY "Public CMS View (classes)" ON "classes" FOR SELECT USING (true);
CREATE POLICY "Public CMS View (prompts)" ON "prompts" FOR SELECT USING (true);

-- Only authenticated users with the 'admin' role can mutate CMS content
-- Note: 'role' is a text column on our public 'users' table.
CREATE POLICY "Admin Only CMS Insert (projects)" ON "projects" FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM "users" WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin Only CMS Update (projects)" ON "projects" FOR UPDATE USING (
  EXISTS (SELECT 1 FROM "users" WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin Only CMS Delete (projects)" ON "projects" FOR DELETE USING (
  EXISTS (SELECT 1 FROM "users" WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admin Only CMS Insert (services)" ON "services" FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM "users" WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin Only CMS Update (services)" ON "services" FOR UPDATE USING (
  EXISTS (SELECT 1 FROM "users" WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin Only CMS Delete (services)" ON "services" FOR DELETE USING (
  EXISTS (SELECT 1 FROM "users" WHERE id = auth.uid() AND role = 'admin')
);


-- 4. CREATE RLS POLICIES FOR AI CHAT & MEMORY
-- -----------------------------------------------------------------------------------------
-- Users can only view and mutate their own chat sessions and messages.
CREATE POLICY "Users manage own chat sessions" ON "chat_sessions"
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users manage own chat messages" ON "chat_messages"
FOR ALL USING (
  EXISTS (SELECT 1 FROM "chat_sessions" WHERE "chat_sessions".id = "chat_messages".session_id AND "chat_sessions".user_id = auth.uid())
) WITH CHECK (
  EXISTS (SELECT 1 FROM "chat_sessions" WHERE "chat_sessions".id = "chat_messages".session_id AND "chat_sessions".user_id = auth.uid())
);

-- Vectors: Public read via API using Service Role (handled by SDK), but mutations are admin only.
CREATE POLICY "Admin Only AI Memory Mutation" ON "document_embeddings"
FOR ALL USING (
  EXISTS (SELECT 1 FROM "users" WHERE id = auth.uid() AND role = 'admin')
);

-- Note: In edge functions, using the Supabase Service Role Key bypasses RLS completely.
-- We will use the service role key to query embeddings so users don't need direct RLS access.


-- 5. FUNCTION & TRIGGER: AUTO-SYNC AUTH.USERS TO PUBLIC.USERS
-- -----------------------------------------------------------------------------------------
-- Automatically insert a row into our public "users" table when someone signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role, onboarded)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'visitor', -- default to lowest privilege
    false
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bind the trigger to the auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 6. ENABLE SUPABASE REALTIME
-- -----------------------------------------------------------------------------------------
-- The 'supabase_realtime' publication intercepts database changes and broadcasts them via WebSockets
BEGIN;
  -- Remove the supabase_realtime publication if it already exists to avoid errors
  DROP PUBLICATION IF EXISTS supabase_realtime;
  -- Re-create it
  CREATE PUBLICATION supabase_realtime;
COMMIT;

-- Add our chat messages table so the UI can listen to new Agent responses arriving asynchonously.
ALTER PUBLICATION supabase_realtime ADD TABLE "chat_messages";

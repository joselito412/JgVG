ALTER TABLE "users" ADD COLUMN "phone" text;
ALTER TABLE "users" ADD COLUMN "company" text;
ALTER TABLE "users" ADD COLUMN "accepted_policies" boolean DEFAULT false NOT NULL;
ALTER TABLE "users" ADD COLUMN "accepted_terms" boolean DEFAULT false NOT NULL;

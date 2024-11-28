ALTER TABLE "codes" ALTER COLUMN "project_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "email_verification_codes" ALTER COLUMN "code" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "results" ALTER COLUMN "code_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "results" ALTER COLUMN "project_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "codes" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "results" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;
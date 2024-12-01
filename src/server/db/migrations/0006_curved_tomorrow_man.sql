ALTER TABLE "codes" DROP CONSTRAINT "codes_project_id_projects_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "codes" ADD CONSTRAINT "codes_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

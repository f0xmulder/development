-- Autogenerated DDL for django module 'core'. Do not edit!
-- Regenerate using 'generate_test_sql.sh > testschema.sql'
--
BEGIN;
--
-- Create model Badge
--
CREATE TABLE "core_badge" ("id" serial NOT NULL PRIMARY KEY, "name" varchar(255) NOT NULL);
--
-- Create model API
--
CREATE TABLE "core_api" ("id" serial NOT NULL PRIMARY KEY, "api_id" varchar(255) NOT NULL UNIQUE, "api_authentication" varchar(31) NOT NULL, "api_type" varchar(31) NOT NULL, "contact_chat" varchar(255) NOT NULL, "contact_email" varchar(255) NOT NULL, "contact_fax" varchar(255) NOT NULL, "contact_phone" varchar(255) NOT NULL, "contact_url" varchar(2000) NOT NULL, "description" text NOT NULL, "forum_url" varchar(2000) NOT NULL, "forum_vendor" varchar(31) NOT NULL, "is_reference_implementation" boolean NOT NULL, "organization_name" varchar(255) NOT NULL, "scores_has_contact_details" boolean NULL, "scores_has_documentation" boolean NULL, "scores_has_specification" boolean NULL, "scores_provides_sla" boolean NULL, "service_name" varchar(255) NOT NULL, "terms_government_only" boolean NULL, "terms_pay_per_use" boolean NULL, "terms_support_response_time" varchar(255) NOT NULL, "terms_uptime_guarantee" numeric(8, 6) NULL);
--
-- Create model Relation
--
CREATE TABLE "core_relation" ("id" serial NOT NULL PRIMARY KEY, "from_api_id" varchar(255) NOT NULL, "name" varchar(255) NOT NULL, "to_api_id" varchar(255) NOT NULL);
--
-- Create model APIBadge
--
CREATE TABLE "core_apibadge" ("id" serial NOT NULL PRIMARY KEY, "api_id" varchar(255) NOT NULL, "badge_id" integer NOT NULL);
--
-- Add field badges to api
--
--
-- Add field referenced_apis to api
--
--
-- Create model Environment
--
CREATE TABLE "core_environment" ("id" serial NOT NULL PRIMARY KEY, "name" varchar(31) NOT NULL, "api_url" varchar(2000) NOT NULL, "specification_url" varchar(2000) NOT NULL, "documentation_url" varchar(2000) NOT NULL, "api_id" varchar(255) NOT NULL);
--
-- Alter field description on api
--
--
-- Alter field organization_name on api
--
--
-- Alter field service_name on api
--
--
-- Remove field scores_has_contact_details from api
--
ALTER TABLE "core_api" DROP COLUMN "scores_has_contact_details" CASCADE;
--
-- Remove field scores_has_documentation from api
--
ALTER TABLE "core_api" DROP COLUMN "scores_has_documentation" CASCADE;
--
-- Remove field scores_has_specification from api
--
ALTER TABLE "core_api" DROP COLUMN "scores_has_specification" CASCADE;
--
-- Remove field scores_provides_sla from api
--
ALTER TABLE "core_api" DROP COLUMN "scores_provides_sla" CASCADE;
CREATE INDEX "core_api_api_id_2f4913ac_like" ON "core_api" ("api_id" varchar_pattern_ops);
ALTER TABLE "core_relation" ADD CONSTRAINT "core_relation_from_api_id_5c5360dc_fk_core_api_api_id" FOREIGN KEY ("from_api_id") REFERENCES "core_api" ("api_id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "core_relation_from_api_id_5c5360dc" ON "core_relation" ("from_api_id");
CREATE INDEX "core_relation_from_api_id_5c5360dc_like" ON "core_relation" ("from_api_id" varchar_pattern_ops);
CREATE INDEX "core_relation_to_api_id_cc214e96" ON "core_relation" ("to_api_id");
CREATE INDEX "core_relation_to_api_id_cc214e96_like" ON "core_relation" ("to_api_id" varchar_pattern_ops);
ALTER TABLE "core_apibadge" ADD CONSTRAINT "core_apibadge_badge_id_ff11a4e8_fk_core_badge_id" FOREIGN KEY ("badge_id") REFERENCES "core_badge" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "core_apibadge_api_id_d68f8ec2" ON "core_apibadge" ("api_id");
CREATE INDEX "core_apibadge_api_id_d68f8ec2_like" ON "core_apibadge" ("api_id" varchar_pattern_ops);
CREATE INDEX "core_apibadge_badge_id_ff11a4e8" ON "core_apibadge" ("badge_id");
ALTER TABLE "core_environment" ADD CONSTRAINT "core_environment_api_id_314dde4b_fk_core_api_api_id" FOREIGN KEY ("api_id") REFERENCES "core_api" ("api_id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "core_environment_api_id_314dde4b" ON "core_environment" ("api_id");
CREATE INDEX "core_environment_api_id_314dde4b_like" ON "core_environment" ("api_id" varchar_pattern_ops);
COMMIT;
BEGIN;
--
-- Alter field name on environment
--
COMMIT;
BEGIN;
--
-- Alter field api_authentication on api
--
--
-- Alter field api_type on api
--
--
-- Alter field name on environment
--
COMMIT;
BEGIN;
--
-- Alter field documentation_url on environment
--
COMMIT;
BEGIN;
--
-- Remove field contact_chat from api
--
ALTER TABLE "core_api" DROP COLUMN "contact_chat" CASCADE;
--
-- Remove field contact_fax from api
--
ALTER TABLE "core_api" DROP COLUMN "contact_fax" CASCADE;
COMMIT;
BEGIN;
--
-- Alter field terms_support_response_time on api
--
ALTER TABLE "core_api" ALTER COLUMN "terms_support_response_time" TYPE integer USING "terms_support_response_time"::integer, ALTER COLUMN "terms_support_response_time" DROP NOT NULL;
ALTER TABLE "core_api" ADD CONSTRAINT "core_api_terms_support_response_time_e2919236_check" CHECK ("terms_support_response_time" >= 0);
COMMIT;
BEGIN;
--
-- Create model Event
--
CREATE TABLE "core_event" ("id" serial NOT NULL PRIMARY KEY, "title" text NOT NULL, "start_date" timestamp with time zone NOT NULL, "location" text NOT NULL, "registration_url" varchar(2000) NOT NULL, "is_published" boolean NOT NULL);
CREATE INDEX "core_event_start_date_29821cf6" ON "core_event" ("start_date");
COMMIT;
BEGIN;
--
-- Create model Config
--
CREATE TABLE "core_config" ("id" serial NOT NULL PRIMARY KEY, "variable" varchar(255) NOT NULL UNIQUE, "enabled" boolean NOT NULL);
--
-- Create model URL
--
CREATE TABLE "core_url" ("id" serial NOT NULL PRIMARY KEY, "url" varchar(2000) NOT NULL UNIQUE);
--
-- Create model URLProbe
--
CREATE TABLE "core_urlprobe" ("id" serial NOT NULL PRIMARY KEY, "timestamp" timestamp with time zone NOT NULL, "status_code" smallint NULL, "error" text NOT NULL, "url_id" integer NOT NULL);
--
-- Create index core_urlpro_url_id_82a002_idx on field(s) url, -timestamp of model urlprobe
--
CREATE INDEX "core_urlpro_url_id_82a002_idx" ON "core_urlprobe" ("url_id", "timestamp"DESC);
CREATE INDEX "core_config_variable_2f56a937_like" ON "core_config" ("variable" varchar_pattern_ops);
CREATE INDEX "core_url_url_36efdff4_like" ON "core_url" ("url" varchar_pattern_ops);
ALTER TABLE "core_urlprobe" ADD CONSTRAINT "core_urlprobe_url_id_b650da51_fk_core_url_id" FOREIGN KEY ("url_id") REFERENCES "core_url" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "core_urlprobe_url_id_b650da51" ON "core_urlprobe" ("url_id");
COMMIT;
BEGIN;
--
-- Create model URLApiLink
--
CREATE TABLE "core_urlapilink" ("id" serial NOT NULL PRIMARY KEY, "field" varchar(31) NOT NULL, "api_id" integer NOT NULL, "url_id" integer NOT NULL);
ALTER TABLE "core_urlapilink" ADD CONSTRAINT "core_urlapilink_api_id_65a7bea9_fk_core_api_id" FOREIGN KEY ("api_id") REFERENCES "core_api" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "core_urlapilink" ADD CONSTRAINT "core_urlapilink_url_id_732f9a3b_fk_core_url_id" FOREIGN KEY ("url_id") REFERENCES "core_url" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "core_urlapilink_api_id_65a7bea9" ON "core_urlapilink" ("api_id");
CREATE INDEX "core_urlapilink_url_id_732f9a3b" ON "core_urlapilink" ("url_id");
COMMIT;
BEGIN;
--
-- Create model Code
--
CREATE TABLE "core_code" ("id" serial NOT NULL PRIMARY KEY, "source" varchar(31) NOT NULL, "owner_name" varchar(255) NOT NULL, "name" varchar(255) NOT NULL, "url" varchar(2000) NOT NULL UNIQUE, "description" text NOT NULL, "last_change" timestamp with time zone NOT NULL, "stars" integer NULL);
--
-- Create model ProgrammingLanguage
--
CREATE TABLE "core_programminglanguage" ("id" serial NOT NULL PRIMARY KEY, "name" varchar(255) NOT NULL UNIQUE);
--
-- Create model CodeAPI
--
CREATE TABLE "core_codeapi" ("id" serial NOT NULL PRIMARY KEY, "api_id" varchar(255) NOT NULL, "code_id" integer NOT NULL);
--
-- Add field programming_languages to code
--
CREATE TABLE "core_code_programming_languages" ("id" serial NOT NULL PRIMARY KEY, "code_id" integer NOT NULL, "programminglanguage_id" integer NOT NULL);
--
-- Add field related_apis to code
--
CREATE INDEX "core_code_url_015bc1dd_like" ON "core_code" ("url" varchar_pattern_ops);
CREATE INDEX "core_code_last_change_bf026719" ON "core_code" ("last_change");
CREATE INDEX "core_programminglanguage_name_6bd382a4_like" ON "core_programminglanguage" ("name" varchar_pattern_ops);
ALTER TABLE "core_codeapi" ADD CONSTRAINT "core_codeapi_api_id_255daaa7_fk_core_api_api_id" FOREIGN KEY ("api_id") REFERENCES "core_api" ("api_id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "core_codeapi" ADD CONSTRAINT "core_codeapi_code_id_93a40ac2_fk_core_code_id" FOREIGN KEY ("code_id") REFERENCES "core_code" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "core_codeapi_api_id_255daaa7" ON "core_codeapi" ("api_id");
CREATE INDEX "core_codeapi_api_id_255daaa7_like" ON "core_codeapi" ("api_id" varchar_pattern_ops);
CREATE INDEX "core_codeapi_code_id_93a40ac2" ON "core_codeapi" ("code_id");
ALTER TABLE "core_code_programming_languages" ADD CONSTRAINT "core_code_programming_la_code_id_programminglangu_142fb019_uniq" UNIQUE ("code_id", "programminglanguage_id");
ALTER TABLE "core_code_programming_languages" ADD CONSTRAINT "core_code_programmin_code_id_42f55771_fk_core_code" FOREIGN KEY ("code_id") REFERENCES "core_code" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "core_code_programming_languages" ADD CONSTRAINT "core_code_programmin_programminglanguage__afd45b15_fk_core_prog" FOREIGN KEY ("programminglanguage_id") REFERENCES "core_programminglanguage" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "core_code_programming_languages_code_id_42f55771" ON "core_code_programming_languages" ("code_id");
CREATE INDEX "core_code_programming_languages_programminglanguage_id_afd45b15" ON "core_code_programming_languages" ("programminglanguage_id");
COMMIT;

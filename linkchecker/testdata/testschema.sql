-- SQLite3 DDL for django module 'core'
-- Regenerate using 'generate_test_sql.sh > testschema.sql'
--
BEGIN;
--
-- Create model Badge
--
CREATE TABLE "core_badge" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(255) NOT NULL);
--
-- Create model API
--
CREATE TABLE "core_api" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "api_id" varchar(255) NOT NULL UNIQUE, "api_authentication" varchar(31) NOT NULL, "api_type" varchar(31) NOT NULL, "contact_chat" varchar(255) NOT NULL, "contact_email" varchar(255) NOT NULL, "contact_fax" varchar(255) NOT NULL, "contact_phone" varchar(255) NOT NULL, "contact_url" varchar(2000) NOT NULL, "description" text NOT NULL, "forum_url" varchar(2000) NOT NULL, "forum_vendor" varchar(31) NOT NULL, "is_reference_implementation" bool NOT NULL, "organization_name" varchar(255) NOT NULL, "scores_has_contact_details" bool NULL, "scores_has_documentation" bool NULL, "scores_has_specification" bool NULL, "scores_provides_sla" bool NULL, "service_name" varchar(255) NOT NULL, "terms_government_only" bool NULL, "terms_pay_per_use" bool NULL, "terms_support_response_time" varchar(255) NOT NULL, "terms_uptime_guarantee" decimal NULL);
--
-- Create model Relation
--
CREATE TABLE "core_relation" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "from_api_id" varchar(255) NOT NULL REFERENCES "core_api" ("api_id") DEFERRABLE INITIALLY DEFERRED, "name" varchar(255) NOT NULL, "to_api_id" varchar(255) NOT NULL);
--
-- Create model APIBadge
--
CREATE TABLE "core_apibadge" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "api_id" varchar(255) NOT NULL, "badge_id" integer NOT NULL REFERENCES "core_badge" ("id") DEFERRABLE INITIALLY DEFERRED);
--
-- Add field badges to api
--
CREATE TABLE "new__core_api" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "api_id" varchar(255) NOT NULL UNIQUE, "api_authentication" varchar(31) NOT NULL, "api_type" varchar(31) NOT NULL, "contact_chat" varchar(255) NOT NULL, "contact_email" varchar(255) NOT NULL, "contact_fax" varchar(255) NOT NULL, "contact_phone" varchar(255) NOT NULL, "contact_url" varchar(2000) NOT NULL, "description" text NOT NULL, "forum_url" varchar(2000) NOT NULL, "forum_vendor" varchar(31) NOT NULL, "is_reference_implementation" bool NOT NULL, "organization_name" varchar(255) NOT NULL, "scores_has_contact_details" bool NULL, "scores_has_documentation" bool NULL, "scores_has_specification" bool NULL, "scores_provides_sla" bool NULL, "service_name" varchar(255) NOT NULL, "terms_government_only" bool NULL, "terms_pay_per_use" bool NULL, "terms_support_response_time" varchar(255) NOT NULL, "terms_uptime_guarantee" decimal NULL);
INSERT INTO "new__core_api" ("id", "api_id", "api_authentication", "api_type", "contact_chat", "contact_email", "contact_fax", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "scores_has_contact_details", "scores_has_documentation", "scores_has_specification", "scores_provides_sla", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee") SELECT "id", "api_id", "api_authentication", "api_type", "contact_chat", "contact_email", "contact_fax", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "scores_has_contact_details", "scores_has_documentation", "scores_has_specification", "scores_provides_sla", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee" FROM "core_api";
DROP TABLE "core_api";
ALTER TABLE "new__core_api" RENAME TO "core_api";
CREATE INDEX "core_relation_from_api_id_5c5360dc" ON "core_relation" ("from_api_id");
CREATE INDEX "core_relation_to_api_id_cc214e96" ON "core_relation" ("to_api_id");
CREATE INDEX "core_apibadge_api_id_d68f8ec2" ON "core_apibadge" ("api_id");
CREATE INDEX "core_apibadge_badge_id_ff11a4e8" ON "core_apibadge" ("badge_id");
--
-- Add field referenced_apis to api
--
CREATE TABLE "new__core_api" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "api_id" varchar(255) NOT NULL UNIQUE, "api_authentication" varchar(31) NOT NULL, "api_type" varchar(31) NOT NULL, "contact_chat" varchar(255) NOT NULL, "contact_email" varchar(255) NOT NULL, "contact_fax" varchar(255) NOT NULL, "contact_phone" varchar(255) NOT NULL, "contact_url" varchar(2000) NOT NULL, "description" text NOT NULL, "forum_url" varchar(2000) NOT NULL, "forum_vendor" varchar(31) NOT NULL, "is_reference_implementation" bool NOT NULL, "organization_name" varchar(255) NOT NULL, "scores_has_contact_details" bool NULL, "scores_has_documentation" bool NULL, "scores_has_specification" bool NULL, "scores_provides_sla" bool NULL, "service_name" varchar(255) NOT NULL, "terms_government_only" bool NULL, "terms_pay_per_use" bool NULL, "terms_support_response_time" varchar(255) NOT NULL, "terms_uptime_guarantee" decimal NULL);
INSERT INTO "new__core_api" ("id", "api_id", "api_authentication", "api_type", "contact_chat", "contact_email", "contact_fax", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "scores_has_contact_details", "scores_has_documentation", "scores_has_specification", "scores_provides_sla", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee") SELECT "id", "api_id", "api_authentication", "api_type", "contact_chat", "contact_email", "contact_fax", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "scores_has_contact_details", "scores_has_documentation", "scores_has_specification", "scores_provides_sla", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee" FROM "core_api";
DROP TABLE "core_api";
ALTER TABLE "new__core_api" RENAME TO "core_api";
--
-- Create model Environment
--
CREATE TABLE "core_environment" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(31) NOT NULL, "api_url" varchar(2000) NOT NULL, "specification_url" varchar(2000) NOT NULL, "documentation_url" varchar(2000) NOT NULL, "api_id" varchar(255) NOT NULL REFERENCES "core_api" ("api_id") DEFERRABLE INITIALLY DEFERRED);
--
-- Alter field description on api
--
CREATE TABLE "new__core_api" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "api_id" varchar(255) NOT NULL UNIQUE, "api_authentication" varchar(31) NOT NULL, "api_type" varchar(31) NOT NULL, "contact_chat" varchar(255) NOT NULL, "contact_email" varchar(255) NOT NULL, "contact_fax" varchar(255) NOT NULL, "contact_phone" varchar(255) NOT NULL, "contact_url" varchar(2000) NOT NULL, "forum_url" varchar(2000) NOT NULL, "forum_vendor" varchar(31) NOT NULL, "is_reference_implementation" bool NOT NULL, "organization_name" varchar(255) NOT NULL, "scores_has_contact_details" bool NULL, "scores_has_documentation" bool NULL, "scores_has_specification" bool NULL, "scores_provides_sla" bool NULL, "service_name" varchar(255) NOT NULL, "terms_government_only" bool NULL, "terms_pay_per_use" bool NULL, "terms_support_response_time" varchar(255) NOT NULL, "terms_uptime_guarantee" decimal NULL, "description" text NOT NULL);
INSERT INTO "new__core_api" ("id", "api_id", "api_authentication", "api_type", "contact_chat", "contact_email", "contact_fax", "contact_phone", "contact_url", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "scores_has_contact_details", "scores_has_documentation", "scores_has_specification", "scores_provides_sla", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee", "description") SELECT "id", "api_id", "api_authentication", "api_type", "contact_chat", "contact_email", "contact_fax", "contact_phone", "contact_url", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "scores_has_contact_details", "scores_has_documentation", "scores_has_specification", "scores_provides_sla", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee", "description" FROM "core_api";
DROP TABLE "core_api";
ALTER TABLE "new__core_api" RENAME TO "core_api";
CREATE INDEX "core_environment_api_id_314dde4b" ON "core_environment" ("api_id");
--
-- Alter field organization_name on api
--
CREATE TABLE "new__core_api" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "api_id" varchar(255) NOT NULL UNIQUE, "api_authentication" varchar(31) NOT NULL, "api_type" varchar(31) NOT NULL, "contact_chat" varchar(255) NOT NULL, "contact_email" varchar(255) NOT NULL, "contact_fax" varchar(255) NOT NULL, "contact_phone" varchar(255) NOT NULL, "contact_url" varchar(2000) NOT NULL, "description" text NOT NULL, "forum_url" varchar(2000) NOT NULL, "forum_vendor" varchar(31) NOT NULL, "is_reference_implementation" bool NOT NULL, "scores_has_contact_details" bool NULL, "scores_has_documentation" bool NULL, "scores_has_specification" bool NULL, "scores_provides_sla" bool NULL, "service_name" varchar(255) NOT NULL, "terms_government_only" bool NULL, "terms_pay_per_use" bool NULL, "terms_support_response_time" varchar(255) NOT NULL, "terms_uptime_guarantee" decimal NULL, "organization_name" varchar(255) NOT NULL);
INSERT INTO "new__core_api" ("id", "api_id", "api_authentication", "api_type", "contact_chat", "contact_email", "contact_fax", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "scores_has_contact_details", "scores_has_documentation", "scores_has_specification", "scores_provides_sla", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee", "organization_name") SELECT "id", "api_id", "api_authentication", "api_type", "contact_chat", "contact_email", "contact_fax", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "scores_has_contact_details", "scores_has_documentation", "scores_has_specification", "scores_provides_sla", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee", "organization_name" FROM "core_api";
DROP TABLE "core_api";
ALTER TABLE "new__core_api" RENAME TO "core_api";
--
-- Alter field service_name on api
--
CREATE TABLE "new__core_api" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "api_id" varchar(255) NOT NULL UNIQUE, "api_authentication" varchar(31) NOT NULL, "api_type" varchar(31) NOT NULL, "contact_chat" varchar(255) NOT NULL, "contact_email" varchar(255) NOT NULL, "contact_fax" varchar(255) NOT NULL, "contact_phone" varchar(255) NOT NULL, "contact_url" varchar(2000) NOT NULL, "description" text NOT NULL, "forum_url" varchar(2000) NOT NULL, "forum_vendor" varchar(31) NOT NULL, "is_reference_implementation" bool NOT NULL, "organization_name" varchar(255) NOT NULL, "scores_has_contact_details" bool NULL, "scores_has_documentation" bool NULL, "scores_has_specification" bool NULL, "scores_provides_sla" bool NULL, "terms_government_only" bool NULL, "terms_pay_per_use" bool NULL, "terms_support_response_time" varchar(255) NOT NULL, "terms_uptime_guarantee" decimal NULL, "service_name" varchar(255) NOT NULL);
INSERT INTO "new__core_api" ("id", "api_id", "api_authentication", "api_type", "contact_chat", "contact_email", "contact_fax", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "scores_has_contact_details", "scores_has_documentation", "scores_has_specification", "scores_provides_sla", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee", "service_name") SELECT "id", "api_id", "api_authentication", "api_type", "contact_chat", "contact_email", "contact_fax", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "scores_has_contact_details", "scores_has_documentation", "scores_has_specification", "scores_provides_sla", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee", "service_name" FROM "core_api";
DROP TABLE "core_api";
ALTER TABLE "new__core_api" RENAME TO "core_api";
--
-- Remove field scores_has_contact_details from api
--
CREATE TABLE "new__core_api" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "api_id" varchar(255) NOT NULL UNIQUE, "api_authentication" varchar(31) NOT NULL, "api_type" varchar(31) NOT NULL, "contact_chat" varchar(255) NOT NULL, "contact_email" varchar(255) NOT NULL, "contact_fax" varchar(255) NOT NULL, "contact_phone" varchar(255) NOT NULL, "contact_url" varchar(2000) NOT NULL, "description" text NOT NULL, "forum_url" varchar(2000) NOT NULL, "forum_vendor" varchar(31) NOT NULL, "is_reference_implementation" bool NOT NULL, "organization_name" varchar(255) NOT NULL, "scores_has_documentation" bool NULL, "scores_has_specification" bool NULL, "scores_provides_sla" bool NULL, "service_name" varchar(255) NOT NULL, "terms_government_only" bool NULL, "terms_pay_per_use" bool NULL, "terms_support_response_time" varchar(255) NOT NULL, "terms_uptime_guarantee" decimal NULL);
INSERT INTO "new__core_api" ("id", "api_id", "api_authentication", "api_type", "contact_chat", "contact_email", "contact_fax", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "scores_has_documentation", "scores_has_specification", "scores_provides_sla", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee") SELECT "id", "api_id", "api_authentication", "api_type", "contact_chat", "contact_email", "contact_fax", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "scores_has_documentation", "scores_has_specification", "scores_provides_sla", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee" FROM "core_api";
DROP TABLE "core_api";
ALTER TABLE "new__core_api" RENAME TO "core_api";
--
-- Remove field scores_has_documentation from api
--
CREATE TABLE "new__core_api" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "api_id" varchar(255) NOT NULL UNIQUE, "api_authentication" varchar(31) NOT NULL, "api_type" varchar(31) NOT NULL, "contact_chat" varchar(255) NOT NULL, "contact_email" varchar(255) NOT NULL, "contact_fax" varchar(255) NOT NULL, "contact_phone" varchar(255) NOT NULL, "contact_url" varchar(2000) NOT NULL, "description" text NOT NULL, "forum_url" varchar(2000) NOT NULL, "forum_vendor" varchar(31) NOT NULL, "is_reference_implementation" bool NOT NULL, "organization_name" varchar(255) NOT NULL, "scores_has_specification" bool NULL, "scores_provides_sla" bool NULL, "service_name" varchar(255) NOT NULL, "terms_government_only" bool NULL, "terms_pay_per_use" bool NULL, "terms_support_response_time" varchar(255) NOT NULL, "terms_uptime_guarantee" decimal NULL);
INSERT INTO "new__core_api" ("id", "api_id", "api_authentication", "api_type", "contact_chat", "contact_email", "contact_fax", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "scores_has_specification", "scores_provides_sla", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee") SELECT "id", "api_id", "api_authentication", "api_type", "contact_chat", "contact_email", "contact_fax", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "scores_has_specification", "scores_provides_sla", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee" FROM "core_api";
DROP TABLE "core_api";
ALTER TABLE "new__core_api" RENAME TO "core_api";
--
-- Remove field scores_has_specification from api
--
CREATE TABLE "new__core_api" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "api_id" varchar(255) NOT NULL UNIQUE, "api_authentication" varchar(31) NOT NULL, "api_type" varchar(31) NOT NULL, "contact_chat" varchar(255) NOT NULL, "contact_email" varchar(255) NOT NULL, "contact_fax" varchar(255) NOT NULL, "contact_phone" varchar(255) NOT NULL, "contact_url" varchar(2000) NOT NULL, "description" text NOT NULL, "forum_url" varchar(2000) NOT NULL, "forum_vendor" varchar(31) NOT NULL, "is_reference_implementation" bool NOT NULL, "organization_name" varchar(255) NOT NULL, "scores_provides_sla" bool NULL, "service_name" varchar(255) NOT NULL, "terms_government_only" bool NULL, "terms_pay_per_use" bool NULL, "terms_support_response_time" varchar(255) NOT NULL, "terms_uptime_guarantee" decimal NULL);
INSERT INTO "new__core_api" ("id", "api_id", "api_authentication", "api_type", "contact_chat", "contact_email", "contact_fax", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "scores_provides_sla", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee") SELECT "id", "api_id", "api_authentication", "api_type", "contact_chat", "contact_email", "contact_fax", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "scores_provides_sla", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee" FROM "core_api";
DROP TABLE "core_api";
ALTER TABLE "new__core_api" RENAME TO "core_api";
--
-- Remove field scores_provides_sla from api
--
CREATE TABLE "new__core_api" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "api_id" varchar(255) NOT NULL UNIQUE, "api_authentication" varchar(31) NOT NULL, "api_type" varchar(31) NOT NULL, "contact_chat" varchar(255) NOT NULL, "contact_email" varchar(255) NOT NULL, "contact_fax" varchar(255) NOT NULL, "contact_phone" varchar(255) NOT NULL, "contact_url" varchar(2000) NOT NULL, "description" text NOT NULL, "forum_url" varchar(2000) NOT NULL, "forum_vendor" varchar(31) NOT NULL, "is_reference_implementation" bool NOT NULL, "organization_name" varchar(255) NOT NULL, "service_name" varchar(255) NOT NULL, "terms_government_only" bool NULL, "terms_pay_per_use" bool NULL, "terms_support_response_time" varchar(255) NOT NULL, "terms_uptime_guarantee" decimal NULL);
INSERT INTO "new__core_api" ("id", "api_id", "api_authentication", "api_type", "contact_chat", "contact_email", "contact_fax", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee") SELECT "id", "api_id", "api_authentication", "api_type", "contact_chat", "contact_email", "contact_fax", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee" FROM "core_api";
DROP TABLE "core_api";
ALTER TABLE "new__core_api" RENAME TO "core_api";
COMMIT;
BEGIN;
--
-- Alter field name on environment
--
CREATE TABLE "new__core_environment" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(31) NOT NULL, "api_url" varchar(2000) NOT NULL, "specification_url" varchar(2000) NOT NULL, "documentation_url" varchar(2000) NOT NULL, "api_id" varchar(255) NOT NULL REFERENCES "core_api" ("api_id") DEFERRABLE INITIALLY DEFERRED);
INSERT INTO "new__core_environment" ("id", "api_url", "specification_url", "documentation_url", "api_id", "name") SELECT "id", "api_url", "specification_url", "documentation_url", "api_id", "name" FROM "core_environment";
DROP TABLE "core_environment";
ALTER TABLE "new__core_environment" RENAME TO "core_environment";
CREATE INDEX "core_environment_api_id_314dde4b" ON "core_environment" ("api_id");
COMMIT;
BEGIN;
--
-- Alter field api_authentication on api
--
CREATE TABLE "new__core_api" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "api_authentication" varchar(31) NOT NULL, "api_id" varchar(255) NOT NULL UNIQUE, "api_type" varchar(31) NOT NULL, "contact_chat" varchar(255) NOT NULL, "contact_email" varchar(255) NOT NULL, "contact_fax" varchar(255) NOT NULL, "contact_phone" varchar(255) NOT NULL, "contact_url" varchar(2000) NOT NULL, "description" text NOT NULL, "forum_url" varchar(2000) NOT NULL, "forum_vendor" varchar(31) NOT NULL, "is_reference_implementation" bool NOT NULL, "organization_name" varchar(255) NOT NULL, "service_name" varchar(255) NOT NULL, "terms_government_only" bool NULL, "terms_pay_per_use" bool NULL, "terms_support_response_time" varchar(255) NOT NULL, "terms_uptime_guarantee" decimal NULL);
INSERT INTO "new__core_api" ("id", "api_id", "api_type", "contact_chat", "contact_email", "contact_fax", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee", "api_authentication") SELECT "id", "api_id", "api_type", "contact_chat", "contact_email", "contact_fax", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee", "api_authentication" FROM "core_api";
DROP TABLE "core_api";
ALTER TABLE "new__core_api" RENAME TO "core_api";
--
-- Alter field api_type on api
--
CREATE TABLE "new__core_api" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "api_id" varchar(255) NOT NULL UNIQUE, "api_authentication" varchar(31) NOT NULL, "contact_chat" varchar(255) NOT NULL, "contact_email" varchar(255) NOT NULL, "contact_fax" varchar(255) NOT NULL, "contact_phone" varchar(255) NOT NULL, "contact_url" varchar(2000) NOT NULL, "description" text NOT NULL, "forum_url" varchar(2000) NOT NULL, "forum_vendor" varchar(31) NOT NULL, "is_reference_implementation" bool NOT NULL, "organization_name" varchar(255) NOT NULL, "service_name" varchar(255) NOT NULL, "terms_government_only" bool NULL, "terms_pay_per_use" bool NULL, "terms_support_response_time" varchar(255) NOT NULL, "terms_uptime_guarantee" decimal NULL, "api_type" varchar(31) NOT NULL);
INSERT INTO "new__core_api" ("id", "api_id", "api_authentication", "contact_chat", "contact_email", "contact_fax", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee", "api_type") SELECT "id", "api_id", "api_authentication", "contact_chat", "contact_email", "contact_fax", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee", "api_type" FROM "core_api";
DROP TABLE "core_api";
ALTER TABLE "new__core_api" RENAME TO "core_api";
--
-- Alter field name on environment
--
CREATE TABLE "new__core_environment" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "api_url" varchar(2000) NOT NULL, "specification_url" varchar(2000) NOT NULL, "documentation_url" varchar(2000) NOT NULL, "api_id" varchar(255) NOT NULL REFERENCES "core_api" ("api_id") DEFERRABLE INITIALLY DEFERRED, "name" varchar(31) NOT NULL);
INSERT INTO "new__core_environment" ("id", "api_url", "specification_url", "documentation_url", "api_id", "name") SELECT "id", "api_url", "specification_url", "documentation_url", "api_id", "name" FROM "core_environment";
DROP TABLE "core_environment";
ALTER TABLE "new__core_environment" RENAME TO "core_environment";
CREATE INDEX "core_environment_api_id_314dde4b" ON "core_environment" ("api_id");
COMMIT;
BEGIN;
--
-- Alter field documentation_url on environment
--
CREATE TABLE "new__core_environment" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "documentation_url" varchar(2000) NOT NULL, "name" varchar(31) NOT NULL, "api_url" varchar(2000) NOT NULL, "specification_url" varchar(2000) NOT NULL, "api_id" varchar(255) NOT NULL REFERENCES "core_api" ("api_id") DEFERRABLE INITIALLY DEFERRED);
INSERT INTO "new__core_environment" ("id", "name", "api_url", "specification_url", "api_id", "documentation_url") SELECT "id", "name", "api_url", "specification_url", "api_id", "documentation_url" FROM "core_environment";
DROP TABLE "core_environment";
ALTER TABLE "new__core_environment" RENAME TO "core_environment";
CREATE INDEX "core_environment_api_id_314dde4b" ON "core_environment" ("api_id");
COMMIT;
BEGIN;
--
-- Remove field contact_chat from api
--
CREATE TABLE "new__core_api" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "api_id" varchar(255) NOT NULL UNIQUE, "api_authentication" varchar(31) NOT NULL, "api_type" varchar(31) NOT NULL, "contact_email" varchar(255) NOT NULL, "contact_fax" varchar(255) NOT NULL, "contact_phone" varchar(255) NOT NULL, "contact_url" varchar(2000) NOT NULL, "description" text NOT NULL, "forum_url" varchar(2000) NOT NULL, "forum_vendor" varchar(31) NOT NULL, "is_reference_implementation" bool NOT NULL, "organization_name" varchar(255) NOT NULL, "service_name" varchar(255) NOT NULL, "terms_government_only" bool NULL, "terms_pay_per_use" bool NULL, "terms_support_response_time" varchar(255) NOT NULL, "terms_uptime_guarantee" decimal NULL);
INSERT INTO "new__core_api" ("id", "api_id", "api_authentication", "api_type", "contact_email", "contact_fax", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee") SELECT "id", "api_id", "api_authentication", "api_type", "contact_email", "contact_fax", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee" FROM "core_api";
DROP TABLE "core_api";
ALTER TABLE "new__core_api" RENAME TO "core_api";
--
-- Remove field contact_fax from api
--
CREATE TABLE "new__core_api" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "api_id" varchar(255) NOT NULL UNIQUE, "api_authentication" varchar(31) NOT NULL, "api_type" varchar(31) NOT NULL, "contact_email" varchar(255) NOT NULL, "contact_phone" varchar(255) NOT NULL, "contact_url" varchar(2000) NOT NULL, "description" text NOT NULL, "forum_url" varchar(2000) NOT NULL, "forum_vendor" varchar(31) NOT NULL, "is_reference_implementation" bool NOT NULL, "organization_name" varchar(255) NOT NULL, "service_name" varchar(255) NOT NULL, "terms_government_only" bool NULL, "terms_pay_per_use" bool NULL, "terms_support_response_time" varchar(255) NOT NULL, "terms_uptime_guarantee" decimal NULL);
INSERT INTO "new__core_api" ("id", "api_id", "api_authentication", "api_type", "contact_email", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee") SELECT "id", "api_id", "api_authentication", "api_type", "contact_email", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "service_name", "terms_government_only", "terms_pay_per_use", "terms_support_response_time", "terms_uptime_guarantee" FROM "core_api";
DROP TABLE "core_api";
ALTER TABLE "new__core_api" RENAME TO "core_api";
COMMIT;
BEGIN;
--
-- Alter field terms_support_response_time on api
--
CREATE TABLE "new__core_api" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "terms_support_response_time" integer unsigned NULL CHECK ("terms_support_response_time" >= 0), "api_id" varchar(255) NOT NULL UNIQUE, "api_authentication" varchar(31) NOT NULL, "api_type" varchar(31) NOT NULL, "contact_email" varchar(255) NOT NULL, "contact_phone" varchar(255) NOT NULL, "contact_url" varchar(2000) NOT NULL, "description" text NOT NULL, "forum_url" varchar(2000) NOT NULL, "forum_vendor" varchar(31) NOT NULL, "is_reference_implementation" bool NOT NULL, "organization_name" varchar(255) NOT NULL, "service_name" varchar(255) NOT NULL, "terms_government_only" bool NULL, "terms_pay_per_use" bool NULL, "terms_uptime_guarantee" decimal NULL);
INSERT INTO "new__core_api" ("id", "api_id", "api_authentication", "api_type", "contact_email", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "service_name", "terms_government_only", "terms_pay_per_use", "terms_uptime_guarantee", "terms_support_response_time") SELECT "id", "api_id", "api_authentication", "api_type", "contact_email", "contact_phone", "contact_url", "description", "forum_url", "forum_vendor", "is_reference_implementation", "organization_name", "service_name", "terms_government_only", "terms_pay_per_use", "terms_uptime_guarantee", "terms_support_response_time" FROM "core_api";
DROP TABLE "core_api";
ALTER TABLE "new__core_api" RENAME TO "core_api";
COMMIT;
BEGIN;
--
-- Create model Event
--
CREATE TABLE "core_event" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "title" text NOT NULL, "start_date" datetime NOT NULL, "location" text NOT NULL, "registration_url" varchar(2000) NOT NULL, "is_published" bool NOT NULL);
CREATE INDEX "core_event_start_date_29821cf6" ON "core_event" ("start_date");
COMMIT;
BEGIN;
--
-- Create model Config
--
CREATE TABLE "core_config" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "variable" varchar(255) NOT NULL UNIQUE, "enabled" bool NOT NULL);
--
-- Create model URL
--
CREATE TABLE "core_url" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "url" varchar(2000) NOT NULL UNIQUE);
--
-- Create model URLProbe
--
CREATE TABLE "core_urlprobe" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "timestamp" datetime NOT NULL, "status_code" smallint NULL, "error" text NOT NULL, "url_id" integer NOT NULL REFERENCES "core_url" ("id") DEFERRABLE INITIALLY DEFERRED);
--
-- Create index core_urlpro_url_id_82a002_idx on field(s) url, -timestamp of model urlprobe
--
CREATE INDEX "core_urlpro_url_id_82a002_idx" ON "core_urlprobe" ("url_id", "timestamp"DESC);
CREATE INDEX "core_urlprobe_url_id_b650da51" ON "core_urlprobe" ("url_id");
COMMIT;
BEGIN;
--
-- Create model URLApiLink
--
CREATE TABLE "core_urlapilink" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "field" varchar(31) NOT NULL, "api_id" integer NOT NULL REFERENCES "core_api" ("id") DEFERRABLE INITIALLY DEFERRED, "url_id" integer NOT NULL REFERENCES "core_url" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE INDEX "core_urlapilink_api_id_65a7bea9" ON "core_urlapilink" ("api_id");
CREATE INDEX "core_urlapilink_url_id_732f9a3b" ON "core_urlapilink" ("url_id");
COMMIT;

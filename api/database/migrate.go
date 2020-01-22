// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package database

import (
	"database/sql"
	"os"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file" // driver to load file migrations
	"go.uber.org/zap"
)

// Would be better if we read this automatically from the migration files
const TargetMigrationVersion = 1

type Migrator struct {
	Logger *zap.Logger
	Driver database.Driver
}

// NewMigrator creates a new Migrator
func NewMigrator(logger *zap.Logger, db *sql.DB) *Migrator {
	driver, err := postgres.WithInstance(db, &postgres.Config{})

	if err != nil {
		logger.Fatal("failed to configure db for migrator", zap.Error(err))
	}

	return &Migrator{
		Logger: logger,
		Driver: driver,
	}
}

// IsAtLatestMigration checks whether the db is at the latest (highest) migration level
func (m *Migrator) IsAtLatestMigration(logger *zap.Logger, sourceURL string, db *sql.DB) bool {
	wd, err := os.Getwd()
	if err != nil {
		logger.Fatal("failed to get wd", zap.Error(err))
	}
	logger.Info("checking migration version", zap.String("sourceURL", sourceURL), zap.String("wd", wd))

	migration, err := migrate.NewWithDatabaseInstance(sourceURL, "postgres", m.Driver)

	if err != nil {
		logger.Fatal("failed to start migration version check", zap.Error(err))
	}

	version, _, err := migration.Version()

	if err == migrate.ErrNilVersion {
		// No migrations have been applied yet
		return false
	} else if err != nil {
		logger.Fatal("failed to check migration version", zap.Error(err))
	} else if version == TargetMigrationVersion {
		return true
	}

	return false

}

// PerformMigration loads migrations and verifies the db contains them all
func (m *Migrator) PerformMigration(logger *zap.Logger, sourceURL string, db *sql.DB) {
	wd, err := os.Getwd()
	if err != nil {
		logger.Fatal("failed to get wd", zap.Error(err))
	}
	logger.Info("migration starting", zap.String("sourceURL", sourceURL), zap.String("wd", wd))

	migration, err := migrate.NewWithDatabaseInstance(sourceURL, "postgres", m.Driver)

	if err != nil {
		logger.Fatal("failed to start migrations", zap.Error(err))
	}

	err = migration.Up()

	if err == migrate.ErrNoChange {
		logger.Info("no changes")
	} else if err != nil {
		logger.Fatal("failed to perform migrations", zap.Error(err))
	}

	logger.Info("migration completed")
}

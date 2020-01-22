// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package database

import (
	"context"
	"database/sql"
	"time"

	"github.com/ExpansiveWorlds/instrumentedsql"
	"github.com/jackc/pgx/stdlib"
	"go.uber.org/zap"
)

// setupDatabaseConnection takes the options and returns a connected DB
func SetupDatabaseConnection(dbOptions DatabaseOptions, logger *zap.Logger) *sql.DB {
	slogger := logger.Sugar()

	var driverName = "postgres"

	// Check if logger accepts debug-level messages
	if ce := logger.Check(zap.DebugLevel, "some debugging message"); ce != nil {
		dblogger := instrumentedsql.LoggerFunc(func(ctx context.Context, msg string, keyvals ...interface{}) {
			slogger.Debug(msg, keyvals)
		})

		sql.Register("instrumented-postgres", instrumentedsql.WrapDriver(&stdlib.Driver{}, instrumentedsql.WithLogger(dblogger)))
		driverName = "instrumented-postgres"
	}

	slogger.Debugf("connecting to database %s ...", dbOptions.PostgresDSN)
	db, err := sql.Open(driverName, dbOptions.PostgresDSN)
	if err != nil {
		logger.Fatal("failed to open database connection", zap.Error(err))
	}

	db.SetConnMaxLifetime(5 * time.Minute)
	db.SetMaxIdleConns(2)

	err = db.Ping()
	if err != nil {
		logger.Fatal("failed to ping database", zap.Error(err))
	}

	return db
}

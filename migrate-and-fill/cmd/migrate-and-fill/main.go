// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package main

import (
	"fmt"
	"log"
	"os"

	"github.com/jessevdk/go-flags"
	"gitlab.com/commonground/developer.overheid.nl/api/database"
	"gitlab.com/commonground/developer.overheid.nl/api/logging"
)

type Options struct {
	FixturesPath string `long:"fixtures-path" env:"FIXTURES_PATH" description:"If this argument is defined, the database is populated with the fixtures read from this SQL file."`
	logging.LogOptions
	database.DatabaseOptions
}

func main() {
	var options Options

	parseOptions(&options)

	logger := logging.SetupLogger(options.LogOptions)
	defer logging.TeardownLogger(logger)

	db := database.SetupDatabaseConnection(options.DatabaseOptions, logger)
	migrator := database.NewMigrator(logger, db)

	migrator.PerformMigration(logger, fmt.Sprintf("file://%s", options.MigrationsPath), db)

	if options.FixturesPath == "" {
		logger.Info("FixturesPath is not defined, skipping fixtures...")
	} else {
		database.AddFixtures(logger, options.FixturesPath, db)
	}
}

func parseOptions(options *Options) {
	// Parse options
	args, err := flags.Parse(options)
	if err != nil {
		if et, ok := err.(*flags.Error); ok {
			// Handle --help flag by exiting without error
			if et.Type == flags.ErrHelp {
				os.Exit(0)
			}
		}
		log.Fatalf("error parsing flags: %v", err)
	}
	if len(args) > 0 {
		log.Fatalf("unexpected arguments: %v", args)
	}
}

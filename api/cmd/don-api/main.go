// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package main

import (
	"fmt"
	"log"
	"os"

	"github.com/jessevdk/go-flags"
	"gitlab.com/commonground/developer.overheid.nl/api"
	"gitlab.com/commonground/developer.overheid.nl/api/database"
	"gitlab.com/commonground/developer.overheid.nl/api/gitlab"
	"gitlab.com/commonground/developer.overheid.nl/api/logging"
	"go.uber.org/zap"
)

type Options struct {
	ListenAddressPlain string `long:"listen-address-plain" env:"LISTEN_ADDRESS_PLAIN" default:"0.0.0.0:8080" description:"Address for the API to listen on. Read https://golang.org/pkg/net/#Dial for possible tcp address specs."`
	GitLabURL          string `long:"gitlab-url" env:"GITLAB_URL" default:"https://gitlab.com" description:"The GitLab host that is running the issue tracker for submitting new API's."`
	GitLabAccessToken  string `long:"gitlab-access-token" env:"GITLAB_ACCESS_TOKEN" default:"" description:"The GitLab access token that is used for creating an issue."`
	GitLabProjectID    string `long:"gitlab-project-id" env:"GITLAB_PROJECT_ID" default:"" description:"The id of the project in Gitlab where issues are created."`
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

	if migrator.IsAtLatestMigration(logger, fmt.Sprintf("file://%s", options.MigrationsPath), db) {
		logger.Info("database is at the latest migration, continuing...")
	} else {
		logger.Fatal("database is not at latest migration, please run migrations first")
	}

	gitLabConfig := gitlab.Config{
		URL:         options.GitLabURL,
		AccessToken: options.GitLabAccessToken,
		ProjectID:   options.GitLabProjectID,
	}

	apiServer := api.NewServer(logger, gitLabConfig)
	logger.Info("API running on", zap.String("address", options.ListenAddressPlain))

	// Listen on the address provided in the options
	err := apiServer.ListenAndServe(options.ListenAddressPlain)
	if err != nil {
		logger.Fatal("failed to listen and serve", zap.Error(err))
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

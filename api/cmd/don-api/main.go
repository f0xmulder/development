// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package main

import (
	"log"

	"github.com/jessevdk/go-flags"
	"gitlab.com/commonground/developer.overheid.nl/api"
	"gitlab.com/commonground/developer.overheid.nl/api/gitlab"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var options struct {
	ListenAddressPlain string `long:"listen-address-plain" env:"LISTEN_ADDRESS_PLAIN" default:"0.0.0.0:8080" description:"Address for the API to listen on. Read https://golang.org/pkg/net/#Dial for possible tcp address specs."`
	GitLabURL          string `long:"gitlab-url" env:"GITLAB_URL" default:"https://gitlab.com" description:"The GitLab host that is running the issue tracker for submitting new API's."`
	GitLabAccessToken  string `long:"gitlab-access-token" env:"GITLAB_ACCESS_TOKEN" default:"" description:"The GitLab access token that is used for creating an issue."`
	GitLabProjectID    string `long:"gitlab-project-id" env:"GITLAB_PROJECT_ID" default:"" description:"The id of the project in Gitlab where issues are created."`
}

func main() {
	// Parse options
	args, err := flags.Parse(&options)
	if err != nil {
		if et, ok := err.(*flags.Error); ok {
			if et.Type == flags.ErrHelp {
				return
			}
		}
		log.Fatalf("error parsing flags: %v", err)
	}
	if len(args) > 0 {
		log.Fatalf("unexpected arguments: %v", args)
	}

	// Setup new zap logger
	config := zap.NewDevelopmentConfig()
	config.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
	logger, err := config.Build()

	if err != nil {
		log.Fatalf("failed to create new zap logger: %v", err)
	}
	defer func() {
		syncErr := logger.Sync()
		if syncErr != nil {
			log.Fatalf("failed to sync zap logger: %v", syncErr)
		}
	}()

	gitlabConfig := gitlab.Config{
		URL:         options.GitLabURL,
		AccessToken: options.GitLabAccessToken,
		ProjectID:   options.GitLabProjectID,
	}

	apiServer := api.NewServer(logger, gitlabConfig)
	logger.Info("API running on", zap.String("address", options.ListenAddressPlain))

	// Listen on the address provided in the options
	err = apiServer.ListenAndServe(options.ListenAddressPlain)
	if err != nil {
		logger.Fatal("failed to listen and serve", zap.Error(err))
	}
}

// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package logging

import (
	"log"

	"go.uber.org/zap"
)

// SetupLogger takes the logOptions and configures a zap.Logger with it
func SetupLogger(logOptions LogOptions) *zap.Logger {
	config := logOptions.ZapConfig()
	logger, err := config.Build()

	if err != nil {
		log.Fatalf("failed to create new zap logger: %v", err)
	}

	return logger
}

// TeardownLogger takes a zap.Logger and performs the necessary tear-down
func TeardownLogger(logger *zap.Logger) {
	// Ignore the error value because of known issue, see https://github.com/uber-go/zap/pull/347
	logger.Sync()
}

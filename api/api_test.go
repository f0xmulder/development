// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package api

import (
	"testing"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func TestAPI(t *testing.T) {
	config := zap.NewDevelopmentConfig()
	config.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
	logger, err := config.Build()
	if err != nil {
		t.Error(err)
	}

	apiServer := NewApiServer(logger)
	if apiServer == nil {
		t.Error()
	}
}

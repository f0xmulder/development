// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package api

import (
	"testing"

	"gitlab.com/commonground/developer.overheid.nl/api/resources"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func TestAPIServer(t *testing.T) {
	config := zap.NewDevelopmentConfig()
	config.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
	logger, err := config.Build()
	if err != nil {
		t.Error(err)
	}

	gitlabConfig := resources.GitlabConfig{
		Host:        "",
		AccessToken: "",
		ProjectID:   "",
	}

	apiServer := NewServer(logger, gitlabConfig)
	if apiServer == nil {
		t.Error()
	}
}

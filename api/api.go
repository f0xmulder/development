// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package api

import (
	"net/http"

	"github.com/pkg/errors"
	"gitlab.com/commonground/developer.overheid.nl/api/resources"
	"go.uber.org/zap"
)

// Server is the server itself
type Server struct {
	Logger       *zap.Logger
	GitlabConfig resources.GitlabConfig
}

// NewServer creates a new Server and sets it up to handle requests.
func NewServer(l *zap.Logger, gitlabConfig resources.GitlabConfig) *Server {
	i := &Server{
		Logger:       l,
		GitlabConfig: gitlabConfig,
	}
	return i
}

// ListenAndServe is a blocking function that listens to the provided TCP address to handle requests.
func (api *Server) ListenAndServe(address string) error {
	r := router(api.Logger, api.GitlabConfig)

	err := http.ListenAndServe(address, r)
	if err != nil {
		return errors.Wrap(err, "failed to run http server")
	}
	return nil
}

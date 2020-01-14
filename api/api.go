// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package api

import (
	"net/http"

	"github.com/pkg/errors"
	"go.uber.org/zap"

	"gitlab.com/commonground/developer.overheid.nl/api/gitlab"
)

// Server is the server itself
type Server struct {
	Logger       *zap.Logger
	GitlabConfig gitlab.Config
}

// NewServer creates a new Server and sets it up to handle requests.
func NewServer(l *zap.Logger, gitlabConfig gitlab.Config) *Server {
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

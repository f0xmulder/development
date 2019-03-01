// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package api

import (
	"github.com/pkg/errors"
	"go.uber.org/zap"
	"net/http"
)

// Server is the server itself
type Server struct {
	logger *zap.Logger
}

// NewServer creates a new Server and sets it up to handle requests.
func NewServer(l *zap.Logger) *Server {
	i := &Server{
		logger: l,
	}
	return i
}

// ListenAndServe is a blocking function that listens to the provided TCP address to handle requests.
func (api *Server) ListenAndServe(address string) error {
	r := router(api.logger)

	err := http.ListenAndServe(address, r)
	if err != nil {
		return errors.Wrap(err, "failed to run http server")
	}
	return nil
}

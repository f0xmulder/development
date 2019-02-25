// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package api

import (
	"go.uber.org/zap"
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

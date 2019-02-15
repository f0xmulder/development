// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package api

import (
	"go.uber.org/zap"
)

type ApiServer struct {
	logger *zap.Logger
}

// ApiServer creates a new ApiServer and sets it up to handle requests.
func NewApiServer(l *zap.Logger) *ApiServer {
	i := &ApiServer{
		logger: l,
	}
	return i
}

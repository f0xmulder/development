// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package api

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/pkg/errors"
	"go.uber.org/zap"
)

// ListenAndServe is a blocking function that listens on provided tcp address to handle requests.
func (api *ApiServer) ListenAndServe(address string) error {
	r := chi.NewRouter()
	r.Get("/list", listAPIs(api.logger))

	err := http.ListenAndServe(address, r)
	if err != nil {
		return errors.Wrap(err, "failed to run http server")
	}
	return nil
}

func listAPIs(logger *zap.Logger) http.HandlerFunc {
	type API struct {
		OrganizationName     string `json:"organization_name"`
		ServiceName          string `json:"service_name"`
		APIURL               string `json:"api_url"`
		APISpecificationType string `json:"api_specification_type"`
		SpecificationURL     string `json:"specification_url"`
		DocumentationURL     string `json:"documentation_url"`
	}

	outputList := []API{
		{OrganizationName: "Test"},
	}

	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		err := json.NewEncoder(w).Encode(outputList)
		if err != nil {
			logger.Error("failed to output APIs", zap.Error(err))
			http.Error(w, "server error", http.StatusInternalServerError)
			return
		}
	}
}

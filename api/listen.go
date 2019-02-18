// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package api

import (
	"encoding/json"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/pkg/errors"
	"go.uber.org/zap"
)

// ListenAndServe is a blocking function that listens to the provided TCP address to handle requests.
func (api *ApiServer) ListenAndServe(address string) error {
	r := chi.NewRouter()
	r.Get("/api/list", listAPIsHandler(api.logger, getAvailableAPIs))

	err := http.ListenAndServe(address, r)
	if err != nil {
		return errors.Wrap(err, "failed to run http server")
	}
	return nil
}

func getAvailableAPIs() []models.API {
	outputList := []models.API{
		{OrganizationName: "Test"},
	}

	return outputList
}

func listAPIsHandler(logger *zap.Logger, apiGetter func() []models.API) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		outputList := apiGetter()
		err := json.NewEncoder(w).Encode(outputList)

		if err != nil {
			logger.Error("failed to output APIs", zap.Error(err))
			http.Error(w, "server error", http.StatusInternalServerError)
			return
		}
	}
}

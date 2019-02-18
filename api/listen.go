// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package api

import (
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"gitlab.com/commonground/developer.overheid.nl/api/routes"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/pkg/errors"
)

func getAvailableAPIs() []models.API {
	outputList := []models.API{
		{OrganizationName: "Test"},
	}

	return outputList
}

// ListenAndServe is a blocking function that listens to the provided TCP address to handle requests.
func (api *ApiServer) ListenAndServe(address string) error {
	r := chi.NewRouter()
	r.Get("/api/list", routes.ListAPIsHandler(api.logger, getAvailableAPIs))

	err := http.ListenAndServe(address, r)
	if err != nil {
		return errors.Wrap(err, "failed to run http server")
	}
	return nil
}

// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package api

import (
	"encoding/json"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"gitlab.com/commonground/developer.overheid.nl/api/routes"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/go-chi/chi"
	"github.com/pkg/errors"
)

func readAPIDataFromFile(path string) models.API {
	content, err := ioutil.ReadFile(path)

	if err != nil {
		log.Fatal(err)
	}

	newAPI := models.API{}
	err = json.Unmarshal(content, &newAPI)

	if err != nil {
		log.Fatal(err)
	}

	return newAPI
}

func readAPIDataFromDirectory(directory string) []models.API {
	files, err := ioutil.ReadDir(directory)

	output := []models.API{}

	if err != nil {
		log.Fatal(err)
	}

	for _, file := range files {
		path := strings.Join([]string{directory, file.Name()}, "/")
		newAPI := readAPIDataFromFile(path)

		output = append(output, newAPI)
	}

	return output
}

// ListenAndServe is a blocking function that listens to the provided TCP address to handle requests.
func (api *Server) ListenAndServe(address string) error {
	r := chi.NewRouter()

	r.Route("/api", func(r chi.Router) {
		r.Route("/apis", func(r chi.Router) {
			r.Get("/", routes.ListAPIsHandler(api.logger, readAPIDataFromDirectory))
			r.Get("/{id}", routes.APIByIdHandler(api.logger, readAPIDataFromFile))
		})
	})

	err := http.ListenAndServe(address, r)
	if err != nil {
		return errors.Wrap(err, "failed to run http server")
	}
	return nil
}

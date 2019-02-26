// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package api

import (
	"encoding/json"
	"github.com/go-chi/chi"
	"github.com/pkg/errors"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"gitlab.com/commonground/developer.overheid.nl/api/routes"
	"io/ioutil"
	"log"
	"net/http"
	"path/filepath"
	"strings"
)

func filenameToAPIID(filename string) string {
	return strings.TrimSuffix(filename, filepath.Ext(filename))
}

func readAPIDataFromFile(directory string, filename string) (models.API, error) {
	path := filepath.Join(directory, filename)
	content, err := ioutil.ReadFile(path)

	if err != nil {
		log.Fatal(err)
	}

	newAPI := models.API{}
	err = json.Unmarshal(content, &newAPI)
	newAPI.Id = filenameToAPIID(filename)

	return newAPI, err
}

func readAPIDataFromDirectory(directory string) ([]models.API, error) {
	files, err := ioutil.ReadDir(directory)

	output := []models.API{}

	if err != nil {
		return output, err
	}

	for _, file := range files {
		newAPI, err := readAPIDataFromFile(directory, file.Name())

		if err != nil {
			return output, err
		} else {
			output = append(output, newAPI)
		}
	}

	return output, nil
}

// ListenAndServe is a blocking function that listens to the provided TCP address to handle requests.
func (api *Server) ListenAndServe(address string) error {
	r := chi.NewRouter()

	r.Route("/api", func(r chi.Router) {
		r.Route("/apis", func(r chi.Router) {
			r.Get("/", routes.ListAPIsHandler(api.logger, readAPIDataFromDirectory))
			r.Get("/{id:[a-zA-z0-9-]+}", routes.APIByIDHandler(api.logger, "../data", readAPIDataFromFile))
		})
	})

	err := http.ListenAndServe(address, r)
	if err != nil {
		return errors.Wrap(err, "failed to run http server")
	}
	return nil
}

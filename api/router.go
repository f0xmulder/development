package api

import (
	"encoding/json"
	"errors"
	"github.com/go-chi/chi"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"gitlab.com/commonground/developer.overheid.nl/api/routes"
	"go.uber.org/zap"
	"io/ioutil"
	"log"
	"path/filepath"
	"regexp"
	"strings"
)

func filenameToAPIID(filename string) string {
	return strings.TrimSuffix(filename, filepath.Ext(filename))
}

func isFilenameValid(filename string) bool {
	regex, _ := regexp.Compile(`^[a-zA-Z0-9-]+\.json$`)
	return regex.MatchString(filename)
}

func readAPIDataFromFile(directory string, filename string) (models.API, error) {
	newAPI := models.API{}

	if !isFilenameValid(filename) {
		return newAPI, errors.New("Invalid filename")
	}

	path := filepath.Join(directory, filename)
	content, err := ioutil.ReadFile(path)

	if err != nil {
		log.Fatal(err)
	}

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

func router(logger *zap.Logger) chi.Router {
	r := chi.NewRouter()

	r.Route("/api", func(r chi.Router) {
		r.Route("/apis", func(r chi.Router) {
			r.Get("/", routes.ListAPIsHandler(logger, readAPIDataFromDirectory))
			r.Get("/{id:[a-zA-Z0-9-]+}", routes.APIByIDHandler(logger, "../data", readAPIDataFromFile))
		})
	})

	return r
}

package data_readers

import (
	"encoding/json"
	"errors"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"io/ioutil"
	"log"
	"path/filepath"
)

// File maps a file into an API model
func File(directory string, filename string) (models.API, error) {
	newAPI := models.API{}

	if !isValid(filename) {
		return newAPI, errors.New("Invalid filename")
	}

	path := filepath.Join(directory, filename)
	content, err := ioutil.ReadFile(path)

	if err != nil {
		log.Fatal(err)
	}

	err = json.Unmarshal(content, &newAPI)
	newAPI.Id = toAPIID(filename)

	return newAPI, err
}

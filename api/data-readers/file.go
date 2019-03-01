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
func File(path string) (models.API, error) {
	newAPI := models.API{}
	filename := filepath.Base(path)

	if !isValid(filename) {
		return newAPI, errors.New("Invalid path")
	}

	content, err := ioutil.ReadFile(path)

	if err != nil {
		log.Fatal(err)
	}

	err = json.Unmarshal(content, &newAPI)
	newAPI.Id = toAPIID(filename)

	return newAPI, err
}

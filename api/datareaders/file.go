package datareaders

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"path/filepath"

	"gitlab.com/commonground/developer.overheid.nl/api/models"
)

// File maps a file into an API model
func File(path string) (models.API, error) {
	newAPI := models.API{}
	filename := filepath.Base(path)

	if !isValid(filename) {
		return newAPI, errors.New("invalid path")
	}

	content, err := ioutil.ReadFile(path)

	if err != nil {
		return newAPI, err
	}

	err = json.Unmarshal(content, &newAPI)

	if err != nil {
		return newAPI, err
	}

	newAPI.ID = toAPIID(filename)
	newAPI.Scores = nil

	return newAPI, err
}

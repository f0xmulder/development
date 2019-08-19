package datareaders

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"path/filepath"

	"gitlab.com/commonground/developer.overheid.nl/api/models"
)

// File maps a file into an API model
func File(path string) (models.API, error) {
	newAPI := models.API{}
	filename := filepath.Base(path)

	if !isValid(filename) {
		return newAPI, errors.New(fmt.Sprintf("path is invalid for file '%s'", filename))
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

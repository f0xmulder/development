package data_readers

import (
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"io/ioutil"
	"path/filepath"
)

// Directory maps every file from a directory into an API model
func Directory(directory string) ([]models.API, error) {
	files, err := ioutil.ReadDir(directory)

	output := []models.API{}

	if err != nil {
		return output, err
	}

	for _, file := range files {
		path := filepath.Join(directory, file.Name())
		newAPI, err := File(path)

		if err != nil {
			return output, err
		} else {
			output = append(output, newAPI)
		}
	}

	return output, nil
}

package data_readers

import (
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"io/ioutil"
	"os"
	"path/filepath"
)

// Directory maps every file from a directory into an API model
func Directory(directory string) ([]models.API, error) {
	files, err := ioutil.ReadDir(directory)

	output := []models.API{}

	if err != nil {
		return output, err
	}

	inputChan := make(chan string)
	resultChan := make(chan result)

	filePaths := filesToFullPath(directory, files)

	go worker(inputChan, resultChan)
	go addWorkToInputChannel(filePaths, inputChan)

	for i := 0; i < len(filePaths); i++ {
		result := <-resultChan

		if result.err != nil {
			return output, result.err
		} else {
			output = append(output, result.apiModel)
		}
	}

	return output, nil
}

type result struct {
	apiModel models.API
	err      error
}

func filesToFullPath(baseDir string, files []os.FileInfo) []string {
	filePaths := []string{}

	for _, file := range files {
		path := filepath.Join(baseDir, file.Name())
		filePaths = append(filePaths, path)
	}

	return filePaths
}

func addWorkToInputChannel(paths []string, inputCh chan<- string) {
	for _, path := range paths {
		inputCh <- path
	}
	close(inputCh)
}

func worker(inputChan <-chan string, resultChan chan<- result) {
	for input := range inputChan {
		newAPI, err := File(input)

		if err != nil {
			resultChan <- result{newAPI, err}
		} else {
			resultChan <- result{newAPI, nil}
		}
	}
}

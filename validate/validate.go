package validate

import (
	"encoding/json"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"io/ioutil"
	"log"
	"path/filepath"
	"strings"
)

func requiredFieldsAreFilled(api models.API) bool {
	return len(api.ServiceName) > 0 &&
		len(api.OrganizationName) > 0 &&
		len(api.DocumentationURL) > 0 &&
		len(api.APISpecificationType) > 0 &&
		len(api.APIURL) > 0
}

func File(filePath string) bool {
	extension := filepath.Ext(filePath)

	if extension != ".json" {
		log.Printf("invalid extension %s", extension)
		return false
	}

	content, err := ioutil.ReadFile(filePath)

	if err != nil {
		log.Print("unable to read file")
		return false
	}

	newAPI := models.API{}
	err = json.Unmarshal(content, &newAPI)

	if err != nil {
		log.Print("invalid JSON")
		return false
	}

	if !requiredFieldsAreFilled(newAPI) {
		return false
	}

	return true
}

func Directory(path string) bool {
	files, err := ioutil.ReadDir(path)

	result := true

	if err != nil {
		log.Fatal(err)
	}

	for _, file := range files {
		filePath := strings.Join([]string{path, file.Name()}, "/")
		result = File(filePath)

		if result == false {
			break
		}
	}

	return result
}

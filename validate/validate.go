package validate

import (
	"encoding/json"
	"fmt"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"io/ioutil"
	"log"
	"path/filepath"
	"strings"
)

type ValidationFeedback struct {
	Valid  bool
	Reason string
}

func File(filePath string) ValidationFeedback {
	extension := filepath.Ext(filePath)

	if extension != ".json" {
		return ValidationFeedback{
			false,
			fmt.Sprintf("invalid extension %s", extension),
		}
	}

	content, err := ioutil.ReadFile(filePath)

	if err != nil {
		return ValidationFeedback{
			false,
			"unable to read file",
		}
	}

	newAPI := models.API{}
	err = json.Unmarshal(content, &newAPI)

	if err != nil {
		return ValidationFeedback{
			false,
			"invalid JSON",
		}
	}

	if len(newAPI.ServiceName) < 1 {
		return ValidationFeedback{
			false,
			"the field service_name is missing",
		}
	}

	if len(newAPI.OrganizationName) < 1 {
		return ValidationFeedback{
			false,
			"the field organization_name is missing",
		}
	}

	if len(newAPI.APIURL) < 1 {
		return ValidationFeedback{
			false,
			"the field api_url is missing",
		}
	}

	if len(newAPI.APISpecificationType) < 1 {
		return ValidationFeedback{
			false,
			"the field api_specification_type is missing",
		}
	}

	if len(newAPI.DocumentationURL) < 1 {
		return ValidationFeedback{
			false,
			"the field documentation_url is missing",
		}
	}

	return ValidationFeedback{
		Valid: true,
	}
}

func Directory(path string) ValidationFeedback {
	files, err := ioutil.ReadDir(path)

	result := ValidationFeedback{
		Valid: true,
	}

	if err != nil {
		log.Fatal(err)
	}

	for _, file := range files {
		filePath := strings.Join([]string{path, file.Name()}, "/")
		result = File(filePath)

		if result.Valid == false {
			result.Reason = fmt.Sprintf("%s - %s", file.Name(), result.Reason)
			break
		}
	}

	return result
}

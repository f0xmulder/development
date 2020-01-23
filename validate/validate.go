package validate

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"path/filepath"
	"strings"

	"gitlab.com/commonground/developer.overheid.nl/api/models"
)

// ValidationFeedback contains feedback info
type ValidationFeedback struct {
	Valid  bool
	Reason string
}

// File validation
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
			fmt.Sprintf("invalid JSON: %s", err.Error()),
		}
	}

	if len(newAPI.Description) < 1 {
		return ValidationFeedback{
			false,
			"the field description is missing",
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

	_, envErr := newAPI.GetProductionEnvironment()

	if envErr != nil {
		return ValidationFeedback{
			false,
			fmt.Sprintf("the api is missing an environment with the name %s", models.ProductionEnvironment),
		}
	}

	for i, env := range newAPI.Environments {
		if !models.IsValidEnvironmentName(env.Name) {
			return ValidationFeedback{
				false,
				fmt.Sprintf("%s is not a valid environment name", env.Name),
			}
		}

		for j, otherEnv := range newAPI.Environments {
			if i != j && env.Name == otherEnv.Name {
				return ValidationFeedback{
					false,
					fmt.Sprintf("duplicate environment name found: %s", env.Name),
				}
			}

		}

		if len(env.APIURL) < 1 {
			return ValidationFeedback{
				false,
				fmt.Sprintf("the field api_url is missing for environment %s", env.Name),
			}
		}

		if len(env.DocumentationURL) < 1 {
			return ValidationFeedback{
				false,
				fmt.Sprintf("the field documentation_url is missing for environment %s", env.Name),
			}
		}

	}

	if newAPI.Forum != nil {
		if newAPI.Forum.Vendor != "discourse" {
			return ValidationFeedback{
				false,
				"Only \"discourse\" is a valid vendor",
			}
		}

		if newAPI.Forum.URL == "" || !strings.HasPrefix(newAPI.Forum.URL, "http") {
			return ValidationFeedback{
				false,
				"Invalid forum url given",
			}
		}
	}

	return ValidationFeedback{
		Valid: true,
	}
}

// Directory validation
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

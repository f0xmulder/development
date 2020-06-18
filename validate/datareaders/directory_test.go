package datareaders

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
	"gitlab.com/commonground/developer.overheid.nl/validate/models"
)

func TestDirectory(t *testing.T) {
	expected := []models.API{
		{
			ID:                "company-service",
			Description:       "Test Description",
			OrganizationName:  "Test Organization Name",
			ServiceName:       "Test Service Name",
			APIType:           "rest_json",
			APIAuthentication: "api_key",
			Tags:              []models.Tag{"test tag"},
			Environments: []models.APIEnvironment{
				{
					Name:             models.ProductionEnvironment,
					APIURL:           "Test API URL",
					SpecificationURL: "Test Specification URL",
					DocumentationURL: "Test Documentation URL",
				},
			},
			Forum: &models.Forum{
				Vendor: "discourse",
				URL:    "https://forum.test.org",
			},
			Contact: models.APIContactDetails{
				Email: "name@example.nl",
				Phone: "0031612345678",
			},
			IsReferenceImplementation: false,
			Relations: map[string][]string{
				"api-id": {"reference-implementation"},
			},
			TermsOfUse: models.APITermsOfUse{
				GovernmentOnly:      true,
				PayPerUse:           false,
				UptimeGuarantee:     99.9,
				SupportResponseTime: "2 days",
			},
			Scores: nil,
		},
		models.API{
			ID:                "other-service",
			Description:       "Some other API",
			OrganizationName:  "Test Organization Name",
			ServiceName:       "Test Service Name",
			APIType:           "rest_json",
			APIAuthentication: "api_key",
			Tags:              []models.Tag{"test tag"},
			Environments: []models.APIEnvironment{
				{
					Name:             models.ProductionEnvironment,
					APIURL:           "Test API URL",
					SpecificationURL: "Test Specification URL",
					DocumentationURL: "Test Documentation URL",
				},
				{
					Name:             "acceptance",
					APIURL:           "Test acceptance API URL",
					SpecificationURL: "Test acceptance Specification URL",
					DocumentationURL: "Test acceptance Documentation URL",
				},
				{
					Name:             "demo",
					APIURL:           "Test demo API URL",
					SpecificationURL: "Test demo Specification URL",
					DocumentationURL: "Test demo Documentation URL",
				},
			},
			Contact: models.APIContactDetails{
				Email: "name@example.nl",
				Phone: "0031612345678",
			},
			Relations: map[string][]string{
				"api-id": {"reference-implementation"},
			},
			TermsOfUse: models.APITermsOfUse{
				GovernmentOnly:      true,
				PayPerUse:           false,
				UptimeGuarantee:     99.9,
				SupportResponseTime: "2 days",
			},
		},
	}

	actual, err := Directory("./test-data/valid/apis")

	if err != nil {
		fmt.Println(err)
	}

	assert.Equal(t, expected, actual)
}

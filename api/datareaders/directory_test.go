package datareaders

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
)

func TestDirectory(t *testing.T) {
	expected := []models.API{
		{
			ID:               "company-service",
			Description:      "Test Description",
			OrganizationName: "Test Organization Name",
			ServiceName:      "Test Service Name",
			APIURL:           "Test API URL",
			APIType:          "REST/JSON",
			SpecificationURL: "Test Specification URL",
			DocumentationURL: "Test Documentation URL",
			Tags:             []models.Tag{"test tag"},
			Badges:           []string{"Gouden API", "Zilveren Kalf"},
			Contact: models.APIContactDetails{
				Email: "name@example.nl",
				Phone: "0031612345678",
				Fax:   "0031687654321",
				Chat:  "https://nl-x.slack.com",
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
			ID:               "inferior-service",
			Description:      "API with no badges",
			OrganizationName: "Test Organization Name",
			ServiceName:      "Test Service Name",
			APIURL:           "Test API URL",
			APIType:          "REST/JSON",
			SpecificationURL: "Test Specification URL",
			DocumentationURL: "Test Documentation URL",
			Tags:             []models.Tag{"test tag"},
			Badges:           []string{},
			Contact: models.APIContactDetails{
				Email: "name@example.nl",
				Phone: "0031612345678",
				Fax:   "0031687654321",
				Chat:  "https://nl-x.slack.com",
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
		models.API{
			ID:               "other-service",
			Description:      "API with one badge",
			OrganizationName: "Test Organization Name",
			ServiceName:      "Test Service Name",
			APIURL:           "Test API URL",
			APIType:          "REST/JSON",
			SpecificationURL: "Test Specification URL",
			DocumentationURL: "Test Documentation URL",
			Tags:             []models.Tag{"test tag"},
			Badges:           []string{"Zilveren Kalf"},
			Contact: models.APIContactDetails{
				Email: "name@example.nl",
				Phone: "0031612345678",
				Fax:   "0031687654321",
				Chat:  "https://nl-x.slack.com",
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

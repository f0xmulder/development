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
			ID: "company-service",
			Description: "Test Description",
			OrganizationName: "Test Organization Name",
			ServiceName: "Test Service Name",
			APIURL: "Test API URL",
			APIType: "Test API Type",
			SpecificationURL: "Test Specification URL",
			DocumentationURL: "Test Documentation URL",
			Tags: []models.Tag{"test tag"},
			Badges: []string{"Gouden API"},
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
	}

	actual, err := Directory("./test-data/valid")

	if err != nil {
		fmt.Println(err)
	}

	assert.Equal(t, expected, actual)
}

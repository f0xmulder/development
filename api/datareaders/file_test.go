package datareaders

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
)

func TestFile(t *testing.T) {
	testCases := []struct {
		filePath      string
		expectedModel models.API
		expectedError bool
	}{
		{
			"./test-data/valid/apis/company-service.json",
			models.API{
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
			false,
		},
		{
			"./test-data/valid/apis/other-service.json",
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
			false,
		},
		{
			"./test-data/valid/apis/inferior-service.json",
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
			false,
		},
		{
			"./test-data/invalid-file-path",
			models.API{},
			true,
		},
		{
			"./test-data/invalid/apis/company-service.json",
			models.API{},
			true,
		},
		{
			"./test-data/invalid-badges/apis/company-service.json",
			models.API{
				ID:               "company-service",
				Description:      "Test Description",
				OrganizationName: "Test Organization Name",
				ServiceName:      "Test Service Name",
				APIURL:           "Test API URL",
				APIType:          "REST/JSON",
				SpecificationURL: "Test Specification URL",
				DocumentationURL: "Test Documentation URL",
				Tags:             []models.Tag{"test tag"},
				Badges:           nil,
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
			true,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.filePath, func(t *testing.T) {
			actual, actualError := File(tc.filePath)
			assert.Equal(
				t,
				tc.expectedError,
				actualError != nil,
				fmt.Sprintf("Got unexpected error value: %v", actualError),
			)
			assert.Equal(t, tc.expectedModel, actual)
		})
	}
}

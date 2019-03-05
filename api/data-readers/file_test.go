package data_readers

import (
	"github.com/stretchr/testify/assert"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"testing"
)

func TestFile(t *testing.T) {
	testCases := []struct {
		filePath      string
		expectedModel models.API
		expectedError bool
	}{
		{
			"./test-data/valid/company-service.json",
			models.API{
				Id:                   "company-service",
				Description:          "Test Description",
				OrganizationName:     "Test Organization Name",
				ServiceName:          "Test Service Name",
				APIURL:               "Test API URL",
				APISpecificationType: "Test Specification Type",
				SpecificationURL:     "Test Specification URL",
				DocumentationURL:     "Test Documentation URL",
				Tags:                 []string{"test tag"},
				Badges:               []string{"Gouden API"},
				Contact: models.APIContactDetails{
					Email: "name@example.nl",
					Phone: "0031612345678",
					Fax:   "0031687654321",
					Chat:  "https://nl-x.slack.com",
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
			"./test-data/invalid/company-service.json",
			models.API{},
			true,
		},
	}

	for _, tc := range testCases {
		actual, actualError := File(tc.filePath)
		assert.Equal(t, tc.expectedModel, actual)
		assert.Equal(t, tc.expectedError, actualError != nil)
	}
}

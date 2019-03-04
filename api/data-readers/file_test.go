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
			"./test-data-valid/test-api-name.json",
			models.API{
				Id:                   "test-api-name",
				Description:          "Test Description",
				OrganizationName:     "Test Organization Name",
				ServiceName:          "Test Service Name",
				APIURL:               "Test API URL",
				APISpecificationType: "Test Specification Type",
				SpecificationURL:     "Test Specification URL",
				DocumentationURL:     "Test Documentation URL",
				Tags:                 []string{"test tag"},
			},
			false,
		},
		{
			"./test-data-valid/invalid-file-path",
			models.API{},
			true,
		},
		{
			"./test-data-invalid/invalid-json.json",
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

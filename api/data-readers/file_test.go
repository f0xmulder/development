package data_readers

import (
	"github.com/stretchr/testify/assert"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"testing"
)

func TestFile(t *testing.T) {
	expected := models.API{
		Id:                   "test-api-name",
		Description:          "Test Description",
		OrganizationName:     "Test Organization Name",
		ServiceName:          "Test Service Name",
		APIURL:               "Test API URL",
		APISpecificationType: "Test Specification Type",
		SpecificationURL:     "Test Specification URL",
		DocumentationURL:     "Test Documentation URL",
	}

	actual, _ := File("./test-data-valid", "test-api-name.json")
	assert.Equal(t, expected, actual)
}

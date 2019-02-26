// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package api

import (
	"github.com/stretchr/testify/assert"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"testing"
)

func TestReadAPIDataFromDirectory(t *testing.T) {
	expectedList := []models.API{
		{
			OrganizationName:     "Test Organization Name",
			ServiceName:          "Test Service Name",
			APIURL:               "Test API URL",
			APISpecificationType: "Test Specification Type",
			SpecificationURL:     "Test Specification URL",
			DocumentationURL:     "Test Documentation URL",
		},
	}

	actualList := readAPIDataFromDirectory("./test-data")
	assert.Equal(t, expectedList, actualList)
}

func TestReadAPIDataFromFile(t *testing.T) {
	expected := models.API{
		OrganizationName:     "Test Organization Name",
		ServiceName:          "Test Service Name",
		APIURL:               "Test API URL",
		APISpecificationType: "Test Specification Type",
		SpecificationURL:     "Test Specification URL",
		DocumentationURL:     "Test Documentation URL",
	}

	actualList := readAPIDataFromFile("./test-data/test-api-name.json")
	assert.Equal(t, expected, actualList)
}

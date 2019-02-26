// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package api

import (
	"github.com/stretchr/testify/assert"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"testing"
)

var validTestAPIModel = models.API{
	Id:                   "test-api-name",
	Description:          "Test Description",
	OrganizationName:     "Test Organization Name",
	ServiceName:          "Test Service Name",
	APIURL:               "Test API URL",
	APISpecificationType: "Test Specification Type",
	SpecificationURL:     "Test Specification URL",
	DocumentationURL:     "Test Documentation URL",
}

func TestFilenameToAPIID(t *testing.T) {
	expected := "test-filename"
	actual := filenameToAPIID("test-filename.json")
	assert.Equal(t, expected, actual)
}

func TestReadAPIDataFromDirectory(t *testing.T) {
	expectedList := []models.API{
		validTestAPIModel,
	}

	actualList, _ := readAPIDataFromDirectory("./test-data-valid")
	assert.Equal(t, expectedList, actualList)
}

func TestReadAPIDataFromFile(t *testing.T) {
	expected := validTestAPIModel

	actualList, _ := readAPIDataFromFile("./test-data-valid", "test-api-name.json")
	assert.Equal(t, expected, actualList)
}

// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package api

import (
	"github.com/stretchr/testify/assert"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"testing"
)

func TestGetAvailableAPIs(t *testing.T) {
	expectedList := []models.API{
		{OrganizationName: "Test"},
	}

	actualList := getAvailableAPIs()
	assert.Equal(t, expectedList, actualList)
}

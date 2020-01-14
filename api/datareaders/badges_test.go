package datareaders

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"

	"gitlab.com/commonground/developer.overheid.nl/api/models"
)

func TestAddBadges(t *testing.T) {
	testCases := []struct {
		filePath      string
		api           models.API
		expected      models.API
		expectedError bool
	}{
		{
			"./test-data/valid/apis/company-service.json",
			models.API{
				ID: "company-service",
			},
			models.API{
				ID:     "company-service",
				Badges: []string{"Gouden API", "Zilveren Kalf"},
			},
			false,
		},
		{
			"./test-data/valid/apis/other-service.json",
			models.API{
				ID: "other-service",
			},
			models.API{
				ID:     "other-service",
				Badges: []string{"Zilveren Kalf"},
			},
			false,
		},
		{
			"./test-data/valid/apis/inferior-service.json",
			models.API{
				ID: "inferior-service",
			},
			models.API{
				ID:     "inferior-service",
				Badges: []string{},
			},
			false,
		},
		{
			"./test-data/invalid-file-path",
			models.API{
				ID: "company-service",
			},
			models.API{
				ID: "company-service",
			},
			true,
		},
		{
			"./test-data/invalid-badges/apis/company-service.json",
			models.API{
				ID: "company-service",
			},
			models.API{
				ID: "company-service",
			},
			true,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.filePath, func(t *testing.T) {
			actualError := addBadges(tc.filePath, &tc.api)
			assert.Equal(
				t,
				tc.expectedError,
				actualError != nil,
				fmt.Sprintf("Got unexpected error value: %v", actualError),
			)
			assert.Equal(t, tc.expected, tc.api)
		})
	}
}

func TestReadBadges(t *testing.T) {
	testCases := []struct {
		filePath      string
		expected      badgeCollection
		expectedError bool
	}{
		{
			"./test-data/valid/badges.json",
			badgeCollection{
				Badges: []badgeData{
					{
						Name: "Gouden API",
						APIs: []string{"company-service"},
					},
					{
						Name: "Zilveren Kalf",
						APIs: []string{"other-service", "company-service"},
					},
				},
			},
			false,
		},
		{
			"./test-data/invalid-badges/badges.json",
			badgeCollection{},
			true,
		},
		{
			"./test-data/invalid-file-path",
			badgeCollection{},
			true,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.filePath, func(t *testing.T) {
			actual, actualError := readBadges(tc.filePath)
			assert.Equal(
				t,
				tc.expectedError,
				actualError != nil,
				fmt.Sprintf("Got unexpected error value: %v", actualError),
			)
			assert.Equal(t, tc.expected, actual)
		})
	}
}

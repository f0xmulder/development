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
			"company-service",
			"Test Description",
			"Test Organization Name",
			"Test Service Name",
			"Test API URL",
			"Test Specification Type",
			"Test Specification URL",
			"Test Documentation URL",
			[]models.Tag{"test tag"},
			[]string{"Gouden API"},
			models.APIContactDetails{
				Email: "name@example.nl",
				Phone: "0031612345678",
				Fax:   "0031687654321",
				Chat:  "https://nl-x.slack.com",
			},
			false,
			map[string][]string{
				"api-id": {"reference-implementation"},
			},
			models.APITermsOfUse{
				GovernmentOnly:      true,
				PayPerUse:           false,
				UptimeGuarantee:     99.9,
				SupportResponseTime: "2 days",
			},
		},
	}

	actual, err := Directory("./test-data/valid")

	if err != nil {
		fmt.Println(err)
	}

	assert.Equal(t, expected, actual)
}

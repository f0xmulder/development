package data_readers

import (
	"fmt"
	"github.com/stretchr/testify/assert"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"testing"
)

func TestDirectory(t *testing.T) {
	expected := []models.API{
		{
			"test-api-name",
			"Test Description",
			"Test Organization Name",
			"Test Service Name",
			"Test API URL",
			"Test Specification Type",
			"Test Specification URL",
			"Test Documentation URL",
			[]string{"test tag"},
			[]string{"Gouden API"},
		},
	}

	actual, err := Directory("./test-data-valid")

	if err != nil {
		fmt.Println(err)
	}

	assert.Equal(t, expected, actual)
}

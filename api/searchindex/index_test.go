package searchindex

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
)

var dummyAPI = models.API{
	"dummy-api",
	"Test Description",
	"Test Organization Name",
	"Test Service Name",
	"Test API URL",
	"Test Specification Type",
	"Test Specification URL",
	"Test Documentation URL",
	[]models.Tag{"test-tag"},
	[]string{},
	models.APIContactDetails{},
	false,
	map[string][]string{},
	models.APITermsOfUse{},
	nil,
}

var anotherDummyAPI = models.API{
	"another-dummy-api",
	"Test Description",
	"Test Organization Name",
	"Test Service Name",
	"Test API URL",
	"Test Specification Type",
	"Test Specification URL",
	"Test Documentation URL",
	[]models.Tag{"test-tag"},
	[]string{},
	models.APIContactDetails{},
	false,
	map[string][]string{},
	models.APITermsOfUse{},
	nil,
}

var apis = []models.API{dummyAPI, anotherDummyAPI}

func TestNewIndex(t *testing.T) {
	index := NewIndex(&apis)

	assert.Equal(t, apis, *index.APIs)

	docCount, err := index.Bleve.DocCount()
	if err != nil {
		t.Error(err)
	}

	assert.Equal(t, docCount, uint64(len(apis)))
}

func TestSearch(t *testing.T) {
	index := NewIndex(&apis)

	searchResult, _ := index.Search("another", map[string][]string{})

	assert.Equal(t, []models.API{anotherDummyAPI}, searchResult.APIs)
}

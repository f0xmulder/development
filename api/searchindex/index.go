package searchindex

import (
	"log"

	"github.com/blevesearch/bleve"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
)

// Setup search index for Bleve with provided data
func Setup(indexDirectoryPath string, data []models.API) bleve.Index {
	var apiIndex bleve.Index
	var err error

	apiIndex, err = bleve.Open(indexDirectoryPath)
	if err == bleve.ErrorIndexPathDoesNotExist {
		mapping := bleve.NewIndexMapping()
		apiIndex, err = bleve.New(indexDirectoryPath, mapping)
		if err != nil {
			log.Fatal(err)
			return nil
		}
	}

	// index the data
	for _, apiModel := range data {
		addToIndexErr := apiIndex.Index(apiModel.Id, apiModel)

		if addToIndexErr != nil {
			log.Fatal(addToIndexErr)
		}
	}

	return apiIndex
}

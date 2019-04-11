package searchindex

import (
	"log"

	"github.com/blevesearch/bleve"
	"github.com/blevesearch/bleve/analysis/analyzer/keyword"
	"github.com/blevesearch/bleve/analysis/lang/nl"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
)

// Setup search index for Bleve with provided data
func Setup(data []models.API) bleve.Index {
	textFieldMapping := bleve.NewTextFieldMapping()
	textFieldMapping.Analyzer = nl.AnalyzerName

	keywordFieldMapping := bleve.NewTextFieldMapping()
	keywordFieldMapping.Analyzer = keyword.Name

	apiMapping := bleve.NewDocumentMapping()
	apiMapping.AddFieldMappingsAt("organization_name", keywordFieldMapping)
	apiMapping.AddFieldMappingsAt("tags", keywordFieldMapping)
	apiMapping.AddFieldMappingsAt("badges", keywordFieldMapping)
	apiMapping.AddFieldMappingsAt("api_specification_type", keywordFieldMapping)

	indexMapping := bleve.NewIndexMapping()
	indexMapping.DefaultAnalyzer = "nl"
	indexMapping.DefaultMapping = apiMapping

	bleveIndex, err := bleve.NewMemOnly(indexMapping)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	// index the data
	for _, apiModel := range data {
		addToIndexErr := bleveIndex.Index(apiModel.ID, apiModel)

		if addToIndexErr != nil {
			log.Fatal(addToIndexErr)
		}
	}

	return bleveIndex
}

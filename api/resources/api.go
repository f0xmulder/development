package resources

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"gitlab.com/commonground/developer.overheid.nl/api/scores"
	"gitlab.com/commonground/developer.overheid.nl/api/searchindex"

	"github.com/blevesearch/bleve"
	"github.com/blevesearch/bleve/search"
	"github.com/go-chi/chi"
	"gitlab.com/commonground/developer.overheid.nl/api/datareaders"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"go.uber.org/zap"
)

// APIResource enables injecting functions to deal with the API resource handlers
type APIResource struct {
	Logger                      *zap.Logger
	RootDirectoryAPIDefinitions string
	ReadFile                    func(path string) (models.API, error)
	ReadDirectory               func(directory string) ([]models.API, error)
	SearchIndex                 bleve.Index
}

// NewAPIResource creates a new APIResource
func NewAPIResource(logger *zap.Logger, rootDirectoryAPIDefinitions string, readFile func(path string) (models.API, error),
	readDirectory func(directory string) ([]models.API, error)) *APIResource {

	outputList, errReadFile := readDirectory("../data")
	if errReadFile != nil {
		log.Fatal(errReadFile)
	}

	i := &APIResource{
		Logger:                      logger,
		RootDirectoryAPIDefinitions: rootDirectoryAPIDefinitions,
		ReadFile:                    readFile,
		ReadDirectory:               readDirectory,
		SearchIndex:                 searchindex.Setup(outputList),
	}
	return i
}

func getQueryParam(r *http.Request, key string) string {
	keys, ok := r.URL.Query()[key]

	if ok {
		return keys[0]
	}

	return ""
}

func getQueryParams(r *http.Request, key string) []string {
	values, ok := r.URL.Query()[key]

	if ok {
		return values
	}

	return []string{}
}

func filterListBySearchResult(items []models.API, matchCollection search.DocumentMatchCollection) []models.API {
	hash := make(map[string]models.API)

	for _, API := range items {
		hash[API.ID] = API
	}

	returnArray := []models.API{}
	for _, document := range matchCollection {
		returnArray = append(returnArray, hash[document.ID])
	}

	return returnArray
}

const RELATION_TYPE_REFERENCE_IMPLEMENTATION = "reference-implementation"

func filterAPIsByReferenceImplementation(items []models.API, implementingAPIID string) []models.API {
	result := []models.API{}

	for _, API := range items {
		for _, relationType := range API.Relations[implementingAPIID] {
			if relationType == RELATION_TYPE_REFERENCE_IMPLEMENTATION {
				result = append(result, API)
			}
		}
	}

	return result
}

// Routes defines the routes for the API resource
func (rs APIResource) Routes() chi.Router {
	r := chi.NewRouter()

	r.Get("/", rs.List)
	r.Route("/{id:[a-zA-Z0-9-]+}", func(r chi.Router) {
		r.Get("/", rs.Get)
		r.Get("/implemented-by", rs.ListImplementedBy)
	})

	return r
}

// List will write a list of all APIs
func (rs APIResource) List(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	outputList, errReadFile := rs.ReadDirectory("../data")
	if errReadFile != nil {
		rs.Logger.Error("oops, something went wrong while getting the info of an API", zap.Error(errReadFile))
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	query := bleve.NewConjunctionQuery()

	q := getQueryParam(r, "q")
	if q != "" {
		query.AddQuery(bleve.NewQueryStringQuery(q))
	} else {
		query.AddQuery(bleve.NewMatchAllQuery())
	}

	searchRequest := bleve.NewSearchRequest(query)

	organizationFacet := bleve.NewFacetRequest("organization_name", 10)
	searchRequest.AddFacet("organization_name", organizationFacet)

	tagsFacet := bleve.NewFacetRequest("tags", 10)
	searchRequest.AddFacet("tags", tagsFacet)

	apiSpecTypeFacet := bleve.NewFacetRequest("api_specification_type", 10)
	searchRequest.AddFacet("api_specification_type", apiSpecTypeFacet)

	totalSearchResult, err := rs.SearchIndex.Search(searchRequest)
	if err != nil {
		rs.Logger.Error("failed to output APIs", zap.Error(err))
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	tags := getQueryParams(r, "tags")
	if len(tags) > 0 {
		tagsQuery := bleve.NewDisjunctionQuery()
		for _, tag := range tags {
			tagsQuery.AddQuery(bleve.NewPhraseQuery([]string{tag}, "tags"))
		}
		query.AddQuery(tagsQuery)
	}

	organizationNames := getQueryParams(r, "organization_name")
	if len(organizationNames) > 0 {
		organizationQuery := bleve.NewDisjunctionQuery()
		for _, organizationName := range organizationNames {
			organizationQuery.AddQuery(bleve.NewPhraseQuery([]string{organizationName}, "organization_name"))
		}
		query.AddQuery(organizationQuery)
	}

	apiSpecificationTypes := getQueryParams(r, "api_specification_type")
	if len(apiSpecificationTypes) > 0 {
		apiSpecificationTypesQuery := bleve.NewDisjunctionQuery()
		for _, apiSpecificationType := range apiSpecificationTypes {
			apiSpecificationTypesQuery.AddQuery(bleve.NewPhraseQuery([]string{apiSpecificationType}, "api_specification_type"))
		}
		query.AddQuery(apiSpecificationTypesQuery)
	}

	searchRequest = bleve.NewSearchRequest(query)
	searchResult, err := rs.SearchIndex.Search(searchRequest)
	if err != nil {
		rs.Logger.Error("failed to output APIs", zap.Error(err))
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	result := models.APIList{
		Total:  totalSearchResult.Total,
		Facets: totalSearchResult.Facets,
		APIs:   filterListBySearchResult(outputList, searchResult.Hits),
	}

	err = json.NewEncoder(w).Encode(result)
	if err != nil {
		rs.Logger.Error("failed to output APIs", zap.Error(err))
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}
}

// Get returns information of a specific API by id
func (rs APIResource) Get(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	apiID := chi.URLParam(r, "id")
	filename := datareaders.FromID(apiID)
	path := filepath.Join(rs.RootDirectoryAPIDefinitions, filename)

	if _, err := os.Stat(path); os.IsNotExist(err) {
		rs.Logger.Error("failed to find API by id", zap.Error(err))
		http.Error(w, "404 page not found", http.StatusNotFound)
		return
	}

	api, errReadFile := rs.ReadFile(path)

	if errReadFile != nil {
		rs.Logger.Error("failed to read API file", zap.Error(errReadFile))
		http.Error(w, "oops, something went wrong while getting the API info", http.StatusInternalServerError)
		return
	}

	scores := scores.CalculateScores(api)
	api.Scores = &scores

	err := json.NewEncoder(w).Encode(api)

	if err != nil {
		rs.Logger.Error("failed to parse JSON for API", zap.Error(err))
		http.Error(w, "oops, something went wrong while getting the API info", http.StatusInternalServerError)
		return
	}
}

func (rs APIResource) ListImplementedBy(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	apiID := chi.URLParam(r, "id")

	outputList, errReadFile := rs.ReadDirectory("../data")
	outputList = filterAPIsByReferenceImplementation(outputList, apiID)

	err := json.NewEncoder(w).Encode(outputList)

	if err != nil {
		rs.Logger.Error("failed to output APIs", zap.Error(err))
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	if errReadFile != nil {
		rs.Logger.Error("oops, something went wrong while getting the info of an API", zap.Error(errReadFile))
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}
}

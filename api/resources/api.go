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

// via https://golangcode.com/get-a-url-parameter-from-a-request/
func getQueryParam(r *http.Request, key string) string {
	keys, ok := r.URL.Query()[key]

	if !ok || len(keys[0]) < 1 {
		return ""
	}

	return keys[0]
}

func filterAPIsByTag(tag string, items []models.API) []models.API {
	hash := make(map[string][]models.API)

	for _, API := range items {
		for _, tag := range API.Tags {
			hash[string(tag)] = append(hash[string(tag)], API)
		}
	}

	if hash[tag] != nil {
		return hash[tag]
	}

	return []models.API{}
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

	tagsFilterValue := getQueryParam(r, "tags")
	if len(tagsFilterValue) > 0 {
		outputList = filterAPIsByTag(tagsFilterValue, outputList)
	}

	q := getQueryParam(r, "q")
	if len(q) > 0 {
		query := bleve.NewQueryStringQuery(q)
		searchRequest := bleve.NewSearchRequest(query)

		organizationFacet := bleve.NewFacetRequest("organization_name", 10)
		searchRequest.AddFacet("organization_name", organizationFacet)

		tagsFacet := bleve.NewFacetRequest("tags", 10)
		searchRequest.AddFacet("tags", tagsFacet)

		apiSpecTypeFacet := bleve.NewFacetRequest("api_specification_type", 10)
		searchRequest.AddFacet("api_specification_type", apiSpecTypeFacet)

		searchResult, err := rs.SearchIndex.Search(searchRequest)
		if err != nil {
			rs.Logger.Error("failed to output APIs", zap.Error(err))
			http.Error(w, "server error", http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(searchResult)
	}

	err := json.NewEncoder(w).Encode(outputList)

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

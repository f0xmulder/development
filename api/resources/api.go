package resources

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"gitlab.com/commonground/developer.overheid.nl/api/scores"
	"gitlab.com/commonground/developer.overheid.nl/api/searchindex"

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
	SearchIndex                 searchindex.Index
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
		SearchIndex:                 searchindex.NewIndex(&outputList),
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

	q := getQueryParam(r, "q")

	filters := map[string][]string{}
	for _, key := range []string{"organization_name", "tags", "api_specification_type"} {
		values := getQueryParams(r, key)
		if len(values) > 0 {
			filters[key] = values
		}
	}

	apiList, err := rs.SearchIndex.Search(q, filters)
	if err != nil {
		rs.Logger.Error("failed to output APIs", zap.Error(err))
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	err = json.NewEncoder(w).Encode(apiList)
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

// ListImplementedBy returns a list of implemented API's for a specific reference API
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

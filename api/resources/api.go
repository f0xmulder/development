package resources

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"

	bleveHttp "github.com/blevesearch/bleve/http"
	"github.com/go-chi/chi"
	"gitlab.com/commonground/developer.overheid.nl/api/datareaders"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"gitlab.com/commonground/developer.overheid.nl/api/searchindex"
	"go.uber.org/zap"
)

// APIResource enables injecting functions to deal with the API resource handlers
type APIResource struct {
	Logger                      *zap.Logger
	RootDirectoryAPIDefinitions string
	ReadFile                    func(path string) (models.API, error)
	ReadDirectory               func(directory string) ([]models.API, error)
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

// Routes defines the routes for the API resource
func (rs APIResource) Routes() chi.Router {
	r := chi.NewRouter()

	outputList, errReadFile := rs.ReadDirectory("../data")

	if errReadFile != nil {
		log.Fatal(errReadFile)
	}

	indexDirectoryPath := "/tmp/.don-apis-bleve-index"
	apiIndex := searchindex.Setup(outputList)
	bleveHttp.RegisterIndexName(indexDirectoryPath, apiIndex)
	searchHandler := bleveHttp.NewSearchHandler(indexDirectoryPath).ServeHTTP

	r.Get("/", rs.List)
	r.Get("/{id:[a-zA-Z0-9-]+}", rs.Get)
	r.Post("/search", searchHandler)

	return r
}

// List will write a list of all APIs
func (rs APIResource) List(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	outputList, errReadFile := rs.ReadDirectory("../data")
	tagsFilterValue := getQueryParam(r, "tags")

	if len(tagsFilterValue) > 0 {
		outputList = filterAPIsByTag(tagsFilterValue, outputList)
	}

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

	output, errReadFile := rs.ReadFile(path)

	if errReadFile != nil {
		rs.Logger.Error("failed to read API file", zap.Error(errReadFile))
		http.Error(w, "oops, something went wrong while getting the API info", http.StatusInternalServerError)
		return
	}

	err := json.NewEncoder(w).Encode(output)

	if err != nil {
		rs.Logger.Error("failed to parse JSON for API", zap.Error(err))
		http.Error(w, "oops, something went wrong while getting the API info", http.StatusInternalServerError)
		return
	}
}

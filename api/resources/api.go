package resources

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/go-chi/chi"
	"go.uber.org/zap"

	"gitlab.com/commonground/developer.overheid.nl/api/datareaders"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"gitlab.com/commonground/developer.overheid.nl/api/scores"
	"gitlab.com/commonground/developer.overheid.nl/api/searchindex"
	"gitlab.com/commonground/developer.overheid.nl/api/utils"
)

// APIResource enables injecting functions to deal with the API resource handlers
type APIResource struct {
	Logger        *zap.Logger
	APIDirectory  string
	ReadFile      func(path string) (models.API, error)
	ReadDirectory func(directory string) ([]models.API, error)
	SearchIndex   searchindex.Index
}

// NewAPIResource creates a new APIResource
func NewAPIResource(
	logger *zap.Logger,
	rootDirectory string,
	readFile func(path string) (models.API, error),
	readDirectory func(directory string) ([]models.API, error),
) *APIResource {

	apiDirectory := filepath.Join(rootDirectory, datareaders.API_DIR)
	outputList, errReadFile := readDirectory(apiDirectory)
	if errReadFile != nil {
		logger.Fatal("error while reading the data directory. check its contents", zap.Error(errReadFile))
	}

	searchIndex := searchindex.NewIndex(&outputList)

	i := &APIResource{
		Logger:        logger,
		APIDirectory:  apiDirectory,
		ReadFile:      readFile,
		ReadDirectory: readDirectory,
		SearchIndex:   searchIndex,
	}

	return i
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
		r.Get("/forum-posts", rs.ForumPosts)
	})

	return r
}

// List will write a list of all APIs
func (rs APIResource) List(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	q := ""
	if len(utils.GetQueryParam(r, "q")) > 0 {
		q = utils.GetQueryParam(r, "q")[0]
	}

	page := 1
	if len(utils.GetQueryParam(r, "page")) > 0 {
		pageAsString := utils.GetQueryParam(r, "page")[0]
		pageAsInt, convErr := strconv.Atoi(pageAsString)

		if convErr != nil || pageAsInt < 1 {
			rs.Logger.Error("failed to convert page to int", zap.Error(convErr))
			http.Error(w, "invalid page specified, should be a natural number greater than zero", http.StatusUnprocessableEntity)
			return
		}

		page = pageAsInt
	}

	filters := map[string][]string{}
	for _, key := range []string{"organization_name", "tags", "api_type"} {
		values := utils.GetQueryParam(r, key)
		if len(values) > 0 {
			filters[key] = values
		}
	}

	apiList, err := rs.SearchIndex.Search(q, filters, page, 10)
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
	api, err := rs.GetAPIForID(apiID, w)
	if err != nil {
		return
	}

	scores := scores.CalculateScores(api)
	api.Scores = &scores

	err = json.NewEncoder(w).Encode(api)

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

	outputList, errReadFile := rs.ReadDirectory(rs.APIDirectory)
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

var client = &http.Client{Timeout: 10 * time.Second}

// ForumPosts returns the forum posts of an external forum integration when available
func (rs APIResource) ForumPosts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	apiID := chi.URLParam(r, "id")
	api, err := rs.GetAPIForID(apiID, w)
	if err != nil {
		return
	}

	forum, err := api.GetForum()
	if err != nil {
		rs.Logger.Error("failed to read API forum integration", zap.Error(err))
		http.Error(w, "404 forum integration not found", http.StatusNotFound)
		return
	}

	url := forum.URL + ".json"
	res, err := client.Get(url)
	if err != nil {
		rs.Logger.Error("failed to GET forum post JSON", zap.Error(err))
		http.Error(w, "oops, something went wrong while getting the API forum info", http.StatusInternalServerError)
		return
	}

	body, err := ioutil.ReadAll(res.Body)
	defer res.Body.Close()
	if err != nil {
		rs.Logger.Error("failed to read forum posts JSON", zap.Error(err))
		http.Error(w, "oops, something went wrong while getting the API forum info", http.StatusInternalServerError)
		return
	}

	w.Write(body)
}

func (rs APIResource) GetAPIForID(apiID string, w http.ResponseWriter) (models.API, error) {
	filename := datareaders.FromID(apiID)
	path := filepath.Join(rs.APIDirectory, filename)

	if _, err := os.Stat(path); os.IsNotExist(err) {
		rs.Logger.Error("failed to find API by id", zap.Error(err))
		http.Error(w, "404 page not found", http.StatusNotFound)
		return models.API{}, err
	}

	api, errReadFile := rs.ReadFile(path)

	if errReadFile != nil {
		rs.Logger.Error("failed to read API file", zap.Error(errReadFile))
		http.Error(w, "oops, something went wrong while getting the API info", http.StatusInternalServerError)
		return models.API{}, errReadFile
	}

	return api, nil
}

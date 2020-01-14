package resources

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi"
	"go.uber.org/zap"

	"gitlab.com/commonground/developer.overheid.nl/api/datareaders"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"path/filepath"
)

// TagResource enables injecting functions to deal with the Tag resource handlers
type TagResource struct {
	Logger        *zap.Logger
	APIDirectory  string
	ReadDirectory func(directory string) ([]models.API, error)
}

// NewTagResource creates a new TagResource
func NewTagResource(logger *zap.Logger, rootDirectory string, readDirectory func(directory string) ([]models.API, error)) *TagResource {
	apiDirectory := filepath.Join(rootDirectory, datareaders.API_DIR)

	i := &TagResource{
		Logger:        logger,
		APIDirectory:  apiDirectory,
		ReadDirectory: readDirectory,
	}

	return i
}

// via http://www.golangprograms.com/remove-duplicate-values-from-slice.html
func unique(tags []models.Tag) []models.Tag {
	keys := make(map[models.Tag]bool)
	list := []models.Tag{}

	for _, entry := range tags {
		if _, value := keys[entry]; !value {
			keys[entry] = true
			list = append(list, entry)
		}
	}
	return list
}

// Routes defines the routes for the Tag resource
func (rs TagResource) Routes() chi.Router {
	r := chi.NewRouter()

	r.Get("/", rs.List)

	return r
}

// List will write a list of all tags used in the APIs
func (rs TagResource) List(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	apis, errReadFile := rs.ReadDirectory(rs.APIDirectory)

	tags := []models.Tag{}
	for _, api := range apis {
		for _, tag := range api.Tags {
			tags = append(tags, tag)
		}
	}

	tags = unique(tags)

	err := json.NewEncoder(w).Encode(tags)

	if err != nil {
		rs.Logger.Error("failed to output tags", zap.Error(err))
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	if errReadFile != nil {
		rs.Logger.Error("oops, something went wrong while getting the info of a tag", zap.Error(errReadFile))
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}
}

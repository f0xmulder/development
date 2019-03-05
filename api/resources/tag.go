package resources

import (
	"encoding/json"
	"github.com/go-chi/chi"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"go.uber.org/zap"
	"net/http"
)

type TagResource struct {
	Logger                      *zap.Logger
	RootDirectoryAPIDefinitions string
	ReadDirectory               func(directory string) ([]models.API, error)
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

func (rs TagResource) Routes() chi.Router {
	r := chi.NewRouter()

	r.Get("/", rs.List)

	return r
}

func (rs TagResource) List(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	apis, errReadFile := rs.ReadDirectory("../data")

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

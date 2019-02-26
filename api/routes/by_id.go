package routes

import (
	"encoding/json"
	"github.com/go-chi/chi"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"go.uber.org/zap"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

func apiIDToFilename(apiID string) string {
	return strings.Join([]string{apiID, ".json"}, "")
}

// APIByIDHandler show API details by id
func APIByIDHandler(logger *zap.Logger, rootDirectoryAPIDefinitions string, apiFileReader func(directory string, filename string) (models.API, error)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		apiID := chi.URLParam(r, "id")
		filename := apiIDToFilename(apiID)
		path := filepath.Join(rootDirectoryAPIDefinitions, filename)

		if _, err := os.Stat(path); os.IsNotExist(err) {
			logger.Error("failed to find API by id", zap.Error(err))
			http.Error(w, "404 page not found", http.StatusNotFound)
			return
		}

		output, errReadFile := apiFileReader(rootDirectoryAPIDefinitions, filename)

		if errReadFile != nil {
			logger.Error("failed to read API file", zap.Error(errReadFile))
			http.Error(w, "oops, something went wrong while getting the API info", http.StatusInternalServerError)
			return
		}

		err := json.NewEncoder(w).Encode(output)

		if err != nil {
			logger.Error("failed to parse JSON for API", zap.Error(err))
			http.Error(w, "oops, something went wrong while getting the API info", http.StatusInternalServerError)
			return
		}
	}
}

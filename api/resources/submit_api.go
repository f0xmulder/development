package resources

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"go.uber.org/zap"
)

type SubmitAPIResource struct {
	Logger *zap.Logger
	APIKey string
}

func (rs SubmitAPIResource) Routes() chi.Router {
	r := chi.NewRouter()

	r.Post("/", rs.Create)

	return r
}

func (rs SubmitAPIResource) Create(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	input := models.API{}
	err := json.NewDecoder(r.Body).Decode(&input)

	if err != nil {
		rs.Logger.Error("could not parse input json", zap.Error(err))
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}
}

package resources

import (
	"bytes"
	"encoding/json"
	"net/http"
	"text/template"

	"github.com/go-chi/chi"
	"gitlab.com/commonground/developer.overheid.nl/api/gitlab"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"go.uber.org/zap"
)

// SubmitAPIResource allows users to submit a new API through a web form
type SubmitAPIResource struct {
	Logger       *zap.Logger
	GitlabConfig gitlab.Config
	CreateIssue  func(config gitlab.Config, issue gitlab.PostIssue) (gitlab.GetIssue, error)
}

// Routes return all routes that are exposed by the SubmitAPIResource
func (rs SubmitAPIResource) Routes() chi.Router {
	r := chi.NewRouter()
	r.Post("/", rs.Create)

	return r
}

// Create creates a new issue in Gitlab with the API specification
func (rs SubmitAPIResource) Create(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	input := models.API{}
	err := json.NewDecoder(r.Body).Decode(&input)

	if err != nil {
		rs.Logger.Error("could not parse input json", zap.Error(err))
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}

	title, err := rs.parseTitle(input)
	if err != nil {
		rs.Logger.Error("could not parse input json", zap.Error(err))
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}
	description, err := rs.parseDescription(input)
	if err != nil {
		rs.Logger.Error("could not parse input json", zap.Error(err))
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}

	postIssue := gitlab.PostIssue{
		Title:       title,
		Description: description,
		Labels:      "New API",
	}

	getIssue, err := rs.CreateIssue(rs.GitlabConfig, postIssue)
	if err != nil {
		rs.Logger.Error("failed to post issue to Gitlab API", zap.Error(err))
		http.Error(w, "oops, something went wrong while posting the API", http.StatusInternalServerError)
		return
	}

	err = json.NewEncoder(w).Encode(getIssue)

	if err != nil {
		rs.Logger.Error("failed to parse JSON for the Gitlab response", zap.Error(err))
		http.Error(w, "oops, something went wrong while posting the API", http.StatusInternalServerError)
		return
	}
}

func (rs SubmitAPIResource) parseTitle(apiInput models.API) (string, error) {
	var title bytes.Buffer

	titleTemplate, err := template.New("").Parse("Add a new API: {{.OrganizationName}} {{.ServiceName}}")
	if err != nil {
		return "", err
	}

	titleTemplate.Execute(&title, apiInput)

	return title.String(), nil
}

func (rs SubmitAPIResource) parseDescription(apiInput models.API) (string, error) {
	var description bytes.Buffer

	descriptionTemplate, err := template.New("").Parse(`
We would like to add the following API:

` + "```json" + `
{{.JSON}}
` + "```" + `

Thanks a lot!

The web form
	`)

	if err != nil {
		return "", err
	}

	jsonBody, err := json.MarshalIndent(apiInput, "", "    ")

	if err != nil {
		return "", err
	}

	descriptionTemplate.Execute(&description, map[string]string{
		"JSON": string(jsonBody),
	})

	return description.String(), nil
}

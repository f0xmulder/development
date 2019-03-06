package resources

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/url"
	"text/template"

	"github.com/go-chi/chi"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"go.uber.org/zap"
)

// GitlabConfig holds the configuration needed to talk to Gitlab
type GitlabConfig struct {
	Host        string
	AccessToken string
	ProjectID   string
}

type SubmitAPIResource struct {
	Logger       *zap.Logger
	GitlabConfig GitlabConfig
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

	var title, description bytes.Buffer

	titleTemplate, err := template.New("").Parse("Add a new API: {{.OrganizationName}} {{.ServiceName}}")
	if err != nil {
		rs.Logger.Error("could not parse issue title", zap.Error(err))
		http.Error(w, "server error", http.StatusInternalServerError)
	}

	titleTemplate.Execute(&title, input)

	descriptionTemplate, err := template.New("").Parse(`
We would like to add the following API:

` + "```json" + `
{{.JSON}}
` + "```" + `

Thanks a lot!

The web form
	`)

	if err != nil {
		rs.Logger.Error("could not parse issue description", zap.Error(err))
		http.Error(w, "server error", http.StatusInternalServerError)
	}

	descriptionJSON, err := json.MarshalIndent(input, "", "    ")

	if err != nil {
		rs.Logger.Error("could not parse description json", zap.Error(err))
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	descriptionTemplate.Execute(&description, map[string]string{
		"JSON": string(descriptionJSON),
	})

	postValues := map[string]string{
		"title":       title.String(),
		"description": description.String(),
		"labels":      "New API",
	}

	jsonPostValues, err := json.Marshal(postValues)

	if err != nil {
		rs.Logger.Error("could not parse output json", zap.Error(err))
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	if rs.GitlabConfig.Host == "" {
		return
	}

	parsedURL := url.URL{
		Scheme: "https",
		Host:   rs.GitlabConfig.Host,
		Path:   "/api/v4/projects/" + rs.GitlabConfig.ProjectID + "/issues",
	}

	req, err := http.NewRequest("POST", parsedURL.String(), bytes.NewBuffer(jsonPostValues))

	if err != nil {
		rs.Logger.Error("could not create http request", zap.Error(err))
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("PRIVATE-TOKEN", rs.GitlabConfig.AccessToken)

	client := &http.Client{}

	resp, err := client.Do(req)

	if err != nil {
		rs.Logger.Error("could not perform request", zap.Error(err))
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	if resp.StatusCode != http.StatusCreated {
		rs.Logger.Error("could not create issue", zap.Error(err))
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}
}

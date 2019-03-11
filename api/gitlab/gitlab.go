package gitlab

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
)

// Config holds the configuration needed to connect to the Gitlab API
type Config struct {
	URL         string
	AccessToken string
	ProjectID   string
}

// GetIssue represents an Issue when getting an issue from Gitlab
type GetIssue struct {
	ID          int      `json:"id"`
	State       string   `json:"state"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	CreatedAt   string   `json:"created_at"`
	Weight      string   `json:"weight"`
	WebURL      string   `json:"web_url"`
	Labels      []string `json:"labels"`
}

// PostIssue represents an Issue when posting it to Gitlab
type PostIssue struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Weight      string `json:"weight"`
	Labels      string `json:"labels"`
}

// CreateIssue creates an issue in Gitlab and returns the created issue
func CreateIssue(config Config, issue PostIssue) (GetIssue, error) {
	parsedURL, err := url.Parse(config.URL)
	if err != nil {
		return GetIssue{}, err
	}

	parsedURL.Path = "/api/v4/projects/" + config.ProjectID + "/issues"

	jsonBody, err := json.Marshal(issue)
	if err != nil {
		return GetIssue{}, err
	}

	req, err := http.NewRequest("POST", parsedURL.String(), bytes.NewBuffer(jsonBody))
	if err != nil {
		return GetIssue{}, err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("PRIVATE-TOKEN", config.AccessToken)

	client := &http.Client{}

	resp, err := client.Do(req)
	if err != nil {
		return GetIssue{}, err
	}

	if resp.StatusCode != http.StatusCreated {
		buf, _ := ioutil.ReadAll(resp.Body)
		errorMessage := fmt.Sprintf("Did not receive a StatusCreated code from the Gitlab API, but received %d, message: %s", resp.StatusCode, buf)
		return GetIssue{}, errors.New(errorMessage)
	}

	getIssue := GetIssue{}
	err = json.NewDecoder(resp.Body).Decode(&getIssue)
	if err != nil {
		return GetIssue{}, err
	}

	return getIssue, nil
}

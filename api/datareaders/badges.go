package datareaders

import (
	"encoding/json"
	"io/ioutil"
	"path/filepath"

	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"gitlab.com/commonground/developer.overheid.nl/api/utils"
)

const (
	API_DIR                         = "apis"
	BADGES_PATH_RELATIVE_TO_API_DIR = "../../badges.json"
)

type badgeCollection struct {
	Badges []badgeData `json:"badges"`
}

type badgeData struct {
	Name string   `json:"name"`
	APIs []string `json:"apis"`
}

// Add the associated Badges to the API found at apiFilePath.
// Pre: api.ID is set
func addBadges(apiFilePath string, api *models.API) error {
	badgesFilePath := filepath.Join(apiFilePath, BADGES_PATH_RELATIVE_TO_API_DIR)
	badgeCollection, err := readBadges(badgesFilePath)

	if err != nil {
		return err
	}

	api.Badges = []string{}

	for _, badge := range badgeCollection.Badges {
		if utils.Includes(badge.APIs, api.ID) {
			api.Badges = append(api.Badges, badge.Name)
		}
	}

	return nil
}

func readBadges(badgesFilePath string) (badgeCollection, error) {
	badgeCollection := badgeCollection{}

	content, err := ioutil.ReadFile(badgesFilePath)

	if err != nil {
		return badgeCollection, err
	}

	err = json.Unmarshal(content, &badgeCollection)

	return badgeCollection, err
}

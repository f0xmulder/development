package models

import "encoding/json"
import "errors"
import "fmt"

// API model
type API struct {
	ID                        string              `json:"id,omitempty"`
	Description               string              `json:"description"`
	OrganizationName          string              `json:"organization_name"`
	ServiceName               string              `json:"service_name"`
	APIType                   APIType             `json:"api_type"`
	Tags                      []Tag               `json:"tags"`
	Badges                    []string            `json:"badges"`
	Environments              []APIEnvironment    `json:"environments"`
	Forum                     *Forum              `json:"forum,omitempty"`
	Contact                   APIContactDetails   `json:"contact"`
	IsReferenceImplementation bool                `json:"is_reference_implementation"`
	Relations                 map[string][]string `json:"relations,omitempty"`
	TermsOfUse                APITermsOfUse       `json:"terms_of_use"`
	Scores                    *APIScores          `json:"scores,omitempty"`
}

// APIEnvironment model
type APIEnvironment struct {
	Name             string `json:"name"`
	APIURL           string `json:"api_url"`
	SpecificationURL string `json:"specification_url"`
	DocumentationURL string `json:"documentation_url"`
}

// Forum model
type Forum struct {
	Vendor string `json:"vendor"`
	URL    string `json:"url"`
}

// APIContactDetails model
type APIContactDetails struct {
	Email string `json:"email"`
	Phone string `json:"phone"`
	Fax   string `json:"fax"`
	Chat  string `json:"chat"`
	URL   string `json:"url"`
}

// APITermsOfUse model
type APITermsOfUse struct {
	GovernmentOnly      bool    `json:"government_only"`
	PayPerUse           bool    `json:"pay_per_use"`
	UptimeGuarantee     float64 `json:"uptime_guarantee"`
	SupportResponseTime string  `json:"support_response_time"`
}

// APIScores model
type APIScores struct {
	HasDocumentation  bool `json:"has_documentation"`
	HasSpecification  bool `json:"has_specification"`
	HasContactDetails bool `json:"has_contact_details"`
	ProvidesSLA       bool `json:"provides_sla"`
}

// APIType enum
type APIType string

const (
	UNKNOWN   APIType = "Onbekend"
	REST_JSON APIType = "REST/JSON"
	REST_XML  APIType = "REST/XML"
	SOAP_XML  APIType = "SOAP/XML"
	GRPC      APIType = "gRPC"
	GRAPHQL   APIType = "GraphQL"
	SPARQL    APIType = "SPARQL"
	WFS       APIType = "WFS"
	WMS       APIType = "WMS"
)

// API functions
func (result *API) UnmarshalJSON(data []byte) error {
	// Define a secondary type so that we don't end up with a recursive call to json.Unmarshal
	type TempType API
	var tempResult *TempType = (*TempType)(result)
	err := json.Unmarshal(data, &tempResult)
	if err != nil {
		return err
	}

	// Validate the valid enum values
	switch result.APIType {
	case
		UNKNOWN,
		REST_JSON,
		REST_XML,
		SOAP_XML,
		GRPC,
		GRAPHQL,
		SPARQL,
		WFS,
		WMS:
		return nil
	case "":
		return errors.New("the field api_type is empty or missing")
	default:
		result.APIType = ""
		return errors.New("invalid value for the field api_type")
	}
}

// Every API must have an APIEnvironment with this name
const ProductionEnvironment string = "Productie"

func IsValidEnvironmentName(envName string) bool {
	switch envName {
	case
		ProductionEnvironment,
		"Acceptatie",
		"Demo":
		return true
	}

	return false
}

func (api *API) GetProductionEnvironment() (APIEnvironment, error) {
	for _, env := range api.Environments {
		if env.Name == ProductionEnvironment {
			return env, nil
		}
	}

	return APIEnvironment{}, fmt.Errorf("api does not contain a production environment")
}

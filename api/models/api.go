package models

// API model
type API struct {
	ID                        string              `json:"id,omitempty"`
	Description               string              `json:"description"`
	OrganizationName          string              `json:"organization_name"`
	ServiceName               string              `json:"service_name"`
	APIURL                    string              `json:"api_url"`
	APIType                   string              `json:"api_type"`
	SpecificationURL          string              `json:"specification_url"`
	DocumentationURL          string              `json:"documentation_url"`
	Tags                      []Tag               `json:"tags"`
	Badges                    []string            `json:"badges"`
	Contact                   APIContactDetails   `json:"contact"`
	IsReferenceImplementation bool                `json:"is_reference_implementation"`
	Relations                 map[string][]string `json:"relations,omitempty"`
	TermsOfUse                APITermsOfUse       `json:"terms_of_use"`
	Scores                    *APIScores          `json:"scores,omitempty"`
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

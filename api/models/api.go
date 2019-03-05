package models

// API model
type API struct {
	Id                   string            `json:"id"`
	Description          string            `json:"description"`
	OrganizationName     string            `json:"organization_name"`
	ServiceName          string            `json:"service_name"`
	APIURL               string            `json:"api_url"`
	APISpecificationType string            `json:"api_specification_type"`
	SpecificationURL     string            `json:"specification_url"`
	DocumentationURL     string            `json:"documentation_url"`
	Tags                 []string          `json:"tags"`
	Badges               []string          `json:"badges"`
	Contact              APIContactDetails `json:"contact"`
}

type APIContactDetails struct {
	Email string `json:"email"`
	Phone string `json:"phone"`
	Fax   string `json:"fax"`
	Chat  string `json:"chat"`
}

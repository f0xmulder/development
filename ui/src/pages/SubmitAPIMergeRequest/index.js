import React from 'react'
import { StyledPre } from './index.styles'

const SubmitAPIMergeRequest = () => (
  <div>
    <p>De bestandsnaam moet voldoen aan de volgende afspraken:</p>
    <StyledPre>{`data/{organization}-{api}.json`}</StyledPre>

    <p>En de inhoud moet overeenkomen met onderstaande structuur:</p>

    <StyledPre>
      {`
{
    "description": "Voorbeeld van een omschrijving",
    "organization_name": "Voorbeeld van een organisatie naam",
    "service_name": "Voorbeeld van een API naam",
    "api_url": "https://api.example.com/service/",
    "api_type": "REST/JSON",
    "specification_url": "https://api.example.com/service/swagger/?format=openapi",
    "documentation_url": "https://api.example.com/service/",
    "tags": ["Voorbeeld tag", "Nog een tag"],
    "badges": ["Gouden API"],
    "contact": {
        "email": "helpdesk@voorbeeld.nl",
        "phone": "0031612345678",
        "fax": "0031687654321",
        "chat": "https://nl-x.slack.com",
        "url": "https://github.com/VNG-Realisatie/nlx"
    },
    "is_reference_implementation": false,
    "relations": {
        "example-api-id": ["reference-implementation"]
    },
    "terms_of_use": {
      "government_only": true,
      "pay_per_use": false,
      "uptime_guarantee": 99.9,
      "support_response_time": "2 dagen"
  }
}
            `}
    </StyledPre>
  </div>
)

export default SubmitAPIMergeRequest

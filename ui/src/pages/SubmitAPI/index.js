import React from 'react'
import { Link } from 'react-router-dom'

const SubmitAPI = () =>
    <div className="SubmitAPI container">
        <h1>API toevoegen</h1>
        <p>
          Voor het toevoegen van een API aan <a href="https://developer.overheid.nl" target="_blank" rel="noopener noreferrer">developer.overheid.nl</a>,
          gelieven een <a href="https://gitlab.com/commonground/developer.overheid.nl/merge_requests" target="_blank" rel="noopener noreferrer">Merge Request</a> aan te maken op
          de <a href="https://gitlab.com/commonground/developer.overheid.nl" target="_blank" rel="noopener noreferrer">Git repository</a> met een JSON-bestand die de definitie van je API bevat.
        </p>
        <p>
          De bestandsnaam moet voldoen aan de volgende afspraken:
        </p>
        <pre>{ `data/{organization}-{api}.json` }</pre>

      <p>En de inhoud moet overeenkomen met onderstaande structuur:</p>

        <pre>
            {`
{
    "description": "Voorbeeld van een omschrijving",
    "organization_name": "Voorbeeld van een organisatie naam",
    "service_name": "Voorbeeld van een API naam",
    "api_url": "https://api.example.com/service/",
    "api_specification_type": "OpenAPI2",
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
    "terms_of_use": {
      "government_only": true,
      "pay_per_use": false,
      "uptime_guarantee": 99.9,
      "support_response_time": "2 dagen"
  }
}
            `}
        </pre>

        <p>
          Je kan ook een API toevoegen aan de hand van <Link to="/api-toevoegen/formulier">het formulier</Link>.
        </p>
    </div>

export default SubmitAPI

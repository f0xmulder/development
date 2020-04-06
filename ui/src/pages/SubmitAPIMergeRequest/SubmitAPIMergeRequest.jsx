// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'

import CodeBlock from '../../components/CodeBlock/CodeBlock'

const branchName = `data/{organization}-{api}`
const fileName = `data/{organization}-{api}.json`
const exampleJSON = `{
  "service_name": "Voorbeeld van een API naam",
  "description": "Voorbeeld van een omschrijving",
  "organization_name": "Voorbeeld van een organisatie naam",
  "api_type": "REST/JSON",
  "api_authentication": "API Key",
  "environments": [
    {
      "name": "Productie"
      "api_url": "https://api.example.com/service/",
      "specification_url": "https://api.example.com/service/swagger/?format=openapi",
      "documentation_url": "https://api.example.com/service/",
    },
    {
      "name": "Acceptatie"
      "api_url": "https://acpt.api.example.com/service/",
      "specification_url": "https://acpt.api.example.com/service/swagger/?format=openapi",
      "documentation_url": "https://acpt.api.example.com/service/",
    },
    {
      "name": "Demo"
      "api_url": "https://demo.api.example.com/service/",
      "specification_url": "https://demo.api.example.com/service/swagger/?format=openapi",
      "documentation_url": "https://demo.api.example.com/service/",
    }
  ],
  "contact": {
      "email": "helpdesk@voorbeeld.nl",
      "phone": "0031612345678",
      "url": "https://github.com/VNG-Realisatie/nlx"
  },
  "is_reference_implementation": false,
  "relations": {
      "example-api-id": ["reference-implementation"]
  },
  "terms_of_use": {
    "government_only": true,
    "pay_per_use": false,
    "uptime_guarantee": 99.9
  }
}`

const SubmitAPIMergeRequest = () => (
  <div>
    <p>
      Maak op{' '}
      <a href="https://gitlab.com/commonground/developer.overheid.nl">Gitlab</a>{' '}
      een fork van de repository onder een eigen account en maak een nieuwe
      branch aan met de naam:
    </p>
    <CodeBlock>{branchName}</CodeBlock>

    <p>Voeg een bestand toe aan de branch met de volgende naam:</p>
    <CodeBlock>{fileName}</CodeBlock>

    <p>En voeg de inhoud toe aan de hand van de onderstaande structuur:</p>
    <CodeBlock>{exampleJSON}</CodeBlock>

    <p>
      Een productieomgeving is verplicht, acceptatie en demo zijn optioneel.
    </p>
    <p>
      Maak vervolgens een Merge Request aan van{' '}
      <a href="https://gitlab.com/commonground/developer.overheid.nl/-/forks">
        jouw geforkte repository
      </a>{' '}
      naar de officiële repository om jouw toevoeging in te dienen.
    </p>
  </div>
)

export default SubmitAPIMergeRequest

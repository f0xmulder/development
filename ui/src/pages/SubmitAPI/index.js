import React from 'react'

const SubmitAPI = () =>
    <div className="SubmitAPI container">
        <h1>Submit your API</h1>
        <p>
          If you would like to add an API to <a href="https://developer.overheid.nl" target="_blank" rel="noopener noreferrer">developer.overheid.nl</a>,
          please submit a <a href="https://gitlab.com/commonground/developer.overheid.nl/merge_requests" target="_blank" rel="noopener noreferrer">Merge Request</a> to
          the <a href="https://gitlab.com/commonground/developer.overheid.nl" target="_blank" rel="noopener noreferrer">Git repository</a>  with a new JSON file defining your API.
        </p>
        <p>
          The file should have a filename using the following format:
        </p>
        <pre>{ `data/{organization}-{api}.json` }</pre>

      <p>And it's contents should follow this structure:</p>

        <pre>
            {`
{
    "description": "Example Description",
    "organization_name": "Example Organization",
    "service_name": "Example Service",
    "api_url": "https://api.example.com/service/",
    "api_specification_type": "OpenAPI2",
    "specification_url": "https://api.example.com/service/swagger/?format=openapi",
    "documentation_url": "https://api.example.com/service/",
    "tags": ["Example tag", "Another tag"],
    "badges": ["Gouden API"],
    "contact": {
        "email": "name@example.nl",
        "phone": "0031612345678",
        "fax": "0031687654321",
        "chat": "https://nl-x.slack.com"
    }
}
            `}
        </pre>
    </div>

export default SubmitAPI

// Copyright © VNG Realisatie 2021
// Licensed under the EUPL
//
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const cors = require('cors')

server.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
)
server.options('*', cors())

server.get('/api/events', (req, res) => {
  const results = [
    {
      id: '1',
      title: 'Event',
      start_date: new Date(),
      location: 'Location',
      registration_url: 'Url',
    },
  ]
  res.jsonp({ page: 1, rowsPerPage: 10, totalResults: results.length, results })
})

server.get('/api/code', (req, res) => {
  res.jsonp({
    page: 1,
    rowsPerPage: 10,
    totalResults: 13,
    results: [
      {
        id: 1,
        owner_name: 'statistiekcbs',
        name: 'CBS-Open-Data-v4',
        url: 'https://github.com/statistiekcbs/CBS-Open-Data-v4',
        last_change: '2020-10-11T20:06:19+02:00',
        stars: 13,
        source: 'GitHub repository',
        programming_languages: ['R', 'Python'],
        related_apis: [
          {
            service_name: 'CBS OData',
            organization_name: 'Centraal Bureau voor de Statistiek',
            api_id: 'cbs-odata',
          },
        ],
      },
      {
        id: 2,
        owner_name: 'statistiekcbs',
        name: 'CBS-Open-Data-v3',
        url: 'https://github.com/statistiekcbs/CBS-Open-Data-v3',
        last_change: '2020-08-15T19:08:49+02:00',
        stars: 12,
        source: 'GitHub repository',
        programming_languages: ['C#', 'HTML', 'Python', 'R'],
        related_apis: [
          {
            service_name: 'CBS OData',
            organization_name: 'Centraal Bureau voor de Statistiek',
            api_id: 'cbs-odata',
          },
        ],
      },
      {
        id: 9,
        owner_name: 'PDOK',
        name: 'data.labs.pdok.nl',
        url: 'https://github.com/PDOK/data.labs.pdok.nl',
        last_change: '2019-12-13T09:56:21+01:00',
        stars: 11,
        source: 'GitHub repository',
        programming_languages: [
          'JavaScript',
          'HTML',
          'CSS',
          'Python',
          'Shell',
          'Ruby',
        ],
        related_apis: [
          {
            service_name: 'Basisregistratie Kadaster (BRK)',
            organization_name:
              'Dienst voor het kadaster en de openbare registers',
            api_id: 'kadaster-brk',
          },
          {
            service_name: 'Basisregistratie Adressen en Gebouwen (BAG)',
            organization_name:
              'Dienst voor het kadaster en de openbare registers',
            api_id: 'kadaster-bag',
          },
          {
            service_name: 'Basisregistratie Topografie (BRT)',
            organization_name:
              'Dienst voor het kadaster en de openbare registers',
            api_id: 'kadaster-brt',
          },
        ],
      },
      {
        id: 10,
        owner_name: 'MinBZK en VNG Realisatie',
        name: 'developer.overheid.nl',
        url: 'https://gitlab.com/commonground/don/developer.overheid.nl',
        last_change: '2020-11-03T13:12:17+01:00',
        stars: 9,
        source: 'GitLab repository',
        programming_languages: [
          'JavaScript',
          'Python',
          'Go',
          'Dockerfile',
          'HTML',
        ],
        related_apis: [],
      },
      {
        id: 11,
        owner_name: 'AERIUS',
        name: 'AERIUS',
        url: 'https://gitlab.com/AERIUS/AERIUS',
        last_change: '2020-10-21T12:24:51.454000+02:00',
        stars: 5,
        source: 'GitLab repository',
        programming_languages: [
          'Java',
          'PLpgSQL',
          'Gherkin',
          'TSQL',
          'JavaScript',
        ],
        related_apis: [
          {
            service_name: 'AERIUS Connect',
            organization_name: 'Rijksinstituut voor Volksgezondheid en Milieu',
            api_id: 'rivm-aerius-connect',
          },
        ],
      },
      {
        id: 12,
        owner_name: 'Signalen',
        name: 'backend',
        url: 'https://github.com/Signalen/backend',
        last_change: '2020-11-03T09:22:40+01:00',
        stars: 2,
        source: 'GitHub repository',
        programming_languages: ['Python', 'HTML', 'Shell', 'Dockerfile'],
        related_apis: [
          {
            service_name: 'Basisregistratie Topografie (BRT)',
            organization_name:
              'Dienst voor het kadaster en de openbare registers',
            api_id: 'kadaster-brt',
          },
        ],
      },
      {
        id: 3,
        owner_name: 'GemeenteUtrecht',
        name: 'BInG',
        url: 'https://github.com/GemeenteUtrecht/BInG',
        last_change: '2020-03-13T11:28:20+01:00',
        stars: 0,
        source: 'GitHub repository',
        programming_languages: [
          'CSS',
          'Python',
          'HTML',
          'JavaScript',
          'Shell',
          'Dockerfile',
          'TSQL',
        ],
        related_apis: [
          {
            service_name: 'Basisregistratie Adressen en Gebouwen (BAG)',
            organization_name:
              'Dienst voor het kadaster en de openbare registers',
            api_id: 'kadaster-bag',
          },
        ],
      },
      {
        id: 4,
        owner_name: 'pmoreira1',
        name: 'amsterdam-project',
        url: 'https://github.com/pmoreira1/amsterdam-project',
        last_change: '2020-04-21T17:26:17+02:00',
        stars: 0,
        source: 'GitHub repository',
        programming_languages: ['Jupyter Notebook', 'Python'],
        related_apis: [
          {
            service_name: 'Afvalcontainers en putten',
            organization_name: 'Gemeente Amsterdam',
            api_id: 'gemeente-amsterdam-afval',
          },
        ],
      },
      {
        id: 5,
        owner_name: 'dmitrychebayewski',
        name: 'airrotterdam-api',
        url: 'https://github.com/dmitrychebayewski/airrotterdam-api',
        last_change: '2020-10-26T21:17:48+01:00',
        stars: 0,
        source: 'GitHub repository',
        programming_languages: ['Kotlin'],
        related_apis: [
          {
            service_name: 'Luchtmeetnet',
            organization_name: 'Rijksinstituut voor Volksgezondheid en Milieu',
            api_id: 'luchtmeetnet-luchtmeetnet',
          },
        ],
      },
      {
        id: 6,
        owner_name: 'r5atom',
        name: 'Saturday-Datascience',
        url: 'https://github.com/r5atom/Saturday-Datascience',
        last_change: '2020-02-07T21:15:50+01:00',
        stars: 0,
        source: 'GitHub repository',
        programming_languages: ['Jupyter Notebook'],
        related_apis: [
          {
            service_name: 'Gekentekende voertuigen',
            organization_name: 'RDW',
            api_id: 'rdw-brv',
          },
        ],
      },
    ],
    programmingLanguages: [
      { id: 3, name: 'C#' },
      { id: 5, name: 'CSS' },
      { id: 8, name: 'Dockerfile' },
      { id: 16, name: 'Gherkin' },
      { id: 13, name: 'Go' },
      { id: 4, name: 'HTML' },
      { id: 17, name: 'Handlebars' },
      { id: 14, name: 'Java' },
      { id: 6, name: 'JavaScript' },
      { id: 10, name: 'Jupyter Notebook' },
      { id: 11, name: 'Kotlin' },
      { id: 15, name: 'PLpgSQL' },
      { id: 2, name: 'Python' },
      { id: 1, name: 'R' },
      { id: 12, name: 'Ruby' },
      { id: 18, name: 'SCSS' },
      { id: 7, name: 'Shell' },
      { id: 9, name: 'TSQL' },
    ],
  })
})

server.get('/api/apis', (req, res) => {
  res.jsonp({
    page: 1,
    rowsPerPage: 10,
    totalResults: 138,
    results: [
      {
        id: 'afvalcontainers',
        description: 'Garbadge Containers in the city are show here as list.',
        organization_name: 'Gemeente Amsterdam',
        organization_oin: '00000001002564440000',
        service_name: 'Afvalcontainers',
        api_type: 'rest_json',
        api_authentication: 'unknown',
        badges: [],
        environments: [
          {
            name: 'production',
            api_url: 'https://api.data.amsterdam.nl/afval/?format=api',
            specification_url: '',
            documentation_url: 'https://api.data.amsterdam.nl/afval/swagger/',
          },
        ],
        contact: { email: '', phone: '', url: '' },
        is_reference_implementation: false,
        referenced_apis: [],
        related_code: [
          {
            id: 13,
            owner_name: 'commonground/don',
            name: 'Discourse',
            url: 'https://gitlab.com/commonground/don/discourse',
            last_change: '2020-11-17T14:41:23.666000+01:00',
            stars: 0,
            source: 'GitLab repository',
            programming_languages: [
              'HTML',
              'JavaScript',
              'Ruby',
              'Handlebars',
              'SCSS',
            ],
          },
        ],
        terms_of_use: {
          government_only: false,
          pay_per_use: false,
          uptime_guarantee: null,
          support_response_time: null,
        },
        scores: {
          has_documentation: true,
          has_specification: false,
          has_contact_details: false,
          provides_sla: false,
        },
        design_rule_scores: {
          started_at: '2021-06-02T10:11:51.042444+02:00',
          percentage_score: '0.00',
          test_version: '09 Juli 2020',
          results: [
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-03',
              rule_type_name:
                'API-03 V-09-07-2020: Only apply standard HTTP methods',
              rule_type_description:
                'The HTTP specification [rfc7231] and the later introduced PATCH method specification [rfc5789] offer a set of standard methods, where every method is designed with explicit semantics. Adhering to the HTTP specification is crucial, since HTTP clients and middleware applications rely on standardized characteristics. Therefore, resources must be retrieved or manipulated using standard HTTP methods.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-16',
              rule_type_name:
                'API-16 V-09-07-2020: Use OpenAPI Specification for documentation',
              rule_type_description:
                'The OpenAPI Specification (OAS) [OPENAPIS] defines a standard, language-agnostic interface to RESTful APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. When properly defined, a consumer can understand and interact with the remote service with a minimal amount of implementation logic.\nAPI documentation must be provided in the form of an OpenAPI definition document which conforms to the OpenAPI Specification (from v3 onwards). As a result, a variety of tools can be used to render the documentation (e.g. Swagger UI or ReDoc) or automate tasks such as testing or code generation. The OAS document should provide clear descriptions and examples.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-20',
              rule_type_name:
                'API-20 V-09-07-2020: Include the major version number in the URI',
              rule_type_description:
                'The URI of an API (base path) must include the major version number, prefixed by the letter v. This allows the exploration of multiple versions of an API in the browser. The minor and patch version numbers are not part of the URI and may not have any impact on existing client implementations.',
              success: false,
              errors: ["The api endpoint does not contain a 'v*' in the url"],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-48',
              rule_type_name:
                'API-48 V-09-07-2020: Leave off trailing slashes from URIs',
              rule_type_description:
                'According to the URI specification [rfc3986], URIs may contain a trailing slash. However, for REST APIs this is considered as a bad practice since a URI including or excluding a trailing slash might be interpreted as different resources (which is strictly speaking the correct interpretation).\nTo avoid confusion and ambiguity, a URI must never contain a trailing slash. When requesting a resource including a trailing slash, this must result in a 404 (not found) error response and not a redirect. This enforces API consumers to use the correct URI.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-51',
              rule_type_name:
                'API-51 V-09-07-2020: Publish OAS document at a standard location in JSON-format',
              rule_type_description:
                'To make the OAS document easy to find and to facilitate self-discovering clients, there should be one standard location where the OAS document is available for download. Clients (such as Swagger UI or ReDoc) must be able to retrieve the document without having to authenticate. Furthermore, the CORS policy for this URI must allow external domains to read the documentation from a browser environment.\nThe standard location for the OAS document is a URI called openapi.json or openapi.yaml within the base path of the API. This can be convenient, because OAS document updates can easily become part of the CI/CD process.\nAt least the JSON format must be supported. When having multiple (major) versions of an API, every API should provide its own OAS document(s).',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-56',
              rule_type_name:
                'API-56 V-09-07-2020: Adhere to the Semantic Versioning model when releasing API changes',
              rule_type_description:
                'Version numbering must follow the Semantic Versioning [SemVer] model to prevent breaking changes when releasing new API versions. Versions are formatted using the major.minor.patch template. When releasing a new version which contains backwards-incompatible changes, a new major version must be released. Minor and patch releases may only contain backwards compatible changes (e.g. the addition of an endpoint or an optional attribute).',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-57',
              rule_type_name:
                'API-57 V-09-07-2020: Return the full version number in a response header',
              rule_type_description:
                "Since the URI only contains the major version, it's useful to provide the full version number in the response headers for every API call. This information could then be used for logging, debugging or auditing purposes. In cases where an intermediate networking component returns an error response (e.g. a reverse proxy enforcing access policies), the version number may be omitted.\nThe version number must be returned in an HTTP response header named API-Version (case-insensitive) and should not be prefixed.",
              success: false,
              errors: [
                "The headers is missing. Make sure that the 'API-Version' is given.",
              ],
            },
          ],
        },
      },
      {
        id: 'afvalregels-bij-locatie-x-y',
        description:
          'Query for garbage collection days for the specified address (x/y or lat/lon)',
        organization_name: 'Gemeente Amsterdam',
        organization_oin: '00000001002564440000',
        service_name: 'Afvalregels bij locatie x, y',
        api_type: 'rest_json',
        api_authentication: 'unknown',
        badges: [],
        environments: [
          {
            name: 'production',
            api_url:
              'https://api.data.amsterdam.nl/afvalophaalgebieden/search/',
            specification_url: '',
            documentation_url:
              'https://api.data.amsterdam.nl/api/swagger/?url=/afvalophaalgebieden/openapi.yaml',
          },
        ],
        contact: { email: '', phone: '', url: '' },
        is_reference_implementation: false,
        referenced_apis: [],
        related_code: [],
        terms_of_use: {
          government_only: false,
          pay_per_use: false,
          uptime_guarantee: null,
          support_response_time: null,
        },
        scores: {
          has_documentation: true,
          has_specification: false,
          has_contact_details: false,
          provides_sla: false,
        },
        design_rule_scores: {
          started_at: '2021-06-02T10:13:01.502926+02:00',
          percentage_score: '0.00',
          test_version: '09 Juli 2020',
          results: [
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-03',
              rule_type_name:
                'API-03 V-09-07-2020: Only apply standard HTTP methods',
              rule_type_description:
                'The HTTP specification [rfc7231] and the later introduced PATCH method specification [rfc5789] offer a set of standard methods, where every method is designed with explicit semantics. Adhering to the HTTP specification is crucial, since HTTP clients and middleware applications rely on standardized characteristics. Therefore, resources must be retrieved or manipulated using standard HTTP methods.',
              success: false,
              errors: ['There are no methods found.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-16',
              rule_type_name:
                'API-16 V-09-07-2020: Use OpenAPI Specification for documentation',
              rule_type_description:
                'The OpenAPI Specification (OAS) [OPENAPIS] defines a standard, language-agnostic interface to RESTful APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. When properly defined, a consumer can understand and interact with the remote service with a minimal amount of implementation logic.\nAPI documentation must be provided in the form of an OpenAPI definition document which conforms to the OpenAPI Specification (from v3 onwards). As a result, a variety of tools can be used to render the documentation (e.g. Swagger UI or ReDoc) or automate tasks such as testing or code generation. The OAS document should provide clear descriptions and examples.',
              success: false,
              errors: ['There is no openapi version found.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-20',
              rule_type_name:
                'API-20 V-09-07-2020: Include the major version number in the URI',
              rule_type_description:
                'The URI of an API (base path) must include the major version number, prefixed by the letter v. This allows the exploration of multiple versions of an API in the browser. The minor and patch version numbers are not part of the URI and may not have any impact on existing client implementations.',
              success: false,
              errors: ["The api endpoint does not contain a 'v*' in the url"],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-48',
              rule_type_name:
                'API-48 V-09-07-2020: Leave off trailing slashes from URIs',
              rule_type_description:
                'According to the URI specification [rfc3986], URIs may contain a trailing slash. However, for REST APIs this is considered as a bad practice since a URI including or excluding a trailing slash might be interpreted as different resources (which is strictly speaking the correct interpretation).\nTo avoid confusion and ambiguity, a URI must never contain a trailing slash. When requesting a resource including a trailing slash, this must result in a 404 (not found) error response and not a redirect. This enforces API consumers to use the correct URI.',
              success: false,
              errors: ['There are no paths found'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-51',
              rule_type_name:
                'API-51 V-09-07-2020: Publish OAS document at a standard location in JSON-format',
              rule_type_description:
                'To make the OAS document easy to find and to facilitate self-discovering clients, there should be one standard location where the OAS document is available for download. Clients (such as Swagger UI or ReDoc) must be able to retrieve the document without having to authenticate. Furthermore, the CORS policy for this URI must allow external domains to read the documentation from a browser environment.\nThe standard location for the OAS document is a URI called openapi.json or openapi.yaml within the base path of the API. This can be convenient, because OAS document updates can easily become part of the CI/CD process.\nAt least the JSON format must be supported. When having multiple (major) versions of an API, every API should provide its own OAS document(s).',
              success: false,
              errors: [
                'The OAS file was not found at /openapi.json or at /openapi.yaml',
                'There are no CORS headers set. Please make sure that CORS headers are set.',
              ],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-56',
              rule_type_name:
                'API-56 V-09-07-2020: Adhere to the Semantic Versioning model when releasing API changes',
              rule_type_description:
                'Version numbering must follow the Semantic Versioning [SemVer] model to prevent breaking changes when releasing new API versions. Versions are formatted using the major.minor.patch template. When releasing a new version which contains backwards-incompatible changes, a new major version must be released. Minor and patch releases may only contain backwards compatible changes (e.g. the addition of an endpoint or an optional attribute).',
              success: false,
              errors: ['There is no openapi version found.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-57',
              rule_type_name:
                'API-57 V-09-07-2020: Return the full version number in a response header',
              rule_type_description:
                "Since the URI only contains the major version, it's useful to provide the full version number in the response headers for every API call. This information could then be used for logging, debugging or auditing purposes. In cases where an intermediate networking component returns an error response (e.g. a reverse proxy enforcing access policies), the version number may be omitted.\nThe version number must be returned in an HTTP response header named API-Version (case-insensitive) and should not be prefixed.",
              success: false,
              errors: [
                "The headers is missing. Make sure that the 'API-Version' is given.",
              ],
            },
          ],
        },
      },
      {
        id: 'bag-search',
        description: 'Full Search API over BAG, BRK en gebieden.',
        organization_name: 'Gemeente Amsterdam',
        organization_oin: '00000001002564440000',
        service_name: 'BAG Search',
        api_type: 'rest_json',
        api_authentication: 'unknown',
        badges: [],
        environments: [
          {
            name: 'production',
            api_url: 'https://api.data.amsterdam.nl/atlas/search/?format=api',
            specification_url: '',
            documentation_url:
              'https://api.data.amsterdam.nl/api/swagger/?url=/bag/docs/api-docs/search%3Fformat%3Dopenapi',
          },
        ],
        contact: { email: '', phone: '', url: '' },
        is_reference_implementation: false,
        referenced_apis: [],
        related_code: [],
        terms_of_use: {
          government_only: false,
          pay_per_use: false,
          uptime_guarantee: null,
          support_response_time: null,
        },
        scores: {
          has_documentation: true,
          has_specification: false,
          has_contact_details: false,
          provides_sla: false,
        },
        design_rule_scores: {
          started_at: '2021-06-02T10:11:30.282589+02:00',
          percentage_score: '0.00',
          test_version: '09 Juli 2020',
          results: [
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-03',
              rule_type_name:
                'API-03 V-09-07-2020: Only apply standard HTTP methods',
              rule_type_description:
                'The HTTP specification [rfc7231] and the later introduced PATCH method specification [rfc5789] offer a set of standard methods, where every method is designed with explicit semantics. Adhering to the HTTP specification is crucial, since HTTP clients and middleware applications rely on standardized characteristics. Therefore, resources must be retrieved or manipulated using standard HTTP methods.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-16',
              rule_type_name:
                'API-16 V-09-07-2020: Use OpenAPI Specification for documentation',
              rule_type_description:
                'The OpenAPI Specification (OAS) [OPENAPIS] defines a standard, language-agnostic interface to RESTful APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. When properly defined, a consumer can understand and interact with the remote service with a minimal amount of implementation logic.\nAPI documentation must be provided in the form of an OpenAPI definition document which conforms to the OpenAPI Specification (from v3 onwards). As a result, a variety of tools can be used to render the documentation (e.g. Swagger UI or ReDoc) or automate tasks such as testing or code generation. The OAS document should provide clear descriptions and examples.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-20',
              rule_type_name:
                'API-20 V-09-07-2020: Include the major version number in the URI',
              rule_type_description:
                'The URI of an API (base path) must include the major version number, prefixed by the letter v. This allows the exploration of multiple versions of an API in the browser. The minor and patch version numbers are not part of the URI and may not have any impact on existing client implementations.',
              success: false,
              errors: ["The api endpoint does not contain a 'v*' in the url"],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-48',
              rule_type_name:
                'API-48 V-09-07-2020: Leave off trailing slashes from URIs',
              rule_type_description:
                'According to the URI specification [rfc3986], URIs may contain a trailing slash. However, for REST APIs this is considered as a bad practice since a URI including or excluding a trailing slash might be interpreted as different resources (which is strictly speaking the correct interpretation).\nTo avoid confusion and ambiguity, a URI must never contain a trailing slash. When requesting a resource including a trailing slash, this must result in a 404 (not found) error response and not a redirect. This enforces API consumers to use the correct URI.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-51',
              rule_type_name:
                'API-51 V-09-07-2020: Publish OAS document at a standard location in JSON-format',
              rule_type_description:
                'To make the OAS document easy to find and to facilitate self-discovering clients, there should be one standard location where the OAS document is available for download. Clients (such as Swagger UI or ReDoc) must be able to retrieve the document without having to authenticate. Furthermore, the CORS policy for this URI must allow external domains to read the documentation from a browser environment.\nThe standard location for the OAS document is a URI called openapi.json or openapi.yaml within the base path of the API. This can be convenient, because OAS document updates can easily become part of the CI/CD process.\nAt least the JSON format must be supported. When having multiple (major) versions of an API, every API should provide its own OAS document(s).',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-56',
              rule_type_name:
                'API-56 V-09-07-2020: Adhere to the Semantic Versioning model when releasing API changes',
              rule_type_description:
                'Version numbering must follow the Semantic Versioning [SemVer] model to prevent breaking changes when releasing new API versions. Versions are formatted using the major.minor.patch template. When releasing a new version which contains backwards-incompatible changes, a new major version must be released. Minor and patch releases may only contain backwards compatible changes (e.g. the addition of an endpoint or an optional attribute).',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-57',
              rule_type_name:
                'API-57 V-09-07-2020: Return the full version number in a response header',
              rule_type_description:
                "Since the URI only contains the major version, it's useful to provide the full version number in the response headers for every API call. This information could then be used for logging, debugging or auditing purposes. In cases where an intermediate networking component returns an error response (e.g. a reverse proxy enforcing access policies), the version number may be omitted.\nThe version number must be returned in an HTTP response header named API-Version (case-insensitive) and should not be prefixed.",
              success: false,
              errors: [
                "The headers is missing. Make sure that the 'API-Version' is given.",
              ],
            },
          ],
        },
      },
      {
        id: 'basisbestand-gebieden-amsterdam-(bbga)',
        description: 'Specifieke functionaliteit voor de BBGA API.',
        organization_name: 'Gemeente Amsterdam',
        organization_oin: '00000001002564440000',
        service_name: 'Basisbestand Gebieden Amsterdam (BBGA)',
        api_type: 'rest_json',
        api_authentication: 'unknown',
        badges: [],
        environments: [
          {
            name: 'production',
            api_url: 'https://api.data.amsterdam.nl/bbga/?format=api',
            specification_url: '',
            documentation_url:
              'https://api.data.amsterdam.nl/api/swagger/?url=/bbga/docs/api-docs/%3Fformat%3Dopenapi',
          },
        ],
        contact: { email: '', phone: '', url: '' },
        is_reference_implementation: false,
        referenced_apis: [],
        related_code: [],
        terms_of_use: {
          government_only: false,
          pay_per_use: false,
          uptime_guarantee: null,
          support_response_time: null,
        },
        scores: {
          has_documentation: true,
          has_specification: false,
          has_contact_details: false,
          provides_sla: false,
        },
        design_rule_scores: {
          started_at: '2021-06-02T10:12:27.101704+02:00',
          percentage_score: '0.00',
          test_version: '09 Juli 2020',
          results: [
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-03',
              rule_type_name:
                'API-03 V-09-07-2020: Only apply standard HTTP methods',
              rule_type_description:
                'The HTTP specification [rfc7231] and the later introduced PATCH method specification [rfc5789] offer a set of standard methods, where every method is designed with explicit semantics. Adhering to the HTTP specification is crucial, since HTTP clients and middleware applications rely on standardized characteristics. Therefore, resources must be retrieved or manipulated using standard HTTP methods.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-16',
              rule_type_name:
                'API-16 V-09-07-2020: Use OpenAPI Specification for documentation',
              rule_type_description:
                'The OpenAPI Specification (OAS) [OPENAPIS] defines a standard, language-agnostic interface to RESTful APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. When properly defined, a consumer can understand and interact with the remote service with a minimal amount of implementation logic.\nAPI documentation must be provided in the form of an OpenAPI definition document which conforms to the OpenAPI Specification (from v3 onwards). As a result, a variety of tools can be used to render the documentation (e.g. Swagger UI or ReDoc) or automate tasks such as testing or code generation. The OAS document should provide clear descriptions and examples.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-20',
              rule_type_name:
                'API-20 V-09-07-2020: Include the major version number in the URI',
              rule_type_description:
                'The URI of an API (base path) must include the major version number, prefixed by the letter v. This allows the exploration of multiple versions of an API in the browser. The minor and patch version numbers are not part of the URI and may not have any impact on existing client implementations.',
              success: false,
              errors: ["The api endpoint does not contain a 'v*' in the url"],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-48',
              rule_type_name:
                'API-48 V-09-07-2020: Leave off trailing slashes from URIs',
              rule_type_description:
                'According to the URI specification [rfc3986], URIs may contain a trailing slash. However, for REST APIs this is considered as a bad practice since a URI including or excluding a trailing slash might be interpreted as different resources (which is strictly speaking the correct interpretation).\nTo avoid confusion and ambiguity, a URI must never contain a trailing slash. When requesting a resource including a trailing slash, this must result in a 404 (not found) error response and not a redirect. This enforces API consumers to use the correct URI.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-51',
              rule_type_name:
                'API-51 V-09-07-2020: Publish OAS document at a standard location in JSON-format',
              rule_type_description:
                'To make the OAS document easy to find and to facilitate self-discovering clients, there should be one standard location where the OAS document is available for download. Clients (such as Swagger UI or ReDoc) must be able to retrieve the document without having to authenticate. Furthermore, the CORS policy for this URI must allow external domains to read the documentation from a browser environment.\nThe standard location for the OAS document is a URI called openapi.json or openapi.yaml within the base path of the API. This can be convenient, because OAS document updates can easily become part of the CI/CD process.\nAt least the JSON format must be supported. When having multiple (major) versions of an API, every API should provide its own OAS document(s).',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-56',
              rule_type_name:
                'API-56 V-09-07-2020: Adhere to the Semantic Versioning model when releasing API changes',
              rule_type_description:
                'Version numbering must follow the Semantic Versioning [SemVer] model to prevent breaking changes when releasing new API versions. Versions are formatted using the major.minor.patch template. When releasing a new version which contains backwards-incompatible changes, a new major version must be released. Minor and patch releases may only contain backwards compatible changes (e.g. the addition of an endpoint or an optional attribute).',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-57',
              rule_type_name:
                'API-57 V-09-07-2020: Return the full version number in a response header',
              rule_type_description:
                "Since the URI only contains the major version, it's useful to provide the full version number in the response headers for every API call. This information could then be used for logging, debugging or auditing purposes. In cases where an intermediate networking component returns an error response (e.g. a reverse proxy enforcing access policies), the version number may be omitted.\nThe version number must be returned in an HTTP response header named API-Version (case-insensitive) and should not be prefixed.",
              success: false,
              errors: [
                "The headers is missing. Make sure that the 'API-Version' is given.",
              ],
            },
          ],
        },
      },
      {
        id: 'basisregistratie-adressen-en-gebouwen-(bag)',
        description:
          'De Basisregistraties adressen en gebouwen (BAG) bevatten gegevens over panden, verblijfsobjecten, standplaatsen en ligplaatsen en de bijbehorende adressen en de benoeming van woonplaatsen en openbare ruimten.',
        organization_name: 'Gemeente Amsterdam',
        organization_oin: '00000001002564440000',
        service_name: 'Basisregistratie Adressen en Gebouwen (BAG)',
        api_type: 'rest_json',
        api_authentication: 'unknown',
        badges: [],
        environments: [
          {
            name: 'production',
            api_url: 'https://api.data.amsterdam.nl/bag/v1.1/',
            specification_url: '',
            documentation_url:
              'https://api.data.amsterdam.nl/api/swagger/?url=/bag/v1.1/docs/api-docs/bag%3Fformat%3Dopenapi',
          },
        ],
        contact: { email: '', phone: '', url: '' },
        is_reference_implementation: false,
        referenced_apis: [],
        related_code: [],
        terms_of_use: {
          government_only: false,
          pay_per_use: false,
          uptime_guarantee: null,
          support_response_time: null,
        },
        scores: {
          has_documentation: true,
          has_specification: false,
          has_contact_details: false,
          provides_sla: false,
        },
        design_rule_scores: {
          started_at: '2021-06-02T10:12:59.917283+02:00',
          percentage_score: '0.00',
          test_version: '09 Juli 2020',
          results: [
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-03',
              rule_type_name:
                'API-03 V-09-07-2020: Only apply standard HTTP methods',
              rule_type_description:
                'The HTTP specification [rfc7231] and the later introduced PATCH method specification [rfc5789] offer a set of standard methods, where every method is designed with explicit semantics. Adhering to the HTTP specification is crucial, since HTTP clients and middleware applications rely on standardized characteristics. Therefore, resources must be retrieved or manipulated using standard HTTP methods.',
              success: false,
              errors: ['There are no methods found.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-16',
              rule_type_name:
                'API-16 V-09-07-2020: Use OpenAPI Specification for documentation',
              rule_type_description:
                'The OpenAPI Specification (OAS) [OPENAPIS] defines a standard, language-agnostic interface to RESTful APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. When properly defined, a consumer can understand and interact with the remote service with a minimal amount of implementation logic.\nAPI documentation must be provided in the form of an OpenAPI definition document which conforms to the OpenAPI Specification (from v3 onwards). As a result, a variety of tools can be used to render the documentation (e.g. Swagger UI or ReDoc) or automate tasks such as testing or code generation. The OAS document should provide clear descriptions and examples.',
              success: false,
              errors: ['There is no openapi version found.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-20',
              rule_type_name:
                'API-20 V-09-07-2020: Include the major version number in the URI',
              rule_type_description:
                'The URI of an API (base path) must include the major version number, prefixed by the letter v. This allows the exploration of multiple versions of an API in the browser. The minor and patch version numbers are not part of the URI and may not have any impact on existing client implementations.',
              success: false,
              errors: [
                'The api endpoint contains more than the major version number in the URI',
              ],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-48',
              rule_type_name:
                'API-48 V-09-07-2020: Leave off trailing slashes from URIs',
              rule_type_description:
                'According to the URI specification [rfc3986], URIs may contain a trailing slash. However, for REST APIs this is considered as a bad practice since a URI including or excluding a trailing slash might be interpreted as different resources (which is strictly speaking the correct interpretation).\nTo avoid confusion and ambiguity, a URI must never contain a trailing slash. When requesting a resource including a trailing slash, this must result in a 404 (not found) error response and not a redirect. This enforces API consumers to use the correct URI.',
              success: false,
              errors: ['There are no paths found'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-51',
              rule_type_name:
                'API-51 V-09-07-2020: Publish OAS document at a standard location in JSON-format',
              rule_type_description:
                'To make the OAS document easy to find and to facilitate self-discovering clients, there should be one standard location where the OAS document is available for download. Clients (such as Swagger UI or ReDoc) must be able to retrieve the document without having to authenticate. Furthermore, the CORS policy for this URI must allow external domains to read the documentation from a browser environment.\nThe standard location for the OAS document is a URI called openapi.json or openapi.yaml within the base path of the API. This can be convenient, because OAS document updates can easily become part of the CI/CD process.\nAt least the JSON format must be supported. When having multiple (major) versions of an API, every API should provide its own OAS document(s).',
              success: false,
              errors: [
                'The OAS file was not found at /openapi.json or at /openapi.yaml',
                'There are no CORS headers set. Please make sure that CORS headers are set.',
              ],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-56',
              rule_type_name:
                'API-56 V-09-07-2020: Adhere to the Semantic Versioning model when releasing API changes',
              rule_type_description:
                'Version numbering must follow the Semantic Versioning [SemVer] model to prevent breaking changes when releasing new API versions. Versions are formatted using the major.minor.patch template. When releasing a new version which contains backwards-incompatible changes, a new major version must be released. Minor and patch releases may only contain backwards compatible changes (e.g. the addition of an endpoint or an optional attribute).',
              success: false,
              errors: ['There is no openapi version found.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-57',
              rule_type_name:
                'API-57 V-09-07-2020: Return the full version number in a response header',
              rule_type_description:
                "Since the URI only contains the major version, it's useful to provide the full version number in the response headers for every API call. This information could then be used for logging, debugging or auditing purposes. In cases where an intermediate networking component returns an error response (e.g. a reverse proxy enforcing access policies), the version number may be omitted.\nThe version number must be returned in an HTTP response header named API-Version (case-insensitive) and should not be prefixed.",
              success: false,
              errors: [
                "The headers is missing. Make sure that the 'API-Version' is given.",
              ],
            },
          ],
        },
      },
      {
        id: 'basisregistratie-amsterdamse-gebieden',
        description:
          'In de Registratie gebieden worden de Amsterdamse stadsdelen, wijk (voorheen) buurtcombinaties, buurten en bouwblokken vastgelegd. Verder bevat de registratie gegevens van de grootstedelijke gebieden binnen de gemeente, de UNESCO werelderfgoedgrens en de gebieden van gebiedsgericht werken.',
        organization_name: 'Gemeente Amsterdam',
        organization_oin: '00000001002564440000',
        service_name: 'Basisregistratie Amsterdamse Gebieden',
        api_type: 'rest_json',
        api_authentication: 'unknown',
        badges: [],
        environments: [
          {
            name: 'production',
            api_url: 'https://api.data.amsterdam.nl/gebieden/?format=api',
            specification_url: '',
            documentation_url:
              'https://api.data.amsterdam.nl/api/swagger/?url=/bag/docs/api-docs/gebieden%3Fformat%3Dopenapi',
          },
        ],
        contact: { email: '', phone: '', url: '' },
        is_reference_implementation: false,
        referenced_apis: [],
        related_code: [],
        terms_of_use: {
          government_only: false,
          pay_per_use: false,
          uptime_guarantee: null,
          support_response_time: null,
        },
        scores: {
          has_documentation: true,
          has_specification: false,
          has_contact_details: false,
          provides_sla: false,
        },
        design_rule_scores: {
          started_at: '2021-06-02T10:13:07.094468+02:00',
          percentage_score: '0.00',
          test_version: '09 Juli 2020',
          results: [
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-03',
              rule_type_name:
                'API-03 V-09-07-2020: Only apply standard HTTP methods',
              rule_type_description:
                'The HTTP specification [rfc7231] and the later introduced PATCH method specification [rfc5789] offer a set of standard methods, where every method is designed with explicit semantics. Adhering to the HTTP specification is crucial, since HTTP clients and middleware applications rely on standardized characteristics. Therefore, resources must be retrieved or manipulated using standard HTTP methods.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-16',
              rule_type_name:
                'API-16 V-09-07-2020: Use OpenAPI Specification for documentation',
              rule_type_description:
                'The OpenAPI Specification (OAS) [OPENAPIS] defines a standard, language-agnostic interface to RESTful APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. When properly defined, a consumer can understand and interact with the remote service with a minimal amount of implementation logic.\nAPI documentation must be provided in the form of an OpenAPI definition document which conforms to the OpenAPI Specification (from v3 onwards). As a result, a variety of tools can be used to render the documentation (e.g. Swagger UI or ReDoc) or automate tasks such as testing or code generation. The OAS document should provide clear descriptions and examples.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-20',
              rule_type_name:
                'API-20 V-09-07-2020: Include the major version number in the URI',
              rule_type_description:
                'The URI of an API (base path) must include the major version number, prefixed by the letter v. This allows the exploration of multiple versions of an API in the browser. The minor and patch version numbers are not part of the URI and may not have any impact on existing client implementations.',
              success: false,
              errors: ["The api endpoint does not contain a 'v*' in the url"],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-48',
              rule_type_name:
                'API-48 V-09-07-2020: Leave off trailing slashes from URIs',
              rule_type_description:
                'According to the URI specification [rfc3986], URIs may contain a trailing slash. However, for REST APIs this is considered as a bad practice since a URI including or excluding a trailing slash might be interpreted as different resources (which is strictly speaking the correct interpretation).\nTo avoid confusion and ambiguity, a URI must never contain a trailing slash. When requesting a resource including a trailing slash, this must result in a 404 (not found) error response and not a redirect. This enforces API consumers to use the correct URI.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-51',
              rule_type_name:
                'API-51 V-09-07-2020: Publish OAS document at a standard location in JSON-format',
              rule_type_description:
                'To make the OAS document easy to find and to facilitate self-discovering clients, there should be one standard location where the OAS document is available for download. Clients (such as Swagger UI or ReDoc) must be able to retrieve the document without having to authenticate. Furthermore, the CORS policy for this URI must allow external domains to read the documentation from a browser environment.\nThe standard location for the OAS document is a URI called openapi.json or openapi.yaml within the base path of the API. This can be convenient, because OAS document updates can easily become part of the CI/CD process.\nAt least the JSON format must be supported. When having multiple (major) versions of an API, every API should provide its own OAS document(s).',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-56',
              rule_type_name:
                'API-56 V-09-07-2020: Adhere to the Semantic Versioning model when releasing API changes',
              rule_type_description:
                'Version numbering must follow the Semantic Versioning [SemVer] model to prevent breaking changes when releasing new API versions. Versions are formatted using the major.minor.patch template. When releasing a new version which contains backwards-incompatible changes, a new major version must be released. Minor and patch releases may only contain backwards compatible changes (e.g. the addition of an endpoint or an optional attribute).',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-57',
              rule_type_name:
                'API-57 V-09-07-2020: Return the full version number in a response header',
              rule_type_description:
                "Since the URI only contains the major version, it's useful to provide the full version number in the response headers for every API call. This information could then be used for logging, debugging or auditing purposes. In cases where an intermediate networking component returns an error response (e.g. a reverse proxy enforcing access policies), the version number may be omitted.\nThe version number must be returned in an HTTP response header named API-Version (case-insensitive) and should not be prefixed.",
              success: false,
              errors: [
                "The headers is missing. Make sure that the 'API-Version' is given.",
              ],
            },
          ],
        },
      },
      {
        id: 'basisregistratie-kadaster-(brk)',
        description:
          'De Basisregistratie kadaster (BRK) bevat informatie over percelen, eigendom, hypotheken, beperkte rechten (zoals recht van erfpacht, opstal en vruchtgebruik) en leidingnetwerken. Daarnaast staan er kadastrale kaarten in met perceel, perceelnummer, oppervlakte, kadastrale grens en de grenzen van het rijk, de provincies en gemeenten.',
        organization_name: 'Gemeente Amsterdam',
        organization_oin: '00000001002564440000',
        service_name: 'Basisregistratie Kadaster (BRK)',
        api_type: 'rest_json',
        api_authentication: 'unknown',
        badges: [],
        environments: [
          {
            name: 'production',
            api_url: 'https://api.data.amsterdam.nl/brk/?format=api',
            specification_url: '',
            documentation_url:
              'https://api.data.amsterdam.nl/api/swagger/?url=/bag/docs/api-docs/brk%3Fformat%3Dopenapi',
          },
        ],
        contact: { email: '', phone: '', url: '' },
        is_reference_implementation: false,
        referenced_apis: [],
        related_code: [],
        terms_of_use: {
          government_only: false,
          pay_per_use: false,
          uptime_guarantee: null,
          support_response_time: null,
        },
        scores: {
          has_documentation: true,
          has_specification: false,
          has_contact_details: false,
          provides_sla: false,
        },
        design_rule_scores: {
          started_at: '2021-06-02T10:12:39.109677+02:00',
          percentage_score: '0.00',
          test_version: '09 Juli 2020',
          results: [
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-03',
              rule_type_name:
                'API-03 V-09-07-2020: Only apply standard HTTP methods',
              rule_type_description:
                'The HTTP specification [rfc7231] and the later introduced PATCH method specification [rfc5789] offer a set of standard methods, where every method is designed with explicit semantics. Adhering to the HTTP specification is crucial, since HTTP clients and middleware applications rely on standardized characteristics. Therefore, resources must be retrieved or manipulated using standard HTTP methods.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-16',
              rule_type_name:
                'API-16 V-09-07-2020: Use OpenAPI Specification for documentation',
              rule_type_description:
                'The OpenAPI Specification (OAS) [OPENAPIS] defines a standard, language-agnostic interface to RESTful APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. When properly defined, a consumer can understand and interact with the remote service with a minimal amount of implementation logic.\nAPI documentation must be provided in the form of an OpenAPI definition document which conforms to the OpenAPI Specification (from v3 onwards). As a result, a variety of tools can be used to render the documentation (e.g. Swagger UI or ReDoc) or automate tasks such as testing or code generation. The OAS document should provide clear descriptions and examples.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-20',
              rule_type_name:
                'API-20 V-09-07-2020: Include the major version number in the URI',
              rule_type_description:
                'The URI of an API (base path) must include the major version number, prefixed by the letter v. This allows the exploration of multiple versions of an API in the browser. The minor and patch version numbers are not part of the URI and may not have any impact on existing client implementations.',
              success: false,
              errors: ["The api endpoint does not contain a 'v*' in the url"],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-48',
              rule_type_name:
                'API-48 V-09-07-2020: Leave off trailing slashes from URIs',
              rule_type_description:
                'According to the URI specification [rfc3986], URIs may contain a trailing slash. However, for REST APIs this is considered as a bad practice since a URI including or excluding a trailing slash might be interpreted as different resources (which is strictly speaking the correct interpretation).\nTo avoid confusion and ambiguity, a URI must never contain a trailing slash. When requesting a resource including a trailing slash, this must result in a 404 (not found) error response and not a redirect. This enforces API consumers to use the correct URI.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-51',
              rule_type_name:
                'API-51 V-09-07-2020: Publish OAS document at a standard location in JSON-format',
              rule_type_description:
                'To make the OAS document easy to find and to facilitate self-discovering clients, there should be one standard location where the OAS document is available for download. Clients (such as Swagger UI or ReDoc) must be able to retrieve the document without having to authenticate. Furthermore, the CORS policy for this URI must allow external domains to read the documentation from a browser environment.\nThe standard location for the OAS document is a URI called openapi.json or openapi.yaml within the base path of the API. This can be convenient, because OAS document updates can easily become part of the CI/CD process.\nAt least the JSON format must be supported. When having multiple (major) versions of an API, every API should provide its own OAS document(s).',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-56',
              rule_type_name:
                'API-56 V-09-07-2020: Adhere to the Semantic Versioning model when releasing API changes',
              rule_type_description:
                'Version numbering must follow the Semantic Versioning [SemVer] model to prevent breaking changes when releasing new API versions. Versions are formatted using the major.minor.patch template. When releasing a new version which contains backwards-incompatible changes, a new major version must be released. Minor and patch releases may only contain backwards compatible changes (e.g. the addition of an endpoint or an optional attribute).',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-57',
              rule_type_name:
                'API-57 V-09-07-2020: Return the full version number in a response header',
              rule_type_description:
                "Since the URI only contains the major version, it's useful to provide the full version number in the response headers for every API call. This information could then be used for logging, debugging or auditing purposes. In cases where an intermediate networking component returns an error response (e.g. a reverse proxy enforcing access policies), the version number may be omitted.\nThe version number must be returned in an HTTP response header named API-Version (case-insensitive) and should not be prefixed.",
              success: false,
              errors: [
                "The headers is missing. Make sure that the 'API-Version' is given.",
              ],
            },
          ],
        },
      },
      {
        id: 'beeldbank-stadsarchief-amsterdam',
        description:
          'Open Search API met informatie en beeldmateriaal van ca. 300.000 beelden uit de Beeldbank van het Stadsarchief Amsterdam',
        organization_name: 'Gemeente Amsterdam',
        organization_oin: '00000001002564440000',
        service_name: 'Beeldbank stadsarchief Amsterdam',
        api_type: 'rest_json',
        api_authentication: 'unknown',
        badges: [],
        environments: [
          {
            name: 'production',
            api_url: 'https://archief.amsterdam/api/opensearch/',
            specification_url: '',
            documentation_url:
              'http://beeldbank.amsterdam.nl/api/opensearch/description-document',
          },
        ],
        contact: { email: '', phone: '', url: '' },
        is_reference_implementation: false,
        referenced_apis: [],
        related_code: [],
        terms_of_use: {
          government_only: false,
          pay_per_use: false,
          uptime_guarantee: null,
          support_response_time: null,
        },
        scores: {
          has_documentation: true,
          has_specification: false,
          has_contact_details: false,
          provides_sla: false,
        },
        design_rule_scores: {
          started_at: '2021-06-02T10:12:53.682842+02:00',
          percentage_score: '0.00',
          test_version: '09 Juli 2020',
          results: [
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-03',
              rule_type_name:
                'API-03 V-09-07-2020: Only apply standard HTTP methods',
              rule_type_description:
                'The HTTP specification [rfc7231] and the later introduced PATCH method specification [rfc5789] offer a set of standard methods, where every method is designed with explicit semantics. Adhering to the HTTP specification is crucial, since HTTP clients and middleware applications rely on standardized characteristics. Therefore, resources must be retrieved or manipulated using standard HTTP methods.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-16',
              rule_type_name:
                'API-16 V-09-07-2020: Use OpenAPI Specification for documentation',
              rule_type_description:
                'The OpenAPI Specification (OAS) [OPENAPIS] defines a standard, language-agnostic interface to RESTful APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. When properly defined, a consumer can understand and interact with the remote service with a minimal amount of implementation logic.\nAPI documentation must be provided in the form of an OpenAPI definition document which conforms to the OpenAPI Specification (from v3 onwards). As a result, a variety of tools can be used to render the documentation (e.g. Swagger UI or ReDoc) or automate tasks such as testing or code generation. The OAS document should provide clear descriptions and examples.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-20',
              rule_type_name:
                'API-20 V-09-07-2020: Include the major version number in the URI',
              rule_type_description:
                'The URI of an API (base path) must include the major version number, prefixed by the letter v. This allows the exploration of multiple versions of an API in the browser. The minor and patch version numbers are not part of the URI and may not have any impact on existing client implementations.',
              success: false,
              errors: ["The api endpoint does not contain a 'v*' in the url"],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-48',
              rule_type_name:
                'API-48 V-09-07-2020: Leave off trailing slashes from URIs',
              rule_type_description:
                'According to the URI specification [rfc3986], URIs may contain a trailing slash. However, for REST APIs this is considered as a bad practice since a URI including or excluding a trailing slash might be interpreted as different resources (which is strictly speaking the correct interpretation).\nTo avoid confusion and ambiguity, a URI must never contain a trailing slash. When requesting a resource including a trailing slash, this must result in a 404 (not found) error response and not a redirect. This enforces API consumers to use the correct URI.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-51',
              rule_type_name:
                'API-51 V-09-07-2020: Publish OAS document at a standard location in JSON-format',
              rule_type_description:
                'To make the OAS document easy to find and to facilitate self-discovering clients, there should be one standard location where the OAS document is available for download. Clients (such as Swagger UI or ReDoc) must be able to retrieve the document without having to authenticate. Furthermore, the CORS policy for this URI must allow external domains to read the documentation from a browser environment.\nThe standard location for the OAS document is a URI called openapi.json or openapi.yaml within the base path of the API. This can be convenient, because OAS document updates can easily become part of the CI/CD process.\nAt least the JSON format must be supported. When having multiple (major) versions of an API, every API should provide its own OAS document(s).',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-56',
              rule_type_name:
                'API-56 V-09-07-2020: Adhere to the Semantic Versioning model when releasing API changes',
              rule_type_description:
                'Version numbering must follow the Semantic Versioning [SemVer] model to prevent breaking changes when releasing new API versions. Versions are formatted using the major.minor.patch template. When releasing a new version which contains backwards-incompatible changes, a new major version must be released. Minor and patch releases may only contain backwards compatible changes (e.g. the addition of an endpoint or an optional attribute).',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-57',
              rule_type_name:
                'API-57 V-09-07-2020: Return the full version number in a response header',
              rule_type_description:
                "Since the URI only contains the major version, it's useful to provide the full version number in the response headers for every API call. This information could then be used for logging, debugging or auditing purposes. In cases where an intermediate networking component returns an error response (e.g. a reverse proxy enforcing access policies), the version number may be omitted.\nThe version number must be returned in an HTTP response header named API-Version (case-insensitive) and should not be prefixed.",
              success: false,
              errors: [
                "The headers is missing. Make sure that the 'API-Version' is given.",
              ],
            },
          ],
        },
      },
      {
        id: 'behandeldienst-configuratie-beheren',
        description:
          'Een REST API voor het beheren van de behandeldienstconfiguraties. Hierin kan een bevoegd gezag een activiteit waarvoor zij verantwoordelijk is koppelen aan een behandeldienst.',
        organization_name: 'Digitaal Stelsel Omgevingswet (DSO-LV)',
        organization_oin: '00000004130854102000',
        service_name: 'Behandeldienst configuratie beheren',
        api_type: 'rest_json',
        api_authentication: 'unknown',
        badges: [],
        environments: [
          {
            name: 'production',
            api_url:
              'https://service.pre.omgevingswet.overheid.nl/overheid/toepasbare-regels/api/behandeldienstconfiguraties/v1',
            specification_url: '',
            documentation_url:
              'https://pre.omgevingswet.overheid.nl/knooppunt/apistore/api-docs/Rijkswaterstaat/ToepasbareRegels-BehandeldienstConfiguraties/v1',
          },
        ],
        contact: { email: '', phone: '', url: '' },
        is_reference_implementation: false,
        referenced_apis: [],
        related_code: [],
        terms_of_use: {
          government_only: false,
          pay_per_use: false,
          uptime_guarantee: null,
          support_response_time: null,
        },
        scores: {
          has_documentation: true,
          has_specification: false,
          has_contact_details: false,
          provides_sla: false,
        },
        design_rule_scores: {
          started_at: '2021-06-02T10:11:32.148483+02:00',
          percentage_score: '14.29',
          test_version: '09 Juli 2020',
          results: [
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-03',
              rule_type_name:
                'API-03 V-09-07-2020: Only apply standard HTTP methods',
              rule_type_description:
                'The HTTP specification [rfc7231] and the later introduced PATCH method specification [rfc5789] offer a set of standard methods, where every method is designed with explicit semantics. Adhering to the HTTP specification is crucial, since HTTP clients and middleware applications rely on standardized characteristics. Therefore, resources must be retrieved or manipulated using standard HTTP methods.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-16',
              rule_type_name:
                'API-16 V-09-07-2020: Use OpenAPI Specification for documentation',
              rule_type_description:
                'The OpenAPI Specification (OAS) [OPENAPIS] defines a standard, language-agnostic interface to RESTful APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. When properly defined, a consumer can understand and interact with the remote service with a minimal amount of implementation logic.\nAPI documentation must be provided in the form of an OpenAPI definition document which conforms to the OpenAPI Specification (from v3 onwards). As a result, a variety of tools can be used to render the documentation (e.g. Swagger UI or ReDoc) or automate tasks such as testing or code generation. The OAS document should provide clear descriptions and examples.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-20',
              rule_type_name:
                'API-20 V-09-07-2020: Include the major version number in the URI',
              rule_type_description:
                'The URI of an API (base path) must include the major version number, prefixed by the letter v. This allows the exploration of multiple versions of an API in the browser. The minor and patch version numbers are not part of the URI and may not have any impact on existing client implementations.',
              success: true,
              errors: null,
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-48',
              rule_type_name:
                'API-48 V-09-07-2020: Leave off trailing slashes from URIs',
              rule_type_description:
                'According to the URI specification [rfc3986], URIs may contain a trailing slash. However, for REST APIs this is considered as a bad practice since a URI including or excluding a trailing slash might be interpreted as different resources (which is strictly speaking the correct interpretation).\nTo avoid confusion and ambiguity, a URI must never contain a trailing slash. When requesting a resource including a trailing slash, this must result in a 404 (not found) error response and not a redirect. This enforces API consumers to use the correct URI.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-51',
              rule_type_name:
                'API-51 V-09-07-2020: Publish OAS document at a standard location in JSON-format',
              rule_type_description:
                'To make the OAS document easy to find and to facilitate self-discovering clients, there should be one standard location where the OAS document is available for download. Clients (such as Swagger UI or ReDoc) must be able to retrieve the document without having to authenticate. Furthermore, the CORS policy for this URI must allow external domains to read the documentation from a browser environment.\nThe standard location for the OAS document is a URI called openapi.json or openapi.yaml within the base path of the API. This can be convenient, because OAS document updates can easily become part of the CI/CD process.\nAt least the JSON format must be supported. When having multiple (major) versions of an API, every API should provide its own OAS document(s).',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-56',
              rule_type_name:
                'API-56 V-09-07-2020: Adhere to the Semantic Versioning model when releasing API changes',
              rule_type_description:
                'Version numbering must follow the Semantic Versioning [SemVer] model to prevent breaking changes when releasing new API versions. Versions are formatted using the major.minor.patch template. When releasing a new version which contains backwards-incompatible changes, a new major version must be released. Minor and patch releases may only contain backwards compatible changes (e.g. the addition of an endpoint or an optional attribute).',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-57',
              rule_type_name:
                'API-57 V-09-07-2020: Return the full version number in a response header',
              rule_type_description:
                "Since the URI only contains the major version, it's useful to provide the full version number in the response headers for every API call. This information could then be used for logging, debugging or auditing purposes. In cases where an intermediate networking component returns an error response (e.g. a reverse proxy enforcing access policies), the version number may be omitted.\nThe version number must be returned in an HTTP response header named API-Version (case-insensitive) and should not be prefixed.",
              success: false,
              errors: null,
            },
          ],
        },
      },
      {
        id: 'catalogus-muteren',
        description:
          'Met deze REST API overheden begrippen en definities muteren in de stelselcatalogus.',
        organization_name: 'Digitaal Stelsel Omgevingswet (DSO-LV)',
        organization_oin: '00000004130854102000',
        service_name: 'Catalogus muteren',
        api_type: 'rest_json',
        api_authentication: 'unknown',
        badges: [],
        environments: [
          {
            name: 'production',
            api_url:
              'https://service.pre.omgevingswet.overheid.nl/publiek/catalogus/api/muteren/v2',
            specification_url: '',
            documentation_url:
              'https://pre.omgevingswet.overheid.nl/knooppunt/apistore/api-docs/Kadaster/Catalogus-Muteren-Publiek/v2',
          },
        ],
        contact: { email: '', phone: '', url: '' },
        is_reference_implementation: false,
        referenced_apis: [],
        related_code: [],
        terms_of_use: {
          government_only: false,
          pay_per_use: false,
          uptime_guarantee: null,
          support_response_time: null,
        },
        scores: {
          has_documentation: true,
          has_specification: false,
          has_contact_details: false,
          provides_sla: false,
        },
        design_rule_scores: {
          started_at: '2021-06-02T10:12:02.629579+02:00',
          percentage_score: '14.29',
          test_version: '09 Juli 2020',
          results: [
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-03',
              rule_type_name:
                'API-03 V-09-07-2020: Only apply standard HTTP methods',
              rule_type_description:
                'The HTTP specification [rfc7231] and the later introduced PATCH method specification [rfc5789] offer a set of standard methods, where every method is designed with explicit semantics. Adhering to the HTTP specification is crucial, since HTTP clients and middleware applications rely on standardized characteristics. Therefore, resources must be retrieved or manipulated using standard HTTP methods.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-16',
              rule_type_name:
                'API-16 V-09-07-2020: Use OpenAPI Specification for documentation',
              rule_type_description:
                'The OpenAPI Specification (OAS) [OPENAPIS] defines a standard, language-agnostic interface to RESTful APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. When properly defined, a consumer can understand and interact with the remote service with a minimal amount of implementation logic.\nAPI documentation must be provided in the form of an OpenAPI definition document which conforms to the OpenAPI Specification (from v3 onwards). As a result, a variety of tools can be used to render the documentation (e.g. Swagger UI or ReDoc) or automate tasks such as testing or code generation. The OAS document should provide clear descriptions and examples.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-20',
              rule_type_name:
                'API-20 V-09-07-2020: Include the major version number in the URI',
              rule_type_description:
                'The URI of an API (base path) must include the major version number, prefixed by the letter v. This allows the exploration of multiple versions of an API in the browser. The minor and patch version numbers are not part of the URI and may not have any impact on existing client implementations.',
              success: true,
              errors: null,
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-48',
              rule_type_name:
                'API-48 V-09-07-2020: Leave off trailing slashes from URIs',
              rule_type_description:
                'According to the URI specification [rfc3986], URIs may contain a trailing slash. However, for REST APIs this is considered as a bad practice since a URI including or excluding a trailing slash might be interpreted as different resources (which is strictly speaking the correct interpretation).\nTo avoid confusion and ambiguity, a URI must never contain a trailing slash. When requesting a resource including a trailing slash, this must result in a 404 (not found) error response and not a redirect. This enforces API consumers to use the correct URI.',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-51',
              rule_type_name:
                'API-51 V-09-07-2020: Publish OAS document at a standard location in JSON-format',
              rule_type_description:
                'To make the OAS document easy to find and to facilitate self-discovering clients, there should be one standard location where the OAS document is available for download. Clients (such as Swagger UI or ReDoc) must be able to retrieve the document without having to authenticate. Furthermore, the CORS policy for this URI must allow external domains to read the documentation from a browser environment.\nThe standard location for the OAS document is a URI called openapi.json or openapi.yaml within the base path of the API. This can be convenient, because OAS document updates can easily become part of the CI/CD process.\nAt least the JSON format must be supported. When having multiple (major) versions of an API, every API should provide its own OAS document(s).',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-56',
              rule_type_name:
                'API-56 V-09-07-2020: Adhere to the Semantic Versioning model when releasing API changes',
              rule_type_description:
                'Version numbering must follow the Semantic Versioning [SemVer] model to prevent breaking changes when releasing new API versions. Versions are formatted using the major.minor.patch template. When releasing a new version which contains backwards-incompatible changes, a new major version must be released. Minor and patch releases may only contain backwards compatible changes (e.g. the addition of an endpoint or an optional attribute).',
              success: false,
              errors: ['The API did not give a valid JSON output.'],
            },
            {
              rule_type_url:
                'https://publicatie.centrumvoorstandaarden.nl/api/adr/#api-57',
              rule_type_name:
                'API-57 V-09-07-2020: Return the full version number in a response header',
              rule_type_description:
                "Since the URI only contains the major version, it's useful to provide the full version number in the response headers for every API call. This information could then be used for logging, debugging or auditing purposes. In cases where an intermediate networking component returns an error response (e.g. a reverse proxy enforcing access policies), the version number may be omitted.\nThe version number must be returned in an HTTP response header named API-Version (case-insensitive) and should not be prefixed.",
              success: false,
              errors: null,
            },
          ],
        },
      },
    ],
    facets: {
      api_type: {
        terms: [
          { term: 'rest_json', count: 134 },
          { term: 'rest_xml', count: 1 },
          { term: 'unknown', count: 2 },
          { term: 'wfs', count: 1 },
        ],
      },
      organization_oin: {
        terms: [
          {
            term: '00000001001589623000',
            display_name: 'Gemeente Enschede',
            count: 2,
          },
          {
            term: '00000001002306608000',
            display_name: 'Provincie Zuid-Holland',
            count: 3,
          },
          {
            term: '00000001002564440000',
            display_name: 'Gemeente Amsterdam',
            count: 60,
          },
          {
            term: '00000001003214345000',
            display_name:
              'Ministerie van Binnenlandse Zaken en Koninkrijksrelaties',
            count: 2,
          },
          {
            term: '00000001003227376000',
            display_name: 'Ministerie van Algemene Zaken',
            count: 2,
          },
          {
            term: '00000001006033404000',
            display_name: 'Kamer van Koophandel Nederland',
            count: 4,
          },
          {
            term: '00000001802327497000',
            display_name: 'Dienst voor het kadaster en de openbare registers',
            count: 6,
          },
          { term: '00000001804770694000', display_name: 'RDW', count: 1 },
          {
            term: '00000001812483297000',
            display_name: 'Centraal Bureau voor de Statistiek',
            count: 1,
          },
          {
            term: '00000001817301409000',
            display_name: 'Gemeenschappelijke Regeling Drechtsteden',
            count: 1,
          },
          {
            term: '00000001821002193000',
            display_name: 'VNG Realisatie',
            count: 9,
          },
          {
            term: '00000001821699180000',
            display_name: 'Ministerie van IenW-Rijkswaterstaat',
            count: 1,
          },
          { term: '00000001822477348000', display_name: 'Logius', count: 2 },
          {
            term: '00000004000000006000',
            display_name: 'Rijksdienst voor Ondernemend Nederland',
            count: 1,
          },
          {
            term: '00000004000000059000',
            display_name: 'Uitvoeringsorganisatie Bedrijfsvoering Rijk (UBR)',
            count: 5,
          },
          {
            term: '00000004000000062000',
            display_name: 'Rijksinstituut voor Volksgezondheid en Milieu',
            count: 2,
          },
          {
            term: '00000004130854102000',
            display_name: 'Digitaal Stelsel Omgevingswet (DSO-LV)',
            count: 36,
          },
        ],
      },
    },
  })
})

server.use(middlewares)

server.use(router)
server.listen(8000, () => {
  // eslint-disable-next-line no-console
  console.log('JSON Server is running on port 8000')
})

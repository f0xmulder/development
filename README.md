# developer.overheid.nl
This is the repository of the software backing the [developer.overheid.nl](https://developer.overheid.nl) portal. This portal provides an overview of all API's within the Dutch government.

## Adding an API to developer.overheid.nl
If you would like to add an API to developer.overheid.nl please submit a pull request to this repository with a new JSON file: `data/{organization}-{api}.json`. Here is an example JSON:

```json
{
    "organization_name": "Example Organization",
    "service_name": "Example Service",
    "api_url": "https://api.example.com/service/",
    "api_specification_type": "OpenAPI2",
    "specification_url": "https://api.example.com/service/swagger/?format=openapi",
    "documentation_url": "https://api.example.com/service/"
}
```

## Developer documentation
If you would like to contribute to the developer.overheid.nl software itself, consult the [developer documentation](./docs/developer.md).

## Deployment and releases
If you would like to learn more about the deployment en release process of developer.overheid.nl, consult the [deployment and releases documentation](./docs/deployment-releases.md).

## Licence
Copyright © VNG Realisatie 2019

[Licensed under the EUPLv1.2](LICENCE.md)

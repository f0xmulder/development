# developer.overheid.nl

This README outlines the details of collaborating on this repository.

This software is developed to run on [developers.overheid.nl](https://developers.overheid.nl). 
A portal that provides an overview of all API's within the Dutch government

# Documentation

* [The technical stack](./docs/00-stack.md)
* [Setup your development environment](./docs/01-development-setup.md)
* [From development to production](./docs/02-from-development-to-production.md)
This repository contains all the source for developer.overheid.nl, a portal that provides an overview of all API's within the Dutch government.

## Production releases
We use Docker to for our production releases. Use the following commands to build the Docker containers locally:

```bash
    $ docker build -f ui/Dockerfile -t commonground/don-ui .
    $ docker build -f api/Dockerfile -t commonground/don-api .
```

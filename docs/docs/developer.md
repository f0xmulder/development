# Developer documentation
In this application we use the [Python Django framework](https://www.djangoproject.com/) and the [Go programming language](https://golang.org) for the backend systems, and [React](https://reactjs.org/) for the frontend.

## Setup your development environment
First make sure the following tools are available on your computer:

* [Git](https://git-scm.com/)
* [Go (v1.13+)](https://golang.org/doc/install)
* [Node.js (v 12)](https://nodejs.org/) (with NPM)
* [Modd](https://github.com/cortesi/modd)
* [Docker](https://docker.com), including [docker-compose](https://docs.docker.com/compose/)
* [Python (v3.8)](https://www.python.org)

> On Ubuntu 18.04, most of these can be installed through the `apt` package manager. The `golang` version in `apt` is too old, so you will need to install that manually. For Node.js, you can install the correct version using the `nvm` script or as a snap (the snaps have a channel for each major release), as the version in apt is too old. Modd also needs to be installed manually, or through `go get`, see the install instructions on the Modd github readme. For Python you will need to make sure to install the right version from apt, which is not the default version in Ubuntu 18.04. Be sure to also include the `python3.8-dev` and `python3.8-venv` packages.

Then clone this repository:

```bash
git clone git@gitlab.com:commonground/developer.overheid.nl.git
cd developer.overheid.nl/
```

### Database

First, start a database for local development:

```bash
docker-compose -f docker-compose.dev.yml up
```
Tip: if you want to completely restart and reset the database, use `docker-compose -f docker-compose.dev.yml down`


### Django API

First, set up a python virtual environment with python 3.8 and activate it.

Then install the python dependencies:

```bash
cd api && pip install -r requirements-dev.txt
```

> __*Note*__: If you already have `pip-tools` installed, or you have already installed a previous version of `requirements-dev.txt`, you can run `pip-sync requirements-dev.txt` instead of `pip install ...` to update your environment. This will also delete unneeded packages.

Run the migrations:
```bash
python manage.py migrate
```

To sync the API JSON files to your database, run:

```bash
python manage.py sync_apis
```

You can now start the Django API (develpoment version) with:

```bash
python manage.py runserver
```

If you want to run the python tests:

```bash
python manage.py test
```

If you want to run the python linter:

```bash
prospector
```


### Go Validator

To run the Go validator:

```bash
cd validate/ && go run cmd/don-validate/*.go
```

If you want to run the validator tests as a watcher, use:

```bash
modd -f test.conf
```


### Frontend

To start the frontend application:

```bash
cd ui/ && npm install && npm start
```
This command should automatically open a browser on [http://localhost:3000](http://localhost:3000/).


## Running with minikube

Run this project with minikube if you want to test changes to the helm charts or Dockerfiles locally.

### Install dependencies

* kubectl
* minikube
* helm

### Prepare your minikube cluster

1. Start minikube: `minikube start --cpus 4 --memory 8192 --disk-size=50G`
1. Configure docker to use minikube's docker daemon: `eval $(minikube docker-env)`
1. Add the official helm stable chart repo: `helm repo add stable https://kubernetes-charts.storage.googleapis.com/`
1. Add the traefik namespace: `kubectl create namespace traefik`
1. Install traefik: `helm install traefik stable/traefik --namespace traefik --values helm/traefik-values-minikube.yaml`
1. Install KubeDB. Follow the kubedb.com [instructions for installing using helm](https://kubedb.com/docs/0.12.0/setup/install/#using-helm).
1. Add the don-dev namespace: `kubectl create namespace don-dev`
1. Add minikube's hostnames to your `/etc/hosts` file so you can reach the services from your browser: `sh initialize-hostnames.sh`

Note: from now on, you only need to follow the first two steps to start and prepare minikube.

### Deploy to minikube
To deploy a new version to minikube, run these commands:
```bash
docker-compose build
```
```bash
helm upgrade --install don-dev ./helm/don --namespace don-dev --values helm/don/values.yaml --values helm/don/values-minikube.yaml
```

You can see your changes at: http://don.minikube:30080/

## Adding/updating dependencies

### Python

First, make sure your virtual environment is active. 

#### New dependency

To include a new module dependency, add the module name to `requirements.in` (for production dependencies) or `requirements-dev.in` (for development and testing dependencies). Then update your dependencies.

#### Update dependencies

To update all dependencies to their newest versions, run

```bash
pip-compile requirements.in --generate-hashes
pip-compile requirements-dev.in --generate-hashes
pip-sync requirements-dev.txt
```

__*NB:*__ The order of the `pip-compile`'s is important!

If you updated your git repository and the new version has changes in the requirements files, also run the `pip-sync` command to synchronize your environment with the requirements files.

> __*Note*__: `pip-sync` will synchronize your environment with the requirements files, that means it will also delete any modules that are not listed in the requirements files. If you do not want that, run `pip install -r requirements.txt -r requirements-dev.txt` instead of `pip-sync`.

#### Dependency problems

When you update dependencies, it may happen that there is an unsolved bug in a new dependency version or that some required modules do not work together well. In that case you have a few options: 
- Abort the upgrade and try again later. Often problems will be resolved by the package maintainers in short time.
- Add explicit constraints to `requirements*.in` to exclude the problematic versions.
- Modify the `requirements*.txt` files manually to select working versions. Note that you need to provide hashes for all packages.

### Javascript/Go

Todo
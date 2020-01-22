# Developer documentation
In this application we use the [Go programming language](https://golang.org) for the backend systems and [React](https://reactjs.org/) for the frontend.

## Setup your development environment
First make sure the following tools are available on your computer:

* [Git](https://git-scm.com/)
* [Go](https://golang.org/doc/install)
* [Node.js](https://nodejs.org/) (with NPM)
* [Modd](https://github.com/cortesi/modd)
* [Docker](https://docker.com), including [docker-compose](https://docs.docker.com/compose/)

Then clone this repository:

```bash
git clone git@gitlab.com:commonground/developer.overheid.nl.git
cd developer.overheid.nl/
```

### Backend

First, start a database for local development:

```bash
docker-compose -f docker-compose.dev.yml up
```
Tip: if you want to completely restart and reset the database, use `docker-compose -f docker-compose.dev.yml down`

Then, run the migrations and fill the database with fixtures:
```bash
go run migrate-and-fill/cmd/migrate-and-fill/*.go --fixtures-path=fixtures.sql --migrations-path=migrations
```

Finally, to start the API server:

```bash
cd api/ && modd
```

If you want to run the backend tests as a watcher, use:

```bash
modd -f test-go.conf
```

### Frontend

To start the frontend application:

```bash
cd ui/ && npm install && npm start
```
This command should automatically open a browser on [http://localhost:3000](http://localhost:3000/).


## Running with minikube

Run this project with minikube if you want to test changes to the helm charts locally.

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

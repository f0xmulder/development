# Deployment and releases
The [CI system of GitLab](https://gitlab.com/commonground/developer.overheid.nl/pipelines) automatically builds every push to the master branch, creates Docker images and pushes them to the GitLab registry. When a release is successful, it deploys with a manual trigger from within GitLab to the production environment.

Review enviroments are only created when using branches that start with `"review/*`

## Build tools
We use [Skaffold](https://github.com/GoogleContainerTools/skaffold) to automate the development and deployment process of [developer.overheid.nl](https://developer.overheid.nl).

## Setup a local Kubernetes environment with minikube
Please make sure you setup [minikube](https://github.com/kubernetes/minikube) and [Helm](https://helm.sh/) on the cluster.

Let's start minikube first:

```bash
minikube start
```

Then make sure you have a Traefik ingress controller up and running:

```bash
helm install stable/traefik --name traefik --namespace traefik --values helm/traefik-values-minikube.yaml
```

Now we point `don.minikube` to the minikube cluster by running:

```bash
echo "$(minikube ip) don.minikube" | sudo tee -a /etc/hosts
```

Then run the following command from the root of the repository to deploy the application to the local cluster:

```bash
skaffold dev --profile minikube
```

For creating issues in Gitlab, make sure the Gitlab credentials are provided to the cluster. First create the file `gitlab.yaml`. You can encode the secrets using: `echo -n 'https://gitlab.com' | base64`

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: gitlab
type: Opaque
data:
  url: aHR0cHM6Ly9naXRsYWIuY29t
  access_token: YWJjZGVmZ2hpams=
  project_id: NDI=
```

```bash
kubectl create -f gitlab.yaml
```

You will find the application running in the `don-dev` namespace. Point your browser to [https://don.minikube:30443](https://don.minikube:30443/) to view the deployment.

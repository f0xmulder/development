#!/bin/bash

minikube_ip=$(minikube ip)

echo "${minikube_ip}    traefik.minikube" | sudo tee -a /etc/hosts
echo "${minikube_ip}        don.minikube" | sudo tee -a /etc/hosts

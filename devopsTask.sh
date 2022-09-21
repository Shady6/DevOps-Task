#!/usr/bin/env bash

appName="app-backend"
export DB_CONNECTION='sqlite::memory'

# Test and build application
npm ci
npm run test
npm run build

# Start application
(npm run start&)

# Verify with API requests
curl -X POST localhost:4000/people -H 'Content-Type: application/json' -d '{"name":"Joe","age":"25"}'
curl -X GET localhost:4000/people

# Stop application process which was started in background
pkill "npm run start"

# docker build -t ${appName}:development .
minikube image build -t ${appName}:development .

# Add helm repository for PostgreSQL installation
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install app-database bitnami/postgresql --set postgresqlPassword=admin@tokenguard

# Install application with helm chart and get url from minikube to check the service
cd helm/${appName}
helm install ${appName} .
minikube service ${appName}-service --url

# helm uninstall  ${appName}
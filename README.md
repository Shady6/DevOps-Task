# DevOps Task

You are presented with an backend app using Typescript, Node and a database. This application
is an API where you can add a person to a database and retrieve all the people from the database.
You can see the specification of the API in the `api.http` file.
Your goal is to create pipeline which will test, build and deploy the app to k8s cluster.

## Prerequisites

- Docker
- Kubectl
- Local k8s cluster e.g. Docker-Desktop / Minikube
- Node (you can use the latest version)
- NPM

## Instructions

- Create a docker image for the app. Use the `node:latest` as the base image.
  For app to work it needs to be installed, built and then started.
  Scripts for these actions can be found in the `package.json`.

- Create yaml for the backend application - deployment and a service. It should have 1 replica and use
  docker image from the previous step. The app uses `DB_CONNECTION` env
  variable so you can place it here aswell. This connection string should point to the
  database service which is described in the next step (it shouldn't be in memory database which is used locally).
  The Node app is listening on port 4000.

- Create yaml for the database - deployment and a service. It should have 1 replica. For the image use
  Postgres:12. Postgres by default will be listening on port 5432.

- Create bash script or scripts which will:

  - build the app locally
  - test the app locally (make sure this env variable is present `DB_CONNECTION=sqlite::memory`)
  - build the docker image
  - update / deploy in k8s cluster with the yamls of the database and the backend app
  - port forward the backend service like this 4000:backend-svc-port (host-port:backend-svc-port)

    _All the script for testing, building and starting the app can be found in `package.json`._

- You can check if the app is working by using the `api.http` file. You can use the <a href="https://marketplace.visualstudio.com/items?itemName=humao.rest-client">Rest Client</a> extension which will
  enable you to execute requests from the `api.http` file. This is just an example and you can check
  if it works with any tool like e.g. cURL.
  Application is working properly when you perform a POST request then GET and you see that a person
  added is being returned.

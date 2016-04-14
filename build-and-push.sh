#!/usr/bin/env bash

VERSION=1.0.0-SNAPSHOT
DOCKER_COORDINATES=hekonsek/awarevision-web

# Build the project
gulp build

# Deploy Dockerized application
docker build -t ${DOCKER_COORDINATES}:${VERSION} .
docker tag -f ${DOCKER_COORDINATES}:${VERSION} ${DOCKER_COORDINATES}:latest
docker push ${DOCKER_COORDINATES}:${VERSION}
docker push ${DOCKER_COORDINATES}:latest
#!/bin/bash -e
drone exec \
    --event "$1" \
    --deploy \
    -e NPM_USERNAME="$NPM_USERNAME" \
    -e NPM_PASSWORD="$NPM_PASSWORD" \
    -e NPM_EMAIL="$NPM_EMAIL" \
    -e NPM_REGISTRY=`npm get registry`

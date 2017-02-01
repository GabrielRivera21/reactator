#!/bin/bash -e
drone exec \
    --event "$1" \
    --event "$2" \
    --deploy \
    -e REPO=`git config --get remote.origin.url | sed "s/git\@/https\:\\/\\//g" | sed "s/.com\:/.com\\//g"` \
    -e NPM_USERNAME="$NPM_USERNAME" \
    -e NPM_PASSWORD="$NPM_PASSWORD" \
    -e NPM_EMAIL="$NPM_EMAIL" \
    -e NPM_REGISTRY=`npm get registry`

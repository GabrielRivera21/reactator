#!/bin/bash -e

rm -rf dist/package
mkdir -p dist/package

babel -d dist/package --ignore */__tests__/* reactator/

cp package.json dist/package/
cp README.md dist/package/
cp gulp-build-config.json dist/package/

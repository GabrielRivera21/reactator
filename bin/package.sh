#!/bin/bash -e

rm -rf dist/package
mkdir -p dist/package

cp .babelrc dist/package
cp .eslintrc dist/package
cp .jsdocrc dist/package
cp CHANGE.md dist/package
cp LICENSE dist/package
cp README.md dist/package
cp bower.json dist/package
cp gulpfile.js dist/package
cp package.json dist/package
cp reactator.yml dist/package

babel -d dist/package --ignore */__tests__/* src

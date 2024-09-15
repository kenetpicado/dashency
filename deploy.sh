#!/usr/bin/env sh

set -e

git add .
git commit -m "Update pre-deploy"
git push

npm run build

# copiar CNAME
#cp CNAME dist/

cd dist

git init
git add .
git commit -m 'Deploy'

git push -f git@github.com:kenetpicado/dashency.git master:gh-pages

cd -
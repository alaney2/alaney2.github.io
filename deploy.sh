!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist



git init
git add -A
git commit -m 'Deploy'

git push -f git@github.com:alaney2/alaney2.github.io.git main


cd -
#!/bin/sh
set -e

ROOT="/www/my-simple-frontend"

cd "$ROOT"

./node_modules/.bin/ng serve --prod --host 0.0.0.0

#!/bin/sh
set -e

ROOT="/www/my-simple-frontend"

cd "$ROOT"

npm run http-server

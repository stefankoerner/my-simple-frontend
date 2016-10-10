#!/bin/sh
set -e

#ROOT="/www/my-simple-frontend"
#cd "$ROOT"
#npm run server

export APACHE_LOG_DIR=/var/log/apache2

exec apache2 -DFOREGROUND

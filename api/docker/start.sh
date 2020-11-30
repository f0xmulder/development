#!/usr/bin/env sh
set -e

# Collect static
python /app/manage.py collectstatic --noinput

# Run migrations
python /app/manage.py migrate

# Sync API JSONs to the database
python /app/manage.py sync_apis --api-dir /app/data/apis

# Check design rules for all relevant APIs
# Ignore errors (TODO: perhaps remove when command has been thoroughly tested)
python /app/manage.py start_new_sessions || true

# Configure linkchecker
if [ "x$LINKCHECKER_ENABLED_DEFAULT" != x ]
then
  python /app/manage.py set_option linkchecker "$LINKCHECKER_ENABLED_DEFAULT" --ifnotset
fi

# Start uWSGI processes
uwsgi --http :8000 --module api.wsgi --processes 4 --threads 2 --static-map /admin/static=/app/static

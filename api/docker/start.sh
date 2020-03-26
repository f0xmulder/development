#!/usr/bin/env sh
set -e

# Collect static
python /app/manage.py collectstatic --noinput

# Run migrations
python /app/manage.py migrate

# Sync API JSONs to the database
python /app/manage.py sync_apis --api-dir /app/data/apis

# Start Gunicorn processes
uwsgi --http :8000 --module api.wsgi --processes 4 --threads 2 --static-map /admin/static=/app/static

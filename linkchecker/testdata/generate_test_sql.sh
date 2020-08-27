#!/bin/sh
set -eu
case "$*" in
"-h" | "--help")
    echo "Dump sql to create the schema for the core module."
    echo "Make sure you have your python virtual environment activated (if applicable)."
    echo "To update the schema file, run 'generate_test_sql.sh > testschema.sql'."
    exit
    ;;
esac

cd `dirname "$0"`

echo "-- SQLite3 DDL for django module 'core'"
echo "-- Regenerate using 'generate_test_sql.sh > testschema.sql'"
echo "--"
for m in `ls ../../api/core/migrations | grep -v __ | cut -f1 -d.`
do
    python ../../api/manage.py sqlmigrate --database sqlite3-empty core $m
done

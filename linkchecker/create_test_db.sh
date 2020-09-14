#!/bin/sh
psql -v ON_ERROR_STOP=1 -h localhost don don <<-EOF
CREATE DATABASE "don-test";
GRANT ALL PRIVILEGES ON DATABASE "don-test" TO don;
EOF

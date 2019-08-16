FROM node:10.16.3-alpine AS build

ENV CI=true

# First copy only package.json and package-lock.json to make the dependency fetching step optional.
COPY ui/package.json \
     ui/package-lock.json \
     /go/src/commonground/developer.overheid.nl/ui/

WORKDIR /go/src/commonground/developer.overheid.nl/ui

RUN npm ci --no-progress --color=false --quiet

# Now copy the whole workdir for the build step.
COPY ui /go/src/commonground/developer.overheid.nl/ui

RUN INLINE_RUNTIME_CHUNK=false npm run build

# Copy static docs to alpine-based nginx container.
FROM nginx:alpine as webserver

# Copy nginx configuration
COPY ui/docker/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /go/src/commonground/developer.overheid.nl/ui/build /usr/share/nginx/html

EXPOSE 80

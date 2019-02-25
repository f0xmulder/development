FROM node:10.15.1-alpine AS build

RUN apk add git

ENV CI=true

# First copy only package.json and package-lock.json to make the dependency fetching step optional.
COPY ui/package.json \
     ui/package-lock.json \
     /go/src/commonground/developer.overheid.nl/ui/

WORKDIR /go/src/commonground/developer.overheid.nl/ui

RUN npm ci --no-progress --color=false --quiet

# Now copy the whole workdir for the build step.
COPY ui /go/src/commonground/developer.overheid.nl/ui
COPY .git /go/src/commonground/developer.overheid.nl/.git

RUN GIT_COMMIT_HASH=$(git rev-parse HEAD) \
    GIT_TAG_NAME=$(git describe --tags 2> /dev/null || echo no-tag) \
    npm run build

# Copy static docs to alpine-based nginx container.
FROM nginx:alpine

# Copy nginx configuration
COPY ui/docker/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /go/src/commonground/developer.overheid.nl/ui/build /usr/share/nginx/html

EXPOSE 80

FROM node:10.15.0-alpine AS build

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

RUN REACT_APP_GIT_COMMIT_HASH=$(git rev-parse HEAD) \
    REACT_APP_GIT_TAG_NAME=$(git describe --tags) \
    npm run build

# Copy static docs to alpine-based nginx container.
FROM nginx:alpine

# Copy nginx configuration
COPY ui/docker/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /go/src/commonground/developer.overheid.nl/ui/build /usr/share/nginx/html

USER nobody
EXPOSE 8000

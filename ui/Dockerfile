FROM node:17.3.0-alpine AS build

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

# Test the code
FROM build AS test

ENV CI=true

RUN npm run lint
RUN npm run test -- --coverage

# Copy static docs to alpine-based nginx container.
FROM nginx:1.25.3-alpine3.18 as webserver

# Copy nginx configuration
COPY ui/docker/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /go/src/commonground/developer.overheid.nl/ui/build /usr/share/nginx/html

EXPOSE 80

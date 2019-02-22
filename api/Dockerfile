# Use go 1.x based on the latest alpine image.
FROM golang:1.11-alpine AS build

# Install build tools.
RUN apk add --update git gcc musl-dev

# Cache dependencies
COPY go.mod /go/src/commonground/developer.overheid.nl/go.mod
COPY go.sum /go/src/commonground/developer.overheid.nl/go.sum
ENV GO111MODULE on
WORKDIR /go/src/commonground/developer.overheid.nl
RUN go mod download

# Add code and build.
COPY api /go/src/commonground/developer.overheid.nl/api
COPY .git /go/src/commonground/developer.overheid.nl/.git

WORKDIR /go/src/commonground/developer.overheid.nl/api

RUN GIT_COMMIT_HASH=$(git rev-parse HEAD) && \
    GIT_TAG_NAME=$(git describe --tags 2> /dev/null || echo no-tag) && \
    go build \
        -ldflags="-X 'gitlab.com/commonground/developer.overheid.nl/version.BuildSourceHash=$GIT_COMMIT_HASH' -X 'gitlab.com/commonground/developer.overheid.nl/version.BuildVersion=$GIT_TAG_NAME'" \
        -o dist/bin/don-api ./cmd/don-api

# Release binary on latest alpine image.
FROM alpine:latest

COPY --from=build /go/src/commonground/developer.overheid.nl/api/dist/bin/don-api /srv/don-api/bin/don-api
COPY data /srv/don-api/data

USER nobody
EXPOSE 8000

WORKDIR /srv/don-api/bin

CMD ["/srv/don-api/bin/don-api"]

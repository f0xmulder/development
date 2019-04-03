FROM golang:1.12-alpine AS build

# Install build tools.
RUN apk add --update git gcc musl-dev

# Install dependencies
COPY go.mod /go/src/commonground/developer.overheid.nl/go.mod
COPY go.sum /go/src/commonground/developer.overheid.nl/go.sum
ENV GO111MODULE on
WORKDIR /go/src/commonground/developer.overheid.nl
RUN go mod download

# Add code and build.
COPY api /go/src/commonground/developer.overheid.nl/api

WORKDIR /go/src/commonground/developer.overheid.nl/api

RUN go build -o dist/bin/don-api ./cmd/don-api

# Release binary on latest alpine image.
FROM alpine:latest

RUN apk add --no-cache ca-certificates bash

COPY --from=build /go/src/commonground/developer.overheid.nl/api/dist/bin/don-api /srv/don-api/bin/don-api
COPY data /srv/don-api/data

EXPOSE 8080

WORKDIR /srv/don-api/bin

CMD ["/srv/don-api/bin/don-api"]

FROM golang:1.13.5-alpine AS build

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
COPY migrate-and-fill /go/src/commonground/developer.overheid.nl/migrate-and-fill

WORKDIR /go/src/commonground/developer.overheid.nl/api
RUN go build -o dist/bin/don-api ./cmd/don-api

WORKDIR /go/src/commonground/developer.overheid.nl/migrate-and-fill
RUN go build -o dist/bin/migrate-and-fill ./cmd/migrate-and-fill

# Test the code
FROM build AS test

ENV CI=true
WORKDIR /go/src/commonground/developer.overheid.nl/api

RUN go test ./... -coverprofile coverage.out && go tool cover -func=coverage.out

# Release binary on latest alpine image.
FROM alpine:latest

RUN apk add --no-cache ca-certificates bash

COPY --from=build /go/src/commonground/developer.overheid.nl/api/dist/bin/don-api /srv/don-api/bin/don-api
COPY --from=build /go/src/commonground/developer.overheid.nl/migrate-and-fill/dist/bin/migrate-and-fill /srv/don-api/bin/migrate-and-fill
COPY data /srv/don-api/data
COPY migrations /srv/don-api/migrations
COPY fixtures.sql /srv/don-api/fixtures.sql

EXPOSE 8080

WORKDIR /srv/don-api/bin

CMD ["/srv/don-api/bin/don-api"]

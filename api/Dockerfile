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
WORKDIR /go/src/commonground/developer.overheid.nl/api
RUN go build -o dist/bin/don-api ./cmd/don-api

# Release binary on latest alpine image.
FROM alpine:latest

COPY --from=build /go/src/commonground/developer.overheid.nl/api/dist/bin/don-api /usr/local/bin/don-api
COPY data /var/lib/don-api/data

USER nobody
EXPOSE 8000

WORKDIR /var/lib/don-api

CMD ["/usr/local/bin/don-api"]

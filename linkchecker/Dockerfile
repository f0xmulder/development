FROM golang:1.14-alpine as builder

RUN apk update && \
 apk add --no-cache git ca-certificates && \
 update-ca-certificates && \
 addgroup --system app && adduser -S -G app app

WORKDIR /app

COPY . /app/

# Build without CGo, which results in a static binary. We don't use any functions that depend on CGo.
# If there is a reason to build a dynamic binary, switch the base image to something like Alpine that includes at least libc.
RUN CGO_ENABLED=0 go build check_links.go

FROM scratch

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /app/check_links /app/check_links

WORKDIR /app

USER app

ENTRYPOINT ["/app/check_links"]

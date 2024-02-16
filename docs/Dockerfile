FROM node:17.3.0 AS build

ENV CI=true

WORKDIR /src/website/
COPY docs/website/ ./
RUN npm ci --no-progress --color=false --quiet

COPY docs/docs/ /src/docs/

RUN npm run build

FROM alpine:3.10 AS version
# Add file with version tag from git
ARG GIT_TAG_NAME=undefined
ARG GIT_COMMIT_HASH=undefined
RUN ash -c 'echo "{\"tag\": \"$GIT_TAG_NAME\", \"commit\": \"$GIT_COMMIT_HASH\"}" > /version.json'

# Copy static docs to alpine-based nginx container.
FROM nginx:1.25.4-alpine as webserver
EXPOSE 8080

# Add non-privileged user
RUN adduser -D -u 1001 appuser

# Set ownership nginx.pid and cache folder in order to run nginx as non-root user
RUN touch /run/nginx.pid && \
    chown -R appuser /run/nginx.pid && \
    chown -R appuser /var/cache/nginx

USER appuser

# Copy nginx configuration
COPY docs/docker/default.conf /etc/nginx/conf.d/default.conf
COPY docs/docker/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /src/website/build/ /usr/share/nginx/html/docs
COPY --from=version /version.json /usr/share/nginx/html/docs

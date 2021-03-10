FROM cypress/base:10

ENV CI=true

COPY e2e-tests/wait-for-http.sh \
     /go/src/commonground/developer.overheid.nl/e2e-tests/

# Copy only package.json and package-lock.json to make the dependency fetching step optional.
COPY e2e-tests/package.json \
     e2e-tests/package-lock.json \
     /go/src/commonground/developer.overheid.nl/e2e-tests/

WORKDIR /go/src/commonground/developer.overheid.nl/e2e-tests

RUN npm ci --no-progress --color=false --quiet

# Now copy the whole workdir.
COPY e2e-tests /go/src/commonground/developer.overheid.nl/e2e-tests

FROM cypress/browsers:node14.16.0-chrome89-ff86

ENV CI=true

COPY wait-for-http.sh \
     /go/src/commonground/developer.overheid.nl/e2e-tests/

# Copy only package.json and package-lock.json to make the dependency fetching step optional.
COPY package.json \
     package-lock.json \
     /go/src/commonground/developer.overheid.nl/e2e-tests/

WORKDIR /go/src/commonground/developer.overheid.nl/e2e-tests

RUN npm ci --no-progress --color=false --quiet

# Now copy the whole workdir.
COPY . /go/src/commonground/developer.overheid.nl/e2e-tests

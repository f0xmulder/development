FROM python:3.8-slim AS build

RUN apt-get update && apt-get install --no-install-recommends -y \
    build-essential

RUN python -m venv /app/venv && /app/venv/bin/pip install --upgrade pip

WORKDIR /app
COPY ./api/requirements.txt /app
RUN /app/venv/bin/pip3 install -r requirements.txt

FROM python:3.8-slim

RUN apt-get update && apt-get install --no-install-recommends -y \
    mime-support \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/venv /app/venv
ENV PATH="/app/venv/bin:${PATH}"

COPY ./api/api /app/api
COPY ./api/core /app/core
COPY ./api/design_rules /app/design_rules
COPY ./api/manage.py /app
COPY ./data /app/data

COPY ./api/docker/start.sh /
RUN chmod +x /start.sh

RUN mkdir -p /app/static && chown www-data:www-data /app/static

ENV PYTHONUNBUFFERED 1
ENV DON_ENVIRONMENT production

WORKDIR /app
EXPOSE 8000
CMD ["/start.sh"]
USER www-data

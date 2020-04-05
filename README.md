# dcard-2020-apply-hw

## Prerequisites

- yarn
- node
- docker

## Description

### Middleware for Rate Limit

Middleware places in `src/middleware/rateLimit.ts`.

## Getting Started

mongodb setup

```bash
docker run --name mongo4 -d \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=__USERNAME__ \
  -e MONGO_INITDB_ROOT_PASSWORD=__PASSWORD__ \
  mongo:latest
```

Run in development mode

```bash
yarn run dev
```

Run in production mode

```bash
yarn run start
```

## Installing

```bash
yarn install --prod=false
```

## Running the tests

**Note**: some of modules' tests are still missing.

```bash
yarn run test
```

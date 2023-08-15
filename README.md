# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/hallovarvara/nodejs2023Q2-service.git
```

or by using SSH:

```
git clone git@github.com:hallovarvara/nodejs2023Q2-service.git
```

## Installing NPM modules

```
npm install
```

Make sure Node version is 18+.

## Add environment variables

Copy `.env.example` file, paste it, and rename to `.env`.

## Run application

It's recommended to install [Docker Desktop](https://www.docker.com/products/docker-desktop/) to be able to check run containers better.

Run in console:

```bash
npm run docker:start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

### Potential problems of running application and their solutions

#### You use Mac OS, and you see this error message:
`open /Users/username/.docker/buildx/current: permission denied`

Run in console:
```bash
sudo chown -R $(whoami) ~/.docker
```

#### You see message like "Prisma client isn't initialized"

Or similar message. API container at the same time falls and tries to run again. In Docker Desktop it's orange.

Initialize Prisma client from your console:
```bash
npm run docker:prisma:generate
```

#### You try to start "npm run test" and almost all tests fall with message: "socket problem" or so

Manually initialize a bridge to connect API and database (run in console):

```bash
npm run docker:create-bridge
```

## Testing

After application running open new console and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Docker

#### Scan Docker images for vulnerabilities

```
npm run docker:scan
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

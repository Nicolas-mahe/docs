# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Prerequisites

- **Node.js** version 18.0 or higher
- **npm** (comes with Node.js)

## Installation

Navigate to the `app` directory and install dependencies:

```bash
cd app
npm install
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Serve Built Site Locally

```bash
npm run serve
```

This command serves the built website locally for testing.

## Other Available Scripts

- `npm run clear` - Clear Docusaurus cache
- `npm run generate-index` - Generate documentation index
- `npm run docusaurus` - Run Docusaurus CLI commands

## Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

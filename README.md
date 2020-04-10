# pipl services

> This package provides a standardized layer for accessing [pipl services](https://docs.pipl.com/docs) along with data types.

# Usage

## Installation

Install the service in your own project

```
npm install @torch-ai/pipl
```

## Initialization

At the top of your application, or in an imported configuration file:

```js
// Import the service definition and environment constants
import Pipl from "@torch-ai/pipl";

// Create an instance of the service
const options = {};
const pipl = new Pipl(process.env.API_KEY, options);
export default pipl;
```

## Calls

```js
try {
  const results = await pipl.search({
    raw_name: "Edison"
  });
} catch (error) {}
```

## License and agreements

This package is provided through an MIT license. Usage of this package is freely available without restriction.

pipl itself has it's own
[terms of service](https://pipl.com/tos),
and [account registration](https://pipl.com/product-overview).

# Contributing

## Installation

Clone the package from the [repository](https://dev.azure.com/TorchResearchLLC/Torch-Data-Connectors/_git/pipl-js).

```
npm install
```

## Testing

A local file `.env` file will need to be created with credentials for the api:

```text
API_KEY=****
```

You may run tests in a continuous watch mode:

```
npm run-script test:watch
```

## Publishing

Be sure to bump the package.json version first.
Run the publish command which will: run tests, build js files will rollup, emit typescript files, and publish to our private repositories.

```
npm publish
```

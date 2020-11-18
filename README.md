# eslint-find-removed-rules

Module to check that none of the rules in your existing ESLint config have been removed by subsequent ESLint releases. Useful for shared config maintainers.

## Installation

```
npm install --save-dev eslint-find-removed-rules
```

## Usage

### CLI

```
eslint-find-removed-rules path/to/your/eslint-config.js
```

### Module

```
const findRemovedRules = require('eslint-find-removed-rules');

const result: Array = findRemovedRules('path/to/your/eslint-config.js');
```

### License

ISC

# eslint-find-removed-rules

Module to check that none of the rules in your existing ESLint config have been
removed by subsequent ESLint, or third party plugin releases. Useful for shared config maintainers.

## Installation

```
npm install --save-dev eslint-find-removed-rules
```

## Usage

### CLI

```
eslint-find-removed-rules path/to/your/eslint-config.js
```

#### Options:

`ignore-path` - path to file containing new line formatted list of rules to
ignore. This is useful as some configs (such as prettier) add rules that no
longer exist but are there for legacy reasons.

### Module

```
const findRemovedRules = require('eslint-find-removed-rules');

const result: Array = findRemovedRules('path/to/your/eslint-config.js');
```

#### Options:

`ignore` - array of rules to ignore. This is useful as some configs (such as
prettier) add rules that no longer exist but are there for legacy reasons.

```
findRemovedRules('path/to/your/eslint-config.js', {
  ignore: [
    // ...
  ]
})
```

### License

ISC

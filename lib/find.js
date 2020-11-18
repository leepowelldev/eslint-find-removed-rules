'use strict';

const eslintFindRules = require('eslint-find-rules');
const difference = require('lodash.difference');

function findRemovedRules(configPath) {
  if (!configPath) {
    throw new Error('Path to config file is not defined');
  }

  const ruleFinder = eslintFindRules(configPath);
  const currentRules = ruleFinder.getCurrentRules();
  const allRules = ruleFinder.getAllAvailableRules();
  const rules = difference(currentRules, allRules);

  return rules;
}

module.exports = findRemovedRules;

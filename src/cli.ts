#!/usr/bin/env node
import chalk from 'chalk';
import findRemovedRules from './find';

const { log } = console;
const { red, white, green } = chalk;
const [, , configPath] = process.argv;
const rules = findRemovedRules(configPath);

if (rules.length) {
  log(red(`Rules removed from ESLint config file:`));
  rules.forEach((rule) => log(white(rule)));
} else {
  log(green(`No rules removed from ESLint config file.`));
}

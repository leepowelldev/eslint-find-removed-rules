#!/usr/bin/env node
import minimist from 'minimist';
import { readFileSync, existsSync } from 'fs';
import findRemovedRules, { Options } from './find';

const args = minimist(process.argv.slice(2));
const configPath = args?._?.[0] ?? '';
const ignorePath = (args?.['ignore-path'] as string) || undefined;
let options: Options | undefined;

if (ignorePath) {
  if (!existsSync(ignorePath)) {
    throw Error('Path to ignore file does not exist');
  }

  const ignore = readFileSync(ignorePath)
    .toString()
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((rule) => rule.trim())
    .filter((rule) => rule.charAt(0) !== '#')
    .filter((rule) => rule.length > 0);

  options = { ignore };
}

const { log } = console;
const rules = findRemovedRules(configPath, options);

if (rules.length) {
  log(`removed rules`);
  log(``);
  rules.forEach((rule) => log(rule));
}

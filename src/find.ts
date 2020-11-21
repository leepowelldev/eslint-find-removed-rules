import eslintFindRules from 'eslint-find-rules';
import difference from 'lodash.difference';

function findRemovedRules(configPath: string): string[] {
  if (!configPath) {
    throw new Error('Path to config file is not defined');
  }

  const ruleFinder = eslintFindRules(configPath);
  const currentRules = ruleFinder.getCurrentRules();
  const allRules = ruleFinder.getAllAvailableRules();
  const rules = difference(currentRules, allRules);

  return rules;
}

export default findRemovedRules;

import eslintFindRules from 'eslint-find-rules';
import difference from 'lodash.difference';

export type Options = {
  ignore?: string[];
};

export type DefaultOptions = Required<Options>;

const defaultOptions: DefaultOptions = {
  ignore: [],
};

const findRemovedRules = (
  configPath: string,
  options: Options = {}
): string[] => {
  const { ignore } = { ...defaultOptions, ...options };

  if (!configPath) {
    throw new Error('Path to config file is not defined');
  }

  const ruleFinder = eslintFindRules(configPath);
  const currentRules = ruleFinder.getCurrentRules();
  const allRules = ruleFinder.getAllAvailableRules();
  const rules = difference(currentRules, allRules).filter(
    (rule) => !ignore.includes(rule)
  );

  return rules;
};

export default findRemovedRules;

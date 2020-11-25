const { rules } = require('@commitlint/config-conventional');
const { 'type-enum': typeEnum } = rules;
const [level, applicable, value] = typeEnum;

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [level, applicable, [...value, 'wip']],
  },
};

declare module 'eslint-find-rules' {
  type RuleFinder = {
    getAllAvailableRules(): string[];
    getCurrentRules(): string[];
    getCurrentRulesDetailed(): string[];
    getDeprecatedRules(): string[];
    getPluginRules(): string[];
    getUnusedRules(): string[];
  };

  export default function (file: string): RuleFinder;
}

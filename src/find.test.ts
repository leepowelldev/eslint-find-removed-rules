import findRemovedRules from './find';
import eslintFindRulesModule from 'eslint-find-rules';

type RuleFinder = ReturnType<typeof eslintFindRulesModule>;

const eslintFindRules = eslintFindRulesModule as jest.Mock<RuleFinder>;

jest.mock('eslint-find-rules');

describe('find', () => {
  it('should throw if no config path passed', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      findRemovedRules();
    }).toThrow('Path to config file is not defined');
  });

  it('should return empty array if configs match', () => {
    // Arrange
    const mock: RuleFinder = {
      getCurrentRules: jest.fn(() => ['a', 'b', 'c']),
      getAllAvailableRules: jest.fn(() => ['a', 'b', 'c']),
      getCurrentRulesDetailed: jest.fn(),
      getDeprecatedRules: jest.fn(),
      getPluginRules: jest.fn(),
      getUnusedRules: jest.fn(),
    };

    eslintFindRules.mockReturnValueOnce(mock);

    // Act
    const result = findRemovedRules('index.js');

    // Assert
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(0);
  });

  it('should return array of rules removed if configs do not match', () => {
    // Arrange
    const mock: RuleFinder = {
      getCurrentRules: jest.fn(() => ['a', 'b', 'c']),
      getAllAvailableRules: jest.fn(() => ['a', 'b']), // 'c' removed from all rules
      getCurrentRulesDetailed: jest.fn(),
      getDeprecatedRules: jest.fn(),
      getPluginRules: jest.fn(),
      getUnusedRules: jest.fn(),
    };

    eslintFindRules.mockReturnValueOnce(mock);

    // Act
    const result = findRemovedRules('index.js');

    // Assert
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
    expect(result[0]).toStrictEqual('c');
  });
});

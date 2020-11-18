const findRemovedRules = require('../lib/find');
const eslintFindRules = require('eslint-find-rules');

jest.mock('eslint-find-rules');

describe('find', () => {
  it('should throw if no config path passed', () => {
    expect(() => {
      findRemovedRules();
    }).toThrow('Path to config file is not defined');
  });

  it('should return empty array if configs match', () => {
    // Arrange
    const mock = {
      getCurrentRules: jest.fn(() => ['a', 'b', 'c']),
      getAllAvailableRules: jest.fn(() => ['a', 'b', 'c']),
    };

    eslintFindRules.mockImplementationOnce(() => mock);

    // Act
    const result = findRemovedRules('index.js');

    // Assert
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(0);
  });

  it('should return array of rules removed if configs do not match', () => {
    // Arrange
    const mock = {
      getCurrentRules: jest.fn(() => ['a', 'b', 'c']),
      getAllAvailableRules: jest.fn(() => ['a', 'b']), // 'c' removed from all rules
    };

    eslintFindRules.mockImplementationOnce(() => mock);

    // Act
    const result = findRemovedRules('index.js');

    // Assert
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
    expect(result[0]).toStrictEqual('c');
  });
});

import { normalize } from 'path';

describe('cli', () => {
  let logSpy: jest.SpyInstance;
  const noop = () => undefined;

  beforeEach(() => {
    jest.resetModules();
    logSpy = jest.spyOn(console, 'log').mockImplementation(noop);
  });

  it('should accept argument from command line', () => {
    // Arrange
    const path = 'path/to/config';
    process.argv[2] = path;

    const mock = jest.fn().mockReturnValue([]);
    jest.mock('./find', () => mock);

    // Act
    require('./cli');

    // Asset
    expect(mock).toHaveBeenCalledWith(path, undefined);
  });

  it('should output result message to console', () => {
    // Arrange
    jest.mock('./find', () => () => ['a', 'b']);

    // Act
    require('./cli');

    // Assert
    expect(logSpy).toHaveBeenCalledTimes(4);
    expect(logSpy.mock.calls).toStrictEqual(
      expect.arrayContaining([['removed rules'], [''], ['a'], ['b']])
    );
  });

  it('should output empty result message to console', () => {
    // Arrange
    jest.mock('./find', () => () => []);

    // Act
    require('./cli');

    // Assert
    expect(logSpy).not.toHaveBeenCalled();
  });

  it('should accept `ignore-path` argument', () => {
    // Arrange
    const path = 'path/to/config';
    process.argv[2] = '--ignore-path';
    process.argv[3] = require.resolve('../fixtures/ignore.txt');
    process.argv[4] = path;

    const mock = jest.fn().mockReturnValue([]);
    jest.mock('./find', () => mock);

    // Act
    require('./cli');

    // Assert
    expect(mock).toHaveBeenCalledWith(path, { ignore: ['a', 'c', 'e'] });
  });

  it('should throw if `ignore-path` file does not exist', () => {
    // Arrange
    const path = 'path/to/config';
    process.argv[2] = '--ignore-path';
    process.argv[3] = normalize('../fixtures/ignore-2.txt');
    process.argv[4] = path;

    const mock = jest.fn().mockReturnValue([]);
    jest.mock('./find', () => mock);

    // Assert
    expect(() => {
      require('./cli');
    }).toThrow('Path to ignore file does not exist');
  });
});

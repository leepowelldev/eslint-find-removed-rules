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
    expect(mock).toHaveBeenCalledWith(path);
  });

  it('should output result message to console', () => {
    // Arrange
    jest.mock('./find', () => () => ['a', 'b']);

    // Act
    require('./cli');

    // Assert
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(`Rules removed from ESLint config file:`)
    );
  });

  it('should output empty result message to console', () => {
    // Arrange
    jest.mock('./find', () => () => []);

    // Act
    require('./cli');

    // Assert
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('No rules removed from ESLint config file.')
    );
  });
});

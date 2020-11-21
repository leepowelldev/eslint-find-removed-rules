module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  restoreMocks: true,
  roots: ['<rootDir>/src'],
  testMatch: [
    'src/**/__tests__/**/*.+(ts|tsx|js)',
    'src/**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};

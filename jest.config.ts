import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.json', // Path to your TypeScript config
      isolatedModules: true,              // Moved from `globals`
    }],
  },
  setupFiles: ['<rootDir>/jest.setup.ts'], // Path to setup file
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
};

export default config;

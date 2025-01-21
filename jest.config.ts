import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.json', 
      isolatedModules: true,              
    }],
  },
  setupFiles: ['<rootDir>/jest.setup.ts'], 
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
};

export default config;

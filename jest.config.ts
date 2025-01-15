module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.(ts|tsx)$': 'babel-jest',
    },
   

    globals: {
      'ts-jest': {
        isolatedModules: true, 
      },
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  };
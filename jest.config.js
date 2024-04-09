module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1', // Mapping for TypeScript paths
    },
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    globals: {
      'ts-jest': {
        tsconfig: {
          target: 'esnext', // Set the TypeScript compilation target
        },
      },
    },
    collectCoverage: true, // Enable coverage collection
    coverageReporters: process.env.CI ? ['text', 'lcov', 'html'] : ['text'],
    coverageDirectory: 'coverage', // Output directory for coverage reports
  };
  
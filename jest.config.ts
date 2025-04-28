import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.module\\.css$': 'identity-obj-proxy'
  },
  testMatch: ['**/?(*.)+(spec|test).[t]s?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  coveragePathIgnorePatterns: ['/node_modules/', '\\.(css|scss|less|jpg|jpeg|png|gif|svg)$']
};

export default config;

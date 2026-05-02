import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // next-intl ships only ESM — redirect to a lightweight CJS mock instead
  moduleNameMapper: {
    '^next-intl$': '<rootDir>/__mocks__/next-intl.tsx',
  },
  // Exclude test helpers (not test suites) from Jest's file discovery
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '<rootDir>/src/__tests__/utils.tsx',
  ],
}

export default createJestConfig(config)

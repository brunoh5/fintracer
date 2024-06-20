import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({
	dir: './',
})

const config: Config = {
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	preset: 'ts-jest',
	verbose: true,
	testEnvironment: 'jest-environment-jsdom',
	moduleNameMapper: {
		'^@components/(.*)$': '<rootDir>/src/components/$1',
		'^@ui/(.*)$': '<rootDir>/src/components/ui/$1',
		'^@features/(.*)$': '<rootDir>/src/features/$1',
		'^@lib/(.*)$': '<rootDir>/src/lib/$1',
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	testMatch: ['**/*.spec.tsx', '**/*.e2e-spec.tsx'],
}

export default createJestConfig(config)

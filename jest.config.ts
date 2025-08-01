import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  testMatch: ["<rootDir>/src/**/*.test.ts", "<rootDir>/src/**/__tests__/*.ts"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1"
  },
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/config/setup.ts"]
}

export default config

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "**/src/**",
    "!**/node_modules/**",
    "!**/dist/**",
    "!**/coverage/**",
    "!**/src/bin/**",
    "!**/test/**",
  ],
  coverageReporters: [
    "json",
    "text",
    "text-summary",
    "html",
  ],
  moduleFileExtensions: [
    "ts",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/coverage/"
  ],
  testRegex: [
    "(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)x?$",
  ],
};
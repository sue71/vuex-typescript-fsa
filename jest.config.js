module.exports = {
  testURL: "http://localhost",
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>/src/$1"
  },
  moduleFileExtensions: ["js", "ts"],
  transform: {
    ".*\\.ts$": "<rootDir>/node_modules/ts-jest"
  },
  testMatch: ["**/test/**/*.ts"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts"]
};

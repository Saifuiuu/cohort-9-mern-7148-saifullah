export default {
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/mocks/styleMock.cjs",
  },
};
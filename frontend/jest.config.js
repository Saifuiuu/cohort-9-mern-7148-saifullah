export default {
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/__mocks__/styleMock.js",
  },
};
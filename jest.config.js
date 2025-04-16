export default {
    testEnvironment: 'jsdom',
    transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$|pdfjs-dist))'],
    moduleNameMapper: {
        "\\.svg$": "<rootDir>/src/tests/unit/mocks/svg.mock.js", // Mock SVG imports
        "\\.(css|scss)$": "identity-obj-proxy", // Mock style imports
    },
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
    clearMocks: true,
};